#[cfg(feature = "wasm-backend")]
use super::wasm_types::c_char;
use super::{FFICallbackContext, FFICallbackContextWrapper};
use buttplug::{util::async_manager, util::logging::ChannelWriter};
#[cfg(not(feature = "wasm-backend"))]
use libc::c_char;
use std::{ffi::CString, str::FromStr, sync::Arc};
use tokio::{runtime::Runtime, sync::mpsc};
#[cfg(feature = "wasm-backend")]
use tracing_wasm::WASMLayer;
#[cfg(feature = "wasm-backend")]
use wasm_bindgen::JsValue;
//use tracing::{Level};
use tracing::Instrument;
use tracing_subscriber::filter::{LevelFilter, EnvFilter};
#[cfg(not(feature="wasm-backend"))]
use log_panics;


#[cfg(not(feature = "wasm-backend"))]
pub type LogFFICallback = extern "C" fn(FFICallbackContext, *const c_char);

#[cfg(feature = "wasm-backend")]
pub type LogFFICallback = js_sys::Function;

pub struct ButtplugFFILogHandle {
  #[cfg(not(feature = "wasm-backend"))]
  _runtime: Arc<Runtime>,
}

impl ButtplugFFILogHandle {
  pub fn new(
    #[cfg(not(feature = "wasm-backend"))]
    runtime: Arc<Runtime>,
    callback: LogFFICallback,
    ctx: FFICallbackContext,
    max_level: &str,
    use_json_formatting: bool,
  ) -> Self {
    #[cfg(not(feature = "wasm-backend"))]
    log_panics::init();
    #[cfg(not(feature = "wasm-backend"))]
    let _runtime_guard = runtime.enter();
    let wrapper = FFICallbackContextWrapper(ctx);
    let (sender, mut receiver) = mpsc::channel(256);
    // Spin up the new task. We don't actually get any messages on it until we
    // create the new logger, at which point we'll also drop the old task.

    async_manager::spawn(
      async move {
        while let Some(msg) = receiver.recv().await {
          #[cfg(not(feature = "wasm-backend"))]
          {
            let str = CString::new(msg).expect("Issue with conversion of log message.");
            callback(wrapper.0, str.as_ptr());
          }
          #[cfg(feature = "wasm-backend")]
          {
            let this = JsValue::null();
            let str = String::from_utf8(msg).expect("Found invalid UTF-8");
            callback.clone().call1(&this, &JsValue::from_str(&str));
          }
        }
      }
      .instrument(info_span!("Client Logging Loop")),
    );
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
        .is_err()
      {
        error!("Log handler already set, cannot currently change log levels.");
      }
    } else if tracing_subscriber::fmt()
      .with_ansi(false)
      .with_writer(ChannelWriter::new(sender))
      .with_env_filter(filter)
      .with_filter_reloading()
      .try_init()
      .is_err()
    {
      error!("Log handler already set, cannot currently change log levels.");
    };
    Self {
      #[cfg(not(feature = "wasm-backend"))]
      _runtime: runtime,
    }
  }
}
