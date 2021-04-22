package io.buttplug.ffi;

import io.buttplug.protos.ButtplugRsFfi.*;
import jnr.ffi.Pointer;

import java.util.concurrent.CompletableFuture;

class ButtplugFFIDevice implements AutoCloseable {
    private final ButtplugFFI.LibButtplug buttplug;
    private final Pointer pointer;
    public final int index;

    private final FFICallbackFactory factory = new FFICallbackFactory();

    ButtplugFFIDevice(ButtplugFFI.LibButtplug buttplug, Pointer pointer, int index) {
        this.buttplug = buttplug;
        this.pointer = pointer;
        this.index = index;
    }

    // TODO: fail-safe on garbage collection before client is freed?
    // TODO: what about pending callbacks?
    @Override
    public void close() {
        buttplug.buttplug_free_device(pointer);
    }

    // TODO: split out Error, Ok, and DeviceEvent to make things easier?
    private CompletableFuture<ButtplugFFIServerMessage.FFIMessage> send_protobuf_message(DeviceMessage.FFIMessage message) {
        CompletableFuture<ButtplugFFIServerMessage.FFIMessage> future = new CompletableFuture<>();
        ButtplugFFI.FFICallback cb = factory.create(future);

        byte[] buf = DeviceMessage.newBuilder()
                // TODO: Index was already unused, ID will more or less be unused given the new context stuff
                .setId(0xDEADBEEF)
                .setIndex(index)
                .setMessage(message)
                .build()
                .toByteArray();

        // TODO: pass a static callback and make use of ctx
        //  so that there only needs to be a few generated native stubs (in theory?)
        buttplug.buttplug_device_protobuf_message(pointer, buf, buf.length, cb, null);

        return future;
    }

    public CompletableFuture<Void> send_stop_device_cmd() {
        DeviceMessage.FFIMessage message = DeviceMessage.FFIMessage.newBuilder()
                .setStopDeviceCmd(DeviceMessage.StopDeviceCmd.getDefaultInstance())
                .build();

        return send_protobuf_message(message)
                .thenAccept(ButtplugProtoUtil::to_result);
    }
}