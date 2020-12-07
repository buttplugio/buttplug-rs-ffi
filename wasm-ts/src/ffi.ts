import { buttplug_create_client, buttplug_free_client, buttplug_parse_client_message, buttplug_activate_env_logger, buttplug_free_device } from "buttplug-rs-ffi";
import { ButtplugEmbeddedConnectorOptions, ButtplugWebsocketConnectorOptions } from "connectors";
import { ButtplugMessageSorter } from "sorter";
import { Buttplug } from "./buttplug_ffi";

function sendClientMessage(sorter: ButtplugMessageSorter, clientPtr: number, message: Buttplug.ClientMessage): Promise<Buttplug.ButtplugFFIServerMessage> {
  let promise = sorter.PrepareOutgoingMessage(message);
  let buffer = Buffer.from(Buttplug.ClientMessage.encode(message).finish())
  buttplug_parse_client_message(clientPtr, buffer);
  return promise;
}

export function connectEmbedded(sorter: ButtplugMessageSorter, clientPtr: number, options: ButtplugEmbeddedConnectorOptions) {
  let msg = Buttplug.ClientMessage.create({
    message: Buttplug.ClientMessage.FFIMessage.create({
      connectLocal: Buttplug.ClientMessage.ConnectLocal.create({
        serverName: options.ServerName,
        allowRawMessages: options.AllowRawMessages,
        deviceConfigurationJson: options.DeviceConfigJSON,
        userDeviceConfigurationJson: options.UserDeviceConfigJSON,
        commManagerTypes: options.DeviceCommunicationManagerTypes,
        maxPingTime: options.MaxPingTime
      })
    }),
    id: 1
  });
  return sendClientMessage(sorter, clientPtr, msg);
}

export function connectWebsocket(sorter: ButtplugMessageSorter, clientPtr: number, options: ButtplugWebsocketConnectorOptions) {
  let msg = Buttplug.ClientMessage.create({
    message: Buttplug.ClientMessage.FFIMessage.create({
      connectWebsocket: Buttplug.ClientMessage.ConnectWebsocket.create({
        address: options.Address
      })
    }),
    id: 1
  });
  return sendClientMessage(sorter, clientPtr, msg);
}

export function startScanning(sorter: ButtplugMessageSorter, clientPtr: number) {
  let msg = Buttplug.ClientMessage.create({
    message: Buttplug.ClientMessage.FFIMessage.create({
      startScanning: Buttplug.ClientMessage.StartScanning.create({})
    }),
    id: 1
  });
  return sendClientMessage(sorter, clientPtr, msg);
}

export function stopScanning(sorter: ButtplugMessageSorter, clientPtr: number) {
  let msg = Buttplug.ClientMessage.create({
    message: Buttplug.ClientMessage.FFIMessage.create({
      stopScanning: Buttplug.ClientMessage.StopScanning.create({})
    }),
    id: 1
  });
  return sendClientMessage(sorter, clientPtr, msg);
}

export function createClientPtr(eventCallback: Function, clientName: string): number {
  return buttplug_create_client(eventCallback, clientName);
}

export function createDevicePtr(): number| null {
  return null;
}

export function freeClientPtr(clientPtr: number) {
  buttplug_free_client(clientPtr);
}

export function freeDevicePtr(devicePtr: number) {
  buttplug_free_device(devicePtr);
}