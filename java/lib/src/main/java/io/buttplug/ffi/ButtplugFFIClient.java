package io.buttplug.ffi;

import jnr.ffi.Pointer;

public class ButtplugFFIClient implements AutoCloseable {
    private final ButtplugFFI.LibButtplug buttplug;
    private final Pointer pointer;

    ButtplugFFIClient(ButtplugFFI.LibButtplug buttplug, Pointer pointer) {
        this.buttplug = buttplug;
        this.pointer = pointer;
    }

    @Override
    public void close() throws Exception {
        buttplug.buttplug_free_client(pointer);
    }

    public void parse_client_message(byte[] buf) {
        buttplug.buttplug_parse_client_message(pointer, buf, buf.length);
    }

    public ButtplugFFIDevice create_device(int index) {
        Pointer ptr = buttplug.buttplug_create_device(pointer, index);
        return new ButtplugFFIDevice(buttplug, pointer);
    }
}
