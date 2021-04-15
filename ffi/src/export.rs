use super::{
  client::ButtplugFFIClient,
  device::ButtplugFFIDevice, 
  FFICallback,
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
  callback: Option<FFICallback>,
  client_name_ptr: *const c_char,
) -> *mut ButtplugFFIClient {
  let c_str = unsafe {
    assert!(!client_name_ptr.is_null());

    CStr::from_ptr(client_name_ptr)
  };

  // If we were handed a wrong client name, just panic.
  let client_name = c_str.to_str().unwrap();

  if callback.is_none() {
    error!("NULL CALLBACK SPECIFIED. NO MESSAGES WILL BE RETURNED, NOR WILL EVENTS BE EMITTED.");
  }

  Box::into_raw(Box::new(ButtplugFFIClient::new(get_or_create_runtime(), &client_name, callback)))
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
pub extern "C" fn buttplug_parse_client_message(
  client_ptr: *mut ButtplugFFIClient,
  buf: *const u8,
  buf_len: i32,
) {
  let client = unsafe {
    assert!(!client_ptr.is_null());
    &mut *client_ptr
  };
  let msg_ptr;
  unsafe {
    msg_ptr = slice::from_raw_parts(buf, buf_len as usize);
  }
  client.parse_message(msg_ptr);
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

#[no_mangle]
pub extern "C" fn buttplug_parse_device_message(
  device_ptr: *mut ButtplugFFIDevice,
  buf: *const u8,
  buf_len: i32,
) {
  let device = unsafe {
    assert!(!device_ptr.is_null());
    &mut *device_ptr
  };
  let msg_ptr;
  unsafe {
    msg_ptr = slice::from_raw_parts(buf, buf_len as usize);
  }
  device.parse_message(msg_ptr);
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
pub extern "C" fn buttplug_create_log_handle(callback: LogFFICallback, max_level: *const c_char, use_json: bool) -> *mut ButtplugFFILogHandle {
  let max_level_cstr = unsafe {
    assert!(!max_level.is_null());

    CStr::from_ptr(max_level)
  };
  // If we were handed a wrong client name, just panic.
  let max_level_str = max_level_cstr.to_str().unwrap();
  Box::into_raw(Box::new(ButtplugFFILogHandle::new(get_or_create_runtime(), callback, max_level_str, use_json)))
}

#[no_mangle]
pub extern "C" fn buttplug_free_log_handle(log_ptr: *mut ButtplugFFILogHandle) {
  if !log_ptr.is_null() {
    unsafe {
      Box::from_raw(log_ptr);
    }
  }
}