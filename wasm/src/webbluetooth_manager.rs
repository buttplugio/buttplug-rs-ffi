use super::webbluetooth_device::WebBluetoothDeviceImplCreator;
use async_channel::Sender;
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
use js_sys::{Array, Promise};
use wasm_bindgen_futures::{spawn_local, JsFuture};
use web_sys::BluetoothDevice;

pub struct WebBluetoothCommunicationManager {
  sender: Sender<DeviceCommunicationEvent>,
}

impl DeviceCommunicationManagerCreator for WebBluetoothCommunicationManager {
  fn new(sender: Sender<DeviceCommunicationEvent>) -> Self {
    Self { sender }
  }
}

impl DeviceCommunicationManager for WebBluetoothCommunicationManager {
  fn name(&self) -> &'static str {
    "WebBluetoothCommunicationManager"
  }

  fn start_scanning(&self) -> ButtplugResultFuture {
    info!("WebBluetooth manager scanning");
    let sender_clone = self.sender.clone();
    spawn_local(async move {
      let config_manager = DeviceConfigurationManager::default();
      let mut options = web_sys::RequestDeviceOptions::new();
      let mut filters = Array::new();
      let mut optional_services = Array::new();
      for (protocol_name, configs) in config_manager.config.protocols {
        if let Some(btle) = configs.btle {
          for name in btle.names {
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
          for (service, _) in btle.services {
            optional_services.push(&service.to_string().into());
          }
        }
      }
      options.filters(&filters.into());
      options.optional_services(&optional_services.into());
      // Build the filter block
      let nav = web_sys::window().unwrap().navigator();
      //nav.bluetooth().get_availability();
      //JsFuture::from(nav.bluetooth().request_device()).await;
      match JsFuture::from(nav.bluetooth().request_device_with_options(&options)).await {
        Ok(device) => {
          let device_creator = Box::new(WebBluetoothDeviceImplCreator::new(BluetoothDevice::from(
            device,
          )));
          if sender_clone
            .send(DeviceCommunicationEvent::DeviceFound(device_creator))
            .await
            .is_err()
          {
            error!("Device manager receiver dropped, cannot send device found message.");
            return;
          }
          info!("GOT DEVICE");
        }
        Err(e) => error!("DEVICE ERROR: {:?}", e),
      }
    });
    Box::pin(future::ready(Ok(())))
  }

  fn stop_scanning(&self) -> ButtplugResultFuture {
    Box::pin(future::ready(Ok(())))
  }
}
