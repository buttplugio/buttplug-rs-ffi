use buttplug::client::{
  device::{VibrateCommand, RotateCommand},
};
use js_sys::{Promise, Array};
use std::sync::Arc;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use futures::future;
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
    let argument_error = future_to_promise(future::ready(Err(JsValue::from_str("Invalid argument type, must be a f64 between 0.0 and 1.0 or an array of f64's with the same bounds."))));
    let vibrate_command = if let Some(speed_f64) = speed.as_f64() {
      VibrateCommand::Speed(speed_f64)
    } else if Array::instanceof(speed) {
      let iter = match js_sys::try_iter(&Array::from(speed)) {
        Ok(iter) => iter.unwrap(),
        Err(e) => return argument_error
      };
      let mut speed_vec: Vec<f64> = vec!();
      for elem in iter {
        let elem = elem.unwrap();
        if let Some(val) = elem.as_f64() {
          speed_vec.push(val);
        } else {
          return argument_error;
        }
      }
      VibrateCommand::SpeedVec(speed_vec)
    } else {
      return argument_error;
    };

    let device = self.device.clone();
    future_to_promise(async move {
      match device.vibrate(vibrate_command).await {
        Ok(_) => Ok(JsValue::null()),
        Err(_) => Err(JsValue::null()),
      }
    })
  }

  fn convert_to_rotate_command(&self, speed: &JsValue, rotation: &JsValue) -> Option<(f64, bool)> {
    let speed = speed.as_f64()?;
    let rotation = rotation.as_bool()?;
    Some((speed, rotation))
  }

  pub fn rotate(&self, speed_or_rotations: &JsValue, rotation: &JsValue) -> Promise {
    let argument_failure = future_to_promise(future::ready(Err(JsValue::from_str("Invalid argument type, must be a f64 between 0.0 and 1.0 or an array of f64's with the same bounds."))));
    let rotate_command = if !rotation.is_undefined() || !rotation.is_null() {
      if let Some(value) = self.convert_to_rotate_command(speed_or_rotations, rotation) {
        RotateCommand::Rotate(value.0, value.1)
      } else {
        return argument_failure; 
      }
    } else if Array::instanceof(speed_or_rotations) {
      let iter = match js_sys::try_iter(&Array::from(speed_or_rotations)) {
        Ok(iter) => iter.unwrap(),
        Err(e) => return argument_failure
      };
      let mut rotation_vec: Vec<(f64, bool)> = vec!();
      for elem in iter {
        let elem = elem.unwrap();
        if !Array::instanceof(&elem) {
          return argument_failure;
        }
        let value_array = Array::from(&elem);
        if value_array.length() != 2 {
          return argument_failure;
        }
        if let Some(val) = self.convert_to_rotate_command(&value_array.get(0), &value_array.get(1)) {
          rotation_vec.push(val);
        } else {
          return argument_failure;
        }
      }
      RotateCommand::RotateVec(rotation_vec)
    } else {
      return argument_failure;
    };

    let device = self.device.clone();
    future_to_promise(async move {
      match device.rotate(rotate_command).await {
        Ok(_) => Ok(JsValue::null()),
        Err(_) => Err(JsValue::null()),
      }
    })
  }

}
