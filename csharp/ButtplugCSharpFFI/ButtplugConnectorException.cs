using System;

namespace Buttplug
{
    public class ButtplugConnectorException : ButtplugException
    {
        /// <inheritdoc />
        public ButtplugConnectorException()
        {
        }

        /// <inheritdoc />
        public ButtplugConnectorException(string aMessage) : base(aMessage)
        {
        }

        /// <inheritdoc />
        public ButtplugConnectorException(string aMessage, Exception aInner) : base(aMessage, aInner)
        {
        }
    }
}
