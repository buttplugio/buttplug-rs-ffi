use super::{
  pbufs::{
    buttplug_ffi_client_message::ffi_message::Msg as FFIClientMessageType,
    buttplug_ffi_server_message,
    buttplug_ffi_server_message::ffi_message::Msg as FFIServerMessageType,
    device_message::{VibrateCmd, RotateCmd, LinearCmd, StopDeviceCmd, RawReadCmd, RawWriteCmd, RawSubscribeCmd, RawUnsubscribeCmd, BatteryLevelCmd, RssiLevelCmd, Msg as DeviceMessageType},
    server_message::{
      ButtplugErrorType, Error as OutgoingError, MessageAttributeType, Msg as ServerMessageType, Ok,
    },
    ButtplugFfiClientMessage as FFIClientMessage, ButtplugFfiServerMessage as FFIServerMessage,
    DeviceMessage, Endpoint as SerializedEndpoint, ServerMessage,
  },
  util::return_client_result,
  FFICallback,
};
use buttplug::{
  client::device::{ButtplugClientDevice, LinearCommand, RotateCommand, VibrateCommand},
  util::async_manager,
};
use prost::Message;
use std::{slice, sync::Arc, collections::HashMap, iter::FromIterator};

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

  pub fn parse_message(&self, buf: *const u8, buf_len: i32) {
    let msg_ptr: &[u8];
    unsafe {
      msg_ptr = slice::from_raw_parts(buf, buf_len as usize);
    }
    let ffi_msg = FFIClientMessage::decode(msg_ptr).unwrap();
    let msg_id = ffi_msg.id;
    if let FFIClientMessageType::DeviceMessage(device_msg) = ffi_msg.message.unwrap().msg.unwrap() {
      match device_msg.msg.unwrap() {
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
    } else {
      panic!("Send client message to device parser!");
    }
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
      return_client_result(device.vibrate(params).await, id, callback);
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
      return_client_result(device.rotate(params).await, id, callback);
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
      return_client_result(device.linear(params).await, id, callback);
    })
    .unwrap();
  }

  pub fn send_stop_device_cmd(&self, id: u32, msg: StopDeviceCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(device.stop().await, id, callback);
    })
    .unwrap();
  }

  pub fn send_raw_read_cmd(&self, id: u32, msg: RawReadCmd) {
  }

  pub fn send_raw_write_cmd(&self, id: u32, msg: RawWriteCmd) {
  }

  pub fn send_raw_subscribe_cmd(&self, id: u32, msg: RawSubscribeCmd) {
  }

  pub fn send_raw_unsubscribe_cmd(&self, id: u32, msg: RawUnsubscribeCmd) {
  }

  pub fn send_battery_level_cmd(&self, id: u32, msg: BatteryLevelCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(Ok(()), id, callback);
    })
    .unwrap();
  }

  pub fn send_rssi_level_cmd(&self, id: u32, msg: RssiLevelCmd) {
    let callback = self.callback.clone();
    let device = self.device.clone();
    async_manager::spawn(async move {
      return_client_result(Ok(()), id, callback);
    })
    .unwrap();
  }
}

impl Drop for ButtplugFFIDevice {
  fn drop(&mut self) {
    info!("DROPPED RUST FFI DEVICE");
  }
}
