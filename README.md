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

The library currently implements FFI from Rust to the following languages:

- Java

Our current plans are to possibly expand to the following list of languages:

- C/C++

However, for most languages, we recommend natively implementing at Buttplug Client and having it connect to [Intiface Central](https://intiface.com/central). This approach is outlined in the [Buttplug Developer Guide](https://docs.buttplug.io/docs/dev-guide).

## Where's C# and JS go?

C# and JS have been moved back to the [Buttplug C#](https://github.com/buttplugio/buttplug-csharp) and [Buttplug JS](https://github.com/buttplugio/buttplug-js) repos, respectively. Usage of the FFI with these projects didn't work out for users very well, so they've been returned to being completely native client-only implementations, with embedded connections being deprecrecated in preference to having programs connect to [Intiface Central](https://intiface.com/central).

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

## Contributing

If you have issues or feature requests, [please feel free to file an issue on this repo](issues/).

We are not looking for code contributions or pull requests at this time, and will not accept pull
requests that do not have a matching issue where the matter was previously discussed. Pull requests
should only be submitted after talking to [qdot](https://github.com/qdot) via issues on this repo
(or on [discourse](https://discuss.buttplug.io) or [discord](https://discord.buttplug.io) if you
would like to stay anonymous and out of recorded info on the repo) before submitting PRs. Random PRs
without matching issues and discussion are likely to be closed without merging. and receiving
approval to develop code based on an issue. Any random or non-issue pull requests will most likely
be closed without merging.

If you'd like to contribute in a non-technical way, we need money to keep up with supporting the
latest and greatest hardware. We have multiple ways to donate!

- [Patreon](https://patreon.com/qdot)
- [Github Sponsors](https://github.com/sponsors/qdot)
- [Ko-Fi](https://ko-fi.com/qdot76367)

## License

This project is BSD 3-Clause licensed.

```text

Copyright (c) 2016-2023, Nonpolynomial, LLC
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
```