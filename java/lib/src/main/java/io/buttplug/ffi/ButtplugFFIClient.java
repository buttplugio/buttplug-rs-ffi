package io.buttplug.ffi;

import com.google.protobuf.InvalidProtocolBufferException;
import io.buttplug.ButtplugException;
import io.buttplug.ButtplugPingException;
import io.buttplug.protos.ButtplugRsFfi.*;
import jnr.ffi.Pointer;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.concurrent.CompletableFuture;

public class ButtplugFFIClient implements AutoCloseable {
    private final ButtplugFFI.LibButtplug buttplug;
    private Pointer pointer;
    // reference kept to prevent garbage collection.
    private ButtplugFFI.FFICallback systemCallback;

    private final FFICallbackFactory factory = new FFICallbackFactory();

    private boolean connected = false;
    private boolean scanning = false;

    private final HashMap<Integer, ButtplugFFIDevice> devices = new HashMap<>();

    ButtplugFFIClient(ButtplugFFI.LibButtplug buttplug, String client_name) {
        this.buttplug = buttplug;
        this.systemCallback = this::handleSystemMessage;
        this.pointer = buttplug.buttplug_create_protobuf_client(client_name, this.systemCallback, null);
    }

    // TODO: fail-safe on garbage collection before client is freed?
    // TODO: what about pending callbacks?
    @Override
    public void close() {
        buttplug.buttplug_free_client(pointer);
        this.systemCallback = null;
        this.pointer = null;
    }

    public boolean isConnected() {
        return connected;
    }

    public boolean isScanning() {
        return scanning;
    }

    // todo: future vs callback?
    private CompletableFuture<ButtplugFFIServerMessage.FFIMessage> sendProtobufMessage(ClientMessage.FFIMessage message) {
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

    private ButtplugFFIDevice createDevice(ServerMessage.DeviceAdded msg) {
        return new ButtplugFFIDevice(buttplug, pointer, msg);
    }

    public CompletableFuture<Void> connect(EmbeddedConnectorOptions options) {
        int manager_types = 0;
        for (EmbeddedConnectorOptions.DeviceCommunicationManager val: options.deviceCommunicationManagerTypes) {
            manager_types |= val.value;
        }

        ClientMessage.FFIMessage.Builder builder = ClientMessage.FFIMessage.newBuilder();
        builder.getConnectLocalBuilder()
                .setServerName(options.serverName)
                .setMaxPingTime(options.maxPingTime)
                .setAllowRawMessages(options.allowRawMessages)
                .setDeviceConfigurationJson(options.deviceConfigJSON)
                .setUserDeviceConfigurationJson(options.userDeviceConfigJSON)
                .setCommManagerTypes(manager_types);

        return sendProtobufMessage(builder.build())
                .thenAccept(ButtplugProtoUtil::to_result)
                .thenRun(() -> connected = true);
    }

    public CompletableFuture<Void> connect(WebsocketConnectorOptions options) {
        ClientMessage.FFIMessage.Builder builder = ClientMessage.FFIMessage.newBuilder();
        builder.getConnectWebsocketBuilder()
                .setAddress(options.networkAddress.toString())
                // TODO: allow this to be configured?
                .setBypassCertVerification(false);

        return sendProtobufMessage(builder.build())
                .thenAccept(ButtplugProtoUtil::to_result)
                .thenRun(() -> connected = true);
    }

    public CompletableFuture<Void> disconnect() {
        ClientMessage.FFIMessage message = ClientMessage.FFIMessage.newBuilder()
                .setDisconnect(ClientMessage.Disconnect.getDefaultInstance())
                .build();

        return sendProtobufMessage(message)
                .thenAccept(ButtplugProtoUtil::to_result)
                .thenRun(() -> {
                    connected = false;
                    // devices.clear()
                });
    }

    public CompletableFuture<Void> startScanning() {
        scanning = true;
        ClientMessage.FFIMessage message = ClientMessage.FFIMessage.newBuilder()
                .setStartScanning(ClientMessage.StartScanning.getDefaultInstance())
                .build();

        return sendProtobufMessage(message)
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    public CompletableFuture<Void> stopScanning() {
        scanning = false;
        ClientMessage.FFIMessage message = ClientMessage.FFIMessage.newBuilder()
                .setStopScanning(ClientMessage.StopScanning.getDefaultInstance())
                .build();

        return sendProtobufMessage(message)
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    public CompletableFuture<Void> stopAllDevices() {
        ClientMessage.FFIMessage message = ClientMessage.FFIMessage.newBuilder()
                .setStopAllDevices(ClientMessage.StopAllDevices.getDefaultInstance())
                .build();

        return sendProtobufMessage(message)
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    public CompletableFuture<Void> ping() {
        ClientMessage.FFIMessage message = ClientMessage.FFIMessage.newBuilder()
                .setPing(ClientMessage.Ping.getDefaultInstance())
                .build();

        return sendProtobufMessage(message)
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    private void handleSystemMessage(Pointer ctx, ByteBuffer ptr, int len) {
        byte[] buf = new byte[len];
        ptr.get(buf);

        try {
            ButtplugFFIServerMessage incoming = ButtplugFFIServerMessage.parseFrom(buf);
            // TODO: is there another way we want to do this?
            CompletableFuture.runAsync(() -> {
                if (incoming.getId() != 0) {
                    // TODO: somehow got non-system message, warn/error?
                    return;
                }

                ButtplugFFIServerMessage.FFIMessage incomingMessage = incoming.getMessage();

                if (incomingMessage.hasServerMessage()) {
                    ServerMessage serverMsg = incomingMessage.getServerMessage();
                    if (serverMsg.hasDeviceAdded()) {
                        ServerMessage.DeviceAdded msg = serverMsg.getDeviceAdded();

                        if (devices.containsKey(msg.getIndex())) {
                            // TODO: error callback
                            return;
                        }

                        devices.put(msg.getIndex(), createDevice(msg));
                        // TODO: device added callback
                    } else if (serverMsg.hasDeviceRemoved()) {
                        ServerMessage.DeviceRemoved msg = serverMsg.getDeviceRemoved();

                        if (!devices.containsKey(msg.getIndex())) {
                            // Device was removed from our map before we could remove it ourselves.
                            return;
                        }

                        devices.remove(msg.getIndex());
                        // TODO: device removed callback
                    } else if (serverMsg.hasDisconnect()) {
                        connected = false;
                        devices.clear();
                        // TODO: disconnect callback
                    } else if (serverMsg.hasScanningFinished()) {
                        scanning = false;
                        // TODO: scanning finished callback
                    } else if (serverMsg.hasError()) {
                        ButtplugException ex = ButtplugException.fromError(serverMsg.getError());
                        if (ex instanceof ButtplugPingException) {
                            // TODO: ping timeout callback
                        }
                        // TODO: error callback
                    } else {
                        // unhandled event?
                        return;
                    }
                } else {
                    // unhandled event?
                    return;
                }
            });
        } catch (InvalidProtocolBufferException ignored) {
            // TODO: log warning/error? Shouldn't really happen.
        }
    }
}
