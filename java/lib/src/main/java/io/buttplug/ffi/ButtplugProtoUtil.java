package io.buttplug.ffi;

import io.buttplug.ButtplugMessageException;
import io.buttplug.protos.ButtplugRsFfi.*;

import java.util.concurrent.CompletionException;

// TODO: consider moving into ButtplugFFI?
class ButtplugProtoUtil {
    static void to_result(ButtplugFFIServerMessage.FFIMessage msg) throws CompletionException {
        Exception ex;
        if (msg.hasServerMessage()) {
            if (msg.getServerMessage().hasOk()) {
                return;
            } else {
                ex = new ButtplugMessageException("Expected 'Ok', received system message");
            }
        } else {
            ex = new ButtplugMessageException("Expected 'Ok', received device event");
        }
        throw new CompletionException(ex);
    }
}
