use async_channel::{bounded, Receiver, Sender};
use async_trait::async_trait;
use broadcaster::BroadcastChannel;
use buttplug::{
  core::{
    errors::{ButtplugDeviceError, ButtplugError},
    messages::RawReading,
    ButtplugResultFuture,
  },
  device::{
    configuration_manager::{BluetoothLESpecifier, DeviceSpecifier, ProtocolDefinition},
    BoundedDeviceEventBroadcaster,
    ButtplugDeviceEvent,
    ButtplugDeviceImplCreator,
    DeviceImpl,
    DeviceReadCmd,
    DeviceSubscribeCmd,
    DeviceUnsubscribeCmd,
    DeviceWriteCmd,
    Endpoint,
  },
  server::comm_managers::ButtplugDeviceSpecificError,
  util::future::{ButtplugFuture, ButtplugFutureStateShared},
};
use futures::future::{self, BoxFuture};
use futures::StreamExt;
use js_sys::Uint8Array;
use std::collections::HashMap;
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

pub enum WebBluetoothEvent {
  Connected,
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
  device_local_event_sender: Sender<WebBluetoothEvent>,
  device_external_event_sender: BoundedDeviceEventBroadcaster,
  mut device_command_receiver: Receiver<WebBluetoothDeviceCommand>,
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
  //let web_btle_device = WebBluetoothDeviceImpl::new(device, char_map);
  info!("device created!");
  device_local_event_sender
    .send(WebBluetoothEvent::Connected)
    .await;
  while let Some(msg) = device_command_receiver.next().await {
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
      WebBluetoothDeviceCommand::Read(read, waker) => {}
      WebBluetoothDeviceCommand::Subscribe(subscribe_cmd, waker) => {
        info!("Subscribing to endpoint {:?}", subscribe_cmd.endpoint);
        let chr = char_map.get(&subscribe_cmd.endpoint).unwrap().clone();
        let ep = subscribe_cmd.endpoint;
        let event_sender = device_external_event_sender.clone();
        let onchange_callback = Closure::wrap(Box::new(move |e: MessageEvent| {
          info!("GOT VALUE FROM SUBSCRIPTION");
          info!("{}", ep);

          let event_chr: BluetoothRemoteGattCharacteristic =
            BluetoothRemoteGattCharacteristic::from(JsValue::from(e.target().unwrap()));
          let value =
            Uint8Array::new_with_byte_offset(&JsValue::from(event_chr.value().unwrap().buffer()), 0);
          let value_vec = value.to_vec();
          info!("{:?}", value_vec);
          // This block limits the lifetime of the channel sender.
          // Since the compiler doesn't realize we move the sender in
          // the spawn_local block, it'll complain that sender's
          // lifetime lives across the channel await, which gets all
          // angry because this will break FnMut requirements (since
          // this can be called multiple times). So this limits the
          // visible lifetime to before we start waiting for the reply
          // from the event loop.
          {
            let send_clone = event_sender.clone();
            spawn_local(async move {
              send_clone
                .send(&ButtplugDeviceEvent::Notification(ep, value_vec))
                .await;
            });
          }
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
      WebBluetoothDeviceCommand::Unsubscribe(unsubscribe_cmd, waker) => {}
    }
  }
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

#[async_trait]
impl ButtplugDeviceImplCreator for WebBluetoothDeviceImplCreator {
  fn get_specifier(&self) -> DeviceSpecifier {
    debug!("Getting the specifier!");
    self.specifier.clone()
  }

  async fn try_create_device_impl(
    &mut self,
    protocol: ProtocolDefinition,
  ) -> Result<Box<dyn DeviceImpl>, ButtplugError> {
    let (sender, mut receiver) = bounded(256);
    let (command_sender, command_receiver) = bounded(256);
    let ble_device;
    // This block limits the lifetime of device. Since the compiler doesn't
    // realize we move device in the spawn_local block, it'll complain that
    // device's lifetime lives across the channel await, which gets all
    // angry because it's a *mut u8. So this limits the visible lifetime to
    // before we start waiting for the reply from the event loop.
    {
      let device = self.device.take().unwrap();
      let name = device.name().unwrap();
      let address = device.id();
      let receiver_clone = receiver.clone();
      let event_receiver = BroadcastChannel::with_cap(256);
      let event_receiver_clone = event_receiver.clone();
      ble_device = Box::new(WebBluetoothDeviceImpl::new(
        &name,
        &address,
        event_receiver,
        receiver_clone,
        command_sender,
      ));
      spawn_local(async move {
        run_webbluetooth_loop(
          device,
          protocol,
          sender,
          event_receiver_clone,
          command_receiver,
        )
        .await;
      });
    }
    match receiver.next().await.unwrap() {
      WebBluetoothEvent::Connected => {
        info!("Web Bluetooth device connected, returning device");
        Ok(ble_device)
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

#[derive(Clone, Debug)]
pub struct WebBluetoothDeviceImpl {
  device_command_sender: Sender<WebBluetoothDeviceCommand>,
  device_event_receiver: Receiver<WebBluetoothEvent>,
  event_receiver: BoundedDeviceEventBroadcaster,
  address: String,
  // device: BluetoothDevice,
  // characteristics: HashMap<Endpoint, BluetoothRemoteGattCharacteristic>,
  name: String,
}

unsafe impl Send for WebBluetoothDeviceImpl {
}
unsafe impl Sync for WebBluetoothDeviceImpl {
}

impl WebBluetoothDeviceImpl {
  pub fn new(
    name: &str,
    address: &str,
    event_receiver: BoundedDeviceEventBroadcaster,
    device_event_receiver: Receiver<WebBluetoothEvent>,
    device_command_sender: Sender<WebBluetoothDeviceCommand>,
  ) -> Self {
    Self {
      event_receiver,
      address: address.to_owned(),
      name: name.to_owned(),
      device_event_receiver,
      device_command_sender,
    }
  }
}

impl DeviceImpl for WebBluetoothDeviceImpl {
  fn name(&self) -> &str {
    &self.name
  }

  fn address(&self) -> &str {
    &self.address
  }

  fn connected(&self) -> bool {
    true
  }

  fn endpoints(&self) -> Vec<Endpoint> {
    vec![]
    //self.characteristics.keys().cloned().collect()
  }

  fn disconnect(&self) -> ButtplugResultFuture {
    Box::pin(future::ready(Ok(())))
  }

  fn get_event_receiver(&self) -> BoundedDeviceEventBroadcaster {
    self.event_receiver.clone()
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
