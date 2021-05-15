using System;

namespace Buttplug
{
    public class ButtplugUnknownException : ButtplugException
    {
        /// <inheritdoc />
        public ButtplugUnknownException()
        {
        }

        /// <inheritdoc />
        public ButtplugUnknownException(string aMessage) : base(aMessage)
        {
        }

        /// <inheritdoc />
        public ButtplugUnknownException(string aMessage, Exception aInner) : base(aMessage, aInner)
        {
        }
    }
}
