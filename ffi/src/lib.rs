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
use buttplug::client::ButtplugClientError;

#[cfg(not(feature = "wasm"))]
type FFICallback = extern "C" fn(*mut libc::c_void, *const u8, u32);
#[cfg(not(feature = "wasm"))]
type FFICallbackContext = *mut libc::c_void;

#[repr(C, u8)]
enum FFIResult<T> {
    Ok(T),
    // TODO: make ButtplugClientError repr(C) or something
    Err(ButtplugClientError)
}

type FFIResultCallback<T> = extern "C" fn(*mut libc::c_void, *const FFIResult<T>);

#[repr(C)]
struct DeviceAttribute {
    // TODO
}

#[repr(C, u8)]
enum FFISystemMessage {
    ScanningFinished,
    DeviceAdded {
        name: *const libc::c_char,
        index: u32,
        attributes: *const DeviceAttribute,
        attributes_len: usize
    },
    DeviceRemoved {
        index: u32
    },
    Disconnect
}

type FFISystemCallback = extern "C" fn(*mut libc::c_void, *const FFISystemMessage);

#[cfg(feature = "wasm")]
type FFICallback = js_sys::Function;
#[cfg(feature = "wasm")]
type FFICallbackContext = u32;

#[derive(Clone, Copy)]
pub struct FFICallbackContextWrapper(FFICallbackContext);

unsafe impl Send for FFICallbackContextWrapper {}
unsafe impl Sync for FFICallbackContextWrapper {}
