# Buttplug Rust FFI - WASM/Typescript/Javascript

[![NPM](https://img.shields.io/npm/v/buttplug.svg)](https://www.npmjs.com/package/buttplug)

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

The [Buttplug Developer Guide](https://buttplug-developer-guide.docs.buttplug.io) is your best
source of information for developing with Buttplug. It contains many Javascript examples using this
library.

API documentation coming soon.

## Supported Hardware

See [IOSTIndex.com](https://iostindex.com/?filtersChanged=1&filter0ButtplugSupport=4) (link is filtered for hardware supported by this library) for a list of supported hardware.

## Installation

For node/webpack applications, Buttplug JS can be installed via npm, using the ["Buttplug" package](https://www.npmjs.com/package/buttplug)

For using Buttplug directly on the web, it can be included from a CDN. See the "Using Buttplug On the Web" section below.

Any package with the word "Buttplug" in it that is < v1 can be ignored, the older JS packages were broken into multiple modules to support native node. At the moment, Buttplug is a single package that comes with all parts required for the web, and the node packages are deprecated.

## For Those Upgrading from Buttplug JS v0.x

There are many breaking changes between Buttplug JS v0.x and Buttplug JS >= v1.x. It is recommended you check the examples in the [Developer Guide](https://buttplug-developer-guide.docs.buttplug.io) for updates between v0.x and v1.x+. Most of the logic should be the same, but there are some subtle differences in the API surface.

If you have questions, you can [ask on the discord](https://discord.buttplug.io) or [file an issue](https://github.com/buttplugio/buttplug-rs-ffi/issues).

## A Note on Architecture

Buttplug JS is only about 10% JS. There's enough JS (ok actually it's typescript) to get us to Rust, but most of Buttplug's logic, including toy control, hardware access, network communications, etc, are in Rust, via [buttplug-rs](https://github.com/buttplugio/buttplug-rs) that is compiled to WASM. This means that if something fails in Rust/WASM, it may look somewhat opaque in JS. If you find yourself running into these cases, please [file an issue on this repo](https://github.com/buttplugio/buttplug-rs-ffi) and we'll try to get things cleared up. The goal for the future is to return rust panic stacks across the WASM boundary for better logging, but this is still something we're working on.

If you are curious about how the FFI fits together, [see the root README for the project](https://github.com/buttplugio/buttplug-rs-ffi).

## Platform Support and Runtimes

Currently, Buttplug JS only supports usage on the web, either via packed web applications, or directly in webpages. Native Node access will be happening at some point in the future. For more info on native node access, [watch this issue in our repo](https://github.com/buttplugio/buttplug-rs-ffi/issues/11).

## Using Buttplug With Webpack

Packing Buttplug in Webpack may require some extra work, as Buttplug JS involves WASM, which means asynchronous loading and asset finding.

The first issue you may run into is with asset loading, as webpack can only be so smart about where the WASM blob is. If you don't set the `output.publicPath` webpack configuration, you'll possibly have issues with the WASM loader not being able to find the blob (resulting in 404 errors in your web console and your app not loading). You've got 2 choices here:

* If you know where your application will reside on your server and that location will never change, set `output.publicPath` in your webpack configuration to match where your generated webpack files will be. For instance, if you have webpack building chunks to `dist`, your `output.publicPath` would be `/dist/`. 
* To handle your application being at *any* path, add the following code block and make sure it is run _before_ running `buttplugInit()`. This is a hack that finds the URL the current JS file is being loaded from, and uses that to load the WASM blob.

```javascript
// If using typescript, uncomment this declare line
declare var __webpack_public_path__: any;

var scripts = document.getElementsByTagName( "script" );
var lastScript = scripts[scripts.length - 1].src;
__webpack_public_path__ = lastScript.substr(0, lastScript.lastIndexOf('/') + 1);
```

After setting up your loading, you'll need to call buttplugInit() and make sure it succeeds before calling into Buttplug:

```javascript
// This could also be awaited, just depends on your calling context.
buttplugInit().then(() => console.log("Ready to set up buttplug calls!"));
```

This will asynchronously load the library, in a way that webpack shouldn't complain about.

Note that this has only been tested in Webpack 4. Webpack 5 has a mechanism for automating asynchronous loading, but this has not been experimented with in buttplug-js yet. If you try this and have suggestions, [please file an issue and let us know](https://github.com/buttplugio/buttplug-rs-ffi/issues).

If you are using Webpack 5, you may need to use Webpack 4 style WASM loading for the time being. Add the following to your webpack config:

```javascript
// Needed for webpack 5 only
experiments.syncWebAssembly: true
```

If you're seeing MIME issues (i.e. "unknown type" when trying load your app), you may need to set the MIME type in the Webpack configuration file. Add the following block to your rules object:

```javascript
{
    test: /\.wasm$/,
    type: "webassembly/experimental"
}
```

If you still run into problems, [file an issue](https://github.com/buttplugio/buttplug-rs-ffi/issues) 

## Using Buttplug On The Web

Using the precompiled Buttplug library from a webpage (i.e. loading it as a script in an HTML file) will bring in a global named `Buttplug`. You'll need to run the init method in order to load the rest of the library from WASM, otherwise no calls to the library will work.

```html
<!-- Change library version here to match current NPM version -->
<script lang="javascript" 
   src="https://cdn.jsdelivr.net/npm/buttplug@1.0.1/dist/web/buttplug.min.js">
</script>
<script lang="javascript">
  Buttplug.buttplugInit().then(() => console.log("Library loaded"));
</script>
```

Each of the examples in the [Developer Guide](https://buttplug-developer-guide.docs.buttplug.io) contain this call, in order to make every example complete.

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
