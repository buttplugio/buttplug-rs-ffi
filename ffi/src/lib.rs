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

mod client;
mod device;
mod export;
mod util;

pub use export::*;

use std::slice;
use flatbuffer_client_generated::buttplug_ffi::{ClientMessage, ClientMessageType, ConnectLocal, ConnectWebsocket, get_root_as_client_message};
use flatbuffer_create_client_generated::buttplug_ffi::get_root_as_create_client;
use flatbuffer_server_generated::buttplug_ffi::{Ok, OkArgs, DeviceAdded, DeviceAddedArgs, ServerMessage, ServerMessageArgs, ServerMessageType, get_root_as_server_message};
use std::sync::Arc;
use flatbuffers::{FlatBufferBuilder, WIPOffset, UnionWIPOffset};
use async_std::sync::RwLock;
use futures::StreamExt;

type FFICallback = extern "C" fn(*const u8, u32);
