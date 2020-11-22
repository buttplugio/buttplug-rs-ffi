using System;
using System.Collections.Generic;
using System.Text;

namespace Buttplug
{
    public class ButtplugWebsocketConnectorOptions
    {
        public Uri NetworkAddress;

        public ButtplugWebsocketConnectorOptions(Uri aAddress)
        {
            NetworkAddress = aAddress;
        }
    }
}
