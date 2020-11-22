using System;
using System.Collections.Generic;
using System.Text;

namespace Buttplug
{
    public class ButtplugServerOptions
    {
        public string ServerName = "Buttplug C# FFI Server";
        public uint MaxPingTime = 0;
        public bool AllowRawMessages = false;
        public string DeviceConfigurationJson = null;
        public string UserDeviceConfigurationJson = null;

        public ButtplugServerOptions()
        { 
        }
    }
}
