use super::{
    flatbuffer_device_generated::buttplug_ffi::{
        get_root_as_device_message, BatteryLevelCmd, DeviceMessage, DeviceMessageType, LinearCmd,
        RSSILevelCmd, RawReadCmd, RawWriteCmd, RotateCmd, StopDeviceCmd, VibrateCmd,
    },
    FFICallback,
    util::send_ok_message
};
use buttplug::{
  client::device::{ButtplugClientDevice, VibrateCommand, RotateCommand, LinearCommand},
  util::async_manager
};
use std::{slice, sync::Arc};

pub struct ButtplugFFIDevice {
    callback: FFICallback,
    device: Arc<ButtplugClientDevice>,
}

impl ButtplugFFIDevice {
    pub fn new(device: ButtplugClientDevice, callback: FFICallback) -> Self {
        Self {
            device: Arc::new(device),
            callback,
        }
    }

    pub fn parse_message(&self, buf: *const u8, buf_len: i32) {
        let msg: &[u8];
        unsafe {
            msg = slice::from_raw_parts(buf, buf_len as usize);
        }
        let device_msg = get_root_as_device_message(msg);
        match device_msg.message_type() {
            DeviceMessageType::VibrateCmd => self.send_vibrate_cmd(device_msg),
            DeviceMessageType::RotateCmd => self.send_rotate_cmd(device_msg),
            DeviceMessageType::LinearCmd => self.send_linear_cmd(device_msg),
            DeviceMessageType::StopDeviceCmd => self.send_stop_device_cmd(device_msg),
            DeviceMessageType::RawReadCmd => self.send_raw_read_cmd(device_msg),
            DeviceMessageType::RawWriteCmd => self.send_raw_write_cmd(device_msg),
            DeviceMessageType::BatteryLevelCmd => self.send_battery_level_cmd(device_msg),
            DeviceMessageType::RSSILevelCmd => self.send_rssi_level_cmd(device_msg),
            DeviceMessageType::NONE => error!("Unhandled device message")
        };
    }

    pub fn send_vibrate_cmd(&self, msg: DeviceMessage) {
      let vibrate_msg = msg.message_as_vibrate_cmd().unwrap();
      let callback = self.callback.clone();
      let vibrate_params = VibrateCommand::SpeedVec(vibrate_msg.speeds().unwrap().into_iter().map(|x| x as f64).collect());
      let device = self.device.clone();
      let id = msg.id();
      async_manager::spawn(async move {
        device.vibrate(vibrate_params).await;
        send_ok_message(id, callback);
      }).unwrap();
    }

    pub fn send_rotate_cmd(&self, msg: DeviceMessage) {
      let rotate_msg = msg.message_as_rotate_cmd().unwrap();
    }

    pub fn send_linear_cmd(&self, msg: DeviceMessage) {
      let linear_msg = msg.message_as_linear_cmd().unwrap();
    }

    pub fn send_stop_device_cmd(&self, msg: DeviceMessage) {
      let callback = self.callback.clone();
      let device = self.device.clone();
      let id = msg.id();
      async_manager::spawn(async move {
        device.stop().await;
        send_ok_message(id, callback);
      }).unwrap();
    }

    pub fn send_raw_read_cmd(&self, msg: DeviceMessage) {
      let raw_read_msg = msg.message_as_raw_read_cmd().unwrap();
    }

    pub fn send_raw_write_cmd(&self, msg: DeviceMessage) {
      let raw_write_msg = msg.message_as_raw_write_cmd().unwrap();
    }

    pub fn send_battery_level_cmd(&self, msg: DeviceMessage) {
      let battery_msg = msg.message_as_battery_level_cmd().unwrap();
    }

    pub fn send_rssi_level_cmd(&self, msg: DeviceMessage) {
      let rssi_msg = msg.message_as_rssilevel_cmd().unwrap();
    }
}

impl Drop for ButtplugFFIDevice {
    fn drop(&mut self) {
        info!("DROPPED RUST FFI DEVICE");
    }
}
