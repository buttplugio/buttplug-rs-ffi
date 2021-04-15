use buttplug::{
  util::logging::ChannelWriter,
  util::async_manager
};
use std::{
  ffi::{CString},
  str::FromStr,
  sync::Arc,
};
#[cfg(not(feature = "wasm"))]
use libc::c_char;
#[cfg(feature = "wasm")]
use super::wasm_types::c_char;
#[cfg(feature = "wasm")]
use wasm_bindgen::JsValue;
#[cfg(feature = "wasm")]
use tracing_wasm::WASMLayer;
use tokio::{runtime::Runtime, sync::mpsc};
//use tracing::{Level};
use tracing::Instrument;
use tracing_subscriber::filter::{EnvFilter, LevelFilter};
#[cfg(not(feature="wasm"))]
use log_panics;

#[cfg(not(feature="wasm"))]
pub type LogFFICallback = extern "C" fn(*const c_char);

#[cfg(feature = "wasm")]
pub type LogFFICallback = js_sys::Function;

pub struct ButtplugFFILogHandle {
  _runtime: Arc<Runtime>,
}

impl ButtplugFFILogHandle {
  pub fn new(
    runtime: Arc<Runtime>,
    callback: LogFFICallback,
    max_level: &str,
    use_json_formatting: bool,
  ) -> Self {
    #[cfg(not(feature = "wasm"))]
    log_panics::init();
    #[cfg(not(feature = "wasm"))]
    let _runtime_guard = runtime.enter();
    let (sender, mut receiver) = mpsc::channel(256);
    // Spin up the new task. We don't actually get any messages on it until we
    // create the new logger, at which point we'll also drop the old task.
    async_manager::spawn(async move {
      while let Some(msg) = receiver.recv().await {
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
    }.instrument(info_span!("Client Logging Loop")))
    .unwrap();
    //let max_level_cstr: &CStr = unsafe { CStr::from_ptr(max_level_cchar) };
    let filter =
      EnvFilter::from_default_env().add_directive(LevelFilter::from_str(max_level).unwrap().into());
    if use_json_formatting {
      if tracing_subscriber::fmt()
        .json()
        .with_ansi(false)
        .with_writer(ChannelWriter::new(sender))
        .with_env_filter(filter)
        .with_filter_reloading()
        .try_init()
        .is_err() {
          error!("Log handler already set, cannot currently change log levels.");
      }
    } else {
      if tracing_subscriber::fmt()
        .with_ansi(false)
        .with_writer(ChannelWriter::new(sender))
        .with_env_filter(filter)
        .with_filter_reloading()
        .try_init()
        .is_err() {
          error!("Log handler already set, cannot currently change log levels.");
      }
    };
    Self {
      _runtime: runtime,
    }
  }
}