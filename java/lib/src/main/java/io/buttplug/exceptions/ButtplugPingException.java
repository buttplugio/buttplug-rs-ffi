package io.buttplug.exceptions;

public class ButtplugPingException extends ButtplugException {
    public ButtplugPingException(String msg) {
        super(msg);
    }

    public ButtplugPingException(String msg, Exception inner) {
        super(msg, inner);
    }
}
