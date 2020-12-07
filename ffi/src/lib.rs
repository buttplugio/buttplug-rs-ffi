#[macro_use]
extern crate tracing;

// Uncomment this once single type filter lands in tracing
/*
#[macro_use]
extern crate lazy_static;
*/

mod client;
mod device;
#[cfg(not(feature = "wasm"))]
mod export;
mod util;
mod pbufs;
mod logging;
#[cfg(feature = "wasm")]
mod wasm_types;
#[cfg(feature = "wasm")]
mod export_wasm;
#[cfg(feature = "wasm")]
mod wasm;

#[cfg(not(feature = "wasm"))]
pub use export::*;
#[cfg(feature = "wasm")]
pub use export_wasm::*;
pub use logging::*;

#[cfg(feature = "wasm")]
use js_sys;

#[cfg(not(feature = "wasm"))]
type FFICallback = extern "C" fn(*const u8, u32);
#[cfg(feature = "wasm")]
type FFICallback = js_sys::Function;
