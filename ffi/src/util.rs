use super::{
  FFICallback,
  flatbuffer_server_generated::buttplug_ffi::{ServerMessage, ServerMessageArgs, ServerMessageType, DeviceAdded, 
    DeviceAddedArgs, Ok, OkArgs, MessageAttributes as SerializedMessageAttributes, MessageAttributeType, MessageAttributesArgs,
    Error as FlatBufBPError, ErrorArgs, ButtplugErrorType
  },
  flatbuffer_enums_generated::Endpoint as SerializedEndpoint,
};
use flatbuffers::{FlatBufferBuilder, WIPOffset, UnionWIPOffset};
use buttplug::{
  client::{ButtplugClientEvent, ButtplugClientError},
  core::{errors::ButtplugError, messages::ButtplugDeviceMessageType},
  device::Endpoint,
};
use std::convert::{TryFrom, TryInto};
use std::error::Error;

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

pub fn return_client_result(result: Result<(), ButtplugClientError>, id: u32, callback: FFICallback) {
  match result {
    Ok(_) => return_ok(id, callback),
    Err(error) => return_error(id, error, callback)
  };
}

pub fn return_error(id: u32, error: ButtplugClientError, callback: FFICallback) {
  let mut builder = FlatBufferBuilder::new_with_capacity(1024);
  let error_args = match error {
    ButtplugClientError::ButtplugConnectorError(conn_err) => {
      ErrorArgs {
        error_type: ButtplugErrorType::ButtplugConnectorError,
        message: Some(builder.create_string(&format!("{}", conn_err))),
        backtrace: Some(builder.create_string(&format!("{:?}", conn_err.source())))
      }
    }
    ButtplugClientError::ButtplugError(bp_err) => {
      let error_type = match &bp_err {
        ButtplugError::ButtplugDeviceError(_) => ButtplugErrorType::ButtplugDeviceError,
        ButtplugError::ButtplugPingError(_) => ButtplugErrorType::ButtplugPingError,
        ButtplugError::ButtplugHandshakeError(_) => ButtplugErrorType::ButtplugHandshakeError,
        ButtplugError::ButtplugMessageError(_) => ButtplugErrorType::ButtplugMessageError,
        ButtplugError::ButtplugUnknownError(_) => ButtplugErrorType::ButtplugUnknownError,
      };
      ErrorArgs {
        error_type,
        message: Some(builder.create_string(&format!("{}", bp_err))),
        backtrace: Some(builder.create_string(&format!("{:?}", bp_err.source())))
      }
    }
  };

  let error_msg = FlatBufBPError::create(&mut builder, &error_args);
  send_server_message(builder, id, ServerMessageType::Error, error_msg.as_union_value(), callback);
}

pub fn return_ok(id: u32, callback: FFICallback) {
  let mut builder = FlatBufferBuilder::new_with_capacity(1024);
  let ok_msg = Ok::create(&mut builder, &OkArgs {});
  send_server_message(builder, id, ServerMessageType::Ok, ok_msg.as_union_value(), callback);
}

// TODO Should probably make this a macro
impl TryFrom<ButtplugDeviceMessageType> for MessageAttributeType {
  type Error = ();

  fn try_from(msg_type: ButtplugDeviceMessageType) -> Result<Self, ()> {
    match msg_type {
      ButtplugDeviceMessageType::VibrateCmd => Ok(MessageAttributeType::VibrateCmd),
      ButtplugDeviceMessageType::LinearCmd => Ok(MessageAttributeType::LinearCmd),
      ButtplugDeviceMessageType::RotateCmd => Ok(MessageAttributeType::RotateCmd),
      ButtplugDeviceMessageType::StopDeviceCmd => Ok(MessageAttributeType::StopDeviceCmd),
      ButtplugDeviceMessageType::RawReadCmd => Ok(MessageAttributeType::RawReadCmd),
      ButtplugDeviceMessageType::RawWriteCmd => Ok(MessageAttributeType::RawWriteCmd),
      ButtplugDeviceMessageType::RSSILevelCmd => Ok(MessageAttributeType::RSSILevelCmd),
      ButtplugDeviceMessageType::BatteryLevelCmd => Ok(MessageAttributeType::BatteryLevelCmd),
      ButtplugDeviceMessageType::RawSubscribeCmd => Ok(MessageAttributeType::RawSubscribeCmd),
      ButtplugDeviceMessageType::RawUnsubscribeCmd => Ok(MessageAttributeType::RawUnsubscribeCmd),
      _ => {
        error!("Command not convertible: {:?}", msg_type);
        Err(())
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
        // If we can't convert, this means we don't support the message type in
        // the FFI layer. Good way to deprecate messages.
        let attr_type = if let Ok(attr) = message_type.clone().try_into() {
          attr
        } else {
          continue;
        };
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
          message_type: attr_type,
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