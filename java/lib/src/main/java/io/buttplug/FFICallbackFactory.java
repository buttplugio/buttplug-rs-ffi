package io.buttplug;

import io.buttplug.exceptions.ButtplugException;
import io.buttplug.protos.ButtplugRsFfi;
import jnr.ffi.Pointer;

import java.nio.ByteBuffer;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;

// TODO: consider making static or something?
// TODO: generate context instead of callbacks directly?
// TODO: consider moving into ButtplugFFI?
class FFICallbackFactory {
    // callback references used to preserve callbacks until they have been called.
    final Set<ButtplugFFI.FFICallback> pending = ConcurrentHashMap.newKeySet();

    FFICallbackFactory() {
        super();
    }

    ButtplugFFI.FFICallback create(CompletableFuture<ButtplugRsFfi.ButtplugFFIServerMessage.FFIMessage> future) {
        ButtplugFFI.FFICallback cb = new ButtplugFFI.FFICallback() {
            @Override
            public void callback(Pointer ctx, ByteBuffer ptr, int len) {
                try {
                    byte[] buf = new byte[len];
                    ptr.get(buf);

                    ButtplugRsFfi.ButtplugFFIServerMessage.FFIMessage msg = ButtplugRsFfi.ButtplugFFIServerMessage.parseFrom(buf).getMessage();

                    if (msg.hasServerMessage() && msg.getServerMessage().hasError()) {
                        throw ButtplugException.fromError(msg.getServerMessage().getError());
                    }

                    future.complete(msg);
                } catch (Throwable ex) {
                    future.completeExceptionally(ex);
                } finally {
                    // we're done, don't need to hold onto a reference anymore.
                    pending.remove(this);
                }
            }
        };

        pending.add(cb);

        return cb;
    }
}
