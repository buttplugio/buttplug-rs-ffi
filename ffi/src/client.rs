use super::{
  FFICallback,
  flatbuffer_client_generated::buttplug_ffi::{ClientMessage, ClientMessageType, get_root_as_client_message},
  util::{send_ok_message, send_event}
};
use std::{slice, sync::Arc};
use async_std::sync::RwLock;
use buttplug::{
  client::{ButtplugClient, ButtplugClientEvent},
  connector::ButtplugInProcessClientConnector,
  server::{
    comm_managers::{
      btleplug::BtlePlugCommunicationManager,
      lovense_dongle::{
        LovenseHIDDongleCommunicationManager, LovenseSerialDongleCommunicationManager,
      },
      serialport::SerialPortCommunicationManager,
    },
  },
  util::async_manager
};
#[cfg(target_os = "windows")]
use buttplug::server::comm_managers::xinput::XInputDeviceCommunicationManager;
use futures::StreamExt;

pub struct ButtplugFFIClient {
  name: String,
  callback: FFICallback,
  client: Arc<RwLock<Option<ButtplugClient>>>
}

impl Drop for ButtplugFFIClient {
  fn drop(&mut self) {
    info!("DROPPED RUST FFI CLIENT");
  }
}

impl ButtplugFFIClient {
  pub fn new(name: &str, callback: FFICallback) -> Self {
    Self {
      name: name.to_owned(),
      callback,
      client: Arc::new(RwLock::new(None))
    }
  }

  pub fn parse_client_message(&self, buf: *const u8, buf_len: i32) {
    let msg: &[u8];
    unsafe {
      msg = slice::from_raw_parts(buf, buf_len as usize);
    }
    let client_msg = get_root_as_client_message(msg);
    match client_msg.message_type() {
      ClientMessageType::ConnectLocal => self.connect_local(&client_msg),
      ClientMessageType::StartScanning => self.start_scanning(client_msg.id()),
      ClientMessageType::StopScanning => self.stop_scanning(client_msg.id()),
      _ => println!("Unhandled message type")
    }
  }

  fn connect_local(&self, client_msg: &ClientMessage) {
    let connect_local = client_msg.message_as_connect_local().unwrap();
    println!("Making client with name {}, id {}", self.name, client_msg.id());
    let client = self.client.clone();
    let client_name = self.name.clone();
    let server_name = connect_local.server_name().unwrap().to_owned();
    let max_ping_time = connect_local.max_ping_time();
    let client_msg_id = client_msg.id();
    let callback = self.callback.clone();

    async_manager::spawn(async move {
      let connector = ButtplugInProcessClientConnector::new(&server_name, max_ping_time as u64);
      connector.server_ref().add_comm_manager::<BtlePlugCommunicationManager>();
      let (bp_client, mut event_stream) = ButtplugClient::connect(&client_name, connector).await.unwrap();
      *(client.write().await) = Some(bp_client);
      let event_callback = callback.clone();
      async_manager::spawn(async move {
        while let Some(e) = event_stream.next().await {
          println!("Client Event!");
          send_event(e, event_callback);
        }
      }).unwrap();
      send_ok_message(client_msg_id, callback);
    }).unwrap();
  }

  fn start_scanning(&self, id: u32) {
    let client = self.client.clone();
    let callback = self.callback.clone();
    async_manager::spawn(async move {
      if let Some(usable_client) = &(*client.read().await) {
        usable_client.start_scanning().await;
      } else {
        error!("No client to scan!");
      }
      send_ok_message(id, callback);
    }).unwrap();
  }

  fn stop_scanning(&self, id: u32) {
    let client = self.client.clone();
    let callback = self.callback.clone();
    async_manager::spawn(async move {
      if let Some(usable_client) = &(*client.read().await) {
        usable_client.stop_scanning().await;
      } else {
        error!("No client to scan!");
      }
      send_ok_message(id, callback);
    }).unwrap();
  }
}
