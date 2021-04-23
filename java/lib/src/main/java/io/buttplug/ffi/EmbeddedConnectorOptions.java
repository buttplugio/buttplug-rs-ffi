package io.buttplug.ffi;

import io.buttplug.protos.ButtplugRsFfi.ClientMessage.DeviceCommunicationManagerTypes;

import java.util.EnumSet;

public class EmbeddedConnectorOptions {
    public enum DeviceCommunicationManager {
        Btleplug(DeviceCommunicationManagerTypes.Btleplug_VALUE),
        XInput(DeviceCommunicationManagerTypes.XInput_VALUE),
        SerialPort(DeviceCommunicationManagerTypes.SerialPort_VALUE),
        LovenseHIDDongle(DeviceCommunicationManagerTypes.LovenseHIDDongle_VALUE),
        LovenseSerialDongle(DeviceCommunicationManagerTypes.LovenseSerialDongle_VALUE);

        public final int value;

        DeviceCommunicationManager(int value) {
            this.value = value;
        }
    }

    public String serverName = "Buttplug Java Embedded Server";
    // Empty string means ignore.
    public String deviceConfigJSON = "";
    // Empty string means ignore.
    public String userDeviceConfigJSON = "";
    // empty set means all devices.
    public EnumSet<DeviceCommunicationManager> deviceCommunicationManagerTypes = EnumSet.noneOf(DeviceCommunicationManager.class);
    // Always opt-in on raw messages.
    public boolean allowRawMessages = false;
    public int maxPingTime = 0;
}
