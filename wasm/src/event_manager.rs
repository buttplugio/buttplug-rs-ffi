use dashmap::DashMap;
use std::sync::Arc;
use wasm_bindgen::prelude::*;

// This could probably be implemented as a trait, but then exposure and storage
// types get weird since we'd have to expose the getter and there's no such
// thing as private trait methods. So this will be a has-a relationship for a
// while, which is a little awkward but eh.
#[derive(Default)]
pub struct EventManager {
  event_holder: Arc<DashMap<String, Vec<js_sys::Function>>>,
}

impl EventManager {
  pub fn add_listener(&self, event_name: &str, callback: js_sys::Function) {
    if !self.event_holder.contains_key(event_name) {
      self.event_holder.insert(event_name.to_owned(), vec!());
    }
    self.event_holder.get_mut(event_name).unwrap().push(callback);
  }

  pub fn emit(&self, event_name: &str, emitter_value: &JsValue) {
    let this = JsValue::null();
    if !self.event_holder.contains_key(event_name) {
      return;
    }
    for func in self.event_holder.get(event_name).unwrap().value() {
      func
        .call1(&this, &emitter_value)
        .unwrap();
    }
  }
}
