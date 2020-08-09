using System;

namespace ButtplugCSharpFFI
{
    public class ButtplugException : Exception
    {       
        /// <inheritdoc />
        /// <summary>
        /// Creates a ButtplugException.
        /// </summary>
        /// <param name="aMessage">Exception message.</param>
        /// <param name="aClass">Exception class, based on Buttplug Error Message Classes. (https://buttplug-spec.docs.buttplug.io/status.html#error).</param>
        /// <param name="aInner">Optional inner exception.</param>
        public ButtplugException(string aMessage, Exception aInner = null)
            : base(aMessage, aInner)
        {
        }
    }
}
