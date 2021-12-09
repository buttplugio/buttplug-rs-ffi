# 2.0.5 (2021/12/08)

## Features

- Update to Buttplug v5.1 (No named pipe support via FFI yet though.)

# 2.0.4 (2021/08/28)

## Features

- Version roll to fix nuget issue for Windows packaging, no code changes.

# 2.0.3 (2021/08/28)

## Features

- Update to Buttplug v5

# 2.0.2 (2021/05/15)

## Features

- CI now builds for all platforms, so we can upload artifacts for other FFI systems

## Bugfixes

- #76: Remove Drop impls that could cause crashes if logging is turned on.

# 2.0.1 (2021/04/24)

## Bugfixes

- Update to Buttplug v3.0.3
  - Fixes issue with RawWriteCmd JSON schema error

# 2.0.0 (2021/04/22)

## Features

- Change API to use per-call callbacks, with context passed from outside
  - Should clear up issues with Unity linking in IL2CPP, as well as just making the FFI suck less to
    use.
- Update to buttplug-rs v3.0.2
  - Fixes issues with lovense/magic motion battery reading and WASM dependencies

# 1.0.17 (2021/04/11)

## Features

- Update to buttplug-rs v3.0.0
  - Most changes here are internal, in relation to moving to the tokio runtime and splitting between
    tokio/wasm-bindgen.
  - No external API changes, though we will now bringup and shutdown runtimes with client
    creation/drops.

# 1.0.16 (2021/04/04)

## Bugfixes

- Update to buttplug-rs 2.1.9, fixes issues with lovense battery read reliability, windows device
  connections, cleans up some log messages.

# 1.0.15 (2021/03/21)

## Bugfixes

- Update to buttplug-rs 2.1.7, new btleplug version, Lovense Desire Egg support
- Fix issues with scanning status in WASM WebBluetooth Device Comm Manager

# 1.0.14 (2021/02/20)

## Bugfixes

- Update to buttplug-rs 2.1.5, fixes race condition in connect, as well as panic during some device
  disconnections
- #56: Make sure we only register for client events in the Core FFI once, otherwise repeated devices
  can cause faults in upper layer FFI logic.

# 1.0.13 (2021/02/13)

## Features

- Added Hardware Support
  - The Handy

## Bugfixes

- Fix bugs with LoveAi Dolp and Lovense Serial Dongle

# 1.0.12 (2021/02/10)

## Bugfixes

- Fix issue with not being able to set devices to full (1.0) power (via buttplug-rs v2.1.3)
- Bring WASM websocket connector API to v2.1 API
- #54: Fix disconnect handler in WebBluetooth to actually handle disconnects

# 1.0.11 (2021/02/07)

## Bugfixes

- Fix issue with StopAllDevices not running due to Id conflict in in-process instances

# 1.0.10 (2021/02/06)

## Features

- Roll to Buttplug 2.1.1, lots more error handling and tests, adds diamo and nobra support

# 1.0.9 (2021/01/24)

## Bugfixes

- Roll to Buttplug 2.0.5, fixes issue with mishandled serialization in DeviceMessageInfo

# 1.0.8 (2021/01/24)

## Bugfixes

- Roll to Buttplug v2.0.4, fixes issues with WASM delays and XInput device misaddressing

# 1.0.7 (2021/01/21)

## Bugfixes

- Roll to Buttplug v2.0.3, fixes type constraints on client device message types so we don't panic
  when getting deprecated message type attributes.

# 1.0.6 (2021/01/19)

## Bugfixes

- Roll to Buttplug v2.0.2, fixes some scanning lockup issues with the lovense dongle.

# 1.0.5 (2021/01/18)

## Features

- Roll to Buttplug v2.0.1, w/ cleaner event system and init handling
- Add panic logging hooks for native and WASM
- Add console error logging for WebBluetooth scanning.

# 1.0.4 (2021/01/09)

## Features

- Rolling to Buttplug v1.0.5, w/ expanded PrettyLove/Libo/etc support

# 1.0.3 (2021/01/02)

## Features

- Rolling to Buttplug v1.0.4, w/ XInput disconnection events

# 1.0.2 (2021/01/01)

## Features

- Rolling to Buttplug v1.0.3, fixing issues with BTLE device discovery and adding XInput rescanning.

# 1.0.1 (2020/12/31)

## Features

- Rolling to Buttplug v1.0.2, which fixes race conditions with device scanning.

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