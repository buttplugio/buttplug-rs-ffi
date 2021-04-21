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
    // type FFICallback = extern "C" fn(*mut c_void, *const u8, u32);
    @FunctionalInterface
    interface FFICallback {
        @Delegate void callback(Pointer ctx, @In ByteBuffer ptr, @u_int32_t int len);
    }

    // this is the "clean" interface wrapped by FFICallback
    // TODO: think about stream/future instead?
    @FunctionalInterface
    public interface ProtobufSystemCallback {
        void callback(byte[] buf);
    }

    // type LogFFICallback = extern "C" fn(*mut c_void, *const c_char);
    @FunctionalInterface
    public interface LogFFICallback {
        // maybe take Pointer instead of String?
        @Delegate void log(Pointer ctx, String str);
    }

    // package private so that ButtplugFFIClient and ButtplugFFIDevice can make use of it
    interface LibButtplug {
        // ButtplugFFIClient
        Pointer buttplug_create_protobuf_client(String client_name, FFICallback callback, Pointer ctx);
        void buttplug_free_client(Pointer client);
        void buttplug_client_protobuf_message(Pointer client, @Out byte[] buf, @int32_t int buf_len, FFICallback callback, Pointer ctx);

        // ButtplugFFIDevice
        Pointer buttplug_create_device(Pointer client, @u_int32_t int index);
        // TODO: Consider @Pinned
        void buttplug_device_protobuf_message(Pointer device, @Out byte[] buf, @int32_t int buf_len, FFICallback callback, Pointer ctx);
        void buttplug_free_device(Pointer device);

        // ButtplugLogHandle?
        void buttplug_activate_env_logger();
        Pointer buttplug_create_log_handle(LogFFICallback callback, Pointer ctx, String max_level, boolean use_json);
        void buttplug_free_log_handle(Pointer log_handle);
    }

    private final LibButtplug buttplug;

    public ButtplugFFI() {
        this.buttplug = LibraryLoader.create(LibButtplug.class).load("buttplug_rs_ffi");
    }

    public ButtplugFFIClient create_client(ProtobufSystemCallback callback, String client_name) {
        FFICallback cb = (ctx, ptr, len) -> {
            byte[] buf = new byte[len];
            ptr.get(buf);
            callback.callback(buf);
        };

        Pointer client = buttplug.buttplug_create_protobuf_client(client_name, cb, null);
        return new ButtplugFFIClient(buttplug, client, cb);
    }

    public void activate_env_logger() {
        buttplug.buttplug_activate_env_logger();
    }

    // TODO: level enum or something?
    public ButtplugFFILogHandler add_log_handler(LogFFICallback cb, String level, boolean use_json) {
        Pointer handle = buttplug.buttplug_create_log_handle(cb, null, level, use_json);
        return new ButtplugFFILogHandler(buttplug, cb);
    }
}