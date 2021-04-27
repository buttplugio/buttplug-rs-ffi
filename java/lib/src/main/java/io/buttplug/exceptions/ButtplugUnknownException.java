package io.buttplug.exceptions;

public class ButtplugUnknownException extends ButtplugException {
    public ButtplugUnknownException(String msg) {
        super(msg);
    }

    public ButtplugUnknownException(String msg, Exception inner) {
        super(msg, inner);
    }
}
