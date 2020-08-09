using System;

namespace ButtplugCSharpFFI
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