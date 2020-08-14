use super::{FFICallback};
use buttplug::{
    client::device::ButtplugClientDevice,
};
use std::sync::Arc;

pub struct ButtplugFFIDevice {
  callback: FFICallback,
  device: Arc<ButtplugClientDevice>
}

impl ButtplugFFIDevice {
  pub fn new(device: ButtplugClientDevice, callback: FFICallback) -> Self {
    Self {
      device: Arc::new(device),
      callback
    }
  }

  pub fn parse_device_message(&self, buf: *const u8, buf_len: u32) {
    let msg: &[u8];
    unsafe {
      msg = slice::from_raw_parts(buf, buf_len as usize);
    }
    let client_msg = get_root_as_client_message(msg);
    match client_msg.message_type() {
      ClientMessageType::ConnectLocal => self.connect_local(&client_msg),
      ClientMessageType::StartScanning => self.start_scanning(client_msg.id()),
      ClientMessageType::StopScanning => self.stop_scanning(client_msg.id()),
      _ => println!("Unhandled message type")
    }
  }
}
  
impl Drop for ButtplugFFIDevice {
  fn drop(&mut self) {
    info!("DROPPED RUST FFI DEVICE");
  }
}