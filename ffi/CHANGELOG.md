# 1.0.0 (2020/12/27)

## Features

- Rolling to Buttplug v1.0.1, which uses the new device config file format with file versions, etc.

# 1.0.0 Beta 5 (2020/12/13)

## Features

- Updated logging to work with WASM or generic cdecl callbacks.
  - WASM currently only logs to console, cdecl does whatever. This will change in the future.
  - Allows for choice between JSON and string.

# 1.0.0 Beta 4 (2020/12/11)

## Features

- WebBluetooth landed and shipped in web-sys, update web-sys dependency to live in crates now.
- Integrate WASM (WebBluetooth/Websockets) connectors/comm managers into main library, in
  preparation for shipping the new typescript WASM layer.

## Bugfixes

- ScanningFinished and ServerDisconnect now actually emit when they're supposed to.

# 1.0.0 Beta 2/3 (sometime in December 2020)

## Features

- I probably did some important stuff, but since this has no real release mechanism outside of the
  C# FFI Nuget at the moment, it's not well documented. :(

# 1.0.0 Beta 1 (2020/11/21)

## Features

- Basic Protobuf based system for FFI.