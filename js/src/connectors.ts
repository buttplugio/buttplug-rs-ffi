export class ButtplugEmbeddedConnectorOptions {
  public constructor(
    public ServerName: string = "Buttplug WASM Embedded Server",
    // Empty string means ignore.
    public DeviceConfigJSON: string = "",
    // Empty string means ignore.
    public UserDeviceConfigJSON: string = "",
    // 0 here means all device.
    public DeviceCommunicationManagerTypes: number = 0,
    // Require opt-in on raw messages.
    public AllowRawMessages: boolean = false,
    public MaxPingTime: number = 0,
  ) {}
}

export class ButtplugWebsocketConnectorOptions {
  public constructor(
    // Default to the insecure port.
    public Address: string = "ws://127.0.0.1:12345",
  ) {}
}