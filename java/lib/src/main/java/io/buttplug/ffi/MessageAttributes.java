package io.buttplug.ffi;

import io.buttplug.protos.ButtplugRsFfi;
import io.buttplug.protos.ButtplugRsFfi.ServerMessage;
import io.buttplug.protos.ButtplugRsFfi.ServerMessage.MessageAttributeType;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

public class MessageAttributes {
    public enum Type {
        VibrateCmd(MessageAttributeType.VibrateCmd_VALUE),
        RotateCmd(MessageAttributeType.RotateCmd_VALUE),
        LinearCmd(MessageAttributeType.LinearCmd_VALUE),
        StopDeviceCmd(MessageAttributeType.StopDeviceCmd_VALUE),
        RawReadCmd(MessageAttributeType.RawReadCmd_VALUE),
        RawWriteCmd(MessageAttributeType.RawWriteCmd_VALUE),
        RawSubscribeCmd(MessageAttributeType.RawSubscribeCmd_VALUE),
        RawUnsubscribeCmd(MessageAttributeType.RawUnsubscribeCmd_VALUE),
        BatteryLevelCmd(MessageAttributeType.BatteryLevelCmd_VALUE),
        RSSILevelCmd(MessageAttributeType.RSSILevelCmd_VALUE);

        final int value;

        final static Map<Integer, Type> inverse = Arrays.stream(Type.values())
                .collect(Collectors.toMap((v) -> v.value, Function.identity()));

        Type(int value) {
            this.value = value;
        }
    }

    public enum Endpoint {
        Command(ButtplugRsFfi.Endpoint.Command_VALUE),
        Firmware(ButtplugRsFfi.Endpoint.Firmware_VALUE),
        Rx(ButtplugRsFfi.Endpoint.Rx_VALUE),
        RxAccel(ButtplugRsFfi.Endpoint.RxAccel_VALUE),
        RxBLEBattery(ButtplugRsFfi.Endpoint.RxBLEBattery_VALUE),
        RxPressure(ButtplugRsFfi.Endpoint.RxPressure_VALUE),
        RxTouch(ButtplugRsFfi.Endpoint.RxTouch_VALUE),
        Tx(ButtplugRsFfi.Endpoint.Tx_VALUE),
        TxMode(ButtplugRsFfi.Endpoint.TxMode_VALUE),
        TxShock(ButtplugRsFfi.Endpoint.TxShock_VALUE),
        TxVibrate(ButtplugRsFfi.Endpoint.TxVibrate_VALUE),
        TxVendorControl(ButtplugRsFfi.Endpoint.TxVendorControl_VALUE),
        Whitelist(ButtplugRsFfi.Endpoint.Whitelist_VALUE),
        Generic0(ButtplugRsFfi.Endpoint.Generic0_VALUE),
        Generic1(ButtplugRsFfi.Endpoint.Generic1_VALUE),
        Generic2(ButtplugRsFfi.Endpoint.Generic2_VALUE),
        Generic3(ButtplugRsFfi.Endpoint.Generic3_VALUE),
        Generic4(ButtplugRsFfi.Endpoint.Generic4_VALUE),
        Generic5(ButtplugRsFfi.Endpoint.Generic5_VALUE),
        Generic6(ButtplugRsFfi.Endpoint.Generic6_VALUE),
        Generic7(ButtplugRsFfi.Endpoint.Generic7_VALUE),
        Generic8(ButtplugRsFfi.Endpoint.Generic8_VALUE),
        Generic9(ButtplugRsFfi.Endpoint.Generic9_VALUE),
        Generic10(ButtplugRsFfi.Endpoint.Generic10_VALUE),
        Generic11(ButtplugRsFfi.Endpoint.Generic11_VALUE),
        Generic12(ButtplugRsFfi.Endpoint.Generic12_VALUE),
        Generic13(ButtplugRsFfi.Endpoint.Generic13_VALUE),
        Generic14(ButtplugRsFfi.Endpoint.Generic14_VALUE),
        Generic15(ButtplugRsFfi.Endpoint.Generic15_VALUE),
        Generic16(ButtplugRsFfi.Endpoint.Generic16_VALUE),
        Generic17(ButtplugRsFfi.Endpoint.Generic17_VALUE),
        Generic18(ButtplugRsFfi.Endpoint.Generic18_VALUE),
        Generic19(ButtplugRsFfi.Endpoint.Generic19_VALUE),
        Generic20(ButtplugRsFfi.Endpoint.Generic20_VALUE),
        Generic21(ButtplugRsFfi.Endpoint.Generic21_VALUE),
        Generic22(ButtplugRsFfi.Endpoint.Generic22_VALUE),
        Generic23(ButtplugRsFfi.Endpoint.Generic23_VALUE),
        Generic24(ButtplugRsFfi.Endpoint.Generic24_VALUE),
        Generic25(ButtplugRsFfi.Endpoint.Generic25_VALUE),
        Generic26(ButtplugRsFfi.Endpoint.Generic26_VALUE),
        Generic27(ButtplugRsFfi.Endpoint.Generic27_VALUE),
        Generic28(ButtplugRsFfi.Endpoint.Generic28_VALUE),
        Generic29(ButtplugRsFfi.Endpoint.Generic29_VALUE),
        Generic30(ButtplugRsFfi.Endpoint.Generic30_VALUE),
        Generic31(ButtplugRsFfi.Endpoint.Generic31_VALUE);

        final int value;

        final static Map<Integer, Endpoint> inverse = Arrays.stream(Endpoint.values())
                .collect(Collectors.toMap((v) -> v.value, Function.identity()));

        Endpoint(int value) {
            this.value = value;
        }
    }

    public final int featureCount;
    public final List<Integer> stepCount;
    // TODO: consider EnumSet?
    public final Set<Endpoint> endpoints;
    public final List<Integer> maxDuration;
//    public final String[][] patterns;
//    public final String[] actuatorType;

    MessageAttributes(ServerMessage.MessageAttributes attribs) {
        featureCount = attribs.getFeatureCount();
        stepCount = Collections.unmodifiableList(attribs.getStepCountList());
        endpoints = Collections.unmodifiableSet(
                attribs.getEndpointsList().stream()
                    .map((endpoint) -> Endpoint.inverse.get(endpoint.getNumber()))
                    .collect(Collectors.toCollection(() -> EnumSet.noneOf(Endpoint.class)))
        );
        maxDuration = Collections.unmodifiableList(attribs.getMaxDurationList());
//        patterns = null;
//        actuatorType = null;
    }
}
