const socketAddress = process.argv[2];
if (!socketAddress) {
    console.error("Expected a websocket address as the first argument");
    process.exit(-1);
}

if (!process.execArgv.includes("--experimental-wasm-modules")) {
    if (process.env["TEST_NODE_RESTART"]) {
        console.error("Something went wrong.");
        process.exit(-1);
    }

    const { spawnSync } = require("child_process");
    console.log("Restarting with --experimental-wasm-modules ...");
    process.env["TEST_NODE_RESTART"] = "1";
    spawnSync(process.execPath, ["--experimental-wasm-modules", ...process.argv.slice(1)], { stdio: "inherit" });
    process.env["TEST_NODE_RESTART"] = "";
    return;
}


async function main() {
    const { buttplugInit, ButtplugWebsocketConnectorOptions, ButtplugClient } = await import("../dist/node/index.js");
    await buttplugInit();
    const connector = new ButtplugWebsocketConnectorOptions(socketAddress);
    const client = new ButtplugClient("test_node");
    await client.connect(connector);
    console.log("connection successful.");
    await client.disconnect();
}

main().catch(e => {
    console.error(e);
    process.exit(-1);
});
