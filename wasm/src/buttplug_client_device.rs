use buttplug::client::{
  device::{VibrateCommand, RotateCommand},
};
use js_sys::{Promise, Array};
use std::sync::Arc;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
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
    let vibrate_command = if let Some(speed_f64) = speed.as_f64() {
      VibrateCommand::Speed(speed_f64)
    } else if Array::instanceof(speed) {
      let iter = match js_sys::try_iter(&Array::from(speed)) {
        Ok(iter) => iter.unwrap(),
        Err(e) => return future_to_promise(async { Err(JsValue::from_str("Invalid argument type, must be a f64 between 0.0 and 1.0 or an array of f64's with the same bounds.")) })
      };
      let mut speed_vec: Vec<f64> = vec!();
      for elem in iter {
        let elem = elem.unwrap();
        if let Some(val) = elem.as_f64() {
          speed_vec.push(val);
        } else {
          return future_to_promise(async { Err(JsValue::from_str("Invalid argument type, must be a f64 between 0.0 and 1.0 or an array of f64's with the same bounds.")) });
        }
      }
      VibrateCommand::SpeedVec(speed_vec)
    } else {
      return future_to_promise(async { Err(JsValue::from_str("Invalid argument type, must be a f64 between 0.0 and 1.0 or an array of f64's with the same bounds.")) });
    };

    let device = self.device.clone();
    future_to_promise(async move {
      match device.vibrate(vibrate_command).await {
        Ok(_) => Ok(JsValue::null()),
        Err(_) => Err(JsValue::null()),
      }
    })
  }

}
