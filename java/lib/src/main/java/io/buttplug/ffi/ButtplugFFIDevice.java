package io.buttplug.ffi;

import io.buttplug.protos.ButtplugRsFfi.DeviceMessage;
import jnr.ffi.Pointer;

import java.nio.ByteBuffer;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

class ButtplugFFIDevice implements AutoCloseable {
    private final ButtplugFFI.LibButtplug buttplug;
    private final Pointer pointer;
    // callback references used to preserve callbacks until they have been called.
    private final Set<ButtplugFFI.FFICallback> pending_callbacks = ConcurrentHashMap.newKeySet();

    ButtplugFFIDevice(ButtplugFFI.LibButtplug buttplug, Pointer pointer) {
        this.buttplug = buttplug;
        this.pointer = pointer;
    }

    // TODO: fail-safe on garbage collection before client is freed?
    // TODO: what about pending callbacks?
    @Override
    public void close() {
        buttplug.buttplug_free_device(pointer);
    }

    CompletableFuture<byte[]> send_protobuf_message(DeviceMessage message) {
        CompletableFuture<byte[]> future = new CompletableFuture<>();

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

        pending_callbacks.add(cb);
        // TODO: pass a static callback and make use of ctx
        //  so that there only needs to be a few generated native stubs (in theory?)
        buttplug.buttplug_device_protobuf_message(pointer, buf, buf.length, cb, null);

        return future;
    }
}