package io.buttplug.ffi;

import io.buttplug.protos.ButtplugRsFfi.*;
import jnr.ffi.Pointer;

import java.util.EnumMap;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;
import java.util.function.IntUnaryOperator;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

class ButtplugFFIDevice implements AutoCloseable {
    private final ButtplugFFI.LibButtplug buttplug;
    private final Pointer pointer;
    public final int index;

    private final FFICallbackFactory factory = new FFICallbackFactory();
    private final EnumMap<MessageAttributes.Type, MessageAttributes> attributes;

    ButtplugFFIDevice(ButtplugFFI.LibButtplug buttplug, Pointer client, ServerMessage.DeviceAdded msg) {
        this.buttplug = buttplug;
        this.pointer = buttplug.buttplug_create_device(client, msg.getIndex());
        this.index = msg.getIndex();

        this.attributes = msg.getMessageAttributesList().stream()
                .collect(Collectors.toMap(
                        (m) -> MessageAttributes.Type.inverse.get(m.getMessageTypeValue()),
                        MessageAttributes::new,
                        (l, r) -> {
                            throw new IllegalArgumentException("Duplicate keys!");
                        },
                        () -> new EnumMap<>(MessageAttributes.Type.class)
                ));
    }

    // TODO: fail-safe on garbage collection before client is freed?
    // TODO: what about pending callbacks?
    @Override
    public void close() {
        buttplug.buttplug_free_device(pointer);
    }

    // TODO: split out Error, Ok, and DeviceEvent to make things easier?
    private CompletableFuture<ButtplugFFIServerMessage.FFIMessage> sendProtobufMessage(DeviceMessage.FFIMessage message) {
        CompletableFuture<ButtplugFFIServerMessage.FFIMessage> future = new CompletableFuture<>();
        ButtplugFFI.FFICallback cb = factory.create(future);

        byte[] buf = DeviceMessage.newBuilder()
                // TODO: Index was already unused, ID will more or less be unused given the new context stuff
                .setId(0xDEADBEEF)
                .setIndex(index)
                .setMessage(message)
                .build()
                .toByteArray();

        // TODO: maybe pass a static callback and make use of ctx
        //  so that there only needs to be a few generated native stubs?
        buttplug.buttplug_device_protobuf_message(pointer, buf, buf.length, cb, null);

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

    public CompletableFuture<Void> stopDevice() {
        DeviceMessage.FFIMessage message = DeviceMessage.FFIMessage.newBuilder()
                .setStopDeviceCmd(DeviceMessage.StopDeviceCmd.getDefaultInstance())
                .build();

        return sendProtobufMessage(message)
                .thenAccept(ButtplugProtoUtil::to_result);
    }
}