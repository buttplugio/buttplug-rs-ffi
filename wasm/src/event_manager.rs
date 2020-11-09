use dashmap::DashMap;
use std::sync::{Arc, atomic::{AtomicU32, Ordering}};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

// This could probably be implemented as a trait, but then exposure and storage
// types get weird since we'd have to expose the getter and there's no such
// thing as private trait methods. So this will be a has-a relationship for a
// while, which is a little awkward but eh.
#[derive(Default)]
pub struct EventManager {
  event_holder: Arc<DashMap<String, Vec<js_sys::Function>>>,
  // Ok, so, this probably looks a little weird. There's a callback map and a
  // counter. This is all to basically continue Run To Completion guarantees at
  // the JS level, so event emission is deterministic.
  //
  // Let's say someone is using buttplug-wasm to connect to an outside server.
  // That server already has a device connected. For instance, using Intiface
  // Desktop, someone can connect to a server, find a device, then disconnect
  // from the server and it'll keep running and waiting for another connection.
  // Anyways, on connect we'll get a DeviceAdded event representing that
  // already-connected device. How do we ensure that event is received by the
  // user at the JS level?
  //
  // In buttplug-js, the client instance could be created before connection, so
  // event handlers could be set up before connection. In buttplug-wasm, clients
  // are created on connect as part of an RAII patterns, so users can't create
  // event handlers until after connect returns. If we fire immediately, the
  // events will just drop off into the ether. That means we have to delay
  // events until the next JS event loop tick.
  //
  // We do this via a setTimeout call with timeout set to 0, same way it's
  // normally done in JS. However, we have to create the callback in which to
  // run the emit, and that requires holding the closure for the callback until
  // its called. So this pairing works as a storage and handle system for making
  // sure we hold our closure alive until its called, then we remove it
  // afterward.
  cb_holder: Arc<DashMap<u32, Closure<dyn FnMut()>>>,
  event_count: Arc<AtomicU32>,
}

impl EventManager {
  pub fn add_listener(&self, event_name: &str, callback: js_sys::Function) {
    if !self.event_holder.contains_key(event_name) {
      self.event_holder.insert(event_name.to_owned(), vec!());
    }
    self.event_holder.get_mut(event_name).unwrap().push(callback);
  }

  pub fn remove_listener(&self, event_name: &str, callback: js_sys::Function) {
    if let Some(mut val) = self.event_holder.get_mut(event_name) {
      if let Some(pos) = val.value().iter().position(|x| *x == callback) {
        val.value_mut().remove(pos);
        return;
      }
    }
  }

  pub fn emit(&self, event_name: &str, emitter_value: &JsValue) {
    debug!("Scheduling firing of event {}", event_name);
    let event_holder = self.event_holder.clone();
    let window = web_sys::window().unwrap();
    let event_name_clone = event_name.to_owned();
    let value = emitter_value.clone();
    let event_count = self.event_count.load(Ordering::SeqCst);
    let cb_holder = self.cb_holder.clone();
    self.event_count.store(event_count + 1, Ordering::SeqCst);
    let cb = Closure::wrap(Box::new(move || {
      if !event_holder.contains_key(&event_name_clone) {
        debug!("No handlers for event {}", event_name_clone);
        return;
      }
      debug!("Firing event {}", event_name_clone);
      let this = &JsValue::null();
      for func in event_holder.get(&event_name_clone).unwrap().value() {
        func
          .call1(&this, &value)
          .unwrap();
      }
      cb_holder.remove(&event_count);
    }) as Box<dyn FnMut()>);
    window.set_timeout_with_callback_and_timeout_and_arguments_0(cb.as_ref().unchecked_ref(), 0).unwrap();
    self.cb_holder.insert(event_count, cb);
  }
}
