use super::{
  FFICallbackContext,
  FFICallbackContextWrapper,
  client::ButtplugFFIClient,
  device::ButtplugFFIDevice, 
  FFICallback,
  FFIResultCallback,
  FFIResult,
  FFISystemCallback,
  logging::{LogFFICallback, ButtplugFFILogHandle}
};
use libc::c_char;
use std::{
  ffi::CStr,
  slice,
  sync::{Arc, Weak, Mutex}
};
use tracing_subscriber;
use tokio::runtime::Runtime;
use buttplug::device::Endpoint;

lazy_static! {
  static ref RUNTIME: Mutex<Weak<tokio::runtime::Runtime>> = Mutex::new(Weak::new());
}

fn get_or_create_runtime() -> Arc<Runtime> {
  // See if we have a runtime. If so, copy and pass to the client. Otherwise,
  // spin one up, sending it to the client while also storing it in our static
  // Weak<> just in case someone tries to create multiple clients.
  let mut static_runtime = RUNTIME.lock().unwrap();
  match static_runtime.upgrade() {
    Some(rt) => {
      rt
    },
    None => {
      let new_runtime = Arc::new(tokio::runtime::Runtime::new().unwrap());
      *static_runtime = Arc::downgrade(&new_runtime);
      new_runtime
    }
  }
}

#[no_mangle]
pub extern "C" fn buttplug_create_client(
  client_name_ptr: *const c_char,
  callback: FFISystemCallback,
  callback_context: FFICallbackContext
) -> *mut ButtplugFFIClient {
  let c_str = unsafe {
    assert!(!client_name_ptr.is_null());

    CStr::from_ptr(client_name_ptr)
  };

  unimplemented!();
}


#[no_mangle]
pub extern "C" fn buttplug_create_protobuf_client(
  client_name_ptr: *const c_char,
  callback: FFICallback,
  callback_context: FFICallbackContext
) -> *mut ButtplugFFIClient {
  let c_str = unsafe {
    assert!(!client_name_ptr.is_null());

    CStr::from_ptr(client_name_ptr)
  };

  // If we were handed a wrong client name, just panic.
  let client_name = c_str.to_str().unwrap();

  Box::into_raw(Box::new(ButtplugFFIClient::new(get_or_create_runtime(), &client_name, callback, callback_context)))
}

#[no_mangle]
pub extern "C" fn buttplug_free_client(ptr: *mut ButtplugFFIClient) {
  if !ptr.is_null() {
    unsafe {
      Box::from_raw(ptr);
    }
  }
}

// TODO: is there a pre-existing struct for this?
#[repr(C)]
pub struct LocalConnectConfig {
  server_name: *const c_char,
  pub max_ping_time: u32,
  pub allow_raw_messages: bool,
  device_configuration_json: *const c_char,
  user_device_configuration_json: *const c_char,
  // TODO: use bitflags
  pub comm_manager_types: u32
}

impl LocalConnectConfig {
  fn server_name(&self) -> &CStr {
    unsafe {
      CStr::from_ptr(self.server_name)
    }
  }

  fn device_configuration_json(&self) -> &CStr {
    unsafe {
      CStr::from_ptr(self.device_configuration_json)
    }
  }

  fn user_device_configuration_json(&self) -> &CStr {
    unsafe {
      CStr::from_ptr(self.user_device_configuration_json)
    }
  }
}

#[no_mangle]
pub extern "C" fn buttplug_client_connect_local(
  client_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,

  config: &LocalConnectConfig
) {
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_client_connect_websocket(
  client_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,

  address: *const c_char,
  bypass_cert_verification: bool
)  {
  let address = unsafe {
    CStr::from_ptr(address)
  };
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_client_start_scanning(
  client_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,
) {
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_client_stop_scanning(
  client_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,
) {
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_client_stop_all_devices(
  client_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,
) {
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_client_disconnect(
  client_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,
) {
  unimplemented!();
}
#[no_mangle]
pub extern "C" fn buttplug_client_ping(
  client_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,
) {
  unimplemented!();
}


#[no_mangle]
pub extern "C" fn buttplug_client_protobuf_message(
  client_ptr: *mut ButtplugFFIClient,
  buf: *const u8,
  buf_len: i32,
  callback: FFICallback,
  callback_context: FFICallbackContext
) {
  let client = unsafe {
    assert!(!client_ptr.is_null());
    &mut *client_ptr
  };
  let msg_ptr;
  unsafe {
    msg_ptr = slice::from_raw_parts(buf, buf_len as usize);
  }
  client.parse_message(msg_ptr, callback, FFICallbackContextWrapper(callback_context));
}

#[no_mangle]
pub extern "C" fn buttplug_create_device(
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

#[repr(C)]
pub struct VibrateComponent {
  index: u32,
  speed: f64
}

#[no_mangle]
pub extern "C" fn buttplug_device_vibrate_cmd(
  device_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,

  components: *const VibrateComponent,
  components_len: usize
) {
  let components = unsafe {
    slice::from_raw_parts(components, components_len)
  };
  unimplemented!();
}

#[repr(C)]
pub struct RotateComponent {
  index: u32,
  speed: f64,
  clockwise: bool
}

#[no_mangle]
pub extern "C" fn buttplug_device_rotate_cmd(
  device_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,

  components: *const RotateComponent,
  components_len: usize
) {
  let components = unsafe {
    slice::from_raw_parts(components, components_len)
  };
  unimplemented!();
}

#[repr(C)]
pub struct LinearComponent {
  index: u32,
  duration: u32,
  position: f64
}

#[no_mangle]
pub extern "C" fn buttplug_device_linear_cmd(
  device_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,

  components: *const LinearComponent,
  components_len: usize
) {
  let components = unsafe {
    slice::from_raw_parts(components, components_len)
  };
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_device_stop_cmd(
  device_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,
) {
  unimplemented!();
}

#[repr(C)]
pub struct RawReadResponse {
  // TODO: do we actually need to send the index or endpoint as part of the response?
  index: u32,
  // TODO: make endpoint enum repr(u8)
  endpoint: Endpoint,
  data: *const u8,
  data_len: usize
}

#[no_mangle]
pub extern "C" fn buttplug_device_raw_read_cmd(
  device_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<RawReadResponse>,
  callback_context: FFICallbackContext,

  // TODO: make endpoint enum repr(u8)
  endpoint: Endpoint,
  data: *const u8,
  data_len: usize,
  expected_len: usize,
  timeout: u32
) {
  let data = unsafe {
    slice::from_raw_parts(data, data_len)
  };
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_device_raw_write_cmd(
  device_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,

  // TODO: make actual endpoint struct repr(C, u8)?
  endpoint: u8,
  data: *const u8,
  data_len: usize,
  write_with_response: bool
) {
  let data = unsafe {
    slice::from_raw_parts(data, data_len)
  };
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_device_raw_subscribe_cmd(
  device_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,

  // TODO: make actual endpoint struct repr(C, u8)?
  endpoint: u8
) {
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_device_raw_unsubscribe_cmd(
  device_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<()>,
  callback_context: FFICallbackContext,

  // TODO: make actual endpoint struct repr(C, u8)?
  endpoint: u8
) {
  unimplemented!();
}

#[repr(C)]
pub struct BatteryLevelResponse {
  // TODO: is index necessary? could just replace whole struct with f64 if not.
  index: u32,
  reading: f64
}

#[no_mangle]
pub extern "C" fn buttplug_device_battery_level_cmd(
  device_ptr: &mut ButtplugFFIClient,
  callback: FFIResultCallback<BatteryLevelResponse>,
  callback_context: FFICallbackContext,
) {
  unimplemented!();
}

#[repr(C)]
pub struct RSSILevelResponse {
  // TODO: is index necessary? could just replace whole struct with i32 if not.
  index: u32,
  reading: i32
}

#[no_mangle]
pub extern "C" fn buttplug_device_rssi_level_cmd(
  device_ptr: &mut ButtplugFFIClient,
  // TODO: non-protobuf callback type
  callback: FFIResultCallback<RSSILevelResponse>,
  callback_context: FFICallbackContext,
) {
  unimplemented!();
}

#[no_mangle]
pub extern "C" fn buttplug_device_protobuf_message(
  device_ptr: *mut ButtplugFFIDevice,
  buf: *const u8,
  buf_len: i32,
  callback: FFICallback,
  callback_context: FFICallbackContext
) {
  let device = unsafe {
    assert!(!device_ptr.is_null());
    &mut *device_ptr
  };
  let msg_ptr;
  unsafe {
    msg_ptr = slice::from_raw_parts(buf, buf_len as usize);
  }
  device.parse_message(msg_ptr, callback, FFICallbackContextWrapper(callback_context));
}

#[no_mangle]
pub extern "C" fn buttplug_free_device(ptr: *mut ButtplugFFIDevice) {
  if !ptr.is_null() {
    unsafe {
      Box::from_raw(ptr);
    }
  }
}

#[no_mangle]
pub extern "C" fn buttplug_activate_env_logger() {
  if tracing_subscriber::fmt::try_init().is_err() {
    error!("Cannot re-init env logger, this should only be called once");
  }
}

#[no_mangle]
pub extern "C" fn buttplug_create_log_handle(callback: LogFFICallback, ctx: FFICallbackContext, max_level: *const c_char, use_json: bool) -> *mut ButtplugFFILogHandle {
  let max_level_cstr = unsafe {
    assert!(!max_level.is_null());

    CStr::from_ptr(max_level)
  };
  // If we were handed a wrong client name, just panic.
  let max_level_str = max_level_cstr.to_str().unwrap();
  Box::into_raw(Box::new(ButtplugFFILogHandle::new(get_or_create_runtime(), callback, ctx, max_level_str, use_json)))
}

#[no_mangle]
pub extern "C" fn buttplug_free_log_handle(log_ptr: *mut ButtplugFFILogHandle) {
  if !log_ptr.is_null() {
    unsafe {
      Box::from_raw(log_ptr);
    }
  }
}