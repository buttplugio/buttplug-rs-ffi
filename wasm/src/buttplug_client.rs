use buttplug::{
  client::{
    ButtplugClientEvent,
  },
  connector::{ButtplugInProcessClientConnector, ButtplugRemoteClientConnector},
  core::messages::serializer::ButtplugClientJSONSerializer,
};
use super::{
  event_manager::EventManager, 
  buttplug_client_device::ButtplugClientDevice, 
  webbluetooth_manager::WebBluetoothCommunicationManager,
  websocket_client_connector::ButtplugBrowserWebsocketClientTransport
};
use futures::StreamExt;
use js_sys::{Array, Promise};
use std::sync::Arc;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::{future_to_promise, spawn_local};

// This is a copy of ButtplugServerOptions from the buttplug-rs library.
// However, since that doesn't have a wasm-bindgen marker on it, we can't use it
// here. Is there a way to mark external types for WASM Bindgen?
#[wasm_bindgen]
#[derive(Debug, Clone, Default)]
pub struct ButtplugServerOptions {
  pub(self) options: buttplug::server::ButtplugServerOptions
}

#[wasm_bindgen]
impl ButtplugServerOptions {
  pub fn new() -> Self {
    Self {
      options: buttplug::server::ButtplugServerOptions::default()
    }
  }

  #[wasm_bindgen(getter)]
  pub fn name(&self) -> String {
      self.options.name.clone()
  }

  #[wasm_bindgen(setter)]
  pub fn set_name(&mut self, name: String) {
      self.options.name = name;
  }

  #[wasm_bindgen(getter)]
  pub fn max_ping_time(&self) -> u64 {
    self.options.max_ping_time
  }

  #[wasm_bindgen(setter)]
  pub fn set_max_ping_time(&mut self, max_ping_time: u64) {
    self.options.max_ping_time = max_ping_time;
  }

  #[wasm_bindgen(getter)]
  pub fn allow_raw_messages(&self) -> bool {
    self.options.allow_raw_messages
  }

  #[wasm_bindgen(setter)]
  pub fn set_allow_raw_messages(&mut self, allow_raw_messages: bool) {
    self.options.allow_raw_messages = allow_raw_messages;
  }

  #[wasm_bindgen(getter)]
  pub fn device_configuration_json(&self) -> Option<String> {
    self.options.device_configuration_json.clone()
  }

  #[wasm_bindgen(setter)]
  pub fn set_device_configuration_json(&mut self, device_configuration_json: Option<String>) {
    self.options.device_configuration_json = device_configuration_json;
  }

  #[wasm_bindgen(getter)]
  pub fn user_device_configuration_json(&self) -> Option<String> {
    self.options.user_device_configuration_json.clone()
  }

  #[wasm_bindgen(setter)]
  pub fn set_user_device_configuration_json(&mut self, user_device_configuration_json: Option<String>) {
    self.options.user_device_configuration_json = user_device_configuration_json;
  }
}

impl From<ButtplugServerOptions> for buttplug::server::ButtplugServerOptions {
  fn from(other: ButtplugServerOptions) -> Self {
      other.options
  }
}


#[wasm_bindgen]
pub struct ButtplugClient {
  event_manager: Arc<EventManager>,
  client: Arc<buttplug::client::ButtplugClient>,
}

async fn event_emitter_loop(
  event_manager: Arc<EventManager>,
  mut event_stream: impl StreamExt<Item = ButtplugClientEvent> + Unpin,
) {
  while let Some(event) = event_stream.next().await {
    match event {
      ButtplugClientEvent::DeviceAdded(device) => {
        info!("Emitting device added!");
        event_manager.emit(
          "deviceadded",
          &JsValue::from(ButtplugClientDevice::new(device))
        );
      },
      ButtplugClientEvent::DeviceRemoved(device) => {

      },
      ButtplugClientEvent::Error(err) => {
        event_manager.emit("buttplugerror", &JsValue::from_str(&format!("{:?}", err)));
      },
      ButtplugClientEvent::PingTimeout => event_manager.emit("pingtimeout", &JsValue::undefined()),
      ButtplugClientEvent::ScanningFinished => event_manager.emit("scanningfinished", &JsValue::undefined()),
      ButtplugClientEvent::ServerDisconnect => event_manager.emit("serverdisconnect", &JsValue::undefined()),
    }
  }
}

#[wasm_bindgen]
impl ButtplugClient {
  #[allow(non_snake_case)]
  pub fn connectEmbedded() -> Promise {
    let mut options = ButtplugServerOptions::default();
    options.set_name("Buttplug WASM Browser Server".to_owned());
    ButtplugClient::connectEmbeddedWithOptions(&options)
  }

  #[allow(non_snake_case)]
  pub fn connectEmbeddedWithOptions(options: &ButtplugServerOptions) -> Promise {
    let server_opts = options.clone();
    future_to_promise(async move {
      let connector = ButtplugInProcessClientConnector::new_with_options(&server_opts.options).map_err(|e| JsValue::from(format!("{}", e)))?;
      connector
        .server_ref()
        .add_comm_manager::<WebBluetoothCommunicationManager>()
        .unwrap();
      // This is infallible due to the in process connector, we can call unwrap here.
      let (client, event_stream) = buttplug::client::ButtplugClient::connect("Example Client", connector)
        .await
        .unwrap();
      let event_manager = Arc::new(EventManager::default());
      let event_manager_clone = event_manager.clone();
      spawn_local(async move {
        event_emitter_loop(event_manager_clone, event_stream).await;
      });
      Ok(
        Self {
          event_manager,
          client: Arc::new(client),
        }
        .into(),
      )
    })
  }
  
  #[allow(non_snake_case)]
  pub fn connectWebsocket(js_address: &JsValue) -> Promise {
    let address = js_address.as_string().unwrap();
    future_to_promise(async move {
      let mut connector = ButtplugRemoteClientConnector::<
        ButtplugBrowserWebsocketClientTransport,
        ButtplugClientJSONSerializer,
      >::new(
        ButtplugBrowserWebsocketClientTransport::new(
          &address,
        ),
      );
      let (client, mut event_stream) = buttplug::client::ButtplugClient::connect("WASM Client", connector)
        .await
        .unwrap();
      let event_manager = Arc::new(EventManager::default());
      let event_manager_clone = event_manager.clone();
      spawn_local(async move {
        event_emitter_loop(event_manager_clone, event_stream).await;
      });
      Ok(
        Self {
          event_manager,
          client: Arc::new(client),
        }
        .into(),
      )
    })
  }

  #[allow(non_snake_case)]
  pub fn addListener(&mut self, event_name: &JsValue, callback: &js_sys::Function) {
    let event_name_str = event_name.as_string().unwrap();
    self
      .event_manager
      .add_listener(&event_name_str, callback.clone());
  }

  fn emit(&self, event_name: &str) {
    self.event_manager.emit(event_name, &JsValue::null());
  }

  #[allow(non_snake_case)]
  pub fn startScanning(&self) -> Promise {
    let client_clone = self.client.clone();
    future_to_promise(async move {
      client_clone
        .start_scanning()
        .await
        .and_then(|_| Ok(JsValue::null()))
        .map_err(|e| JsValue::from(format!("{}", e)))
    })
  }

  #[allow(non_snake_case)]
  #[wasm_bindgen(js_name = stopScanning)]
  pub fn stopScanning(&self) -> Promise {
    let client_clone = self.client.clone();
    future_to_promise(async move {
      client_clone
        .stop_scanning()
        .await
        .and_then(|_| Ok(JsValue::null()))
        .map_err(|e| JsValue::from(format!("{}", e)))
    })
  }

  #[wasm_bindgen(method, getter)]
  pub fn devices(&self) -> JsValue {
    let devices = self.client.devices();
    let js_devices = Array::new();
    for device in devices {
      js_devices.push(&JsValue::from(ButtplugClientDevice::new(device)));
    }
    JsValue::from(js_devices)
  }
}
