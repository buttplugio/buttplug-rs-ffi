# Buttplug Rust FFI - Core Library

This is where the sausage is made, decoding protobufs from exposed cdecl'd methods and turning them into calls into actual rust stuff.

Abandon all hope, ye who enter here.

## Building for WASM

In order to build this module for use with WASM, the "web_sys_unstable_api" configuration must be
on. If this is not included, compliation will fail due to lack of bluetooth API support (which is unstable in web-sys). To include this, set the rustflags env var as follows:

`RUSTFLAGS="--cfg=web_sys_unstable_apis"`