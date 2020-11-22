using System;

namespace Buttplug
{
    public class ButtplugDeviceException : ButtplugException
    {
        /// <inheritdoc />
        public ButtplugDeviceException(string aMessage, Exception aInner = null)
            : base(aMessage, aInner)
        {
        }
    }
}