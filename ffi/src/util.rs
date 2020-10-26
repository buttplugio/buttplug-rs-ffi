use super::{
  pbufs::{
    buttplug_ffi_server_message,
    Endpoint as SerializedEndpoint,
    buttplug_ffi_server_message::ffi_message::Msg as FFIServerMessageType,
    server_message::{ButtplugErrorType, Error as OutgoingError, Msg as ServerMessageType, Ok, MessageAttributeType, MessageAttributes, DeviceAdded, DeviceRemoved, ScanningFinished, Disconnect},
    ButtplugFfiServerMessage as FFIServerMessage, ServerMessage,

  },
  FFICallback,
};
use buttplug::{
  client::{ButtplugClientError, ButtplugClientEvent},
  core::{errors::ButtplugError, messages::ButtplugDeviceMessageType},
  device::Endpoint,
};
use prost::Message;
use std::convert::{TryFrom, TryInto};
use std::error::Error;

fn send_server_message(message: &FFIServerMessage, callback: &Option<FFICallback>) {
  if callback.is_none() {
    return;
  }
  let mut buf = vec![];
  message.encode(&mut buf).unwrap();
  callback.unwrap()(buf.as_ptr(), buf.len() as u32);
}

pub fn return_client_result(
  id: u32,
  result: &Result<(), ButtplugClientError>,
  callback: &Option<FFICallback>,
) {
  match result {
    Ok(_) => return_ok(id, callback),
    Err(error) => return_error(id, error, callback),
  };
}

pub fn return_error(
  id: u32, 
  error: &ButtplugClientError, 
  callback: &Option<FFICallback>
) {
  let error_args = match error {
    ButtplugClientError::ButtplugConnectorError(conn_err) => OutgoingError {
      error_type: ButtplugErrorType::ButtplugConnectorError as i32,
      message: format!("{}", conn_err),
      backtrace: format!("{:?}", conn_err.source()),
    },
    ButtplugClientError::ButtplugError(bp_err) => {
      let error_type = match &bp_err {
        ButtplugError::ButtplugDeviceError(_) => ButtplugErrorType::ButtplugDeviceError,
        ButtplugError::ButtplugPingError(_) => ButtplugErrorType::ButtplugPingError,
        ButtplugError::ButtplugHandshakeError(_) => ButtplugErrorType::ButtplugHandshakeError,
        ButtplugError::ButtplugMessageError(_) => ButtplugErrorType::ButtplugMessageError,
        ButtplugError::ButtplugUnknownError(_) => ButtplugErrorType::ButtplugUnknownError,
      };
      OutgoingError {
        error_type: error_type as i32,
        message: format!("{}", bp_err),
        backtrace: format!("{:?}", bp_err.source()),
      }
    }
  };

  let error_msg = FFIServerMessage {
    id,
    message: Some(buttplug_ffi_server_message::FfiMessage {
      msg: Some(FFIServerMessageType::ServerMessage(ServerMessage {
        msg: Some(ServerMessageType::Error(error_args)),
      })),
    }),
  };
  send_server_message(
    &error_msg,
    callback,
  );
}

pub fn return_ok(id: u32, callback: &Option<FFICallback>) {
  let ok_msg = FFIServerMessage {
    id,
    message: Some(buttplug_ffi_server_message::FfiMessage {
      msg: Some(FFIServerMessageType::ServerMessage(ServerMessage {
        msg: Some(ServerMessageType::Ok(Ok::default())),
      })),
    }),
  };
  send_server_message(
    &ok_msg,
    callback,
  );
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
      ButtplugDeviceMessageType::RSSILevelCmd => Ok(MessageAttributeType::RssiLevelCmd),
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
      Endpoint::RxBLEBattery => SerializedEndpoint::RxBleBattery,
      Endpoint::Generic0 => SerializedEndpoint::Generic0,
      Endpoint::Generic1 => SerializedEndpoint::Generic1,
      Endpoint::Generic2 => SerializedEndpoint::Generic2,
      Endpoint::Generic3 => SerializedEndpoint::Generic3,
      Endpoint::Generic4 => SerializedEndpoint::Generic4,
      Endpoint::Generic5 => SerializedEndpoint::Generic5,
      Endpoint::Generic6 => SerializedEndpoint::Generic6,
      Endpoint::Generic7 => SerializedEndpoint::Generic7,
      Endpoint::Generic8 => SerializedEndpoint::Generic8,
      Endpoint::Generic9 => SerializedEndpoint::Generic9,
      Endpoint::Generic10 => SerializedEndpoint::Generic10,
      Endpoint::Generic11 => SerializedEndpoint::Generic11,
      Endpoint::Generic12 => SerializedEndpoint::Generic12,
      Endpoint::Generic13 => SerializedEndpoint::Generic13,
      Endpoint::Generic14 => SerializedEndpoint::Generic14,
      Endpoint::Generic15 => SerializedEndpoint::Generic15,
      Endpoint::Generic16 => SerializedEndpoint::Generic16,
      Endpoint::Generic17 => SerializedEndpoint::Generic17,
      Endpoint::Generic18 => SerializedEndpoint::Generic18,
      Endpoint::Generic19 => SerializedEndpoint::Generic19,
      Endpoint::Generic20 => SerializedEndpoint::Generic20,
      Endpoint::Generic21 => SerializedEndpoint::Generic21,
      Endpoint::Generic22 => SerializedEndpoint::Generic22,
      Endpoint::Generic23 => SerializedEndpoint::Generic23,
      Endpoint::Generic24 => SerializedEndpoint::Generic24,
      Endpoint::Generic25 => SerializedEndpoint::Generic25,
      Endpoint::Generic26 => SerializedEndpoint::Generic26,
      Endpoint::Generic27 => SerializedEndpoint::Generic27,
      Endpoint::Generic28 => SerializedEndpoint::Generic28,
      Endpoint::Generic29 => SerializedEndpoint::Generic29,
      Endpoint::Generic30 => SerializedEndpoint::Generic30,
      Endpoint::Generic31 => SerializedEndpoint::Generic31,
    }
  }
}

pub fn send_event(event: ButtplugClientEvent, callback: Option<FFICallback>) {
  match event {
    ButtplugClientEvent::DeviceAdded(device) => {
      // TODO This should probably be its own fn but I didn't wanna screw with builder lifetime.
      let mut attrs_vec = vec![];
      info!("{:?}", device.allowed_messages);
      for (message_type, message_attrs) in &device.allowed_messages {
        // If we can't convert, this means we don't support the message type in
        // the FFI layer. Good way to deprecate messages.
        let attr_type: ButtplugDeviceMessageType = if let Ok(attr) = message_type.clone().try_into() {
          attr
        } else {
          continue;
        };
        let step_count = if message_attrs.step_count.is_some() {
          message_attrs.step_count.clone().unwrap()
        } else {
          vec![]
        };
        let serialized_endpoints: Vec<i32> = if message_attrs.endpoints.is_some() {
          message_attrs
            .endpoints
            .clone()
            .unwrap()
            .iter()
            .map(|x| *x as i32)
            .collect()
        } else {
          vec![]
        };
        let attrs = MessageAttributes {
            message_type: attr_type as i32,
            feature_count: message_attrs.feature_count.unwrap_or(0),
            step_count: step_count,
            endpoints: serialized_endpoints,
            max_duration: vec![],
        };
        attrs_vec.push(attrs);
      }
      let device_added_msg = FFIServerMessage {
        id: 0,
        message: Some(buttplug_ffi_server_message::FfiMessage {
          msg: Some(FFIServerMessageType::ServerMessage(ServerMessage {
            msg: Some(ServerMessageType::DeviceAdded(DeviceAdded {
              name: device.name.clone(),
              index: device.index(),
              message_attributes: attrs_vec
            }))
          }))
        })
      };
      send_server_message(
        device_added_msg,
        callback,
      );
    }
    ButtplugClientEvent::DeviceRemoved(device) => {
      let device_removed_msg = FFIServerMessage {
        id: 0,
        message: Some(buttplug_ffi_server_message::FfiMessage {
          msg: Some(FFIServerMessageType::ServerMessage(ServerMessage {
            msg: Some(ServerMessageType::DeviceRemoved(DeviceRemoved {
              index: device.device_index,
            }))
          }))
        })
      };
      send_server_message(
        device_removed_msg,
        callback,
      );
    }
    ButtplugClientEvent::Error(error) => {}
    ButtplugClientEvent::ScanningFinished => {
      let scanning_finished_msg = FFIServerMessage {
        id: 0,
        message: Some(buttplug_ffi_server_message::FfiMessage {
          msg: Some(FFIServerMessageType::ServerMessage(ServerMessage {
            msg: Some(ServerMessageType::ScanningFinished(ScanningFinished {
            }))
          }))
        })
      };
      send_server_message(
        scanning_finished_msg,
        callback,
      );
    }
    ButtplugClientEvent::ServerDisconnect => {
      let disconnect_msg = FFIServerMessage {
        id: 0,
        message: Some(buttplug_ffi_server_message::FfiMessage {
          msg: Some(FFIServerMessageType::ServerMessage(ServerMessage {
            msg: Some(ServerMessageType::Disconnect(Disconnect {
            }))
          }))
        })
      };
      send_server_message(
        disconnect_msg,
        callback,
      );
    }
    ButtplugClientEvent::PingTimeout => {}
  }
}
