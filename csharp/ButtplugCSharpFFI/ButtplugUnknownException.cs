using System;

namespace ButtplugCSharpFFI
{
    class ButtplugUnknownException : ButtplugException
    {
        public ButtplugUnknownException(string aMessage, Exception aInner = null)
            : base(aMessage, aInner)
        {
        }
    }
}
