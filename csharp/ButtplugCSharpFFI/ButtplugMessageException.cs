using System;

namespace Buttplug
{
    public class ButtplugMessageException : ButtplugException
    {
        /// <inheritdoc />
        public ButtplugMessageException(string aMessage, Exception aInner = null)
            : base(aMessage, aInner)
        {
        }
    }
}