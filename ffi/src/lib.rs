#[macro_use]
extern crate tracing;

// Uncomment this once single type filter lands in tracing

#[cfg(not(feature = "wasm-backend"))]
#[macro_use]
extern crate lazy_static;

mod client;
mod device;
#[cfg(not(feature = "wasm-backend"))]
mod export;

#[cfg(feature = "wasm-backend")]
pub use export_wasm::*;

#[cfg(feature = "wasm-backend")]
mod wasm_types;
#[cfg(feature = "wasm-backend")]
mod export_wasm;
mod logging;
mod pbufs;
mod util;
#[cfg(feature = "wasm-backend")]
mod wasm;

//pub use logging::*;

#[cfg(feature = "wasm-backend")]
use js_sys;

#[cfg(not(feature = "wasm-backend"))]
type FFICallback = extern "C" fn(*mut libc::c_void, *const u8, u32);
#[cfg(not(feature = "wasm-backend"))]
type FFICallbackContext = *mut libc::c_void;

#[cfg(feature = "wasm-backend")]
type FFICallback = js_sys::Function;
#[cfg(feature = "wasm-backend")]
type FFICallbackContext = u32;

#[derive(Clone)]
pub struct FFICallbackContextWrapper(FFICallbackContext);

unsafe impl Send for FFICallbackContextWrapper {
}
unsafe impl Sync for FFICallbackContextWrapper {
}
