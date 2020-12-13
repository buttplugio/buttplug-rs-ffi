use buttplug::{
  util::logging::ChannelWriter,
  util::async_manager
};
use std::{
  ffi::{CString, CStr},
  str::FromStr
};
#[cfg(not(feature = "wasm"))]
use libc::c_char;
#[cfg(feature = "wasm")]
use super::wasm_types::c_char;
#[cfg(feature = "wasm")]
use wasm_bindgen::JsValue;
#[cfg(feature = "wasm")]
use tracing_wasm::WASMLayer;
use async_channel::bounded;
use tracing::{Level};
use futures::StreamExt;

// Uncomment this once single type filter lands in tracing.
/*
use tracing_subscriber::{
  EnvFilter,
  reload::Handle,
};

pub struct ButtplugLogHandler<T: tracing::Subscriber> {
  handle: Handle<EnvFilter, T>,
}

impl<T: tracing::Subscriber> ButtplugLogHandler<T> {
  fn set_from(&self, max_level_cchar: *const c_char) -> Result<(), String> {
      let max_level_cstr: &CStr = unsafe { CStr::from_ptr(max_level_cchar) };
      let new_filter = max_level_cstr
        .to_str()
        .to_owned()
        .unwrap()
        .parse::<tracing_subscriber::filter::EnvFilter>()
        .map_err(|e| format!("{}", e))?;
  self.handle.reload(new_filter).map_err(|e| format!("{}", e))
  }
}
*/

#[cfg(not(feature="wasm"))]
pub type LogFFICallback = extern "C" fn(*const c_char);

#[cfg(feature = "wasm")]
pub type LogFFICallback = js_sys::Function;

pub fn buttplug_create_log_handler(callback: LogFFICallback, max_level: &str, use_json_formatting: bool) {
  let (sender, mut receiver) = bounded(256);
  async_manager::spawn(async move {
    while let Some(msg) = receiver.next().await {
      #[cfg(not(feature = "wasm"))]
      {
        let str = CString::new(msg).expect("Issue with conversion of log message.");
        callback(str.as_ptr());
      }
      #[cfg(feature = "wasm")]
      {
        let this = JsValue::null();
        let str = String::from_utf8(msg).expect("Found invalid UTF-8");
        callback.clone().call1(&this, &JsValue::from_str(&str));
      }
    }
  }).unwrap();
  //let max_level_cstr: &CStr = unsafe { CStr::from_ptr(max_level_cchar) };
  if use_json_formatting{
    if tracing_subscriber::fmt()
      .json()
      .with_ansi(false)
      .with_writer(ChannelWriter::new(sender))
      .with_env_filter(max_level)
      .with_filter_reloading()
      .try_init()
      .is_err() {
        error!("Logging subscriber already registered, cannot re-register");
    }
  } else {
    if tracing_subscriber::fmt()
      .with_ansi(false)
      .with_writer(ChannelWriter::new(sender))
      .with_env_filter(max_level)
      .with_filter_reloading()
      .try_init()
      .is_err() {
        error!("Logging subscriber already registered, cannot re-register");
    }
  }

  // Uncomment this once single type filter lands in tracing.
  /*
  let handle = subscriber.reload_handle();
  let logger_obj = ButtplugLogHandler { handle };

  if subscriber.try_init().is_err() {
    error!("Logging system already started.");
  }
  */
}

/*
#[no_mangle]
pub extern "C" fn buttplug_change_handler_log_level<T>(handler_ptr: *mut ButtplugLogHandler<T>, max_level_cchar: *const c_char) where T: tracing::Subscriber {

}

pub extern "C" fn buttplug_free_log_handler() {

}
*/

/*
#[no_mangle]
pub extern "C" fn buttplug_set_log_level(max_level_cchar: *const c_char) {
  let max_level_cstr: &CStr = unsafe { CStr::from_ptr(max_level_cchar) };
  let max_level: Level = Level::from_str(max_level_cstr.to_str().unwrap()).unwrap();
}
*/