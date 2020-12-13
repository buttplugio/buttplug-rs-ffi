use super::{
  pbufs::{
    buttplug_ffi_server_message,
    buttplug_ffi_server_message::ffi_message::Msg as FFIServerMessageType,
    device_message::{VibrateCmd, RotateCmd, LinearCmd, StopDeviceCmd, RawReadCmd, RawWriteCmd, RawSubscribeCmd, RawUnsubscribeCmd, BatteryLevelCmd, RssiLevelCmd, ffi_message::Msg as DeviceMessageType},
    ButtplugFfiServerMessage as FFIServerMessage,
    device_event::{RawReading, BatteryLevelReading, RssiLevelReading, Msg as DeviceEventType},
    DeviceEvent,
    DeviceMessage, Endpoint as SerializedEndpoint,
  },
  util::{return_client_result, send_server_message, return_error},
  FFICallback,
};
use buttplug::{
  client::device::{ButtplugClientDevice, LinearCommand, RotateCommand, VibrateCommand},
  util::async_manager,
};
use prost::Message;
use std::{sync::Arc, collections::HashMap, iter::FromIterator};

pub struct ButtplugFFIDevice {
  callback: Option<FFICallback>,
  device: Arc<ButtplugClientDevice>,
}

impl ButtplugFFIDevice {
  pub fn new(device: ButtplugClientDevice, callback: Option<FFICallback>) -> Self {
    Self {
      device: Arc::new(device),
      callback,
    }
  }

  pub fn parse_message(&self, msg_ptr: &[u8]) {
    let device_msg = DeviceMessage::decode(msg_ptr).unwrap();
    let msg_id = device_msg.id;
    match device_msg.message.unwrap().msg.unwrap() {
      DeviceMessageType::VibrateCmd(vibrate_msg) => self.send_vibrate_cmd(msg_id, vibrate_msg),
      DeviceMessageType::RotateCmd(rotate_msg) => self.send_rotate_cmd(msg_id, rotate_msg),
      DeviceMessageType::LinearCmd(linear_msg) => self.send_linear_cmd(msg_id, linear_msg),
      DeviceMessageType::StopDeviceCmd(stop_msg) => self.send_stop_device_cmd(msg_id, stop_msg),
      DeviceMessageType::RawReadCmd(raw_read_msg) => self.send_raw_read_cmd(msg_id, raw_read_msg),
      DeviceMessageType::RawWriteCmd(raw_write_msg) => self.send_raw_write_cmd(msg_id, raw_write_msg),
      DeviceMessageType::RawSubscribeCmd(raw_sub_msg) => self.send_raw_subscribe_cmd(msg_id, raw_sub_msg),
      DeviceMessageType::RawUnsubscribeCmd(raw_unsub_msg) => self.send_raw_unsubscribe_cmd(msg_id, raw_unsub_msg),
      DeviceMessageType::BatteryLevelCmd(battery_msg) => self.send_battery_level_cmd(msg_id, battery_msg),
      DeviceMessageType::RssiLevelCmd(rssi_msg) => self.send_rssi_level_cmd(msg_id, rssi_msg),
    };
  }

  pub fn send_vibrate_cmd(&self, id: u32, msg: VibrateCmd) {
    let callback = self.callback.clone();
    let params = VibrateCommand::SpeedMap(
      msg
        .speeds
        .into_iter()
        .map(|x| (x.index, x.speed))
        .collect(),
    );
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(id, &device.vibrate(params).await, &callback);
    })
    .unwrap();
  }

  pub fn send_rotate_cmd(&self, id: u32, rotate_msg: RotateCmd) {
    let callback = self.callback.clone();
    let params = RotateCommand::RotateMap(
      HashMap::from_iter(rotate_msg
        .rotations
        .into_iter()
        .map(|x| (x.index, (x.speed, x.clockwise))))
    );
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(id, &device.rotate(params).await, &callback);
    })
    .unwrap();
  }

  pub fn send_linear_cmd(&self, id: u32, linear_msg: LinearCmd) {
    let callback = self.callback.clone();
    let params = LinearCommand::LinearMap(
      HashMap::from_iter(
      linear_msg
        .movements
        .into_iter()
        .map(|x| (x.index, (x.duration, x.position))))
    );
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(id, &device.linear(params).await, &callback);
    })
    .unwrap();
  }

  pub fn send_stop_device_cmd(&self, id: u32, _msg: StopDeviceCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(id, &device.stop().await, &callback);
    })
    .unwrap();
  }

  pub fn send_raw_read_cmd(&self, id: u32, msg: RawReadCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      match device.raw_read(SerializedEndpoint::from_i32(msg.endpoint).unwrap().into(), msg.expected_length, msg.timeout).await {
        Ok(raw_reading) => {
          let raw_reading_msg = RawReading {
            index: device.index(),
            endpoint: msg.endpoint,
            data: raw_reading
          };
          let output_msg = FFIServerMessage {
            id,
            message: Some(buttplug_ffi_server_message::FfiMessage {
              msg: Some(FFIServerMessageType::DeviceEvent(DeviceEvent {
                msg: Some(DeviceEventType::RawReading(raw_reading_msg)),
              })),
            }),
          };
          send_server_message(&output_msg, &callback);
        }
        Err(e) => {
          return_error(id, &e, &callback);
        }
      }
    })
    .unwrap();
  }

  pub fn send_raw_write_cmd(&self, id: u32, msg: RawWriteCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(id, &device.raw_write(SerializedEndpoint::from_i32(msg.endpoint).unwrap().into(), msg.data, msg.write_with_response).await, &callback);
    })
    .unwrap();
  }

  pub fn send_raw_subscribe_cmd(&self, id: u32, msg: RawSubscribeCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(id, &device.raw_subscribe(SerializedEndpoint::from_i32(msg.endpoint).unwrap().into()).await, &callback);
    })
    .unwrap();
  }

  pub fn send_raw_unsubscribe_cmd(&self, id: u32, msg: RawUnsubscribeCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(id, &device.raw_unsubscribe(SerializedEndpoint::from_i32(msg.endpoint).unwrap().into()).await, &callback);
    })
    .unwrap();
  }

  pub fn send_battery_level_cmd(&self, id: u32, _msg: BatteryLevelCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      match device.battery_level().await {
        Ok(battery_reading) => {
          let battery_reading_msg = BatteryLevelReading {
            index: device.index(),
            reading: battery_reading
          };
          let output_msg = FFIServerMessage {
            id,
            message: Some(buttplug_ffi_server_message::FfiMessage {
              msg: Some(FFIServerMessageType::DeviceEvent(DeviceEvent {
                msg: Some(DeviceEventType::BatteryLevelReading(battery_reading_msg)),
              })),
            }),
          };
          send_server_message(&output_msg, &callback);
        }
        Err(e) => {
          return_error(id, &e, &callback);
        }
      }
    })
    .unwrap();
  }

  pub fn send_rssi_level_cmd(&self, id: u32, _msg: RssiLevelCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      match device.rssi_level().await {
        Ok(rssi_level) => {
          let rssi_reading_msg = RssiLevelReading {
            index: device.index(),
            reading: rssi_level
          };
          let output_msg = FFIServerMessage {
            id,
            message: Some(buttplug_ffi_server_message::FfiMessage {
              msg: Some(FFIServerMessageType::DeviceEvent(DeviceEvent {
                msg: Some(DeviceEventType::RssiLevelReading(rssi_reading_msg)),
              })),
            }),
          };
          send_server_message(&output_msg, &callback);
        }
        Err(e) => {
          return_error(id, &e, &callback);
        }
      }
    })
    .unwrap();
  }
}

impl Drop for ButtplugFFIDevice {
  fn drop(&mut self) {
    info!("DROPPED RUST FFI DEVICE");
  }
}
