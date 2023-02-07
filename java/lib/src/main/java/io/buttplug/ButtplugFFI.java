package io.buttplug;

import com.sun.jna.*;

import java.lang.FunctionalInterface;
import java.lang.reflect.Method;

/**
 * Class representing the C FFI.
 *
 * Items are either package-private or implementation details.
 */
public class ButtplugFFI {
    // internal details, not part of public API
    public static class int32_t extends IntegerType {
        public static final int32_t ZERO = new int32_t();

        private static final long serialVersionUID = 1L;

        public int32_t() {
            this(0);
        }
        public int32_t(long value) {
            // 4*8 == 32 bits
            super(4, value, false);
        }
    }

    // internal details, not part of public API
    public static class uint32_t extends IntegerType {
        public static final uint32_t ZERO = new uint32_t();

        private static final long serialVersionUID = 1L;

        public uint32_t() {
            this(0);
        }
        public uint32_t(long value) {
            super(4, value, false);
        }
    }

    // type FFICallback = extern "C" fn(*mut c_void, *const u8, u32);
    @FunctionalInterface
    interface FFICallback extends Callback {
        void callback(Pointer ctx, Pointer ptr, uint32_t len);
    }

    // ButtplugClient
    static native Pointer buttplug_create_protobuf_client(String client_name, FFICallback callback, Pointer ctx);
    static native void buttplug_free_client(Pointer client);
    static native void buttplug_client_protobuf_message(Pointer client, byte[] buf, int32_t buf_len, FFICallback callback, Pointer ctx);

    // ButtplugDevice
    static native Pointer buttplug_create_device(Pointer client, uint32_t index);
    static native void buttplug_device_protobuf_message(Pointer device, byte[] buf, int32_t buf_len, FFICallback callback, Pointer ctx);
    static native void buttplug_free_device(Pointer device);

    // ButtplugLogHandler
    static native Pointer buttplug_create_log_handle(ButtplugLogHandler.LogFFICallback callback, Pointer ctx, String max_level, boolean use_json);
    static native void buttplug_free_log_handle(Pointer log_handle);

    static native void buttplug_activate_env_logger();

    static {
        Native.register("buttplug_rs_ffi");
    }
}