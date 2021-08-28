use super::{
  FFICallback,
  FFICallbackContext,
  FFICallbackContextWrapper,
  device::ButtplugFFIDevice,
  util::{return_client_result, return_ok, return_error, send_event},
  pbufs::{
    ClientMessage,
    client_message::{ConnectLocal, ConnectWebsocket, DeviceCommunicationManagerTypes, ffi_message::Msg as ClientMessageType}
  }
};
use std::sync::Arc;
use buttplug::{
  client::ButtplugClient, 
  connector::{ButtplugInProcessClientConnector, ButtplugConnector, ButtplugRemoteClientConnector},
  core::{messages::{ButtplugCurrentSpecClientMessage, ButtplugCurrentSpecServerMessage, serializer::ButtplugClientJSONSerializer}}, 
  server::{ButtplugServerBuilder}, 
  util::async_manager
};
#[cfg(feature = "wasm")]
use super::wasm::{
  webbluetooth_manager::WebBluetoothCommunicationManagerBuilder,
  websocket_client_connector::ButtplugBrowserWebsocketClientTransport
};
#[cfg(not(feature = "wasm"))]
use buttplug::{
  connector::ButtplugWebsocketClientTransport,
  server::{
    comm_managers::{
      btleplug::BtlePlugCommunicationManagerBuilder,
      lovense_dongle::{
        LovenseHIDDongleCommunicationManagerBuilder, LovenseSerialDongleCommunicationManagerBuilder
      },
      serialport::SerialPortCommunicationManagerBuilder,
    }
  }
};
#[cfg(all(target_os = "windows", not(feature = "wasm")))]
use buttplug::server::comm_managers::xinput::XInputDeviceCommunicationManagerBuilder;
use futures::StreamExt;
use prost::Message;
#[cfg(not(feature = "wasm"))]
use tokio::runtime::Runtime;

pub struct ButtplugFFIClient {
  client: Arc<ButtplugClient>,
  #[cfg(not(feature = "wasm"))]
  runtime: Arc<Runtime>,
}

impl ButtplugFFIClient {
  pub fn new(
    #[cfg(not(feature = "wasm"))]
    runtime: Arc<tokio::runtime::Runtime>,
    name: &str, 
    event_callback: FFICallback,
    event_callback_context: FFICallbackContext) -> Self {
    let client = Arc::new(ButtplugClient::new(name));
    let event_callback = event_callback.clone();
    let context_wrapper = FFICallbackContextWrapper(event_callback_context);
    let context_wrapper_clone = context_wrapper.clone();
    let mut event_stream = client.event_stream();
    #[cfg(not(feature = "wasm"))]
    let _guard = runtime.enter();
    async_manager::spawn(async move {
      while let Some(e) = event_stream.next().await {
        send_event(e, &event_callback, context_wrapper_clone);
      }
    }).unwrap();
    Self {
      client,
      #[cfg(not(feature = "wasm"))]
      runtime,
    }
  }

  pub fn get_device(&self, device_index: u32) -> Option<ButtplugFFIDevice> {
    let devices = self.client.devices();
    if let Some(device) = devices.iter().find(|device| device.index() == device_index) {
      #[cfg(not(feature = "wasm"))]
      return Some(ButtplugFFIDevice::new(self.runtime.clone(), device.clone()));

      #[cfg(feature = "wasm")]
      return Some(ButtplugFFIDevice::new(device.clone()));
    } else {
      error!("Device id {} not available.", device_index);
      None
    }
  }

  pub fn parse_message(&self, msg_ptr: &[u8], callback: FFICallback, callback_context: FFICallbackContextWrapper) {
    #[cfg(not(feature = "wasm"))]
    let _guard = self.runtime.enter();
    let client_msg = ClientMessage::decode(msg_ptr).unwrap();
    let msg_id = client_msg.id;
    match client_msg.message.unwrap().msg.unwrap() {
      ClientMessageType::ConnectLocal(connect_local_msg) => self.connect_local(msg_id, &connect_local_msg, callback, callback_context),
      ClientMessageType::ConnectWebsocket(connect_websocket_msg) => self.connect_websocket(msg_id, &connect_websocket_msg, callback, callback_context),
      ClientMessageType::StartScanning(_) => self.start_scanning(msg_id, callback, callback_context),
      ClientMessageType::StopScanning(_) => self.stop_scanning(msg_id, callback, callback_context),
      ClientMessageType::StopAllDevices(_) => self.stop_all_devices(msg_id, callback, callback_context),
      ClientMessageType::Disconnect(_) => self.disconnect(msg_id, callback, callback_context),
      ClientMessageType::Ping(_) => self.ping(msg_id, callback, callback_context),
    }
  }

  fn connect<C>(&self, client_msg_id: u32, connector: C, callback: FFICallback, callback_context: FFICallbackContextWrapper) 
  where C: ButtplugConnector<ButtplugCurrentSpecClientMessage, ButtplugCurrentSpecServerMessage>  + 'static {
    info!("Connected client with id {}", client_msg_id);
    let client = self.client.clone();
    async_manager::spawn(async move {
      match client.connect(connector).await {
        Ok(()) => {
          return_ok(client_msg_id, &callback, callback_context);
        },
        Err(e) => {
          return_error(client_msg_id, &e, &callback, callback_context);
        }
      }
    }).unwrap();
  }

  fn connect_local(&self, msg_id: u32, connect_local_msg: &ConnectLocal, callback: FFICallback, callback_context: FFICallbackContextWrapper) {
    let mut builder = ButtplugServerBuilder::default();
    builder
      .name(&connect_local_msg.server_name.clone())
      .max_ping_time(connect_local_msg.max_ping_time.into())
      .allow_raw_messages(connect_local_msg.allow_raw_messages);
    if !connect_local_msg.device_configuration_json.is_empty() {
      builder.device_configuration_json( Some(connect_local_msg.device_configuration_json.clone()));
    }
    if !connect_local_msg.user_device_configuration_json.is_empty() { 
      builder.user_device_configuration_json(Some(connect_local_msg.user_device_configuration_json.clone()));
    }
    
    let server = match builder.finish() {
      Ok(server) => server,
      Err(e) => {
        return_error(msg_id, &e.into(), &callback, callback_context);
        return;
      }
    };

    let device_mgrs = connect_local_msg.comm_manager_types;
    #[cfg(not(feature = "wasm"))]
    {
      if device_mgrs & DeviceCommunicationManagerTypes::LovenseHidDongle as u32 > 0 || device_mgrs == 0 {
        server.device_manager().add_comm_manager(LovenseHIDDongleCommunicationManagerBuilder::default()).unwrap();
      }
      if device_mgrs & DeviceCommunicationManagerTypes::LovenseSerialDongle as u32 > 0 || device_mgrs == 0 {
        server.device_manager().add_comm_manager(LovenseSerialDongleCommunicationManagerBuilder::default()).unwrap(); 
      }
      if device_mgrs & DeviceCommunicationManagerTypes::Btleplug as u32 > 0 || device_mgrs == 0 {
        server.device_manager().add_comm_manager(BtlePlugCommunicationManagerBuilder::default()).unwrap();
      }
      #[cfg(target_os="windows")]
      if device_mgrs & DeviceCommunicationManagerTypes::XInput as u32 > 0 || device_mgrs == 0 {
        server.device_manager().add_comm_manager(XInputDeviceCommunicationManagerBuilder::default()).unwrap();
      }
      if device_mgrs & DeviceCommunicationManagerTypes::SerialPort as u32 > 0 || device_mgrs == 0 {
        server.device_manager().add_comm_manager(SerialPortCommunicationManagerBuilder::default()).unwrap();
      }
    }
    #[cfg(feature = "wasm")] 
    {
      server.device_manager().add_comm_manager(WebBluetoothCommunicationManagerBuilder::default()).unwrap();
    }
    let connector = ButtplugInProcessClientConnector::new(Some(server));
    self.connect(msg_id, connector, callback, callback_context);
  }

  #[cfg(not(feature = "wasm"))]
  fn connect_websocket(&self, msg_id: u32, connect_websocket_msg: &ConnectWebsocket, callback: FFICallback, callback_context: FFICallbackContextWrapper) {
    let connector: ButtplugRemoteClientConnector<_, ButtplugClientJSONSerializer> = if connect_websocket_msg.address.contains("wss://") {
      let transport = ButtplugWebsocketClientTransport::new_secure_connector(&connect_websocket_msg.address, connect_websocket_msg.bypass_cert_verification);
      ButtplugRemoteClientConnector::new(transport)
    } else {
      let transport = ButtplugWebsocketClientTransport::new_insecure_connector(&connect_websocket_msg.address);
      ButtplugRemoteClientConnector::new(transport)
    };
    self.connect(msg_id, connector, callback, callback_context);
  }

  #[cfg(feature = "wasm")]
  fn connect_websocket(&self, msg_id: u32, connect_websocket_msg: &ConnectWebsocket, callback: FFICallback, callback_context: FFICallbackContextWrapper) {
    let connector = ButtplugRemoteClientConnector::<
        ButtplugBrowserWebsocketClientTransport,
        ButtplugClientJSONSerializer,
      >::new(
        ButtplugBrowserWebsocketClientTransport::new(
          &connect_websocket_msg.address,
        ),
      );
    self.connect(msg_id, connector, callback, callback_context);
  }

  fn disconnect(&self, msg_id: u32, callback: FFICallback, callback_context: FFICallbackContextWrapper) {
    let client = self.client.clone();
    async_manager::spawn(async move {
      return_client_result(msg_id, &client.disconnect().await, &callback, callback_context);
    }).unwrap();
  }

  fn start_scanning(&self, msg_id: u32, callback: FFICallback, callback_context: FFICallbackContextWrapper) {
    let client = self.client.clone();
    async_manager::spawn(async move {
      return_client_result(msg_id, &client.start_scanning().await, &callback, callback_context);
    }).unwrap();
  }

  fn stop_scanning(&self, msg_id: u32, callback: FFICallback, callback_context: FFICallbackContextWrapper) {
    let client = self.client.clone();
    async_manager::spawn(async move {
      return_client_result(msg_id, &client.stop_scanning().await, &callback, callback_context);
    }).unwrap();
  }

  fn ping(&self, msg_id: u32, callback: FFICallback, callback_context: FFICallbackContextWrapper) {
    let client = self.client.clone();
    async_manager::spawn(async move {
      return_client_result(msg_id, &client.ping().await, &callback, callback_context);
    }).unwrap();
  }

  fn stop_all_devices(&self, msg_id: u32, callback: FFICallback, callback_context: FFICallbackContextWrapper) {
    let client = self.client.clone();
    async_manager::spawn(async move {
      return_client_result(msg_id, &client.stop_all_devices().await, &callback, callback_context);
    }).unwrap();
  }
}
