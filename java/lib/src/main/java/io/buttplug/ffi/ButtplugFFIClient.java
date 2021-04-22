package io.buttplug.ffi;

import io.buttplug.protos.ButtplugRsFfi.*;
import jnr.ffi.Pointer;

import java.util.concurrent.CompletableFuture;

public class ButtplugFFIClient implements AutoCloseable {
    private final ButtplugFFI.LibButtplug buttplug;
    private Pointer pointer;
    // reference kept to prevent garbage collection.
    private ButtplugFFI.FFICallback system_callback;

    private final FFICallbackFactory factory = new FFICallbackFactory();

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
    private CompletableFuture<ButtplugFFIServerMessage.FFIMessage> send_protobuf_message(ClientMessage.FFIMessage message) {
        CompletableFuture<ButtplugFFIServerMessage.FFIMessage> future = new CompletableFuture<>();

        // TODO: hold weak instead of strong reference to future in callback?
        ButtplugFFI.FFICallback cb = factory.create(future);

        byte[] buf = ClientMessage.newBuilder()
                .setId(0xDEAFBEEF)
                .setMessage(message)
                .build()
                .toByteArray();

        // TODO: pass a static callback and make use of ctx
        //  so that there only needs to be a few generated native stubs (in theory?)
        buttplug.buttplug_client_protobuf_message(pointer, buf, buf.length, cb, null);

        return future;
    }

    public ButtplugFFIDevice create_device(int index) {
        Pointer ptr = buttplug.buttplug_create_device(pointer, index);
        return new ButtplugFFIDevice(buttplug, pointer, index);
    }

    public CompletableFuture<Void> send_ping() {
        ClientMessage.FFIMessage message = ClientMessage.FFIMessage.newBuilder()
                .setPing(ClientMessage.Ping.getDefaultInstance())
                .build();

        return send_protobuf_message(message)
                .thenAccept(ButtplugProtoUtil::to_result);
    }
}
