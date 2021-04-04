package io.buttplug;

import io.buttplug.protos.ButtplugRsFfi.ServerMessage;
import io.buttplug.protos.ButtplugRsFfi.ServerMessage.ButtplugErrorType;

public class ButtplugException extends Exception {
    public ButtplugException(String msg) {
        super(msg);
    }

    public ButtplugException(String msg, Exception inner) {
        super(msg, inner);
    }

    public static ButtplugException fromError(ServerMessage.Error err) {
        String msg = err.getMessage();
        switch (err.getErrorType()) {
            case ButtplugConnectorError:
                return new ButtplugConnectorException(msg);
            case ButtplugPingError:
                return new ButtplugPingException(msg);
            case ButtplugMessageError:
                return new ButtplugMessageException(msg);
            case ButtplugHandshakeError:
                return new ButtplugHandshakeException(msg);
            case ButtplugDeviceError:
                return new ButtplugDeviceException(msg);
            case ButtplugUnknownError:
                return new ButtplugUnknownException(msg);
        }

        return new ButtplugUnknownException(String.format("Unknown error type: %d | Message: %s", err.getErrorType().getNumber(), msg));
    }
}
