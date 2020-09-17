use dashmap::DashMap;
use std::sync::Arc;
use wasm_bindgen::prelude::*;

#[derive(Default)]
pub struct EventManager {
  event_holder: Arc<DashMap<String, js_sys::Function>>,
}

impl EventManager {
  pub fn add_listener(&self, event_name: &str, callback: js_sys::Function) {
    /*
    if self.event_holder.contains_key(event_name) {

    } else {

    }
    */
    self.event_holder.insert(event_name.to_owned(), callback);
  }

  pub fn emit(&self, event_name: &str, emitter_value: &JsValue) {
    let this = JsValue::null();
    self
      .event_holder
      .get(event_name)
      .unwrap()
      .clone()
      .call1(&this, &emitter_value)
      .unwrap();
  }
}
