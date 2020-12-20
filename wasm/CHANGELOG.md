# 1.0.0 Beta 5 (2020/12/13)

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
