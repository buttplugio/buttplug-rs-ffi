package io.buttplug;

import com.sun.jna.Platform;
import com.sun.jna.Pointer;

import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Represents a log callback that the FFI can call to output log messages.
 *
 * Only one should be constructed at a given time.
 */
public class ButtplugLogHandler implements AutoCloseable {
    private Pointer log_handle;
    // reference kept to prevent garbage collection.
    private LogFFICallback callback;

    private static final AtomicBoolean logHandlerActive = new AtomicBoolean(false);

    /**
     * Activates the logger built-in to buttplug, which logs to console.
     *
     * This should not be used in conjunction with an {@link ButtplugLogHandler} instance.
     * This cannot be deactivated once it has been activated.
     */
    public static void activateBuiltinLogger() throws IllegalStateException {
        if (!logHandlerActive.compareAndSet(false, true)) {
            throw new IllegalStateException("There is already an active log handler!");
        }
        try {
            ButtplugFFI.buttplug_activate_env_logger();
        } catch (Throwable ex) {
            throw new RuntimeException("Missing natives for platform: '" + Platform.RESOURCE_PREFIX + "'", ex);
        }
    }

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
    interface LogFFICallback extends com.sun.jna.Callback {
        // maybe take Pointer instead of String?
        void log(Pointer ctx, String str);
    }

    public interface Callback {
        void log(String str);
    }

    public ButtplugLogHandler(Callback cb, ButtplugLogHandler.Level level, boolean use_json) throws IllegalStateException {
        if (!logHandlerActive.compareAndSet(false, true)) {
            throw new IllegalStateException("There is already an active log handler!");
        }

        callback = (ctx, str) -> cb.log(str);
        try {
            log_handle = ButtplugFFI
                    .buttplug_create_log_handle(callback, null, level.value, use_json);
        } catch (Throwable ex) {
            throw new RuntimeException("Missing natives for platform: '" + Platform.RESOURCE_PREFIX + "'", ex);
        }
    }

    @Override
    public void close() {
        if (log_handle != null) {
            ButtplugFFI.buttplug_free_log_handle(log_handle);
            log_handle = null;
            callback = null;

            if (!logHandlerActive.compareAndSet(true, false)) {
                throw new IllegalStateException("No active log handler when closing log handler?!?");
            }
        }
    }
}
