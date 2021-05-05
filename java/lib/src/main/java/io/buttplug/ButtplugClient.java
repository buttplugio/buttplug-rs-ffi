package io.buttplug;

import com.google.protobuf.InvalidProtocolBufferException;
import com.sun.jna.Pointer;
import io.buttplug.exceptions.ButtplugDeviceException;
import io.buttplug.exceptions.ButtplugException;
import io.buttplug.exceptions.ButtplugPingException;
import io.buttplug.protos.ButtplugRsFfi.*;

import java.nio.ByteBuffer;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.function.Consumer;

/**
 * Object representing an FFI client instance.
 *
 * Make sure to close this to prevent a leak.
 */
public class ButtplugClient implements AutoCloseable {
    private static final ObjectReferenceManager<ButtplugClient> clientReferenceManager = new ObjectReferenceManager<>();
    private static final ButtplugFFI.FFICallback systemCallback = ButtplugClient::staticSystemMessageHandler;
    private final Pointer systemCallbackCtx;

    // TODO: some sort of weak reference?
    private static final ObjectReferenceManager<CompletableFuture<ButtplugFFIServerMessage.FFIMessage>> resultReferenceManager = new ObjectReferenceManager<>();
    private static final ButtplugFFI.FFICallback resultCallback = ButtplugClient::staticResultHandler;

    private Pointer pointer;

    private boolean connected = false;
    private boolean scanning = false;

    private final HashMap<Integer, ButtplugDevice> devices = new HashMap<>();

    /**
     * Name of the client, used for server UI/permissions.
     */
    public final String name;

    /**
     * Callback fired on Buttplug device added, either after connect or while scanning for devices.
     */
    public Consumer<ButtplugDevice> onDeviceAdded;

    /**
     * Callback fired on Buttplug device removed. Can fire at any time after device connection.
     */
    public Consumer<ButtplugDevice> onDeviceRemoved;

    /**
     * Fires when an error that was not provoked by a client action is received from the server,
     * such as a device exception, message parsing error, etc... Server may possibly disconnect
     * after this event fires.
     */
    public Consumer<ButtplugException> onErrorReceived;

    // Note: these uses of Runnable has nothing to do with threading.
    /**
     * Callback fired when the server has finished scanning for devices.
     */
    public Runnable onScanningFinished;

    /**
     * Callback fired when a server ping timeout has occurred.
     */
    public Runnable onPingTimeout;

    /**
     * Callback fired when a server disconnect has occurred.
     */
    public Runnable onServerDisconnect;

    public ButtplugClient(String client_name) {
        systemCallbackCtx = clientReferenceManager.add(this);
        this.pointer = ButtplugFFI.buttplug_create_protobuf_client(client_name, systemCallback, systemCallbackCtx);
        this.name = client_name;
    }

    /**
     * Frees the FFI Client. If this is not called, then it will leak.
     */
    @Override
    public void close() {
        if (pointer != null) {
            synchronized (this) {
                if (pointer != null) {
                    ButtplugFFI.buttplug_free_client(pointer);
                    this.pointer = null;
                    clientReferenceManager.remove(systemCallbackCtx);
                }
            }
        }
    }

    public boolean isConnected() {
        return connected;
    }

    public boolean isScanning() {
        return scanning;
    }

    /**
     * @return information about devices currently connected to the server.
     */
    public Map<Integer, ButtplugDevice> getDevices() {
        return Collections.unmodifiableMap(devices);
    }

    private CompletableFuture<ButtplugFFIServerMessage.FFIMessage> sendProtobufMessage(ClientMessage.FFIMessage message) {
        if (pointer == null) {
            throw new IllegalStateException("Attempt to send message when client has already been closed!");
        }

        CompletableFuture<ButtplugFFIServerMessage.FFIMessage> future = new CompletableFuture<>();

        byte[] buf = ClientMessage.newBuilder()
                .setId(0xDEAFBEEF)
                .setMessage(message)
                .build()
                .toByteArray();

        ButtplugFFI.buttplug_client_protobuf_message(pointer, buf, new ButtplugFFI.int32_t(buf.length), resultCallback, resultReferenceManager.add(future));

        return future;
    }

    private ButtplugDevice createDevice(ServerMessage.DeviceAdded msg) {
        if (pointer == null) {
            throw new IllegalStateException("Attempt to create device when client has already been closed!");
        }
        return new ButtplugDevice(pointer, msg);
    }

    public CompletableFuture<Void> connect(EmbeddedConnectorOptions options) {
        int manager_types = 0;
        for (EmbeddedConnectorOptions.DeviceCommunicationManager val: options.deviceCommunicationManagerTypes) {
            manager_types |= val.value.getNumber();
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

    private static void staticSystemMessageHandler(Pointer ctx, Pointer ptr, ButtplugFFI.uint32_t len) {
        ButtplugClient client = clientReferenceManager.get(ctx);

        if (client != null) {
            client.handleSystemMessage(ptr.getByteBuffer(0, len.intValue()));
        } else {
            // TODO: what do we do if we receive a call from rust after we have freed the client?
        }
    }

    private void handleSystemMessage(ByteBuffer buf) {
        try {
            ButtplugFFIServerMessage incoming = ButtplugFFIServerMessage.parseFrom(buf);
            // TODO: is there another way we want to do this?
            // Run the response in the context of the Java executor, not the Rust
            // thread. This means that if something goes wrong we at least
            // aren't blocking a rust executor thread.
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
                            if (onErrorReceived != null) {
                                onErrorReceived.accept(new ButtplugDeviceException("A duplicate device index was received. This is most likely a bug, please file at https://github.com/buttplugio/buttplug-rs-ffi"));
                            }
                            return;
                        }

                        ButtplugDevice device = createDevice(msg);
                        devices.put(msg.getIndex(), device);
                        if (onDeviceAdded != null) {
                            onDeviceAdded.accept(device);
                        }
                    } else if (serverMsg.hasDeviceRemoved()) {
                        ServerMessage.DeviceRemoved msg = serverMsg.getDeviceRemoved();

                        if (!devices.containsKey(msg.getIndex())) {
                            // Device was removed from our map before we could remove it ourselves.
                            return;
                        }

                        ButtplugDevice device = devices.remove(msg.getIndex());
                        if (onDeviceRemoved != null) {
                            onDeviceRemoved.accept(device);
                        }
                        device.close();
                    } else if (serverMsg.hasDisconnect()) {
                        connected = false;
                        devices.clear();
                        if (onServerDisconnect != null) {
                            onServerDisconnect.run();
                        }
                    } else if (serverMsg.hasScanningFinished()) {
                        scanning = false;
                        if (onScanningFinished != null) {
                            onScanningFinished.run();
                        }
                    } else if (serverMsg.hasError()) {
                        ButtplugException ex = ButtplugException.fromError(serverMsg.getError());
                        if (ex instanceof ButtplugPingException) {
                            if (onPingTimeout != null) {
                                onPingTimeout.run();
                            }
                            // return?
                        }

                        if (onErrorReceived != null) {
                            onErrorReceived.accept(ex);
                        }
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

    private static void staticResultHandler(Pointer ctx, Pointer ptr, ButtplugFFI.uint32_t len) {
        CompletableFuture<ButtplugFFIServerMessage.FFIMessage> future = resultReferenceManager.get(ctx);

        try {
            ButtplugProtoUtil.protobufResultHandler(future, ptr, len.intValue());
        } finally {
            resultReferenceManager.remove(ctx);
        }
    }
}
