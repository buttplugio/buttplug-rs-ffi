# Buttplug Rust - FFI for Other Languages

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/qdot)
[![Github donate button](https://img.shields.io/badge/github-donate-ff69b4.svg)](https://www.github.com/sponsors/qdot)
[![Discord](https://img.shields.io/discord/353303527587708932.svg?logo=discord)](https://discord.buttplug.io)
[![Twitter](https://img.shields.io/twitter/follow/buttplugio.svg?style=social&logo=twitter)](https://twitter.com/buttplugio)

<p align="center">
  <img src="https://raw.githubusercontent.com/buttplugio/buttplug-rs-ffi/master/docs/buttplug_rust_docs.png">
</p>

FFI Implementations from the [buttplug-rs](https://github.com/buttplugio/buttplug-rs) Rust Sex Toy
Control Library to other langauges.

If you don't work in Rust but still want to control sex toys, you're in the right place!

## Support The Project

If you find this project helpful, you can [support us via Patreon](http://patreon.com/qdot) or
[Github Sponsors](https://github.com/sponsors/qdot)! Every donation helps us afford more research materials (sex toys).

## FFI Implementations

Finished FFI implementations available in this repo:

- [C#](https://github.com/buttplugio/buttplug-rs-ffi/tree/master/csharp)
- [Javascript/Typescript (Web Only)](https://github.com/buttplugio/buttplug-rs-ffi/tree/master/js)

## Implementation Details

The Buttplug Rust FFI library exposes access to the Buttplug Client API of
[buttplug-rs](https://github.com/buttplugio/buttplug-rs). This allows creation of both in-process
(i.e. run both a Buttplug client/server in the same process, including direct hardware access) and
remote (i.e. use Buttplug Client to talk via Websockets/Pipes/etc to a remote Buttplug server)
Buttplug Clients. From these clients, you can scan for and get back device objects, which allow for
control of devices from the language of your choice.

The usable API surface of Buttplug is fairly small. The bulk of the library consists of internal
configuration, protocol translation, and hardware communication. If the FFI layer seems small,
that's because it is. There really aren't that many entry points into the library itself, which
luckily makes building FFI easy.

For simple type conversion purposes, the FFI layer uses
[protobufs](https://developers.google.com/protocol-buffers). Protobufs provide a simple, fast way to
deal with type differences between many languages, and due to the low frequency of message updates
in buttplug (we might send 100s of messages per second in a system with multiple devices, but
usually its 10s), the overhead of the conversion process isn't too expensive for us. Flatbuffers
were originally considered and implemented for C#, but ended up causing developer friction on
bringup. We don't really need the ability to pick out fields to parse, as we'll always be using the
full message in arguments.

For more information on FFI and Rust using intermediate serialization layers, check out the
following articles:

- [Rust @ Fullstory Part 2](https://bionic.fullstory.com/rust-at-fullstory-part-1/)
- [Rust @ Fullstory Part 2](https://bionic.fullstory.com/rust-at-fullstory-part-2/)
- [Crossing the Rust FFI Frontier with Protocol Buffers](https://hacks.mozilla.org/2019/04/crossing-the-rust-ffi-frontier-with-protocol-buffers/)

The actual FFI layer consists of a few exposed cdecl functions (see the [export.rs file](https://github.com/buttplugio/buttplug-rs-ffi/blob/master/ffi/src/export.rs) for method
definitions) that serve as message passing interfaces in and out of the system. These functions
should handle being called from different threads.

## Implementation Plans

The library currently implements FFI from Rust to the following languages:

- C#
- JS/Typescript for web via WASM and Typescript

Our current plans are to expand to the following list of languages:

- JS/Typescript for Node
- Python
- C/C++
- Swift
- Java
- Go
- Haskell

If you have any languages you would like to see supported, please [file an issue](https://github.com/buttplugio/buttplug-rs-ffi/issues) and let us know.

## Contributing

If you would like to help provide language implementations for buttplug-rs-ffi, [please create an
issue or comment on a related issue in our
tracker](https://github.com/buttplugio/buttplug-rs-ffi/issues).

Please discuss any interest in providing implementations in an issue (or privately with [qdot](https://github.com/qdot) on [discord](https://discord.buttplug.io) or [twitter DMs](https://twitter.com/buttplugio) if you would like to stay anonymous and out of recorded info on the repo) before submitting PRs. Random PRs without matching issues and discussion are likely to be closed without merging.

## License

buttplug-rs-ffi is BSD licensed.

    Copyright (c) 2016-2020, Nonpolynomial Labs, LLC
    All rights reserved.

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright notice, this
      list of conditions and the following disclaimer.

    * Redistributions in binary form must reproduce the above copyright notice,
      this list of conditions and the following disclaimer in the documentation
      and/or other materials provided with the distribution.

    * Neither the name of buttplug nor the names of its
      contributors may be used to endorse or promote products derived from
      this software without specific prior written permission.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
    AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
    FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
    DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
    OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

