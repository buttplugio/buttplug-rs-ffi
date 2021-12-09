use anyhow::Result;
use vergen::{vergen, Config};

fn main() -> Result<()> {
  prost_build::compile_protos(
    &["../protobuf_schemas/buttplug_rs_ffi.proto"],
    &["src/", "../protobuf_schemas"],
  )
  .unwrap();
  // Setup the flags, toggling off the 'SEMVER_FROM_CARGO_PKG' flag
  let mut flags = Config::default();
  *flags.build_mut().semver_mut() = false;

  vergen(flags)
}
