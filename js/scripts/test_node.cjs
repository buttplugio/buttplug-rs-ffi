const socketAddress = process.argv[2];

async function main() {
    const { ButtplugWebsocketConnectorOptions, ButtplugEmbeddedConnectorOptions, ButtplugClient } = await import("../dist/node/index.js");
    console.log("finished import");

    const connector = socketAddress ?
        new ButtplugWebsocketConnectorOptions(socketAddress) :
        new ButtplugEmbeddedConnectorOptions();
    console.log("created connector");

    const client = new ButtplugClient("test_node");
    client.on("error", e => console.error(e));
    console.log("created client.");

    console.log("connecting...");
    await client.connect(connector);
    console.log("connection successful.");

    console.log("disconnecting...");
    await client.disconnect();
    console.log("disconnected.");

    client.dispose();
}

main().catch(e => {
    console.error(e);
    process.exit(-1);
});
