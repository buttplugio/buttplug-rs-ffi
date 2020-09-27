use super::{
  FFICallback,
  client::ButtplugFFIClient,
  device::ButtplugFFIDevice,
  flatbuffer_create_client_generated::buttplug_ffi::get_root_as_create_client
};
use std::slice;

#[no_mangle]
pub extern "C" fn buttplug_create_client(callback: Option<FFICallback>, buf: *const u8, buf_len: i32) -> *mut ButtplugFFIClient {
  if callback.is_none() {
    error!("NULL CALLBACK SPECIFIED. NO MESSAGES WILL BE RETURNED, NOR WILL EVENTS BE EMITTED.");
  }
  let msg: &[u8];
  unsafe {
    msg = slice::from_raw_parts(buf, buf_len as usize);
  }
  let create_client_msg = get_root_as_create_client(msg);
  Box::into_raw(Box::new(ButtplugFFIClient::new(&create_client_msg.name().unwrap(), callback)))
}

#[no_mangle]
pub extern "C" fn buttplug_free_client(ptr: *mut ButtplugFFIClient) {
  if !ptr.is_null() {
    unsafe {
      Box::from_raw(ptr);
    }
  }
}

#[no_mangle]
pub extern "C" fn buttplug_parse_client_message(client_ptr: *mut ButtplugFFIClient, buf: *const u8, buf_len: i32) {
  let client = unsafe {
    assert!(!client_ptr.is_null());
    &mut *client_ptr
  };
  client.parse_message(buf, buf_len);
}

#[no_mangle]
pub extern "C" fn buttplug_create_device(client_ptr: *mut ButtplugFFIClient, buf: *const u8, buf_len: i32) -> *mut ButtplugFFIDevice {
  let client = unsafe {
    assert!(!client_ptr.is_null());
    &mut *client_ptr
  };
  if let Some(device) = client.get_device(buf, buf_len) {
    Box::into_raw(Box::new(device))
  } else {
    std::ptr::null::<*mut ButtplugFFIDevice>() as *mut ButtplugFFIDevice
  }
}

#[no_mangle]
pub extern "C" fn buttplug_parse_device_message(device_ptr: *mut ButtplugFFIDevice, buf: *const u8, buf_len: i32) {
  let device = unsafe {
    assert!(!device_ptr.is_null());
    &mut *device_ptr
  };
  device.parse_message(buf, buf_len);
}

#[no_mangle]
pub extern "C" fn buttplug_free_device(ptr: *mut ButtplugFFIDevice) {
  if !ptr.is_null() {
    unsafe {
      Box::from_raw(ptr);
    }
  }
}