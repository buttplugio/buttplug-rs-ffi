/*!
 * Buttplug WASM Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright 2020-2021 (c) Nonpolynomial Labs LLC. All rights reserved.
 */

// Godawful hack for CDN support.
//
// Since users are used to being able to include the library off CDNs, I wanted
// to keep supporting that with the new WASM package. Unfortunately WASM
// requires webpack to chunk loading due to the async nature of WASM loads,
// which means dynamic import() calls. In order to make sure the import always
// includes itself on the correct domain, we have to:
//
// - Get the URL of the CDN we're on (via querying the currently processed
//   script. Hacky as hell.)
// - Override Webpack's special __webpack_public_path__ variable with that path.
// - Have the user call the buttplugInit() method to actually load the WASM
//   blob.
//
// Gross, but it does the job.

declare var __webpack_public_path__: any;

var scripts = document.getElementsByTagName( "script" );
var lastScript = scripts[scripts.length - 1].src;
__webpack_public_path__ = lastScript.substr(0, lastScript.lastIndexOf('/') + 1);

export * from "./index";