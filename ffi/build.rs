extern crate flatc_rust;  // or just `use flatc_rust;` with Rust 2018 edition.

use std::fs;
use std::path::Path;

fn main() {
  for file in fs::read_dir("../flatbuffer_schemas/").unwrap() {
    let file_path = file.unwrap().path();
    println!("{}", format!("cargo:rerun-if-changed={}", file_path.display()));
    flatc_rust::run(flatc_rust::Args {
        inputs: &fs::read_dir("../flatbuffer_schemas/").unwrap().map(|x| x.unwrap().path().as_path()).collect(),
        out_dir: Path::new("target/flatbuffers/"),
        ..Default::default()
    }).expect("flatc");
  }
}