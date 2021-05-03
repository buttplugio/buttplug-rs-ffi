package io.buttplug;

import com.google.protobuf.ByteString;
import io.buttplug.exceptions.ButtplugDeviceException;
import io.buttplug.protos.ButtplugRsFfi.*;
import jnr.ffi.ObjectReferenceManager;
import jnr.ffi.Pointer;
import jnr.ffi.Runtime;

import java.nio.ByteBuffer;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class ButtplugDevice implements AutoCloseable {
    // TODO: some sort of weak reference?
    private static ObjectReferenceManager<CompletableFuture<ButtplugFFIServerMessage.FFIMessage>> resultReferenceManager;
    private static final ButtplugFFI.FFICallback resultCallback = ButtplugDevice::staticResultHandler;

    private Pointer pointer;
    public final int index;
    public final String name;

    public final Map<MessageAttributes.Type, MessageAttributes> attributes;

    ButtplugDevice(Pointer client, ServerMessage.DeviceAdded msg) {
        ButtplugFFI.LibButtplug buttplug = ButtplugFFI.getButtplugInstance();

        if (resultReferenceManager == null) {
            synchronized (ButtplugDevice.class) {
                if (resultReferenceManager == null) {
                    resultReferenceManager = Runtime.getRuntime(buttplug).newObjectReferenceManager();
                }
            }
        }

        this.pointer = buttplug.buttplug_create_device(client, msg.getIndex());
        this.index = msg.getIndex();
        this.name = msg.getName();

        this.attributes = Collections.unmodifiableMap(
                msg.getMessageAttributesList().stream()
                    .collect(Collectors.toMap(
                            (m) -> MessageAttributes.Type.inverse.get(m.getMessageType()),
                            MessageAttributes::new,
                            (l, r) -> {
                                throw new IllegalArgumentException("Duplicate keys!");
                            },
                            () -> new EnumMap<>(MessageAttributes.Type.class)
                    ))
        );
    }

    @Override
    public void close() {
        if (pointer != null) {
            ButtplugFFI.getButtplugInstance().buttplug_free_device(pointer);
            pointer = null;
        }
    }

    private CompletableFuture<ButtplugFFIServerMessage.FFIMessage> sendProtobufMessage(DeviceMessage.FFIMessage message) {
        if (pointer == null) {
            throw new IllegalStateException("Attempt to send message when device has already been closed!");
        }

        CompletableFuture<ButtplugFFIServerMessage.FFIMessage> future = new CompletableFuture<>();

        byte[] buf = DeviceMessage.newBuilder()
                // NOTE: Index was already unused, ID will more or less be unused given the new context stuff
                .setId(0xDEADBEEF)
                .setIndex(index)
                .setMessage(message)
                .build()
                .toByteArray();

        ButtplugFFI.getButtplugInstance().buttplug_device_protobuf_message(pointer, buf, buf.length, resultCallback, resultReferenceManager.add(future));

        return future;
    }

    private <T> Map<Integer, T> mapFromConst(T val, MessageAttributes.Type ty) {
        // If the message is missing from our map, we should still send anyways just to let the rust library throw.
        int count = 1;
        if (attributes.containsKey(ty)) {
            count = attributes.get(ty).featureCount;
        }

        return IntStream.range(0, count).boxed()
                .collect(Collectors.toMap(Function.identity(), (i) -> val));
    }

    private <T> Map<Integer, T> mapFromIterable(Iterable<T> vals) {
        // java doesn't have zip anywhere i could find, so i guess i'm back to a loop.
        Map<Integer, T> temp = new HashMap<>();
        Iterator<T> iter = vals.iterator();
        for (int index = 0; iter.hasNext(); ++index) {
            temp.put(index, iter.next());
        }

        return temp;
    }

    public CompletableFuture<Void> vibrate(Map<Integer, Double> speeds) {
        DeviceMessage.FFIMessage.Builder builder = DeviceMessage.FFIMessage.newBuilder();
        builder.getVibrateCmdBuilder()
                .addAllSpeeds(
                        speeds.entrySet().stream()
                                .map(
                                        (entry) -> DeviceMessage.VibrateComponent.newBuilder()
                                        .setIndex(entry.getKey())
                                        .setSpeed(entry.getValue())
                                        .build()
                                )
                                .collect(Collectors.toList())
                );

        return sendProtobufMessage(builder.build())
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    public CompletableFuture<Void> vibrate(double speed) {
        return vibrate(mapFromConst(speed, MessageAttributes.Type.VibrateCmd));
    }

    public CompletableFuture<Void> vibrate(Iterable<Double> speeds) {
        return vibrate(mapFromIterable(speeds));
    }

    public static class RotateComponent {
        public double speed;
        public boolean isClockwise;

        public RotateComponent(double speed, boolean isClockwise) {
            this.speed = speed;
            this.isClockwise = isClockwise;
        }

        DeviceMessage.RotateComponent toProtobuf(int index) {
            return DeviceMessage.RotateComponent.newBuilder()
                    .setIndex(index)
                    .setSpeed(speed)
                    .setClockwise(isClockwise)
                    .build();
        }
    }

    public CompletableFuture<Void> rotate(Map<Integer, RotateComponent> components) {
        DeviceMessage.FFIMessage.Builder builder = DeviceMessage.FFIMessage.newBuilder();
        builder.getRotateCmdBuilder()
                .addAllRotations(
                        components.entrySet().stream()
                                .map((entry) -> entry.getValue().toProtobuf(entry.getKey()))
                                .collect(Collectors.toList())
                );

        return sendProtobufMessage(builder.build())
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    public CompletableFuture<Void> rotate(double speed, boolean isClockwise) {
        return rotate(new RotateComponent(speed, isClockwise));
    }

    public CompletableFuture<Void> rotate(RotateComponent component) {
        return rotate(mapFromConst(component, MessageAttributes.Type.RotateCmd));
    }

    public CompletableFuture<Void> rotate(Iterable<RotateComponent> components) {
        return rotate(mapFromIterable(components));
    }

    public static class LinearComponent {
        int duration;
        double position;

        public LinearComponent(int duration, double position) {
            this.duration = duration;
            this.position = position;
        }

        DeviceMessage.LinearComponent toProtobuf(int index) {
            return DeviceMessage.LinearComponent.newBuilder()
                    .setIndex(index)
                    .setDuration(duration)
                    .setPosition(position)
                    .build();
        }
    }

    public CompletableFuture<Void> linear(Map<Integer, LinearComponent> components) {
        DeviceMessage.FFIMessage.Builder builder = DeviceMessage.FFIMessage.newBuilder();
        builder.getLinearCmdBuilder()
                .addAllMovements(
                        components.entrySet().stream()
                                .map((entry) -> entry.getValue().toProtobuf(entry.getKey()))
                                .collect(Collectors.toList())
                );

        return sendProtobufMessage(builder.build())
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    public CompletableFuture<Void> linear(int duration, double speed) {
        return linear(new LinearComponent(duration, speed));
    }

    public CompletableFuture<Void> linear(LinearComponent component) {
        return linear(mapFromConst(component, MessageAttributes.Type.LinearCmd));
    }

    public CompletableFuture<Void> linear(Iterable<LinearComponent> components) {
        return linear(mapFromIterable(components));
    }

    public CompletableFuture<Double> queryBatteryLevel() {
        DeviceMessage.FFIMessage message = DeviceMessage.FFIMessage.newBuilder()
                .setBatteryLevelCmd(DeviceMessage.BatteryLevelCmd.getDefaultInstance())
                .build();

        return sendProtobufMessage(message)
                .thenApply((recv) -> {
                    if (!recv.hasDeviceEvent()) {
                        throw new CompletionException(new ButtplugDeviceException("Expected message type DeviceEvent.BatteryLevelReading, got " + recv.getMsgCase().name() + " instead!"));
                    }

                    if (!recv.getDeviceEvent().hasBatteryLevelReading()) {
                        throw new CompletionException(new ButtplugDeviceException("Expected message type BatteryLevelReading, got " + recv.getDeviceEvent().getMsgCase().name() + " instead!"));
                    }
                    return recv.getDeviceEvent().getBatteryLevelReading().getReading();
                });
    }

    public CompletableFuture<Integer> queryRssiLevel() {
        DeviceMessage.FFIMessage message = DeviceMessage.FFIMessage.newBuilder()
                .setRssiLevelCmd(DeviceMessage.RSSILevelCmd.getDefaultInstance())
                .build();

        return sendProtobufMessage(message)
                .thenApply((recv) -> {
                    if (!recv.hasDeviceEvent()) {
                        throw new CompletionException(new ButtplugDeviceException("Expected message type DeviceEvent.RssiLevelReading, got " + recv.getMsgCase().name() + " instead!"));
                    }

                    if (!recv.getDeviceEvent().hasRssiLevelReading()) {
                        throw new CompletionException(new ButtplugDeviceException("Expected message type RssiLevelReading, got " + recv.getDeviceEvent().getMsgCase().name() + " instead!"));
                    }
                    return recv.getDeviceEvent().getRssiLevelReading().getReading();
                });
    }

    public CompletableFuture<ByteBuffer> rawRead(MessageAttributes.Endpoint endpoint, int expected_length, int timeout) {
        DeviceMessage.FFIMessage.Builder builder = DeviceMessage.FFIMessage.newBuilder();
        builder.getRawReadCmdBuilder()
                .setEndpoint(endpoint.value)
                .setExpectedLength(expected_length)
                // .setData(...) // ???
                .setTimeout(timeout);

        return sendProtobufMessage(builder.build())
                .thenApply((recv) -> {
                    if (!recv.hasDeviceEvent()) {
                        throw new CompletionException(new ButtplugDeviceException("Expected message type DeviceEvent.RawReading, got " + recv.getMsgCase().name() + " instead!"));
                    }

                    if (!recv.getDeviceEvent().hasRawReading()) {
                        throw new CompletionException(new ButtplugDeviceException("Expected message type RawReading, got " + recv.getDeviceEvent().getMsgCase().name() + " instead!"));
                    }
                    return recv.getDeviceEvent().getRawReading().getData().asReadOnlyByteBuffer();
                });
    }

    public CompletableFuture<Void> rawWrite(MessageAttributes.Endpoint endpoint, byte[] data, boolean writeWithResponse) {
        DeviceMessage.FFIMessage.Builder builder = DeviceMessage.FFIMessage.newBuilder();
        builder.getRawWriteCmdBuilder()
                .setEndpoint(endpoint.value)
                .setData(ByteString.copyFrom(data))
                .setWriteWithResponse(writeWithResponse);

        return sendProtobufMessage(builder.build())
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    public CompletableFuture<Void> rawSubscribe(MessageAttributes.Endpoint endpoint) {
        DeviceMessage.FFIMessage.Builder builder = DeviceMessage.FFIMessage.newBuilder();
        builder.getRawSubscribeCmdBuilder()
                .setEndpoint(endpoint.value);

        return sendProtobufMessage(builder.build())
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    public CompletableFuture<Void> rawUnsubscribe(MessageAttributes.Endpoint endpoint) {
        DeviceMessage.FFIMessage.Builder builder = DeviceMessage.FFIMessage.newBuilder();
        builder.getRawUnsubscribeCmdBuilder()
                .setEndpoint(endpoint.value);

        return sendProtobufMessage(builder.build())
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    public CompletableFuture<Void> stopDevice() {
        DeviceMessage.FFIMessage message = DeviceMessage.FFIMessage.newBuilder()
                .setStopDeviceCmd(DeviceMessage.StopDeviceCmd.getDefaultInstance())
                .build();

        return sendProtobufMessage(message)
                .thenAccept(ButtplugProtoUtil::to_result);
    }

    private static void staticResultHandler(Pointer ctx, Pointer ptr, int len) {
        CompletableFuture<ButtplugFFIServerMessage.FFIMessage> future = resultReferenceManager.get(ctx);

        try {
            ButtplugProtoUtil.protobufResultHandler(future, ptr, len);
        } finally {
            resultReferenceManager.remove(ctx);
        }
    }
}