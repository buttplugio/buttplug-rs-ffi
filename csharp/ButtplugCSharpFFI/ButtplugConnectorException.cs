using System;

namespace ButtplugCSharpFFI
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
