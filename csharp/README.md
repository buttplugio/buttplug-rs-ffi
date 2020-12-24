# Buttplug C# FFI

[![NuGet](https://img.shields.io/nuget/v/Buttplug.svg)](https://www.nuget.org/packages/Buttplug/)

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)
[![Discourse Forum](https://img.shields.io/badge/discourse-forum-blue.svg)](https://metafetish.club)
[![Discord](https://img.shields.io/discord/353303527587708932.svg?logo=discord)](https://discord.buttplug.io)
[![Twitter](https://img.shields.io/twitter/follow/buttplugio.svg?style=social&logo=twitter)](https://twitter.com/buttplugio)

Buttplug is a framework for hooking up hardware to interfaces, where hardware usually means sex
toys, but could honestly be just about anything. Think of it as a userland HID manager for things
that may not specifically be HID, but may go in your butt. 

Or other places too! We're not completely butt-centric, despite the project name. And logo.

## Support The Project

If you find this project helpful, you can [support us via Patreon](http://patreon.com/qdot) or
[Github Sponsors](https://github.com/sponsors/qdot)! Every donation helps us afford more research materials (sex toys).

## Documentation

The [Buttplug Developer Guide](https://buttplug-developer-guide.docs.buttplug.io) is your best source of information for developing with Buttplug. It contains many C# examples using this library.

API documentation coming soon.

## Supported Hardware

See [IOSTIndex.com](https://iostindex.com/?filtersChanged=1&filter0ButtplugSupport=4) (link is filtered for hardware supported by this library) for a list of supported hardware.

## Installation

Buttplug C# can be installed via nuget, using the ["Buttplug" package](https://www.nuget.org/packages/Buttplug/).

The ButtplugFFI library on nuget is a dependency that the main package will bring in, so you do not need to worry about it. At some point when I've taken the time to figure out how to bundle the native libraries in with the C# code, the FFI dependency may be bundled into this package.

Any package with the word "Buttplug" in it that is < v1 can be ignored, the older C# packages were broken into multiple modules. At the moment, Buttplug is a single package that comes with all parts required.

## For Those Upgrading from Buttplug C# v0.x

There are many breaking changes between Buttplug C# v0.x and Buttplug C# >= v1.x. It is recommended you check the examples in the [Developer Guide](https://buttplug-developer-guide.docs.buttplug.io) for updates between v0.x and v1.x+. Most of the logic should be the same, but there are some subtle differences in the API surface.

If you have questions, you can [ask on the discord](https://discord.buttplug.io) or [file an issue](https://github.com/buttplugio/buttplug-rs-ffi/issues).

## A Note on Architecture

Buttplug C# is only about 10% C#. There's enough C# to get us to Rust, but most of Buttplug's logic, including toy control, hardware access, network communications, etc, are in Rust, via [buttplug-rs](https://github.com/buttplugio/buttplug-rs). This means that if something fails in Rust, it may look somewhat opaque in C#. If you find yourself running into these cases, please [file an issue on this repo](https://github.com/buttplugio/buttplug-rs-ffi) and we'll try to get things cleared up. The goal for the future is to return rust panic stacks across the C# boundary for better logging, but this is still something we're working on.

This also means that, unlike Buttplug C# v0.x, we will be packaging native, platform dependent code with the library. The rust code compiles for each platform specifically, so we'll be packaging those platforms in with this library as they are developed and tested.

If you are curious about how the FFI fits together, [see the root README for the project](https://github.com/buttplugio/buttplug-rs-ffi).

## Platform Support and Runtimes

Currently, Buttplug C# only supports Windows x64. This will be changing very soon to also support macOS, linux (x86/ARM), and Windows 32-bit. Our core libraries already support these platforms, but packaging them in a way that makes for seamless cross platform C#/.Net applications is a challenge. 

For more info, [watch this issue in our repo](https://github.com/buttplugio/buttplug-rs-ffi/issues/40).

## Compiling

This repo comes with the necessary VS2019 solution and project files to build the library. Note that any changes to the protobuf or FFI layers will require extra builds and CI coordination. If you think this needs to happen for whatever you're doing, [talk to @qdot in an issue here](https://github.com/buttplugio/buttplug-rs-ffi/issues) or see the Contributions section of this README.

## Unity Support

Unity support for Buttplug is handled in the [Buttplug Unity Repo](https://github.com/buttplugio/buttplug-unity). It is recommended you use that package for Unity integration.

## Support

If you have questions, support is available via:

- [Discord](https://discord.buttplug.io) - This is the best choice for support
- [Mentions/DMs to @buttplugio on twitter](https://twitter.com/buttplugio)

## Contributing

If you have issues or feature requests, please feel free to [file an issue](https://github.com/buttplugio/buttplug-rs-ffi/issues).

We are not looking for code contributions or pull requests at this time, and will not accept pull requests that do not have a matching issue where the matter was previously discussed. Pull requests should only be submitted after talking to [qdot](https://github.com/qdot) via issues (or on [discord](https://discord.buttplug.io) or [twitter DMs](https://twitter.com/buttplugio) if you would like to stay anonymous and out of recorded info on the repo) before submitting PRs. Random PRs without matching issues and discussion are likely to be closed without merging. and receiving approval to develop code based on an issue. Any random or non-issue pull requests will most likely be closed without merging.

## License

Buttplug is BSD 3-Clause licensed. More information is available in
the LICENSE file.
