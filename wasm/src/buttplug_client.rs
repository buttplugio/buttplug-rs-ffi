use async_channel::Receiver;
use buttplug::{
  client::{
    device::{VibrateCommand},
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
      }
      _ => {}
    }
  }
}

#[wasm_bindgen]
impl ButtplugClient {
  #[allow(non_snake_case)]
  pub fn connectEmbedded() -> Promise {
    info!("Trying to connect!");
    future_to_promise(async move {
      info!("Now in future!");
      let mut connector = ButtplugInProcessClientConnector::new("Example Server", 0);
      connector
        .server_ref()
        .add_comm_manager::<WebBluetoothCommunicationManager>();
      let (client, mut event_stream) = buttplug::client::ButtplugClient::connect("Example Client", connector)
        .await
        .unwrap();
      info!("Connected in future!");
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
    info!("Trying to websocket connect!");
    let address = js_address.as_string().unwrap();
    future_to_promise(async move {
      info!("Now in future!");
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
      info!("Connected in future!");
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
