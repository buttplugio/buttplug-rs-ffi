use super::{
  FFICallback,
  flatbuffer_server_generated::buttplug_ffi::{ServerMessage, ServerMessageArgs, ServerMessageType, DeviceAdded, DeviceAddedArgs, Ok, OkArgs},
};
use flatbuffers::{FlatBufferBuilder, WIPOffset, UnionWIPOffset};
use buttplug::client::ButtplugClientEvent;

fn send_server_message(mut builder: FlatBufferBuilder, id: u32, msg_type: ServerMessageType, union: WIPOffset<UnionWIPOffset>, callback: FFICallback) {
  let server_msg = ServerMessage::create(&mut builder, &ServerMessageArgs {
    id: id,
    message_type: msg_type,
    message: Some(union),
  });
  builder.finish(server_msg, None);
  let msg = builder.finished_data();
  callback(msg.as_ptr(), msg.len() as u32);
}

pub fn send_ok_message(id: u32, callback: FFICallback) {
  let mut builder = FlatBufferBuilder::new_with_capacity(1024);
  let ok_msg = Ok::create(&mut builder, &OkArgs {});
  send_server_message(builder, id, ServerMessageType::Ok, ok_msg.as_union_value(), callback);
}

pub fn send_event(event: ButtplugClientEvent, callback: FFICallback) {
  let mut builder = FlatBufferBuilder::new_with_capacity(1024);
  match event {
    ButtplugClientEvent::DeviceAdded(device) => {
      let device_name = builder.create_string(&device.name);
      let device_added_msg = DeviceAdded::create(&mut builder, &DeviceAddedArgs {
        name: Some(device_name)
      });
      send_server_message(builder, 0, ServerMessageType::DeviceAdded, device_added_msg.as_union_value(), callback);
    },
    ButtplugClientEvent::DeviceRemoved(device) => {

    },
    ButtplugClientEvent::Error(error) => {

    },
    ButtplugClientEvent::Log(log_level, log_msg) => {

    },
    ButtplugClientEvent::ScanningFinished => {

    },
    ButtplugClientEvent::ServerDisconnect => {

    },
    ButtplugClientEvent::PingTimeout => {

    }
  }
}