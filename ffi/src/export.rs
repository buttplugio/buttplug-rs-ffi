use super::{
  FFICallback,
  client::ButtplugFFIClient,
  flatbuffer_create_client_generated::buttplug_ffi::get_root_as_create_client
};
use std::slice;

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