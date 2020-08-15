extern crate flatc_rust; // or just `use flatc_rust;` with Rust 2018 edition.

use std::fs;
use std::path::Path;

fn main() {
    fs::read_dir("../flatbuffer_schemas/")
        .unwrap()
        .for_each(|x| {
            let path = x.unwrap().path();
            flatc_rust::run(flatc_rust::Args {
                inputs: &[path.as_path()],
                out_dir: Path::new("target/flatbuffers/"),
                ..Default::default()
            })
            .expect("flatc");
        });
}
