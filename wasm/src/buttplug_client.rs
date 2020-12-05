use buttplug::{
  client::{
    ButtplugClientEvent,
  },
  connector::{ButtplugInProcessClientConnector, ButtplugRemoteClientConnector, ButtplugConnectorError},
  core::messages::serializer::ButtplugClientJSONSerializer,
};
use super::{
  errors::ButtplugError,
  event_manager::EventManager, 
  buttplug_client_device::ButtplugClientDevice, 
  webbluetooth_manager::WebBluetoothCommunicationManager,
  websocket_client_connector::ButtplugBrowserWebsocketClientTransport,
  utils::generic_of_jsval
};
use futures::StreamExt;
use js_sys::{Array, Promise};
use std::sync::Arc;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::{future_to_promise, spawn_local};
use serde::{Serialize, Deserialize};

// This is a copy of ButtplugServerOptions from the buttplug-rs library.
// However, since that doesn't have a wasm-bindgen marker on it, we can't use it
// here, so we'll need to update this whenever that option set changes.
#[wasm_bindgen]
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct ButtplugEmbeddedConnectorOptions {
  server_name: String,
  max_ping_time: u64,
  allow_raw_messages: bool,
  device_configuration_json: Option<String>,
  user_device_configuration_json: Option<String>,
}

#[wasm_bindgen]
impl ButtplugEmbeddedConnectorOptions {
  #[wasm_bindgen(constructor)]
  pub fn new() -> Self {
    ButtplugEmbeddedConnectorOptions::default()
  }

  #[wasm_bindgen(getter)]
  pub fn server_name(&self) -> String {
      self.server_name.clone()
  }

  #[wasm_bindgen(setter)]
  pub fn set_server_name(&mut self, name: String) {
      self.server_name = name;
  }

  #[wasm_bindgen(getter)]
  pub fn max_ping_time(&self) -> u64 {
    self.max_ping_time
  }

  #[wasm_bindgen(setter)]
  pub fn set_max_ping_time(&mut self, max_ping_time: u64) {
    self.max_ping_time = max_ping_time;
  }

  #[wasm_bindgen(getter)]
  pub fn allow_raw_messages(&self) -> bool {
    self.allow_raw_messages
  }

  #[wasm_bindgen(setter)]
  pub fn set_allow_raw_messages(&mut self, allow_raw_messages: bool) {
    self.allow_raw_messages = allow_raw_messages;
  }

  #[wasm_bindgen(getter)]
  pub fn device_configuration_json(&self) -> Option<String> {
    self.device_configuration_json.clone()
  }

  #[wasm_bindgen(setter)]
  pub fn set_device_configuration_json(&mut self, device_configuration_json: Option<String>) {
    self.device_configuration_json = device_configuration_json;
  }

  #[wasm_bindgen(getter)]
  pub fn user_device_configuration_json(&self) -> Option<String> {
    self.user_device_configuration_json.clone()
  }

  #[wasm_bindgen(setter)]
  pub fn set_user_device_configuration_json(&mut self, user_device_configuration_json: Option<String>) {
    self.user_device_configuration_json = user_device_configuration_json;
  }
}

impl Into<buttplug::server::ButtplugServerOptions> for ButtplugEmbeddedConnectorOptions {
  fn into(self) -> buttplug::server::ButtplugServerOptions {
      let mut options = buttplug::server::ButtplugServerOptions::default();
      options.name = self.server_name;
      options.max_ping_time = self.max_ping_time;
      options.allow_raw_messages = self.allow_raw_messages;
      options.device_configuration_json = self.device_configuration_json;
      options.user_device_configuration_json = self.user_device_configuration_json;
      options
  }
}

#[wasm_bindgen]
#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct ButtplugWebsocketConnectorOptions {
  address: String,
}

#[wasm_bindgen]
impl ButtplugWebsocketConnectorOptions {
  #[wasm_bindgen(constructor)]
  pub fn new() -> Self {
    ButtplugWebsocketConnectorOptions::default()
  }

  #[wasm_bindgen(getter)]
  pub fn address(&self) -> String {
      self.address.clone()
  }

  #[wasm_bindgen(setter)]
  pub fn set_address(&mut self, address: String) {
      self.address = address;
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
        event_manager.emit(
          "deviceadded",
          &JsValue::from(ButtplugClientDevice::new(device))
        );
      },
      ButtplugClientEvent::DeviceRemoved(device) => {
        event_manager.emit(
          "deviceremoved",
          &JsValue::from(ButtplugClientDevice::new(device))
        );
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
  #[wasm_bindgen(getter)]
  pub fn connected(&self) -> bool {
    self.client.connected()
  }

  pub fn connect(client_name: &str, connector_options: &JsValue) -> Promise {
    if let Ok(server_options) = generic_of_jsval(connector_options.clone(), "ButtplugEmbeddedConnectorOptions") {
      return ButtplugClient::connect_embedded(client_name, &server_options);
    }
    if let Ok(websocket_options) = generic_of_jsval(connector_options.clone(), "ButtplugWebsocketConnectorOptions") {
      return ButtplugClient::connect_websocket(client_name, &websocket_options);
    }

    future_to_promise(async move {
      Err(JsValue::from(format!("{}", ButtplugConnectorError::ConnectorGenericError("Did not specify usable connector options".to_owned()))))
    })
  }

  fn connect_embedded(client_name: &str, options: &ButtplugEmbeddedConnectorOptions) -> Promise {
    let server_opts = options.clone();
    let client_name_clone = client_name.to_owned();
    future_to_promise(async move {
      let connector = ButtplugInProcessClientConnector::new_with_options(&server_opts.into()).map_err(|e| JsValue::from(format!("{}", e)))?;
      connector
        .server_ref()
        .add_comm_manager::<WebBluetoothCommunicationManager>()
        .unwrap();
      // This is infallible due to the in process connector, we can call unwrap here.
      let (client, event_stream) = buttplug::client::ButtplugClient::connect(&client_name_clone, connector)
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

  fn connect_websocket(client_name: &str, options: &ButtplugWebsocketConnectorOptions) -> Promise {
    let address = options.address.clone();
    let client_name_clone = client_name.to_owned();
    future_to_promise(async move {
      let connector = ButtplugRemoteClientConnector::<
        ButtplugBrowserWebsocketClientTransport,
        ButtplugClientJSONSerializer,
      >::new(
        ButtplugBrowserWebsocketClientTransport::new(
          &address,
        ),
      );
      let (client, event_stream) = match buttplug::client::ButtplugClient::connect(&client_name_clone, connector).await {
        Ok((client, event_stream)) => (client, event_stream),
        Err(e) => return Err(JsValue::from(ButtplugError::from(e)))
      };
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

  pub fn disconnect(&self) -> Promise {
    let client_clone = self.client.clone();
    future_to_promise(async move {
      client_clone
        .disconnect()
        .await
        .and_then(|_| Ok(JsValue::null()))
        .map_err(|e| JsValue::from(ButtplugError::from(e)))
    })
  }

  #[allow(non_snake_case)]
  pub fn addListener(&mut self, event_name: &JsValue, callback: &js_sys::Function) {
    let event_name_str = event_name.as_string().unwrap();
    self
      .event_manager
      .add_listener(&event_name_str, callback.clone());
  }

  #[allow(non_snake_case)]
  pub fn removeListener(&mut self, event_name: &JsValue, callback: &js_sys::Function) {
    let event_name_str = event_name.as_string().unwrap();
    self
      .event_manager
      .remove_listener(&event_name_str, callback.clone());
  }

  #[allow(non_snake_case)]
  pub fn startScanning(&self) -> Promise {
    let client_clone = self.client.clone();
    future_to_promise(async move {
      client_clone
        .start_scanning()
        .await
        .and_then(|_| Ok(JsValue::null()))
        .map_err(|e| JsValue::from(ButtplugError::from(e)))
    })
  }

  #[allow(non_snake_case)]
  pub fn stopScanning(&self) -> Promise {
    let client_clone = self.client.clone();
    future_to_promise(async move {
      client_clone
        .stop_scanning()
        .await
        .and_then(|_| Ok(JsValue::null()))
        .map_err(|e| JsValue::from(ButtplugError::from(e)))
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

  #[allow(non_snake_case)]
  pub fn stopAllDevices(&self) -> Promise {
    let client_clone = self.client.clone();
    future_to_promise(async move {
      client_clone
        .stop_all_devices()
        .await
        .and_then(|_| Ok(JsValue::null()))
        .map_err(|e| JsValue::from(ButtplugError::from(e)))
    })
  }
}
