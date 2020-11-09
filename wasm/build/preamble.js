import * as wasmBase64Bytes from "./buttplug_wasm_bg.wasm";
// CUSTOM INITIALIZATION START
function _base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}
let imports = {};
const bytes = _base64ToArrayBuffer(wasmBase64Bytes);
export async function init() {
  const wasmInstanceSource = await WebAssembly.instantiate(bytes , imports);
  const wasmInstance = wasmInstanceSource.instance;
  wasm = wasmInstance.exports;
  wasm.__wbindgen_start();
}
// CUSTOM INITIALIZATION END

// UTIL METHODS
let wasm;

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
  if (idx < 36) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
      cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
  ? function (arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
}
  : function (arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
      read: arg.length,
      written: buf.length
  };
});

function passStringToWasm0(arg, malloc, realloc) {

  if (realloc === undefined) {
      const buf = cachedTextEncoder.encode(arg);
      const ptr = malloc(buf.length);
      getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
      WASM_VECTOR_LEN = buf.length;
      return ptr;
  }

  let len = arg.length;
  let ptr = malloc(len);

  const mem = getUint8Memory0();

  let offset = 0;

  for (; offset < len; offset++) {
      const code = arg.charCodeAt(offset);
      if (code > 0x7F) break;
      mem[ptr + offset] = code;
  }

  if (offset !== len) {
      if (offset !== 0) {
          arg = arg.slice(offset);
      }
      ptr = realloc(ptr, len, len = offset + arg.length * 3);
      const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
      const ret = encodeString(arg, view);

      offset += ret.written;
  }

  WASM_VECTOR_LEN = offset;
  return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
      cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachegetInt32Memory0;
}

function isLikeNone(x) {
  return x === undefined || x === null;
}

let cachegetFloat64Memory0 = null;
function getFloat64Memory0() {
  if (cachegetFloat64Memory0 === null || cachegetFloat64Memory0.buffer !== wasm.memory.buffer) {
      cachegetFloat64Memory0 = new Float64Array(wasm.memory.buffer);
  }
  return cachegetFloat64Memory0;
}

function debugString(val) {
  // primitive types
  const type = typeof val;
  if (type == 'number' || type == 'boolean' || val == null) {
      return  `${val}`;
  }
  if (type == 'string') {
      return `"${val}"`;
  }
  if (type == 'symbol') {
      const description = val.description;
      if (description == null) {
          return 'Symbol';
      } else {
          return `Symbol(${description})`;
      }
  }
  if (type == 'function') {
      const name = val.name;
      if (typeof name == 'string' && name.length > 0) {
          return `Function(${name})`;
      } else {
          return 'Function';
      }
  }
  // objects
  if (Array.isArray(val)) {
      const length = val.length;
      let debug = '[';
      if (length > 0) {
          debug += debugString(val[0]);
      }
      for(let i = 1; i < length; i++) {
          debug += ', ' + debugString(val[i]);
      }
      debug += ']';
      return debug;
  }
  // Test for built-in
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches.length > 1) {
      className = builtInMatches[1];
  } else {
      // Failed to match the standard '[object ClassName]'
      return toString.call(val);
  }
  if (className == 'Object') {
      // we're a user defined class or Object
      // JSON.stringify avoids problems with cycles, and is generally much
      // easier than looping through ownProperties of `val`.
      try {
          return 'Object(' + JSON.stringify(val) + ')';
      } catch (_) {
          return 'Object';
      }
  }
  // errors
  if (val instanceof Error) {
      return `${val.name}: ${val.message}\n${val.stack}`;
  }
  // TODO we could test for more things here, like `Set`s and `Map`s.
  return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
      // First up with a closure we increment the internal reference
      // count. This ensures that the Rust closure environment won't
      // be deallocated while we're invoking it.
      state.cnt++;
      const a = state.a;
      state.a = 0;
      try {
          return f(a, state.b, ...args);
      } finally {
          if (--state.cnt === 0) {
              wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

          } else {
              state.a = a;
          }
      }
  };
  real.original = state;

  return real;
}
// END UTIL METHODS

// START CLOSURE INTERFACES

// END CLOSURE INTERFACES

// START API INTERFACES

// END API INTERFACES

// START IMPORTS

// END IMPORTS