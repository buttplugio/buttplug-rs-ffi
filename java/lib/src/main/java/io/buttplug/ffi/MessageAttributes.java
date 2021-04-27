package io.buttplug.ffi;

import io.buttplug.protos.ButtplugRsFfi;
import io.buttplug.protos.ButtplugRsFfi.ServerMessage;
import io.buttplug.protos.ButtplugRsFfi.ServerMessage.MessageAttributeType;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class MessageAttributes {
    public enum Type {
        VibrateCmd(MessageAttributeType.VibrateCmd),
        RotateCmd(MessageAttributeType.RotateCmd),
        LinearCmd(MessageAttributeType.LinearCmd),
        StopDeviceCmd(MessageAttributeType.StopDeviceCmd),
        RawReadCmd(MessageAttributeType.RawReadCmd),
        RawWriteCmd(MessageAttributeType.RawWriteCmd),
        RawSubscribeCmd(MessageAttributeType.RawSubscribeCmd),
        RawUnsubscribeCmd(MessageAttributeType.RawUnsubscribeCmd),
        BatteryLevelCmd(MessageAttributeType.BatteryLevelCmd),
        RSSILevelCmd(MessageAttributeType.RSSILevelCmd);

        final MessageAttributeType value;

        final static EnumMap<MessageAttributeType, Type> inverse = Arrays.stream(Type.values())
                .collect(
                        Collectors.toMap(
                                (v) -> v.value,
                                Function.identity(),
                                (l, r) -> {
                                    throw new IllegalArgumentException("Duplicate keys!");
                                },
                                () -> new EnumMap<>(MessageAttributeType.class)
                        )
                );

        Type(MessageAttributeType value) {
            this.value = value;
        }
    }

    public enum Endpoint {
        Command(ButtplugRsFfi.Endpoint.Command),
        Firmware(ButtplugRsFfi.Endpoint.Firmware),
        Rx(ButtplugRsFfi.Endpoint.Rx),
        RxAccel(ButtplugRsFfi.Endpoint.RxAccel),
        RxBLEBattery(ButtplugRsFfi.Endpoint.RxBLEBattery),
        RxPressure(ButtplugRsFfi.Endpoint.RxPressure),
        RxTouch(ButtplugRsFfi.Endpoint.RxTouch),
        Tx(ButtplugRsFfi.Endpoint.Tx),
        TxMode(ButtplugRsFfi.Endpoint.TxMode),
        TxShock(ButtplugRsFfi.Endpoint.TxShock),
        TxVibrate(ButtplugRsFfi.Endpoint.TxVibrate),
        TxVendorControl(ButtplugRsFfi.Endpoint.TxVendorControl),
        Whitelist(ButtplugRsFfi.Endpoint.Whitelist),
        Generic0(ButtplugRsFfi.Endpoint.Generic0),
        Generic1(ButtplugRsFfi.Endpoint.Generic1),
        Generic2(ButtplugRsFfi.Endpoint.Generic2),
        Generic3(ButtplugRsFfi.Endpoint.Generic3),
        Generic4(ButtplugRsFfi.Endpoint.Generic4),
        Generic5(ButtplugRsFfi.Endpoint.Generic5),
        Generic6(ButtplugRsFfi.Endpoint.Generic6),
        Generic7(ButtplugRsFfi.Endpoint.Generic7),
        Generic8(ButtplugRsFfi.Endpoint.Generic8),
        Generic9(ButtplugRsFfi.Endpoint.Generic9),
        Generic10(ButtplugRsFfi.Endpoint.Generic10),
        Generic11(ButtplugRsFfi.Endpoint.Generic11),
        Generic12(ButtplugRsFfi.Endpoint.Generic12),
        Generic13(ButtplugRsFfi.Endpoint.Generic13),
        Generic14(ButtplugRsFfi.Endpoint.Generic14),
        Generic15(ButtplugRsFfi.Endpoint.Generic15),
        Generic16(ButtplugRsFfi.Endpoint.Generic16),
        Generic17(ButtplugRsFfi.Endpoint.Generic17),
        Generic18(ButtplugRsFfi.Endpoint.Generic18),
        Generic19(ButtplugRsFfi.Endpoint.Generic19),
        Generic20(ButtplugRsFfi.Endpoint.Generic20),
        Generic21(ButtplugRsFfi.Endpoint.Generic21),
        Generic22(ButtplugRsFfi.Endpoint.Generic22),
        Generic23(ButtplugRsFfi.Endpoint.Generic23),
        Generic24(ButtplugRsFfi.Endpoint.Generic24),
        Generic25(ButtplugRsFfi.Endpoint.Generic25),
        Generic26(ButtplugRsFfi.Endpoint.Generic26),
        Generic27(ButtplugRsFfi.Endpoint.Generic27),
        Generic28(ButtplugRsFfi.Endpoint.Generic28),
        Generic29(ButtplugRsFfi.Endpoint.Generic29),
        Generic30(ButtplugRsFfi.Endpoint.Generic30),
        Generic31(ButtplugRsFfi.Endpoint.Generic31);

        final ButtplugRsFfi.Endpoint value;

        final static EnumMap<ButtplugRsFfi.Endpoint, Endpoint> inverse = Arrays.stream(Endpoint.values())
                .collect(
                        Collectors.toMap(
                                (v) -> v.value,
                                Function.identity(),
                                (l, r) -> {
                                    throw new IllegalArgumentException("Duplicate keys!");
                                },
                                () -> new EnumMap<>(ButtplugRsFfi.Endpoint.class)
                        )
                );

        Endpoint(ButtplugRsFfi.Endpoint value) {
            this.value = value;
        }
    }

    public final int featureCount;
    public final List<Integer> stepCount;
    public final Set<Endpoint> endpoints;
    public final List<Integer> maxDuration;
//    public final String[][] patterns;
//    public final String[] actuatorType;

    MessageAttributes(ServerMessage.MessageAttributes attribs) {
        featureCount = attribs.getFeatureCount();
        stepCount = Collections.unmodifiableList(attribs.getStepCountList());
        endpoints = Collections.unmodifiableSet(
                attribs.getEndpointsList().stream()
                    .map(Endpoint.inverse::get)
                    .collect(Collectors.toCollection(() -> EnumSet.noneOf(Endpoint.class)))
        );
        maxDuration = Collections.unmodifiableList(attribs.getMaxDurationList());
//        patterns = null;
//        actuatorType = null;
    }
}
