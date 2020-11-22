using System;
using System.Collections.Generic;
using System.Text;

namespace Buttplug
{
    public class ButtplugWebsocketConnectorOptions
    {
        public string NetworkAddress;

        public ButtplugWebsocketConnectorOptions(string aAddress)
        {
            NetworkAddress = aAddress;
        }
    }
}
