#[macro_use]
extern crate tracing;

#[allow(non_snake_case)]
#[allow(dead_code)]
#[allow(unused_imports)]
#[path = "../target/flatbuffers/flatbuffer_client_generated.rs"]
mod flatbuffer_client_generated;

#[allow(non_snake_case)]
#[allow(dead_code)]
#[allow(unused_imports)]
#[path = "../target/flatbuffers/flatbuffer_create_client_generated.rs"]
mod flatbuffer_create_client_generated;

#[allow(non_snake_case)]
#[allow(dead_code)]
#[allow(unused_imports)]
#[path = "../target/flatbuffers/flatbuffer_server_generated.rs"]
mod flatbuffer_server_generated;

#[allow(non_snake_case)]
#[allow(dead_code)]
#[allow(unused_imports)]
#[path = "../target/flatbuffers/flatbuffer_create_device_generated.rs"]
mod flatbuffer_create_device_generated;

#[allow(non_snake_case)]
#[allow(dead_code)]
#[allow(unused_imports)]
#[path = "../target/flatbuffers/flatbuffer_device_generated.rs"]
mod flatbuffer_device_generated;

#[allow(non_snake_case)]
#[allow(dead_code)]
#[allow(unused_imports)]
#[path = "../target/flatbuffers/flatbuffer_device_event_generated.rs"]
mod flatbuffer_device_event_generated;

#[allow(non_snake_case)]
#[allow(dead_code)]
#[allow(unused_imports)]
#[path = "../target/flatbuffers/flatbuffer_enums_generated.rs"]
mod flatbuffer_enums_generated;

mod client;
mod device;
mod export;
mod util;
mod pbufs;

pub use export::*;

type FFICallback = extern "C" fn(*const u8, u32);
