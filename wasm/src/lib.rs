//! Buttplug Rust FFI for WASM Support
//!
//! All rust methods here are named as they are to show up in the WASM output,
//! so as to make the rustdoc generation for APIs look as similar as possible.

#[macro_use]
extern crate tracing;

mod buttplug_client;
mod buttplug_client_device;
mod event_manager;
mod utils;
mod webbluetooth_device;
mod webbluetooth_manager;
mod websocket_client_connector;
mod errors;

pub use buttplug_client::ButtplugClient;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen(start)]
pub fn start() -> Result<(), JsValue> {
  // print pretty errors in wasm https://github.com/rustwasm/console_error_panic_hook
  // This is not needed for tracing_wasm to work, but it is a common tool for getting proper error line numbers for panics.
  utils::set_panic_hook();

  // Add this line:
  tracing_wasm::set_as_global_default();

  Ok(())
}
