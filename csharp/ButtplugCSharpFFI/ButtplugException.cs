using System;
using ButtplugFFI;

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

        public static ButtplugException FromError(ServerMessage aMsg)
        {
            var error_msg = aMsg.Message<Error>();
            if (error_msg is null)
            {
                throw new ArgumentException("Must be an error message");
            }
            switch (error_msg.Value.ErrorType)
            {
                case ButtplugErrorType.ButtplugConnectorError:
                    return new ButtplugConnectorException(error_msg.Value.Message);
                case ButtplugErrorType.ButtplugPingError:
                    return new ButtplugPingException(error_msg.Value.Message);
                case ButtplugErrorType.ButtplugMessageError:
                    return new ButtplugMessageException(error_msg.Value.Message);
                case ButtplugErrorType.ButtplugUnknownError:
                    return new ButtplugUnknownException(error_msg.Value.Message);
                case ButtplugErrorType.ButtplugHandshakeError:
                    return new ButtplugHandshakeException(error_msg.Value.Message);
                case ButtplugErrorType.ButtplugDeviceError:
                    return new ButtplugDeviceException(error_msg.Value.Message);
            }
            return new ButtplugUnknownException($"Unknown error type: {error_msg.Value.ErrorType} | Message: {error_msg.Value.Message}");
        }
    }
}
