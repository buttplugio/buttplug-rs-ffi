using System;

namespace Buttplug
{
    public class ButtplugConnectorException : ButtplugException
    {
        /// <inheritdoc />
        public ButtplugConnectorException(string aMessage, Exception aInner = null)
            : base(aMessage, aInner)
        {
        }
    }
}
