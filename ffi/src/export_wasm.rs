use super::{client::ButtplugFFIClient, device::ButtplugFFIDevice, FFICallback};
use super::wasm_types::c_char;
use tracing_wasm;
use wasm_bindgen::prelude::*;

#[no_mangle]
#[cfg_attr(feature = "wasm", wasm_bindgen)]
pub fn buttplug_create_client(
  callback: &FFICallback,
  client_name: &str,
) -> *mut ButtplugFFIClient {
  // If we were handed a wrong client name, just panic.

  Box::into_raw(Box::new(ButtplugFFIClient::new(client_name, Some(callback.clone()))))
}

#[no_mangle]
#[cfg_attr(feature = "wasm", wasm_bindgen)]
pub fn buttplug_free_client(ptr: *mut ButtplugFFIClient) {
  if !ptr.is_null() {
    unsafe {
      Box::from_raw(ptr);
    }
  }
}

#[no_mangle]
#[cfg_attr(feature = "wasm", wasm_bindgen)]
pub fn buttplug_parse_client_message(
  client_ptr: *mut ButtplugFFIClient,
  buf: &[u8]
) {
  let client = unsafe {
    assert!(!client_ptr.is_null());
    &mut *client_ptr
  };
  client.parse_message(buf);
}

#[no_mangle]
#[cfg_attr(feature = "wasm", wasm_bindgen)]
pub fn buttplug_create_device(
  client_ptr: *mut ButtplugFFIClient,
  device_index: u32,
) -> *mut ButtplugFFIDevice {
  let client = unsafe {
    assert!(!client_ptr.is_null());
    &mut *client_ptr
  };
  if let Some(device) = client.get_device(device_index) {
    Box::into_raw(Box::new(device))
  } else {
    std::ptr::null::<*mut ButtplugFFIDevice>() as *mut ButtplugFFIDevice
  }
}

#[no_mangle]
#[cfg_attr(feature = "wasm", wasm_bindgen)]
pub fn buttplug_parse_device_message(
  device_ptr: *mut ButtplugFFIDevice,
  buf: &[u8]
) {
  let device = unsafe {
    assert!(!device_ptr.is_null());
    &mut *device_ptr
  };
  device.parse_message(buf);
}

#[no_mangle]
#[cfg_attr(feature = "wasm", wasm_bindgen)]
pub fn buttplug_free_device(ptr: *mut ButtplugFFIDevice) {
  if !ptr.is_null() {
    unsafe {
      Box::from_raw(ptr);
    }
  }
}

#[no_mangle]
#[cfg_attr(feature = "wasm", wasm_bindgen)]
pub fn buttplug_activate_env_logger() {
  tracing_wasm::set_as_global_default();
}
