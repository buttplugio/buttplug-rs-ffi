package io.buttplug;

import jnr.ffi.LibraryLoader;
import jnr.ffi.Pointer;
import jnr.ffi.annotations.Delegate;
import jnr.ffi.annotations.In;
import jnr.ffi.annotations.Out;
import jnr.ffi.types.int32_t;
import jnr.ffi.types.u_int32_t;

import java.lang.FunctionalInterface;
import java.nio.ByteBuffer;

public class ButtplugFFI {
    // type FFICallback = extern "C" fn(*mut c_void, *const u8, u32);
    @FunctionalInterface
    interface FFICallback {
        @Delegate void callback(Pointer ctx, @In ByteBuffer ptr, @u_int32_t int len);
    }

    // package private so that ButtplugClient and ButtplugDevice can make use of it
    interface LibButtplug {
        // ButtplugClient
        Pointer buttplug_create_protobuf_client(String client_name, FFICallback callback, Pointer ctx);
        void buttplug_free_client(Pointer client);
        void buttplug_client_protobuf_message(Pointer client, @Out byte[] buf, @int32_t int buf_len, FFICallback callback, Pointer ctx);

        // ButtplugDevice
        Pointer buttplug_create_device(Pointer client, @u_int32_t int index);
        // TODO: Consider @Pinned
        void buttplug_device_protobuf_message(Pointer device, @Out byte[] buf, @int32_t int buf_len, FFICallback callback, Pointer ctx);
        void buttplug_free_device(Pointer device);

        // ButtplugLogHandle?
        void buttplug_activate_env_logger();
        Pointer buttplug_create_log_handle(ButtplugLogHandler.LogFFICallback callback, Pointer ctx, String max_level, boolean use_json);
        void buttplug_free_log_handle(Pointer log_handle);
    }

    private static LibButtplug buttplug_instance;

    static LibButtplug getButtplugInstance() {
        if (buttplug_instance == null) {
            synchronized (LibButtplug.class) {
                // check again, in case of race.
                if (buttplug_instance == null) {
                    buttplug_instance = LibraryLoader.create(LibButtplug.class).load("buttplug_rs_ffi");
                }
            }
        }

        return buttplug_instance;
    }

    public static void activate_env_logger() {
        getButtplugInstance().buttplug_activate_env_logger();
    }
}