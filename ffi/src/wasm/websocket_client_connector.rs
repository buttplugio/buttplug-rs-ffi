// Buttplug Rust Source Code File - See https://buttplug.io for more info.
//
// Copyright 2016-2020 Nonpolynomial Labs LLC. All rights reserved.
//
// Licensed under the BSD 3-Clause license. See LICENSE file in the project root
// for full license information.

//! Handling of websockets using async-tungstenite

use buttplug::{
  connector::{
    transport::{
      ButtplugConnectorTransport,
      ButtplugConnectorTransportSpecificError,
      ButtplugTransportIncomingMessage,
    },
    ButtplugConnectorError,
    ButtplugConnectorResultFuture,
  },
  core::messages::serializer::ButtplugSerializedMessage,
  util::async_manager,
};
use futures::{
  future::{self, BoxFuture},
  select,
  FutureExt,
};
use std::sync::Arc;
use tokio::sync::{mpsc, Mutex, Notify};
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::spawn_local;
use web_sys::{self, ErrorEvent, MessageEvent, WebSocket};

/// Websocket connector for ButtplugClients, using [async_tungstenite]
pub struct ButtplugBrowserWebsocketClientTransport {
  /// Address of the server we'll connect to.
  address: String,
  disconnect_notifier: Arc<Notify>,
}

impl ButtplugBrowserWebsocketClientTransport {
  /// Creates a new connector for all addresses
  ///
  /// Returns a websocket connector for connecting over insecure websockets to a
  /// server. Address should be the full URL of the server, i.e.
  /// "ws://127.0.0.1:12345"
  pub fn new(address: &str) -> Self {
    Self {
      address: address.to_owned(),
      disconnect_notifier: Arc::new(Notify::new()),
    }
  }
}

impl ButtplugConnectorTransport for ButtplugBrowserWebsocketClientTransport {
  fn connect(
    &self,
    mut outgoing_receiver: mpsc::Receiver<ButtplugSerializedMessage>,
    incoming_sender: mpsc::Sender<ButtplugTransportIncomingMessage>,
  ) -> BoxFuture<'static, Result<(), ButtplugConnectorError>> {
    // We never try to use this twice, but due to the FnMut guarantees needed by
    // our closure, we have to act like we can anyways. There's probably an
    // easier way around this but I'm not sure what it is.
    let outgoing_receiver = Arc::new(Mutex::new(outgoing_receiver));
    // Could also do this with a future but eh.
    let (connect_sender, mut connect_receiver) = mpsc::channel(1);
    // Probably a rusty-er way to do this but eh.
    let ws;
    match WebSocket::new(&self.address) {
      Ok(websocket) => ws = websocket,
      Err(e) => {
        return Box::pin(future::ready(Err(
          ButtplugConnectorError::ConnectorGenericError(format!(
            "Could not connect to websocket, possibly due to URL issue: {:?}",
            e
          )),
        )))
      }
    }
    let response_sender_clone = incoming_sender.clone();
    let onmessage_callback = Closure::wrap(Box::new(move |e: MessageEvent| {
      if let Ok(txt) = e.data().dyn_into::<js_sys::JsString>() {
        let str: String = txt.into();
        let rscc = response_sender_clone.clone();
        spawn_local(async move {
          if rscc
            .clone()
            .send(ButtplugTransportIncomingMessage::Message(
              ButtplugSerializedMessage::Text(str),
            ))
            .await
            .is_err()
          {
            error!("Websocket holder has closed.");
          }
        });
      } else {
        info!("message event, received Unknown: {:?}", e.data());
      }
    }) as Box<dyn FnMut(MessageEvent)>);
    // set message event handler on WebSocket
    ws.set_onmessage(Some(onmessage_callback.as_ref().unchecked_ref()));
    // forget the callback to keep it alive
    onmessage_callback.forget();

    let success_sender = connect_sender.clone();
    let ws_sender_clone = ws.clone();
    let disconnect_notifier = self.disconnect_notifier.clone();
    let onopen_callback = Closure::wrap(Box::new(move |_| {
      let recvr_clone = outgoing_receiver.clone();
      let wscs = ws_sender_clone.clone();
      let notifier = disconnect_notifier.clone();
      spawn_local(async move {
        let mut recvr = recvr_clone.lock().await;
        loop {
          select! {
            incoming = recvr.recv().fuse() => {
              if let Some(event) = incoming {
                match event {
                  ButtplugSerializedMessage::Text(text) => wscs.send_with_str(&text).unwrap(),
                  ButtplugSerializedMessage::Binary(_bin) => {
                    // TOOD Make this an error?
                  }
                }
              } else {
                info!("Connector client disappeared, ");
                break;
              }
            }
            _ = notifier.notified().fuse() => {
              info!("Received disconnect signal, disconnecting websocket");
              break;
            }
          }
        }
        wscs.close();
        // TODO see what happens when we try to send to a remote that's closed connection.
      });
      let ssc = success_sender.clone();
      async_manager::spawn(async move {
        ssc.send(true).await;
      })
      .unwrap();
    }) as Box<dyn FnMut(JsValue)>);
    ws.set_onopen(Some(onopen_callback.as_ref().unchecked_ref()));
    onopen_callback.forget();

    let failure_sender = connect_sender.clone();
    let onerror_callback = Closure::wrap(Box::new(move |_: ErrorEvent| {
      let fsc = failure_sender.clone();
      async_manager::spawn(async move {
        fsc.send(false).await;
      })
      .unwrap();
    }) as Box<dyn FnMut(ErrorEvent)>);
    ws.set_onerror(Some(onerror_callback.as_ref().unchecked_ref()));
    onerror_callback.forget();

    Box::pin(async move {
      if connect_receiver.recv().await.unwrap() {
        Ok(())
      } else {
        Err(ButtplugConnectorError::ConnectorGenericError(
          "Could not connect to websocket, possibly due to server issue.".to_owned(),
        ))
      }
    })
  }

  fn disconnect(self) -> ButtplugConnectorResultFuture {
    let disconnect_notifier = self.disconnect_notifier.clone();
    Box::pin(async move {
      disconnect_notifier.notify_waiters();
      Ok(())
    })
  }
}
