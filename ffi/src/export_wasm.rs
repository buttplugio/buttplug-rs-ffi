use super::{
  client::ButtplugFFIClient,
  device::ButtplugFFIDevice,
  logging::LogFFICallback,
  wasm_types::c_char,
  FFICallback,
  FFICallbackContextWrapper,
};
use console_error_panic_hook;
use tracing_subscriber::{layer::SubscriberExt, EnvFilter, Registry};
use tracing_wasm::{WASMLayer, WASMLayerConfig};
use wasm_bindgen::prelude::*;

#[no_mangle]
#[wasm_bindgen]
pub fn buttplug_create_protobuf_client(
  client_name: &str,
  callback: &FFICallback,
  callback_context: u32,
) -> *mut ButtplugFFIClient {
  console_error_panic_hook::set_once();

  // If we were handed a wrong client name, just panic.

  Box::into_raw(Box::new(ButtplugFFIClient::new(
    client_name,
    callback.clone(),
    callback_context,
  )))
}

#[no_mangle]
#[wasm_bindgen]
pub fn buttplug_free_client(ptr: *mut ButtplugFFIClient) {
  if !ptr.is_null() {
    unsafe {
      Box::from_raw(ptr);
    }
  }
}

#[no_mangle]
#[wasm_bindgen]
pub fn buttplug_client_protobuf_message(
  client_ptr: *mut ButtplugFFIClient,
  buf: &[u8],
  callback: FFICallback,
  callback_context: u32,
) {
  let client = unsafe {
    assert!(!client_ptr.is_null());
    &mut *client_ptr
  };
  client.parse_message(buf, callback, FFICallbackContextWrapper(callback_context));
}

#[no_mangle]
#[wasm_bindgen]
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
#[wasm_bindgen]
pub fn buttplug_device_protobuf_message(
  device_ptr: *mut ButtplugFFIDevice,
  buf: &[u8],
  callback: FFICallback,
  callback_context: u32,
) {
  let device = unsafe {
    assert!(!device_ptr.is_null());
    &mut *device_ptr
  };
  device.parse_message(buf, callback, FFICallbackContextWrapper(callback_context));
}

#[no_mangle]
#[wasm_bindgen]
pub fn buttplug_free_device(ptr: *mut ButtplugFFIDevice) {
  if !ptr.is_null() {
    unsafe {
      Box::from_raw(ptr);
    }
  }
}

#[no_mangle]
#[wasm_bindgen]
pub fn buttplug_activate_env_logger(max_level: &str) {
  tracing::subscriber::set_global_default(
    Registry::default()
      .with(EnvFilter::new(max_level))
      .with(WASMLayer::new(WASMLayerConfig::default())),
  )
  .expect("default global");
}

/*
#[no_mangle]
#[wasm_bindgen]
pub fn buttplug_add_log_handler(callback: &LogFFICallback, max_level: &str, use_json: bool) {
  buttplug_create_log_handler(callback.clone(), max_level, use_json);
}
*/
