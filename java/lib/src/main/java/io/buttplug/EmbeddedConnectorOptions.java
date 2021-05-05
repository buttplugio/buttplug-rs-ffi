package io.buttplug;

import io.buttplug.protos.ButtplugRsFfi.ClientMessage.DeviceCommunicationManagerTypes;

import java.util.EnumSet;

public class EmbeddedConnectorOptions {
    public enum DeviceCommunicationManager {
        Btleplug(DeviceCommunicationManagerTypes.Btleplug),
        XInput(DeviceCommunicationManagerTypes.XInput),
        SerialPort(DeviceCommunicationManagerTypes.SerialPort),
        LovenseHIDDongle(DeviceCommunicationManagerTypes.LovenseHIDDongle),
        LovenseSerialDongle(DeviceCommunicationManagerTypes.LovenseSerialDongle);

        final DeviceCommunicationManagerTypes value;

        DeviceCommunicationManager(DeviceCommunicationManagerTypes value) {
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
