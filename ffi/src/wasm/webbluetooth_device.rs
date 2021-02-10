use tokio::sync::{mpsc, broadcast};
use async_trait::async_trait;
use buttplug::{
  core::{
    errors::{ButtplugDeviceError, ButtplugError},
    messages::RawReading,
    ButtplugResultFuture,
  },
  device::{
    configuration_manager::{BluetoothLESpecifier, DeviceSpecifier, ProtocolDefinition},
    ButtplugDeviceEvent,
    ButtplugDeviceImplCreator,
    DeviceImpl,
    DeviceImplInternal,
    DeviceReadCmd,
    DeviceSubscribeCmd,
    DeviceUnsubscribeCmd,
    DeviceWriteCmd,
    Endpoint,
  },
  util::future::{ButtplugFuture, ButtplugFutureStateShared},
};
use futures::future::{self, BoxFuture};
use js_sys::Uint8Array;
use std::{fmt::{self, Debug}, collections::HashMap};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::{spawn_local, JsFuture};
use web_sys::{
  BluetoothDevice,
  BluetoothRemoteGattCharacteristic,
  BluetoothRemoteGattServer,
  BluetoothRemoteGattService,
  Event,
  MessageEvent,
};

type WebBluetoothResultFuture = ButtplugFuture<Result<(), ButtplugError>>;

#[derive(Debug, Clone)]
pub enum WebBluetoothEvent {
  // This is the only way we have to get our endpoints back to device creation
  // right now. My god this is a mess.
  Connected(Vec<Endpoint>),
  Disconnected,
}

pub enum WebBluetoothDeviceCommand {
  Write(
    DeviceWriteCmd,
    ButtplugFutureStateShared<Result<(), ButtplugError>>,
  ),
  Read(
    DeviceReadCmd,
    ButtplugFutureStateShared<Result<(), ButtplugError>>,
  ),
  Subscribe(
    DeviceSubscribeCmd,
    ButtplugFutureStateShared<Result<(), ButtplugError>>,
  ),
  Unsubscribe(
    DeviceUnsubscribeCmd,
    ButtplugFutureStateShared<Result<(), ButtplugError>>,
  ),
}

async fn run_webbluetooth_loop(
  device: BluetoothDevice,
  protocol: ProtocolDefinition,
  device_local_event_sender: mpsc::Sender<WebBluetoothEvent>,
  device_external_event_sender: broadcast::Sender<ButtplugDeviceEvent>,
  mut device_command_receiver: mpsc::Receiver<WebBluetoothDeviceCommand>,
) {
  //let device = self.device.take().unwrap();
  let mut char_map = HashMap::new();
  let connect_future = device.gatt().unwrap().connect();
  let server: BluetoothRemoteGattServer = match JsFuture::from(connect_future).await {
    Ok(val) => val.into(),
    Err(_) => {
      device_local_event_sender
        .send(WebBluetoothEvent::Disconnected)
        .await
        .unwrap();
      return;
    }
  };
  let btle_protocol = protocol.btle.unwrap();
  for (service_uuid, service_endpoints) in btle_protocol.services {
    let service = if let Ok(serv) =
      JsFuture::from(server.get_primary_service_with_str(&service_uuid.to_string())).await
    {
      info!(
        "Service {} found on device {}",
        service_uuid,
        device.name().unwrap()
      );
      BluetoothRemoteGattService::from(serv)
    } else {
      info!(
        "Service {} not found on device {}",
        service_uuid,
        device.name().unwrap()
      );
      continue;
    };
    for (chr_name, chr_uuid) in service_endpoints.iter() {
      info!("Connecting chr {} {}", chr_name, chr_uuid.to_string());
      let char: BluetoothRemoteGattCharacteristic =
        JsFuture::from(service.get_characteristic_with_str(&chr_uuid.to_string()))
          .await
          .unwrap()
          .into();
      char_map.insert(chr_name.clone(), char);
    }
  }
  {
    let event_sender = device_external_event_sender.clone();
    let id = device.id().clone();
    let ondisconnected_callback = Closure::wrap(Box::new(move |e: Event| {
      info!("device disconnected!");
      event_sender
        .send(ButtplugDeviceEvent::Removed(id.clone()))
        .unwrap();
    }) as Box<dyn FnMut(Event)>);
    // set disconnection event handler on BluetoothDevice
    device.set_ongattserverdisconnected(Some(ondisconnected_callback.as_ref().unchecked_ref()));
    ondisconnected_callback.forget();
  }
  //let web_btle_device = WebBluetoothDeviceImpl::new(device, char_map);
  info!("device created!");
  let endpoints = char_map.keys().into_iter().cloned().collect();
  device_local_event_sender
    .send(WebBluetoothEvent::Connected(endpoints))
    .await;
  while let Some(msg) = device_command_receiver.recv().await {
    match msg {
      WebBluetoothDeviceCommand::Write(write_cmd, waker) => {
        info!("Writing to endpoint {:?}", write_cmd.endpoint);
        let chr = char_map.get(&write_cmd.endpoint).unwrap().clone();
        spawn_local(async move {
          JsFuture::from(chr.write_value_with_u8_array(&mut write_cmd.data.clone()))
            .await
            .unwrap();
          waker.set_reply(Ok(()));
        });
      }
      WebBluetoothDeviceCommand::Read(_read, _waker) => {}
      WebBluetoothDeviceCommand::Subscribe(subscribe_cmd, waker) => {
        info!("Subscribing to endpoint {:?}", subscribe_cmd.endpoint);
        let chr = char_map.get(&subscribe_cmd.endpoint).unwrap().clone();
        let ep = subscribe_cmd.endpoint;
        let event_sender = device_external_event_sender.clone();
        let id = device.id().clone();
        let onchange_callback = Closure::wrap(Box::new(move |e: MessageEvent| {
          info!("GOT VALUE FROM SUBSCRIPTION");
          info!("{}", ep);

          let event_chr: BluetoothRemoteGattCharacteristic =
            BluetoothRemoteGattCharacteristic::from(JsValue::from(e.target().unwrap()));
          let value =
            Uint8Array::new_with_byte_offset(&JsValue::from(event_chr.value().unwrap().buffer()), 0);
          let value_vec = value.to_vec();
          info!("{:?}", value_vec);
          event_sender
            .send(ButtplugDeviceEvent::Notification(id.clone(), ep, value_vec))
            .unwrap();
        }) as Box<dyn FnMut(MessageEvent)>);
        // set message event handler on WebSocket
        chr.set_oncharacteristicvaluechanged(Some(onchange_callback.as_ref().unchecked_ref()));
        onchange_callback.forget();
        spawn_local(async move {
          JsFuture::from(chr.start_notifications()).await.unwrap();
          info!("Endpoint subscribed");
          waker.set_reply(Ok(()));
        });
      }
      WebBluetoothDeviceCommand::Unsubscribe(_unsubscribe_cmd, _waker) => {}
    }
  }
  debug!("run_webbluetooth_loop exited!");
}

pub struct WebBluetoothDeviceImplCreator {
  device: Option<BluetoothDevice>,
  specifier: DeviceSpecifier,
}

unsafe impl Send for WebBluetoothDeviceImplCreator {
}
unsafe impl Sync for WebBluetoothDeviceImplCreator {
}

impl WebBluetoothDeviceImplCreator {
  pub fn new(device: BluetoothDevice) -> Self {
    debug!("Emitting a new webbluetooth device impl creator!");
    let specifier = DeviceSpecifier::BluetoothLE(BluetoothLESpecifier::new_from_device(
      &device.name().unwrap(),
    ));
    Self {
      device: Some(device),
      specifier,
    }
  }
}

impl Debug for WebBluetoothDeviceImplCreator {
  fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
    f.debug_struct("WebBluetoothDeviceImplCreator")
      .field("specifier", &self.specifier)
      .finish()
  }
}

#[async_trait]
impl ButtplugDeviceImplCreator for WebBluetoothDeviceImplCreator {
  fn get_specifier(&self) -> DeviceSpecifier {
    debug!("Getting the specifier!");
    self.specifier.clone()
  }

  async fn try_create_device_impl(
    &mut self,
    protocol: ProtocolDefinition,
  ) -> Result<DeviceImpl, ButtplugError> {
    let (sender, mut receiver) = mpsc::channel(256);
    let (command_sender, command_receiver) = mpsc::channel(256);
    let name;
    let address;
    let event_sender;
    // This block limits the lifetime of device. Since the compiler doesn't
    // realize we move device in the spawn_local block, it'll complain that
    // device's lifetime lives across the channel await, which gets all
    // angry because it's a *mut u8. So this limits the visible lifetime to
    // before we start waiting for the reply from the event loop.
    {
      let device = self.device.take().unwrap();
      name = device.name().unwrap();
      address = device.id();
      let (es, _) = broadcast::channel(256);
      event_sender = es;
      let event_loop_fut = run_webbluetooth_loop(
        device,
        protocol,
        sender,
        event_sender.clone(),
        command_receiver,
      );
      spawn_local(async move {
        event_loop_fut.await;
      });
    }

    match receiver.recv().await.unwrap() {
      WebBluetoothEvent::Connected(endpoints) => {
        info!("Web Bluetooth device connected, returning device");

        let device_impl = Box::new(WebBluetoothDeviceImpl::new(
          event_sender,
          receiver,
          command_sender,
        ));
        Ok(DeviceImpl::new(
          &name,
          &address,
          &endpoints,
          device_impl
        ))
      }
      WebBluetoothEvent::Disconnected => Err(
        ButtplugDeviceError::DeviceCommunicationError(
          "Could not connect to WebBluetooth device".to_string(),
        )
        .into(),
      ),
    }
  }
}

#[derive(Debug)]
pub struct WebBluetoothDeviceImpl {
  device_command_sender: mpsc::Sender<WebBluetoothDeviceCommand>,
  device_event_receiver: mpsc::Receiver<WebBluetoothEvent>,
  event_sender: broadcast::Sender<ButtplugDeviceEvent>,
}

unsafe impl Send for WebBluetoothDeviceImpl {
}
unsafe impl Sync for WebBluetoothDeviceImpl {
}

impl WebBluetoothDeviceImpl {
  pub fn new(
    event_sender: broadcast::Sender<ButtplugDeviceEvent>,
    device_event_receiver: mpsc::Receiver<WebBluetoothEvent>,
    device_command_sender: mpsc::Sender<WebBluetoothDeviceCommand>,
  ) -> Self {
    Self {
      event_sender,
      device_event_receiver,
      device_command_sender,
    }
  }
}

impl DeviceImplInternal for WebBluetoothDeviceImpl {
  fn event_stream(&self) -> broadcast::Receiver<ButtplugDeviceEvent> {
    self.event_sender.subscribe()
  }

  fn connected(&self) -> bool {
    // TODO This obviously is not correct but we don't really use connected
    // anywhere?!
    true
  }

  fn disconnect(&self) -> ButtplugResultFuture {
    Box::pin(future::ready(Ok(())))
  }

  fn read_value(
    &self,
    _msg: DeviceReadCmd,
  ) -> BoxFuture<'static, Result<RawReading, ButtplugError>> {
    panic!("IMPLEMENT READ FOR WEBBLUETOOTH WASM");
  }

  fn write_value(&self, msg: DeviceWriteCmd) -> ButtplugResultFuture {
    let sender = self.device_command_sender.clone();
    Box::pin(async move {
      info!("Got write call");
      let fut = WebBluetoothResultFuture::default();
      let waker = fut.get_state_clone();
      sender
        .send(WebBluetoothDeviceCommand::Write(msg, waker))
        .await;
      fut.await
    })
  }

  fn subscribe(&self, msg: DeviceSubscribeCmd) -> ButtplugResultFuture {
    let sender = self.device_command_sender.clone();
    Box::pin(async move {
      let fut = WebBluetoothResultFuture::default();
      let waker = fut.get_state_clone();
      sender
        .send(WebBluetoothDeviceCommand::Subscribe(msg, waker))
        .await;
      fut.await
    })
  }

  fn unsubscribe(&self, _msg: DeviceUnsubscribeCmd) -> ButtplugResultFuture {
    Box::pin(async move {
      error!("IMPLEMENT UNSUBSCRIBE FOR WEBBLUETOOTH WASM");
      Ok(())
    })
  }
}
