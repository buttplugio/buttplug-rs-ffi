using System;

namespace Buttplug
{
    public class ButtplugException : Exception
    {
        /// <inheritdoc />
        /// <summary>
        /// Creates a ButtplugException.
        /// </summary>
        public ButtplugException()
        {
        }

        /// <inheritdoc />
        /// <summary>
        /// Creates a ButtplugException.
        /// </summary>
        /// <param name="aMessage">Exception message.</param>
        public ButtplugException(string aMessage) : base(aMessage)
        {
        }

        /// <inheritdoc />
        /// <summary>
        /// Creates a ButtplugException.
        /// </summary>
        /// <param name="aMessage">Exception message.</param>
        /// <param name="aClass">Exception class, based on Buttplug Error Message Classes. (https://buttplug-spec.docs.buttplug.io/status.html#error).</param>
        /// <param name="aInner">Inner exception.</param>
        public ButtplugException(string aMessage, Exception aInner) : base(aMessage, aInner)
        {
        }

        public static ButtplugException FromError(ServerMessage.Types.Error aMsg)
        {
            var err_str = aMsg.Message;
            switch (aMsg.ErrorType)
            {
                case ServerMessage.Types.ButtplugErrorType.ButtplugConnectorError:
                    return new ButtplugConnectorException(err_str);
                case ServerMessage.Types.ButtplugErrorType.ButtplugPingError:
                    return new ButtplugPingException(err_str);
                case ServerMessage.Types.ButtplugErrorType.ButtplugMessageError:
                    return new ButtplugMessageException(err_str);
                case ServerMessage.Types.ButtplugErrorType.ButtplugUnknownError:
                    return new ButtplugUnknownException(err_str);
                case ServerMessage.Types.ButtplugErrorType.ButtplugHandshakeError:
                    return new ButtplugHandshakeException(err_str);
                case ServerMessage.Types.ButtplugErrorType.ButtplugDeviceError:
                    return new ButtplugDeviceException(err_str);
            }

            return new ButtplugUnknownException($"Unknown error type: {aMsg.ErrorType} | Message: {aMsg.Message}");
        }
    }
}
