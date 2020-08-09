extern crate flatc_rust;  // or just `use flatc_rust;` with Rust 2018 edition.

use std::path::Path;

fn main() {
  for file in &["flatbuffer_client.fbs", "flatbuffer_server.fbs", "flatbuffer_create_client.fbs"] {
    let file_path = format!("../flatbuffer_schemas/{}", file);
    println!("{}", format!("cargo:rerun-if-changed={}", file_path));
    flatc_rust::run(flatc_rust::Args {
        inputs: &[Path::new(&file_path)],
        out_dir: Path::new("target/flatbuffers/"),
        ..Default::default()
    }).expect("flatc");
  }
}