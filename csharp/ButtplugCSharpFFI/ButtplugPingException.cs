using System;

namespace Buttplug
{
    public class ButtplugPingException : ButtplugException
    {
        /// <inheritdoc />
        public ButtplugPingException(string aMessage, Exception aInner = null)
            : base(aMessage, aInner)
        {
        }
    }
}