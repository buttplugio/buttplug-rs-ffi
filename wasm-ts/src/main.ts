/*
console.log(performance.now() / 1000);
import { buttplug_create_client, buttplug_parse_client_message, buttplug_activate_env_logger } from "buttplug-rs-ffi";
import { Buttplug } from "./buttplug_ffi";

console.log(performance.now() / 1000);

buttplug_activate_env_logger();
console.log(performance.now() / 1000);
let client = buttplug_create_client((msg: Uint8Array) => { 
  console.log(performance.now() / 1000);
  console.log("Got message!");
  let message = Buttplug.ServerMessage.decode(msg);
  console.log(message);
  console.log(performance.now() / 1000);

}, "Test Client");
console.log(client);
console.log(performance.now() / 1000);
let connect_msg = Buttplug.ClientMessage.create({
  message: Buttplug.ClientMessage.FFIMessage.create({
    connectLocal: Buttplug.ClientMessage.ConnectLocal.create({})
  }),
  id: 1
});
let buffer = Buffer.from(Buttplug.ClientMessage.encode(connect_msg).finish())
buttplug_parse_client_message(client, buffer);
console.log(performance.now() / 1000);
*/

import { ButtplugClientDevice } from "device";
import { ButtplugClient } from "./client";
import { ButtplugEmbeddedConnectorOptions, ButtplugWebsocketConnectorOptions } from "./connectors";

async function run() {
  let client = new ButtplugClient("test");
  //client.connect(new ButtplugEmbeddedConnectorOptions()).then(() => "Done trying to connect");
  // let options = new ButtplugWebsocketConnectorOptions();
  let options = new ButtplugEmbeddedConnectorOptions();
  client.addListener("deviceadded", async (device: ButtplugClientDevice) => {
    await device.vibrate(1.0);
    await new Promise(r => setTimeout(r, 1000));
    await device.stop();
  })
  await client.connect(options);
  await client.startScanning();
}

// run().then(() => console.log("Done"));
document.getElementById("run")!.addEventListener("click", async () => await run());
