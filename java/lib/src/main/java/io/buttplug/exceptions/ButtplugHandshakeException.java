package io.buttplug.exceptions;

public class ButtplugHandshakeException extends ButtplugException {
    public ButtplugHandshakeException(String msg) {
        super(msg);
    }

    public ButtplugHandshakeException(String msg, Exception inner) {
        super(msg, inner);
    }
}
