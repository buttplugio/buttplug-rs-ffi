// Buttplug Rust Source Code File - See https://buttplug.io for more info.
//
// Copyright 2016-2020 Nonpolynomial Labs LLC. All rights reserved.
//
// Licensed under the BSD 3-Clause license. See LICENSE file in the project root
// for full license information.

//! Handling of websockets using async-tungstenite

use async_channel::bounded;
use buttplug::{
  connector::{
    transport::{
      ButtplugConnectorTransport,
      ButtplugConnectorTransportConnectResult,
      ButtplugConnectorTransportSpecificError,
      ButtplugTransportIncomingMessage,
      ButtplugTransportOutgoingMessage,
    },
    ButtplugConnectorError,
    ButtplugConnectorResultFuture,
  },
  core::messages::serializer::ButtplugSerializedMessage,
  util::async_manager,
};
use futures::{future, SinkExt, StreamExt};
use std::sync::Arc;
use async_channel::Sender;
use async_lock::Mutex;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::spawn_local;
use web_sys::{self, ErrorEvent, MessageEvent, WebSocket};

/// Websocket connector for ButtplugClients, using [async_tungstenite]
pub struct ButtplugBrowserWebsocketClientTransport {
  /// Address of the server we'll connect to.
  address: String,
  disconnect_sender: Arc<Mutex<Sender<ButtplugTransportOutgoingMessage>>>
}

impl ButtplugBrowserWebsocketClientTransport {
  /// Creates a new connector for all addresses
  ///
  /// Returns a websocket connector for connecting over insecure websockets to a
  /// server. Address should be the full URL of the server, i.e.
  /// "ws://127.0.0.1:12345"
  pub fn new(address: &str) -> Self {
    let (unused_sender, _) = bounded(256);
    Self {
      address: address.to_owned(),
      disconnect_sender: Arc::new(Mutex::new(unused_sender))
    }
  }
}

impl ButtplugConnectorTransport for ButtplugBrowserWebsocketClientTransport {
  fn connect(&self) -> ButtplugConnectorTransportConnectResult {
    let (request_sender, request_receiver) = bounded(256);
    let (response_sender, response_receiver) = bounded(256);
    let ws = WebSocket::new(&self.address).unwrap();
    let response_sender_clone = response_sender.clone();
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

    let ws_sender_clone = ws.clone();
    let onopen_callback = Closure::wrap(Box::new(move |_| {
      let recvr_clone = request_receiver.clone();
      let wscs = ws_sender_clone.clone();
      spawn_local(async move {
        while let Ok(msg) = recvr_clone.recv().await {
          match msg {
            ButtplugTransportOutgoingMessage::Message(out_msg) => {
              match out_msg {
                ButtplugSerializedMessage::Text(text) => wscs.send_with_str(&text).unwrap(),
                ButtplugSerializedMessage::Binary(bin) => {
                  // TOOD Make this an error?
                }
              }
            }
            ButtplugTransportOutgoingMessage::Close => {
              wscs.close();
              return;
            }
          };
          // TODO see what happens when we try to send to a remote that's closed connection.
        }
      });
    }) as Box<dyn FnMut(JsValue)>);
    ws.set_onopen(Some(onopen_callback.as_ref().unchecked_ref()));
    onopen_callback.forget();
    let disconnect_sender = self.disconnect_sender.clone();
    Box::pin(async move{
      *disconnect_sender.lock().await = request_sender.clone();
      Ok((request_sender, response_receiver))
    })
  }

  fn disconnect(self) -> ButtplugConnectorResultFuture {
    let disconnect_sender = self.disconnect_sender.clone();
    Box::pin(async move {
      // If we can't send the message, we have no loop, so we're not connected.
      if disconnect_sender
        .lock()
        .await
        .send(ButtplugTransportOutgoingMessage::Close)
        .await
        .is_err()
      {
        Err(ButtplugConnectorError::ConnectorNotConnected)
      } else {
        Ok(())
      }
    })
  }
}
