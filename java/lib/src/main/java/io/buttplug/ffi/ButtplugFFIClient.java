package io.buttplug.ffi;

import io.buttplug.protos.ButtplugRsFfi.ClientMessage;
import jnr.ffi.Pointer;

import java.nio.ByteBuffer;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

public class ButtplugFFIClient implements AutoCloseable {
    private final ButtplugFFI.LibButtplug buttplug;
    private Pointer pointer;
    // reference kept to prevent garbage collection.
    private ButtplugFFI.FFICallback system_callback;
    // callback references used to preserve callbacks until they have been called.
    private final Set<ButtplugFFI.FFICallback> pending_callbacks = ConcurrentHashMap.newKeySet();

    ButtplugFFIClient(ButtplugFFI.LibButtplug buttplug, Pointer pointer, ButtplugFFI.FFICallback system_callback) {
        this.buttplug = buttplug;
        this.pointer = pointer;
        this.system_callback = system_callback;
    }

    // TODO: fail-safe on garbage collection before client is freed?
    // TODO: what about pending callbacks?
    @Override
    public void close() {
        buttplug.buttplug_free_client(pointer);
        this.system_callback = null;
        this.pointer = null;
    }

    // todo: future vs callback?
    CompletableFuture<byte[]> send_protobuf_message(ClientMessage message) {
        CompletableFuture<byte[]> future = new CompletableFuture<>();

        // TODO: hold weak instead of strong reference to future in callback?
        ButtplugFFI.FFICallback cb = new ButtplugFFI.FFICallback() {
            @Override
            public void callback(Pointer ctx, ByteBuffer ptr, int len) {
                try {
                    byte[] buf = new byte[len];
                    ptr.get(buf);
                    future.complete(buf);
                } catch (Throwable ex) {
                    future.completeExceptionally(ex);
                } finally {
                    // we're done, don't need to hold onto a reference anymore.
                    pending_callbacks.remove(this);
                }
            }
        };

        byte[] buf = message.toByteArray();

        // hold onto a reference to the callback until it's been called
        pending_callbacks.add(cb);
        // TODO: pass a static callback and make use of ctx
        //  so that there only needs to be a few generated native stubs (in theory?)
        buttplug.buttplug_client_protobuf_message(pointer, buf, buf.length, cb, null);

        return future;
    }

    public ButtplugFFIDevice create_device(int index) {
        Pointer ptr = buttplug.buttplug_create_device(pointer, index);
        return new ButtplugFFIDevice(buttplug, pointer);
    }
}
