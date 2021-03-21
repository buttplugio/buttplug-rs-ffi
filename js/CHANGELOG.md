# v1.0.14 (2021/03/21)

## Bugfixes

- Actually fix #60 and #51

# v1.0.13 (2021/03/21)

## Features

- Update to buttplug-rs v2.1.7, adds Lovehoney Desire Egg support

## Bugfixes

- #60: Expose Buttplug.Endpoint type publicly so Raw commands are usable
- #59: Client device vibrate() call should take an array of numbers
- #51: Fix ScanningFinished emission for WebBluetooth

# v1.0.12 (2021/02/20)

## Bugfixes

- Actually build the project before publishing this time. This is why I have CI. Why am I hand
  publish the project? (Because I am lazy. So lazy.)

# v1.0.11 (2021/02/20)

## Bugfixes

- Remove publicpath setting in CDN bundler.

# v1.0.10 (2021/02/20)

## Bugfixes

- Implement characteristic read in WebBluetooth WASM
  - Allows us to use the Handy on the web

# v1.0.9 (2021/02/20)

## Bugfixes

- Update to buttplug-rs v2.1.5. The Handy support, client connect race bugfixes, device
  disconnection panic bugfixes.

# v1.0.8 (2021/02/10)

## Features

- Update to buttplug-rs v2.1.3, lots more tests/fixes, Lovense Diamo support
- Update to buttplug-rs-ffi core v1.0.12, fixes disconnect issues in WebBluetooth, updates
  connector API for buttplug-rs v2.1.x API

# v1.0.7 (2021/01/24)

## Bugfixes

- Update to buttplug-rs v2.0.5, fixes issue with DeviceMessageInfo deserialization

# v1.0.6 (2021/01/24)

## Bugfixes

- Print message and bail early if buttplugInit is called again after successful load.
  - This most likely exited quietly without breaking anything before, but now it's at least spewing
    some status too.
- Update to buttplug-rs v2.0.4, fixing issues with native timers being compiled instead of WASM
  timers.

# v1.0.5 (2021/01/22)

## Bugfixes

- #49: Fix issue with incorrect type check on linear commands.

# v1.0.4 (2021/01/21)

## Features

- Update to Buttplug-rs v2.0.3
  - Fixes issues with Strokers/rotators not showing up due to invalid message attributes.

# v1.0.3 (2021/01/18)

## Features

- Update to Buttplug-rs v2.0.0
  - Lovense Ferri support
  - Init/Event API cleanup
- Panic messages/stacks now emitted on WASM panic

# v1.0.2 (2021/01/10)

## Features

- Update to Buttplug-rs v1.0.5, with Libo and Prettylove support

# v1.0.1 (2020/12/29)

## Bugfixes

- Add protobufjs to dependencies, otherwise typescript compilation files during type resolution.

# v1.0.0 (2020/12/27)

## Features

- Update to Buttplug v1, with new device config file format.
- Change package name back to "buttplug"

# v1.0.0 Beta 7 (2020/12/20)

## Bugfixes

- Fix browser websockets not throwing errors on invalid URLs or connection errors.

# v1.0.0 Beta 6 (2020/12/20)

## Bugfixes

- Fix webpack build/load strategies for static (CDN loadable) web package.

# v1.0.0 Beta 5 (2020/12/19)

## Features

- Completely rewrite surface API in Typescript, now uses core protobuf library, same as the other
  FFI layers.
- Added log output capabilities (console only at the moment).

# v1.0.0 Beta 4 (2020/12/05)

## Features

- Actually throw error types instead of just casting to strings. Error types are reduces from Rust's
  verbose enums, but this is good enough.
- Add stop() method to devices.

# v1.0.0 Beta 3 (2020/12/04)

## API Changes

- Make a single connect method on ButtplugClient
  - Brings API closer to other/old implementations
