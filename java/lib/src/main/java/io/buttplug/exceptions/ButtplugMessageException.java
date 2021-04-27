package io.buttplug.exceptions;

public class ButtplugMessageException extends ButtplugException {
    public ButtplugMessageException(String msg) {
        super(msg);
    }

    public ButtplugMessageException(String msg, Exception inner) {
        super(msg, inner);
    }
}
