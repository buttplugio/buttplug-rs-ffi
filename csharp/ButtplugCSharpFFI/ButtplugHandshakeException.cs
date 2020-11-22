using System;

namespace Buttplug
{
    public class ButtplugHandshakeException : ButtplugException
    {
        /// <inheritdoc />
        public ButtplugHandshakeException(string aMessage, Exception aInner = null)
            : base(aMessage, aInner)
        {
        }
    }
}