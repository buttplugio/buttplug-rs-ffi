package io.buttplug.ffi;

import jnr.ffi.Pointer;

public class ButtplugFFILogHandler implements AutoCloseable {
    private final ButtplugFFI.LibButtplug buttplug;
    private Pointer log_handle;
    // reference kept to prevent garbage collection.
    private ButtplugFFI.LogFFICallback callback;

    ButtplugFFILogHandler(ButtplugFFI.LibButtplug buttplug, ButtplugFFI.LogFFICallback callback) {
        this.buttplug = buttplug;
        this.callback = callback;
    }

    // TODO: fail-safe on garbage collection before client is freed?
    @Override
    public void close() {
        buttplug.buttplug_free_log_handle(log_handle);
        log_handle = null;
        callback = null;
    }
}
