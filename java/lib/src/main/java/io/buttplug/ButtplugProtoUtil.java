package io.buttplug;

import io.buttplug.exceptions.ButtplugException;
import io.buttplug.exceptions.ButtplugMessageException;
import io.buttplug.protos.ButtplugRsFfi.*;
import jnr.ffi.Pointer;

import java.nio.ByteBuffer;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;

// TODO: consider moving into ButtplugFFI?
class ButtplugProtoUtil {
    static void to_result(ButtplugFFIServerMessage.FFIMessage msg) throws CompletionException {
        Exception ex;
        if (msg.hasServerMessage()) {
            if (msg.getServerMessage().hasOk()) {
                return;
            } else {
                ex = new ButtplugMessageException("Expected 'Ok', received system message");
            }
        } else {
            ex = new ButtplugMessageException("Expected 'Ok', received device event");
        }
        throw new CompletionException(ex);
    }

    static void protobufResultHandler(CompletableFuture<ButtplugFFIServerMessage.FFIMessage> future, Pointer ptr, int len) {
        byte[] buf = new byte[len];
        ptr.get(0, buf, 0, len);
        try {
            ButtplugFFIServerMessage.FFIMessage msg = ButtplugFFIServerMessage.parseFrom(buf).getMessage();

            if (msg.hasServerMessage() && msg.getServerMessage().hasError()) {
                throw ButtplugException.fromError(msg.getServerMessage().getError());
            }

            future.complete(msg);
        } catch (Throwable ex) {
            future.completeExceptionally(ex);
        }

        // wrappers handle pending removal
    }
}
