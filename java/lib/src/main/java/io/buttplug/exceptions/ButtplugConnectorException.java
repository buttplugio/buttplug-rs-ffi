package io.buttplug.exceptions;

public class ButtplugConnectorException extends ButtplugException {
    public ButtplugConnectorException(String msg) {
        super(msg);
    }

    public ButtplugConnectorException(String msg, Exception inner) {
        super(msg, inner);
    }
}
