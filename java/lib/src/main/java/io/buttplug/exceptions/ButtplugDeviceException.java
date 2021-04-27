package io.buttplug.exceptions;

public class ButtplugDeviceException extends ButtplugException {
    public ButtplugDeviceException(String msg) {
        super(msg);
    }

    public ButtplugDeviceException(String msg, Exception inner) {
        super(msg, inner);
    }
}
