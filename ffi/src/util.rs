use super::{
  FFICallback,
  flatbuffer_server_generated::buttplug_ffi::{ServerMessage, ServerMessageArgs, ServerMessageType, DeviceAdded, 
    DeviceAddedArgs, Ok, OkArgs, MessageAttributes as SerializedMessageAttributes, MessageAttributeType, MessageAttributesArgs,
  },
  flatbuffer_enums_generated::Endpoint as SerializedEndpoint,
};
use flatbuffers::{FlatBufferBuilder, WIPOffset, UnionWIPOffset};
use buttplug::{
  client::ButtplugClientEvent,
  core::messages::{MessageAttributesMap, MessageAttributes, ButtplugDeviceMessageType},
  device::Endpoint,
};

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

// TODO Should probably make this a macro
impl From<ButtplugDeviceMessageType> for MessageAttributeType {
  fn from(msg_type: ButtplugDeviceMessageType) -> Self {
    match msg_type {
      ButtplugDeviceMessageType::VibrateCmd => MessageAttributeType::VibrateCmd,
      ButtplugDeviceMessageType::LinearCmd => MessageAttributeType::LinearCmd,
      ButtplugDeviceMessageType::RotateCmd => MessageAttributeType::RotateCmd,
      ButtplugDeviceMessageType::StopDeviceCmd => MessageAttributeType::StopDeviceCmd,
      ButtplugDeviceMessageType::RawReadCmd => MessageAttributeType::RawReadCmd,
      ButtplugDeviceMessageType::RawWriteCmd => MessageAttributeType::RawWriteCmd,
      ButtplugDeviceMessageType::RSSILevelCmd => MessageAttributeType::RSSILevelCmd,
      ButtplugDeviceMessageType::BatteryLevelCmd => MessageAttributeType::BatteryLevelCmd,
      ButtplugDeviceMessageType::RawSubscribeCmd => MessageAttributeType::RawSubscribeCmd,
      ButtplugDeviceMessageType::RawUnsubscribeCmd => MessageAttributeType::RawUnsubscribeCmd,
      _ => {
        panic!("Command not convertible!");
      }
    }
  }
}

// TODO Should probably make this a macro
impl From<&Endpoint> for SerializedEndpoint {
  fn from(endpoint_type: &Endpoint) -> Self {
    match endpoint_type {
      Endpoint::Rx => SerializedEndpoint::Rx,
      Endpoint::RxAccel => SerializedEndpoint::RxAccel,
      Endpoint::RxPressure => SerializedEndpoint::RxPressure,
      Endpoint::RxTouch => SerializedEndpoint::RxTouch,
      Endpoint::Tx => SerializedEndpoint::Tx,
      Endpoint::TxMode => SerializedEndpoint::TxMode,
      Endpoint::TxShock => SerializedEndpoint::TxShock,
      Endpoint::TxVendorControl => SerializedEndpoint::TxVendorControl,
      Endpoint::TxVibrate => SerializedEndpoint::TxVibrate,
      Endpoint::Whitelist => SerializedEndpoint::Whitelist,
      Endpoint::Command => SerializedEndpoint::Command,
      Endpoint::Firmware => SerializedEndpoint::Firmware,
    }
  }
}

pub fn send_event(event: ButtplugClientEvent, callback: FFICallback) {
  let mut builder = FlatBufferBuilder::new_with_capacity(1024);
  match event {
    ButtplugClientEvent::DeviceAdded(device) => {

      // TODO This should probably be its own fn but I didn't wanna screw with builder lifetime.
      let mut attrs_vec = vec!();
      info!("{:?}", device.allowed_messages);
      for (message_type, message_attrs) in &device.allowed_messages {
        let step_count = if message_attrs.step_count.is_some() {
            Some(builder.create_vector(&message_attrs.step_count.clone().unwrap()))
          } else {
            None
          };
        let serialized_endpoints: Vec<SerializedEndpoint> = if message_attrs.endpoints.is_some() {
          message_attrs.endpoints.clone().unwrap().iter().map(|x| x.into()).collect()
        } else {
          vec![]
        };
        let endpoints = builder.create_vector(&serialized_endpoints);
        let attrs = SerializedMessageAttributes::create(&mut builder, &MessageAttributesArgs {
          message_type: message_type.clone().into(),
          feature_count: message_attrs.feature_count.unwrap_or(0),
          step_count: step_count,
          endpoints: Some(endpoints),
          max_duration: None,
        });
        attrs_vec.push(attrs);
      }
      let device_attributes = builder.create_vector(&attrs_vec);

      let device_name = builder.create_string(&device.name);
      // let device_attributes = builder.create_vector(&serialize_message_attributes(&builder, &device.allowed_messages));
      let device_added_msg = DeviceAdded::create(&mut builder, &DeviceAddedArgs {
        name: Some(device_name),
        index: device.index(),
        attributes: Some(device_attributes)
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