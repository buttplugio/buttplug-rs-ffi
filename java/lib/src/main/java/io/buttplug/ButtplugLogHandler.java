package io.buttplug;

import jnr.ffi.Pointer;
import jnr.ffi.annotations.Delegate;

public class ButtplugLogHandler implements AutoCloseable {
    private Pointer log_handle;
    // reference kept to prevent garbage collection.
    private LogFFICallback callback;

    public enum Level {
        // Off(null),
        Error("Error"),
        Warn("Warn"),
        Info("Info"),
        Debug("Debug"),
        Trace("Trace");

        final String value;

        Level(String value) {
            this.value = value;
        }
    }

    // type LogFFICallback = extern "C" fn(*mut c_void, *const c_char);
    @FunctionalInterface
    interface LogFFICallback {
        // maybe take Pointer instead of String?
        @Delegate
        void log(Pointer ctx, String str);
    }

    public interface Callback {
        void log(String str);
    }

    public ButtplugLogHandler(Callback cb, ButtplugLogHandler.Level level, boolean use_json) {
        callback = (ctx, str) -> cb.log(str);
        log_handle = ButtplugFFI.getButtplugInstance()
                .buttplug_create_log_handle(callback, null, level.value, use_json);
    }

    @Override
    public void close() {
        if (log_handle != null) {
            ButtplugFFI.getButtplugInstance().buttplug_free_log_handle(log_handle);
            log_handle = null;
            callback = null;
        }
    }
}
