use buttplug::{self, client::ButtplugClientError, core::errors};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug, Copy, Clone)]
pub enum ButtplugErrorType {
  ConnectorError = 0,
  HandshakeError = 1,
  DeviceError = 2,
  MessageError = 3,
  PingError = 4,
  UnknownError = 5
}

#[wasm_bindgen]
pub struct ButtplugError {
  pub error_type: ButtplugErrorType,
  reason: String
}

#[wasm_bindgen]
impl ButtplugError {
  pub(self) fn new(error_type: ButtplugErrorType, reason: &str) -> Self {
    Self {
      error_type,
      reason: reason.to_owned()
    }
  }

  #[wasm_bindgen(getter)]
  pub fn reason(&self) -> String {
      self.reason.clone()
  }

  #[wasm_bindgen(setter)]
  pub fn set_reason(&mut self, reason: String) {
      self.reason = reason;
  }
}

impl From<ButtplugClientError> for ButtplugError {
  fn from(error: ButtplugClientError) -> Self {
    match error {
      ButtplugClientError::ButtplugConnectorError(err) => {
        ButtplugError::new(ButtplugErrorType::ConnectorError, &format!("{}", err))
      }
      ButtplugClientError::ButtplugError(bp_err) => {
        match bp_err {
          errors::ButtplugError::ButtplugDeviceError(err) => {
            ButtplugError::new(ButtplugErrorType::DeviceError, &format!("{}", err))
          }
          errors::ButtplugError::ButtplugPingError(err) => {
            ButtplugError::new(ButtplugErrorType::PingError, &format!("{}", err))
          }
          errors::ButtplugError::ButtplugMessageError(err) => {
            ButtplugError::new(ButtplugErrorType::MessageError, &format!("{}", err))
          }
          errors::ButtplugError::ButtplugHandshakeError(err) => {
            ButtplugError::new(ButtplugErrorType::HandshakeError, &format!("{}", err))
          }
          errors::ButtplugError::ButtplugUnknownError(err) => {
            ButtplugError::new(ButtplugErrorType::UnknownError, &format!("{}", err))
          }
        }
      }
    }
  }
}