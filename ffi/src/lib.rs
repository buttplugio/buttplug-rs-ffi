#[macro_use]
extern crate tracing;

// Uncomment this once single type filter lands in tracing

#[cfg(not(feature = "wasm"))]
#[macro_use]
extern crate lazy_static;

mod client;
mod device;
#[cfg(not(feature = "wasm"))]
mod export;
#[cfg(feature = "wasm")]
mod export_wasm;
mod logging;
mod pbufs;
mod util;
#[cfg(feature = "wasm")]
mod wasm;
#[cfg(feature = "wasm")]
mod wasm_types;

#[cfg(not(feature = "wasm"))]
pub use export::*;
#[cfg(feature = "wasm")]
pub use export_wasm::*;
pub use logging::*;

#[cfg(feature = "wasm")]
use js_sys;

#[cfg(not(feature = "wasm"))]
type FFICallback = extern "C" fn(*mut libc::c_void, *const u8, u32);
#[cfg(not(feature = "wasm"))]
type FFICallbackContext = *mut libc::c_void;

#[cfg(feature = "wasm")]
type FFICallback = js_sys::Function;
#[cfg(feature = "wasm")]
type FFICallbackContext = u32;

#[derive(Clone, Copy)]
pub struct FFICallbackContextWrapper(FFICallbackContext);

unsafe impl Send for FFICallbackContextWrapper {
}
unsafe impl Sync for FFICallbackContextWrapper {
}
