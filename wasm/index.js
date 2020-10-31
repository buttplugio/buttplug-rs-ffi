// Import our outputted wasm ES6 module
// Which, export default's, an initialization function
import init from "./pkg/buttplug_wasm.js";
import { ButtplugClient, ButtplugDeviceMessageType } from "./pkg/buttplug_wasm.js";
const runWasm = async () => {
  // Instantiate our wasm module
  let bp = await init("./pkg/buttplug_wasm_bg.wasm");
  // Call the Add function export from wasm, save the result
  console.log("connecting!");
  const client = await ButtplugClient.connectEmbedded();
  //const client = await ButtplugClient.connectWebsocket("ws://127.0.0.1:12345");
  console.log("connected!");
  console.log(`Type: ${ButtplugDeviceMessageType.RotateCmd}`);
  client.addListener("deviceadded", (device) => {
    console.log(client.devices);
    console.log(device.allowedMessages);
    console.log(device.supportsMessage(ButtplugDeviceMessageType.VibrateCmd));
    console.log(device.supportsMessage(ButtplugDeviceMessageType.RotateCmd));
    console.log(device.messageAttributes(ButtplugDeviceMessageType.VibrateCmd));
    //device.vibrate(0.5).then(setTimeout(() => device.vibrate(0), 1000));
  });
  
  document.getElementById("scan_button").addEventListener("click", async () => {
    await client.startScanning();
  });
};
runWasm().then("Done!");