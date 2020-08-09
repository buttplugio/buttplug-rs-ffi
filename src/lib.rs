#[macro_use]
extern crate lazy_static;

mod flatbuffer_create_client_generated;
mod flatbuffer_client_generated;
mod flatbuffer_server_generated;

use std::os::raw::c_int;
use std::slice;
use buttplug::{
  client::ButtplugClient,
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
use flatbuffer_server_generated::buttplug_ffi::{Ok, OkArgs, ServerMessage, ServerMessageArgs, ServerMessageType, get_root_as_server_message};
use std::sync::{Arc, atomic::{AtomicU32, Ordering}};
use flatbuffers::FlatBufferBuilder;
use async_std::sync::RwLock;
use futures::StreamExt;

type FFICallback = extern "C" fn(*const u8, u32);

/*

lazy_static! {
  static ref FFI_CLIENT_MANAGER: ButtplugFFIManager = ButtplugFFIManager::default();
}

struct ButtplugFFIManager {
  client_map: Arc<DashMap<u32, ButtplugFFIClient>>,
  counter: AtomicU32,
}

impl Default for ButtplugFFIManager {
  fn default() -> Self {
    Self {
      client_map: Arc::new(DashMap::new()),
      counter: AtomicU32::default()
    }
  }
}

impl ButtplugFFIManager {
  pub fn add_client_local(&self, msg_id: u32, create_local_client: &CreateLocal, callback: FFICallback) -> u32 {
    tracing_subscriber::fmt::init();
    let counter_value = self.counter.load(Ordering::SeqCst);
    self.counter.store(counter_value + 1, Ordering::SeqCst);
    let connector = ButtplugInProcessClientConnector::new(create_local_client.server_name().unwrap().clone(), create_local_client.max_ping_time() as u64);
    let client_map = self.client_map.clone();
    let client_name = create_local_client.client_name().unwrap().to_owned();
    let client_id = counter_value;
    async_manager::spawn(async move {
      let (client, event_stream) = ButtplugClient::connect(&client_name, connector).await.unwrap();
      client_map.insert(counter_value, ButtplugFFIClient::new(callback, client));
      let mut builder = FlatBufferBuilder::new_with_capacity(1024);
      let client_connected = ClientConnected::create(&mut builder, &ClientConnectedArgs {
        id: msg_id,
        client_id,
      });
      builder.finish(client_connected, None);
      let msg = builder.finished_data();
      callback(msg.len() as u32, msg);
    }).unwrap();
    counter_value
  }
}
*/

pub struct ButtplugFFIClient {
  name: String,
  callback: FFICallback,
  client: Arc<RwLock<Option<ButtplugClient>>>
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
      _ => println!("Unhandled message type")
    }
  }

  pub fn connect_local(&self, client_msg: &ClientMessage) {
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
      let (bp_client, mut event_stream) = ButtplugClient::connect(&client_name, connector).await.unwrap();
      *(client.write().await) = Some(bp_client);
      let event_callback = callback.clone();
      async_manager::spawn(async move {
        while let Some(e) = event_stream.next().await {
          println!("Client Event!");
          //event_callback()
        }
      }).unwrap();
      let mut builder = FlatBufferBuilder::new_with_capacity(1024);
      let ok_msg = Ok::create(&mut builder, &OkArgs {});
      let server_msg = ServerMessage::create(&mut builder, &ServerMessageArgs {
        id: client_msg_id,
        message_type: ServerMessageType::Ok,
        message: Some(ok_msg.as_union_value())
      });
      builder.finish(server_msg, None);
      let msg = builder.finished_data();
      callback(msg.as_ptr(), msg.len() as u32);
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