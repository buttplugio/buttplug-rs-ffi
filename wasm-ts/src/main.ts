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