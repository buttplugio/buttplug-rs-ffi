namespace Buttplug
{
    public class ButtplugEmbeddedConnectorOptions
    {
        public string ServerName { get; set; } = "Buttplug C# Embedded Server";
        // Empty string means ignore.
        public string DeviceConfigJSON { get; set; } = "";
        // Empty string means ignore.
        public string UserDeviceConfigJSON { get; set; } = "";
        // 0 here means all device.
        public ushort DeviceCommunicationManagerTypes { get; set; } = 0;
        // Always opt-in on raw messages.
        public bool AllowRawMessages { get; set; } = false;
        public uint MaxPingTime { get; set; } = 0;
    }
}
