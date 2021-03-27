package io.buttplug.ffi;

import jnr.ffi.Pointer;

class ButtplugFFIDevice implements AutoCloseable {
    private final ButtplugFFI.LibButtplug buttplug;
    private final Pointer pointer;

    ButtplugFFIDevice(ButtplugFFI.LibButtplug buttplug, Pointer pointer) {
        this.buttplug = buttplug;
        this.pointer = pointer;
    }

    @Override
    public void close() throws Exception {
        buttplug.buttplug_free_device(pointer);
    }

    public void parse_device_message(byte[] buf) {
        buttplug.buttplug_parse_device_message(pointer, buf, buf.length);
    }
}