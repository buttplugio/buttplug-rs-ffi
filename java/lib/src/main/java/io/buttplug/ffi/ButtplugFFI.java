package io.buttplug.ffi;

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
    // type FFICallback = extern "C" fn(*const u8, u32);
    @FunctionalInterface
    private interface FFICallback {
        @Delegate void callback(@In ByteBuffer ptr, @u_int32_t int len);
    }

    // this is the "clean" interface wrapped by FFICallback
    @FunctionalInterface
    public interface CreateClientCallback {
        void callback(byte[] buf);
    }

    // type LogFFICallback = extern "C" fn(*const c_char);
    @FunctionalInterface
    public interface LogFFICallback {
        // maybe take Pointer instead of String?
        @Delegate void log(String str);
    }

    // package private so that ButtplugFFIClient and ButtplugFFIDevice can make use of it
    interface LibButtplug {
        // NOTE: ButtplugFFIClient
        Pointer buttplug_create_client(FFICallback callback, String client_name);
        void buttplug_free_client(Pointer client);
        // TODO: consider @Pinned
        void buttplug_parse_client_message(Pointer client, @Out byte[] buf, @int32_t int buf_len);

        // NOTE: ButtplugFFIDevice
        Pointer buttplug_create_device(Pointer client, @u_int32_t int index);
        // TODO: Consider @Pinned
        void buttplug_parse_device_message(Pointer device, @Out byte[] buf, @int32_t int buf_len);
        void buttplug_free_device(Pointer device);

        void buttplug_activate_env_logger();
        void buttplug_add_log_handler(LogFFICallback callback, String max_level, boolean use_json);
    }

    private final LibButtplug buttplug;

    public ButtplugFFI() {
        this.buttplug = LibraryLoader.create(LibButtplug.class).load("TODO");
    }

    public ButtplugFFIClient create_client(CreateClientCallback callback, String client_name) {
        FFICallback cb = new FFICallback() {
            @Override
            public void callback(ByteBuffer ptr, int len) {
                byte[] buf = new byte[len];
                ptr.get(buf);
                callback.callback(buf);
            }
        };

        Pointer client = buttplug.buttplug_create_client(cb, client_name);
        return new ButtplugFFIClient(buttplug, client);
    }

    public void activate_env_logger() {
        buttplug.buttplug_activate_env_logger();
    }

    // TODO: level enum or something?
    public void add_log_handler(LogFFICallback cb, String level, boolean use_json) {
        buttplug.buttplug_add_log_handler(cb, level, use_json);
    }
}