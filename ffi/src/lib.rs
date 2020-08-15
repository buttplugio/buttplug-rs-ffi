#[macro_use]
extern crate tracing;

#[allow(non_snake_case)]
#[path = "../target/flatbuffers/flatbuffer_client_generated.rs"]
mod flatbuffer_client_generated;

#[allow(non_snake_case)]
#[path = "../target/flatbuffers/flatbuffer_create_client_generated.rs"]
mod flatbuffer_create_client_generated;

#[allow(non_snake_case)]
#[path = "../target/flatbuffers/flatbuffer_server_generated.rs"]
mod flatbuffer_server_generated;

#[allow(non_snake_case)]
#[path = "../target/flatbuffers/flatbuffer_create_device_generated.rs"]
mod flatbuffer_create_device_generated;

#[allow(non_snake_case)]
#[path = "../target/flatbuffers/flatbuffer_device_generated.rs"]
mod flatbuffer_device_generated;

#[allow(non_snake_case)]
#[path = "../target/flatbuffers/flatbuffer_device_event_generated.rs"]
mod flatbuffer_device_event_generated;

mod client;
mod device;
mod export;
mod util;

pub use export::*;

type FFICallback = extern "C" fn(*const u8, u32);
