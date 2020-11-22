using System;

namespace Buttplug
{
    class ButtplugUnknownException : ButtplugException
    {
        public ButtplugUnknownException(string aMessage, Exception aInner = null)
            : base(aMessage, aInner)
        {
        }
    }
}
