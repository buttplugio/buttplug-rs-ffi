use buttplug::client::{
  device::{VibrateCommand},
};
use js_sys::{Promise};
use std::sync::Arc;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::{future_to_promise};

#[wasm_bindgen]
pub struct ButtplugClientDevice {
  device: Arc<buttplug::client::device::ButtplugClientDevice>,
}

#[wasm_bindgen]
impl ButtplugClientDevice {
  // No new method, as publicity seems to be a problem in wasm_bindgen
  pub(super) fn new(device: buttplug::client::device::ButtplugClientDevice) -> Self {
    Self {
      device: Arc::new(device)
    }
  }

  pub fn vibrate(&self, speed: &JsValue) -> Promise {
    let speed = speed.as_f64().unwrap();
    let device = self.device.clone();
    future_to_promise(async move {
      match device.vibrate(VibrateCommand::Speed(speed)).await {
        Ok(_) => Ok(JsValue::null()),
        Err(_) => Err(JsValue::null()),
      }
    })
  }
}
