using System;
using System.Collections.Generic;
using System.Text;

namespace Buttplug
{
    public class ButtplugEmbeddedConnectorOptions
    {
        public string ServerName = "Buttplug C# Embedded Server";
        // Empty string means ignore.
        public string DeviceConfigJSON = "";
        // Empty string means ignore.
        public string UserDeviceConfigJSON = "";
        // 0 here means all device.
        public ushort DeviceCommunicationManagerTypes = 0;
        // Always opt-in on raw messages.
        public bool AllowRawMessages = false;
        public uint MaxPingTime = 0;

        public ButtplugEmbeddedConnectorOptions()
        {
        }
    }
}
