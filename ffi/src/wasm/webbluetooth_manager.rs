use super::webbluetooth_device::WebBluetoothDeviceImplCreator;
use tokio::sync::mpsc::Sender;
use buttplug::{
  core::ButtplugResultFuture,
  device::configuration_manager::DeviceConfigurationManager,
  server::comm_managers::{
    DeviceCommunicationEvent,
    DeviceCommunicationManager,
    DeviceCommunicationManagerCreator,
  },
};
use futures::future;
use js_sys::{Array, Reflect};
use wasm_bindgen_futures::{spawn_local, JsFuture};
use web_sys::BluetoothDevice;
use wasm_bindgen::prelude::*;

pub struct WebBluetoothCommunicationManager {
  sender: Sender<DeviceCommunicationEvent>,
}

impl DeviceCommunicationManagerCreator for WebBluetoothCommunicationManager {
  fn new(sender: Sender<DeviceCommunicationEvent>) -> Self {
    Self { sender }
  }
}

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

impl DeviceCommunicationManager for WebBluetoothCommunicationManager {
  fn name(&self) -> &'static str {
    "WebBluetoothCommunicationManager"
  }

  fn start_scanning(&self) -> ButtplugResultFuture {
    info!("WebBluetooth manager scanning");
    let sender_clone = self.sender.clone();
    spawn_local(async move {
      // Build the filter block
      let nav = web_sys::window().unwrap().navigator();
      if nav.bluetooth().is_none() {
        log("WebBluetooth is not supported on this browser");
        error!("WebBluetooth is not supported on this browser");
        return;
      }
      info!("WebBluetooth supported by browser, continuing with scan.");
      let config_manager = DeviceConfigurationManager::default();
      let mut options = web_sys::RequestDeviceOptions::new();
      let filters = Array::new();
      let optional_services = Array::new();
      for (_, configs) in config_manager.protocol_configurations() {
        if let Some(btle) = &configs.btle {
          for name in &btle.names {
            let mut filter = web_sys::BluetoothLeScanFilterInit::new();
            if name.contains("*") {
              let mut name_clone = name.clone();
              name_clone.pop();
              filter.name_prefix(&name_clone);
            } else {
              filter.name(&name);
            }
            filters.push(&filter.into());
          }
          for (service, _) in &btle.services {
            optional_services.push(&service.to_string().into());
          }
        }
      }
      options.filters(&filters.into());
      options.optional_services(&optional_services.into());
      let nav = web_sys::window().unwrap().navigator();
      //nav.bluetooth().get_availability();
      //JsFuture::from(nav.bluetooth().request_device()).await;
      match JsFuture::from(nav.bluetooth().unwrap().request_device(&options)).await {
        Ok(device) => {
          let bt_device = BluetoothDevice::from(device);
          if bt_device.name().is_none() {
            return;
          }
          let name = bt_device.name().unwrap();
          let address = bt_device.id();
          let device_creator = Box::new(WebBluetoothDeviceImplCreator::new(bt_device));
          if sender_clone
            .send(DeviceCommunicationEvent::DeviceFound {
              name,
              address,
              creator: device_creator
            })
            .await
            .is_err()
          {
            error!("Device manager receiver dropped, cannot send device found message.");
          } else {
            info!("WebBluetooth device found.");
          }
        }
        Err(e) => {
          log(&format!("Error while trying to start bluetooth scan: {:?}", e));
          error!("Error while trying to start bluetooth scan: {:?}", e);
        }
      };
      let _ = sender_clone
        .send(DeviceCommunicationEvent::ScanningFinished)
        .await;
    });
    Box::pin(future::ready(Ok(())))
  }

  fn stop_scanning(&self) -> ButtplugResultFuture {
    Box::pin(future::ready(Ok(())))
  }
}
