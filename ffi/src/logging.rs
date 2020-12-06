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
use async_channel::bounded;
use tracing::{Level};
use futures::StreamExt;

// Uncomment this once single type filter lands in tracing.
/*
use tracing_subscriber::{
  EnvFilter,
  reload::Handle,
};

lazy_static! {
  static ref LOG_FILTER_HANDLE: Option<Handle<EnvFilter>> = None;
}
*/

type LogFFICallback = extern "C" fn(*const c_char);

#[no_mangle]
pub extern "C" fn buttplug_set_log_callback(callback: LogFFICallback, max_level_cchar: *const c_char) {
  let (sender, mut receiver) = bounded(256);
  async_manager::spawn(async move {
    while let Some(msg) = receiver.next().await {
      let str = CString::new(msg).expect("Issue with conversion of log message.");
      callback(str.as_ptr());
    }
  });
  let max_level_cstr: &CStr = unsafe { CStr::from_ptr(max_level_cchar) };
  let subscriber = tracing_subscriber::fmt()
    .json()
    .with_ansi(false)
    .with_writer(ChannelWriter::new(sender))
    .with_env_filter(max_level_cstr.to_str().unwrap())
    .with_filter_reloading();

  // Uncomment this once single type filter lands in tracing.
  /*
    let handle = subscriber.reload_handle();
    let wrapper = FilterWrapper { handle };
  */
  subscriber.init();
}

#[no_mangle]
pub extern "C" fn buttplug_set_log_level(max_level_cchar: *const c_char) {
  let max_level_cstr: &CStr = unsafe { CStr::from_ptr(max_level_cchar) };
  let max_level: Level = Level::from_str(max_level_cstr.to_str().unwrap()).unwrap();
}