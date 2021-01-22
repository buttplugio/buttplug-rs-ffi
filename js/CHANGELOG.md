# 1.0.4 (2021/01/21)

## Features

- Update to Buttplug-rs v2.0.3
  - Fixes issues with Strokers/rotators not showing up due to invalid message attributes.

# 1.0.3 (2021/01/18)

## Features

- Update to Buttplug-rs v2.0.0
  - Lovense Ferri support
  - Init/Event API cleanup
- Panic messages/stacks now emitted on WASM panic

# 1.0.2 (2021/01/10)

## Features

- Update to Buttplug-rs v1.0.5, with Libo and Prettylove support

# 1.0.1 (2020/12/29)

## Bugfixes

- Add protobufjs to dependencies, otherwise typescript compilation files during type resolution.

# 1.0.0 (2020/12/27)

## Features

- Update to Buttplug v1, with new device config file format.
- Change package name back to "buttplug"

# 1.0.0 Beta 7 (2020/12/20)

## Bugfixes

- Fix browser websockets not throwing errors on invalid URLs or connection errors.

# 1.0.0 Beta 6 (2020/12/20)

## Bugfixes

- Fix webpack build/load strategies for static (CDN loadable) web package.

# 1.0.0 Beta 5 (2020/12/19)

## Features

- Completely rewrite surface API in Typescript, now uses core protobuf library, same as the other
  FFI layers.
- Added log output capabilities (console only at the moment).

# 1.0.0 Beta 4 (2020/12/05)

## Features

- Actually throw error types instead of just casting to strings. Error types are reduces from Rust's
  verbose enums, but this is good enough.
- Add stop() method to devices.

# 1.0.0 Beta 3 (2020/12/04)

## API Changes

- Make a single connect method on ButtplugClient
  - Brings API closer to other/old implementations
