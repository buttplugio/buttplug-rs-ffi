package io.buttplug.ffi;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import io.buttplug.ButtplugException;
import io.buttplug.ButtplugMessageException;
import io.buttplug.protos.ButtplugRsFfi.DeviceMessage;
import io.buttplug.protos.ButtplugRsFfi.ClientMessage;
import io.buttplug.protos.ButtplugRsFfi.ServerMessage;
import io.buttplug.protos.ButtplugRsFfi.ButtplugFFIServerMessage;

public class ButtplugFFIMessageSorter implements AutoCloseable {
    private final AtomicInteger counter = new AtomicInteger(1);

    private final ConcurrentHashMap<Integer, CompletableFuture<ButtplugFFIServerMessage>> pendingMessages
            = new ConcurrentHashMap<>();

    private int getNextMsgId() {
        return counter.incrementAndGet();
    }

    public CompletableFuture<ButtplugFFIServerMessage> prepareMessage(ClientMessage.Builder msg) {
        int id = getNextMsgId();
        msg.setId(id);

        CompletableFuture<ButtplugFFIServerMessage> future = new CompletableFuture<>();
        pendingMessages.put(id, future);
        return future;
    }

    public CompletableFuture<ButtplugFFIServerMessage> prepareMessage(DeviceMessage.Builder msg) {
        int id = getNextMsgId();
        msg.setId(id);

        CompletableFuture<ButtplugFFIServerMessage> future = new CompletableFuture<>();
        pendingMessages.put(id, future);
        return future;
    }

    public void HandleMessage(ButtplugFFIServerMessage msg) throws Exception {
        // We'll never match a system message, those are server -> client only.
        if (msg.getId() == 0) {
            throw new ButtplugMessageException("Cannot sort message with System ID");
        }

        CompletableFuture<ButtplugFFIServerMessage> future = pendingMessages.remove(msg.getId());

        // If we haven't gotten a system message and we're not currently waiting for the message
        // id, throw.
        if (future == null) {
            throw new ButtplugMessageException("Message with non-matching ID received.");
        }

        if (msg.getMessage().hasServerMessage() && msg.getMessage().getServerMessage().hasError()) {
            ServerMessage.Error err = msg.getMessage().getServerMessage().getError();
            future.completeExceptionally(ButtplugException.fromError(err));
        } else {
            future.complete(msg);
        }
    }

    @Override
    public void close() throws Exception {
        for (CompletableFuture<ButtplugFFIServerMessage> future: pendingMessages.values()) {
            future.completeExceptionally(new Exception("Sorter has been destroyed with live tasks still in queue."));
        }

        // pendingMessages.clear();
    }
}
