// This script makes a few changes to the outputs of pbjs to make them compatible with NodeJS ESM support.

const fs = require("fs");

const header = `// BEGIN_MODULARIZE
// This file was modified by scripts/modularize.js to create Node ESM-compatible bindings.
// Do not modify this file directly as your changes will be overwritten.
// END_MODULARIZE
`;

modularizeProtobufOutput();

process.exit(0);

function isModularized(text, hash) {
    return text.startsWith(`// BEGIN_MODULARIZE${hash ? ` ${hash}` : ""}`);
}

function modularizeProtobufOutput() {
    // For outputs from `pbjs`, we need to add the `.js` file extension to the `prototbufjs/minimal`
    // import to support Node's ESM loader requirements that all file imports include file extensions.

    let infile = "src/buttplug_ffi.js";
    let outfile = "src/buttplug_ffi.js";
    let text = fs.readFileSync(infile, { encoding: "utf8" });
    if (isModularized(text)) {
        console.log(`'${infile}' already modularized, skipping.`);
        return;
    }

    // add header and fix import so that it references `protobufjs/minimal.js`
    text = header + text.replace(`import * as $protobuf from "protobufjs/minimal"`, `import $protobuf from "protobufjs/minimal.js"`);

    // write the changes
    fs.writeFileSync(outfile, text, { encoding: "utf8" });
}
