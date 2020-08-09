#[macro_use]
extern crate lazy_static;
#[macro_use]
extern crate tracing;

mod flatbuffer_create_client_generated;
mod flatbuffer_client_generated;
mod flatbuffer_server_generated;

use std::os::raw::c_int;
use std::slice;
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
use dashmap::DashMap;
use flatbuffer_client_generated::buttplug_ffi::{ClientMessage, ClientMessageType, ConnectLocal, ConnectWebsocket, get_root_as_client_message};
use flatbuffer_create_client_generated::buttplug_ffi::get_root_as_create_client;
use flatbuffer_server_generated::buttplug_ffi::{Ok, OkArgs, DeviceAdded, DeviceAddedArgs, ServerMessage, ServerMessageArgs, ServerMessageType, get_root_as_server_message};
use std::sync::{Arc, atomic::{AtomicU32, Ordering}};
use flatbuffers::{FlatBufferBuilder, WIPOffset, UnionWIPOffset};
use async_std::sync::RwLock;
use futures::StreamExt;

type FFICallback = extern "C" fn(*const u8, u32);

pub struct ButtplugFFIClient {
  name: String,
  callback: FFICallback,
  client: Arc<RwLock<Option<ButtplugClient>>>
}

fn send_server_message(mut builder: FlatBufferBuilder, id: u32, msg_type: ServerMessageType, union: WIPOffset<UnionWIPOffset>, callback: FFICallback) {
  let server_msg = ServerMessage::create(&mut builder, &ServerMessageArgs {
    id: id,
    message_type: msg_type,
    message: Some(union),
  });
  builder.finish(server_msg, None);
  let msg = builder.finished_data();
  callback(msg.as_ptr(), msg.len() as u32);
}

fn send_ok_message(id: u32, callback: FFICallback) {
  let mut builder = FlatBufferBuilder::new_with_capacity(1024);
  let ok_msg = Ok::create(&mut builder, &OkArgs {});
  send_server_message(builder, id, ServerMessageType::Ok, ok_msg.as_union_value(), callback);
}

fn send_event(event: ButtplugClientEvent, callback: FFICallback) {
  let mut builder = FlatBufferBuilder::new_with_capacity(1024);
  match event {
    ButtplugClientEvent::DeviceAdded(device) => {
      let device_name = builder.create_string(&device.name);
      let device_added_msg = DeviceAdded::create(&mut builder, &DeviceAddedArgs {
        name: Some(device_name)
      });
      send_server_message(builder, 0, ServerMessageType::DeviceAdded, device_added_msg.as_union_value(), callback);
    },
    ButtplugClientEvent::DeviceRemoved(device) => {

    },
    ButtplugClientEvent::Error(error) => {

    },
    ButtplugClientEvent::Log(log_level, log_msg) => {

    },
    ButtplugClientEvent::ScanningFinished => {

    },
    ButtplugClientEvent::ServerDisconnect => {

    },
    ButtplugClientEvent::PingTimeout => {

    }
  }
}

impl ButtplugFFIClient {
  fn new(name: &str, callback: FFICallback) -> Self {
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

#[no_mangle]
pub extern "C" fn buttplug_create_client(callback: FFICallback, buf: *const u8, buf_len: i32) -> *mut ButtplugFFIClient {
  println!("Seeing if println works here.");
  tracing_subscriber::fmt::init();
  let msg: &[u8];
  unsafe {
    msg = slice::from_raw_parts(buf, buf_len as usize);
  }
  let create_client_msg = get_root_as_create_client(msg);
  Box::into_raw(Box::new(ButtplugFFIClient::new(&create_client_msg.name().unwrap(), callback)))
}

#[no_mangle]
pub extern "C" fn buttplug_free_client(client_ptr: *mut ButtplugFFIClient) {
  if !client_ptr.is_null() {
    unsafe {
      Box::from_raw(client_ptr);
    }
  }
}

#[no_mangle]
pub extern "C" fn buttplug_parse_client_message(client_ptr: *mut ButtplugFFIClient, buf: *const u8, buf_len: i32) {
  let client = unsafe {
    assert!(!client_ptr.is_null());
    &mut *client_ptr
  };
  client.parse_client_message(buf, buf_len);
}