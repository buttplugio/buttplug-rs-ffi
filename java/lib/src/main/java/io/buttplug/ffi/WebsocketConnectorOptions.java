package io.buttplug.ffi;

import java.net.URI;

public class WebsocketConnectorOptions {
    public URI networkAddress;

    public WebsocketConnectorOptions(URI networkAddress) {
        this.networkAddress = networkAddress;
    }
}
