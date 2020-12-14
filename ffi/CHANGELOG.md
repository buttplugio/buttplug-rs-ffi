# 1.0.0 Beta 5 (12/13/2020)

## Features

- Updated logging to work with WASM or generic cdecl callbacks.
  - WASM currently only logs to console, cdecl does whatever. This will change in the future.
  - Allows for choice between JSON and string.

# 1.0.0 Beta 4 (12/11/2020)

## Features

- WebBluetooth landed and shipped in web-sys, update web-sys dependency to live in crates now.
- Integrate WASM (WebBluetooth/Websockets) connectors/comm managers into main library, in
  preparation for shipping the new typescript WASM layer.

## Bugfixes

- ScanningFinished and ServerDisconnect now actually emit when they're supposed to.