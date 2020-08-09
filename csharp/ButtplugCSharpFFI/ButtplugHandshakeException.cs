using System;

namespace ButtplugCSharpFFI
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