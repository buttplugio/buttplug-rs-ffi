use super::{
  pbufs::{
    buttplug_ffi_server_message,
    buttplug_ffi_server_message::ffi_message::Msg as FFIServerMessageType,
    device_event::{BatteryLevelReading, Msg as DeviceEventType, RawReading, RssiLevelReading},
    device_message::{
      ffi_message::Msg as DeviceMessageType,
      BatteryLevelCmd,
      LinearCmd,
      RawReadCmd,
      RawSubscribeCmd,
      RawUnsubscribeCmd,
      RawWriteCmd,
      RotateCmd,
      RssiLevelCmd,
      StopDeviceCmd,
      VibrateCmd,
    },
    ButtplugFfiServerMessage as FFIServerMessage,
    DeviceEvent,
    DeviceMessage,
    Endpoint as SerializedEndpoint,
  },
  util::{return_client_result, return_error, send_server_message},
  FFICallback,
  FFICallbackContextWrapper,
};
use buttplug::{
  client::device::{ButtplugClientDevice, LinearCommand, RotateCommand, VibrateCommand},
  util::async_manager,
};
use prost::Message;
use std::{collections::HashMap, iter::FromIterator, sync::Arc};
#[cfg(not(feature = "wasm"))]
use tokio::runtime::Runtime;

pub struct ButtplugFFIDevice {
  device: Arc<ButtplugClientDevice>,
  #[cfg(not(feature = "wasm"))]
  runtime: Arc<Runtime>,
}

impl ButtplugFFIDevice {
  #[cfg(not(feature = "wasm"))]
  pub fn new(runtime: Arc<Runtime>, device: Arc<ButtplugClientDevice>) -> Self {
    Self { runtime, device }
  }

  #[cfg(feature = "wasm")]
  pub fn new(device: Arc<ButtplugClientDevice>) -> Self {
    Self { device: device }
  }

  pub fn parse_message(
    &self,
    msg_ptr: &[u8],
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    #[cfg(not(feature = "wasm"))]
    let _guard = self.runtime.enter();
    let device_msg = DeviceMessage::decode(msg_ptr).unwrap();
    let msg_id = device_msg.id;
    match device_msg.message.unwrap().msg.unwrap() {
      DeviceMessageType::VibrateCmd(vibrate_msg) => {
        self.send_vibrate_cmd(msg_id, vibrate_msg, callback, callback_context)
      }
      DeviceMessageType::RotateCmd(rotate_msg) => {
        self.send_rotate_cmd(msg_id, rotate_msg, callback, callback_context)
      }
      DeviceMessageType::LinearCmd(linear_msg) => {
        self.send_linear_cmd(msg_id, linear_msg, callback, callback_context)
      }
      DeviceMessageType::StopDeviceCmd(stop_msg) => {
        self.send_stop_device_cmd(msg_id, stop_msg, callback, callback_context)
      }
      DeviceMessageType::RawReadCmd(raw_read_msg) => {
        self.send_raw_read_cmd(msg_id, raw_read_msg, callback, callback_context)
      }
      DeviceMessageType::RawWriteCmd(raw_write_msg) => {
        self.send_raw_write_cmd(msg_id, raw_write_msg, callback, callback_context)
      }
      DeviceMessageType::RawSubscribeCmd(raw_sub_msg) => {
        self.send_raw_subscribe_cmd(msg_id, raw_sub_msg, callback, callback_context)
      }
      DeviceMessageType::RawUnsubscribeCmd(raw_unsub_msg) => {
        self.send_raw_unsubscribe_cmd(msg_id, raw_unsub_msg, callback, callback_context)
      }
      DeviceMessageType::BatteryLevelCmd(battery_msg) => {
        self.send_battery_level_cmd(msg_id, battery_msg, callback, callback_context)
      }
      DeviceMessageType::RssiLevelCmd(rssi_msg) => {
        self.send_rssi_level_cmd(msg_id, rssi_msg, callback, callback_context)
      }
    };
  }

  fn send_vibrate_cmd(
    &self,
    id: u32,
    msg: VibrateCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let params =
      VibrateCommand::SpeedMap(msg.speeds.into_iter().map(|x| (x.index, x.speed)).collect());
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(
        id,
        &device.vibrate(params).await,
        &callback,
        callback_context,
      );
    });
  }

  fn send_rotate_cmd(
    &self,
    id: u32,
    rotate_msg: RotateCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let params = RotateCommand::RotateMap(HashMap::from_iter(
      rotate_msg
        .rotations
        .into_iter()
        .map(|x| (x.index, (x.speed, x.clockwise))),
    ));
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(
        id,
        &device.rotate(params).await,
        &callback,
        callback_context,
      );
    });
  }

  fn send_linear_cmd(
    &self,
    id: u32,
    linear_msg: LinearCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let params = LinearCommand::LinearMap(HashMap::from_iter(
      linear_msg
        .movements
        .into_iter()
        .map(|x| (x.index, (x.duration, x.position))),
    ));
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(
        id,
        &device.linear(params).await,
        &callback,
        callback_context,
      );
    });
  }

  fn send_stop_device_cmd(
    &self,
    id: u32,
    _msg: StopDeviceCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(id, &device.stop().await, &callback, callback_context);
    });
  }

  fn send_raw_read_cmd(
    &self,
    id: u32,
    msg: RawReadCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let device = self.device.clone();
    async_manager::spawn(async move {
      match device
        .raw_read(
          SerializedEndpoint::from_i32(msg.endpoint).unwrap().into(),
          msg.expected_length,
          msg.timeout,
        )
        .await
      {
        Ok(raw_reading) => {
          let raw_reading_msg = RawReading {
            index: device.index(),
            endpoint: msg.endpoint,
            data: raw_reading,
          };
          let output_msg = FFIServerMessage {
            id,
            message: Some(buttplug_ffi_server_message::FfiMessage {
              msg: Some(FFIServerMessageType::DeviceEvent(DeviceEvent {
                msg: Some(DeviceEventType::RawReading(raw_reading_msg)),
              })),
            }),
          };
          send_server_message(&output_msg, &callback, callback_context);
        }
        Err(e) => {
          return_error(id, &e, &callback, callback_context);
        }
      }
    });
  }

  fn send_raw_write_cmd(
    &self,
    id: u32,
    msg: RawWriteCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(
        id,
        &device
          .raw_write(
            SerializedEndpoint::from_i32(msg.endpoint).unwrap().into(),
            msg.data,
            msg.write_with_response,
          )
          .await,
        &callback,
        callback_context,
      );
    });
  }

  fn send_raw_subscribe_cmd(
    &self,
    id: u32,
    msg: RawSubscribeCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(
        id,
        &device
          .raw_subscribe(SerializedEndpoint::from_i32(msg.endpoint).unwrap().into())
          .await,
        &callback,
        callback_context,
      );
    });
  }

  fn send_raw_unsubscribe_cmd(
    &self,
    id: u32,
    msg: RawUnsubscribeCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(
        id,
        &device
          .raw_unsubscribe(SerializedEndpoint::from_i32(msg.endpoint).unwrap().into())
          .await,
        &callback,
        callback_context,
      );
    });
  }

  fn send_battery_level_cmd(
    &self,
    id: u32,
    _msg: BatteryLevelCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let device = self.device.clone();
    async_manager::spawn(async move {
      match device.battery_level().await {
        Ok(battery_reading) => {
          let battery_reading_msg = BatteryLevelReading {
            index: device.index(),
            reading: battery_reading,
          };
          let output_msg = FFIServerMessage {
            id,
            message: Some(buttplug_ffi_server_message::FfiMessage {
              msg: Some(FFIServerMessageType::DeviceEvent(DeviceEvent {
                msg: Some(DeviceEventType::BatteryLevelReading(battery_reading_msg)),
              })),
            }),
          };
          send_server_message(&output_msg, &callback, callback_context);
        }
        Err(e) => {
          return_error(id, &e, &callback, callback_context);
        }
      }
    });
  }

  fn send_rssi_level_cmd(
    &self,
    id: u32,
    _msg: RssiLevelCmd,
    callback: FFICallback,
    callback_context: FFICallbackContextWrapper,
  ) {
    let device = self.device.clone();
    async_manager::spawn(async move {
      match device.rssi_level().await {
        Ok(rssi_level) => {
          let rssi_reading_msg = RssiLevelReading {
            index: device.index(),
            reading: rssi_level,
          };
          let output_msg = FFIServerMessage {
            id,
            message: Some(buttplug_ffi_server_message::FfiMessage {
              msg: Some(FFIServerMessageType::DeviceEvent(DeviceEvent {
                msg: Some(DeviceEventType::RssiLevelReading(rssi_reading_msg)),
              })),
            }),
          };
          send_server_message(&output_msg, &callback, callback_context);
        }
        Err(e) => {
          return_error(id, &e, &callback, callback_context);
        }
      }
    });
  }
}
