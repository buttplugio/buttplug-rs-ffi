/// <reference path="./ffi_wrap.d.ts" />

import { ButtplugEmbeddedConnectorOptions, ButtplugWebsocketConnectorOptions } from "./connectors.js";
import { ButtplugMessageSorter } from "./sorter.js";
import { Buttplug } from "./buttplug_ffi.js";

import {
  buttplug_create_protobuf_client,
  buttplug_free_client,
  buttplug_client_protobuf_message,
  buttplug_create_device,
  buttplug_device_protobuf_message,
  buttplug_free_device,
  buttplug_activate_env_logger,
  buttplugInit,
} from "#ffi_wrap";

export { buttplugInit };

function sendClientMessage(sorter: ButtplugMessageSorter, clientPtr: number, message: Buttplug.ClientMessage, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let promise = sorter.PrepareOutgoingMessage(message);
  let buffer = Buffer.from(Buttplug.ClientMessage.encode(message).finish())
  buttplug_client_protobuf_message(clientPtr, buffer, callback);
  return promise;
}

export function connectEmbedded(sorter: ButtplugMessageSorter, clientPtr: number, options: ButtplugEmbeddedConnectorOptions, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
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
  return sendClientMessage(sorter, clientPtr, msg, callback);
}

export function connectWebsocket(sorter: ButtplugMessageSorter, clientPtr: number, options: ButtplugWebsocketConnectorOptions, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.ClientMessage.create({
    message: Buttplug.ClientMessage.FFIMessage.create({
      connectWebsocket: Buttplug.ClientMessage.ConnectWebsocket.create({
        address: options.Address
      })
    }),
    id: 1
  });
  return sendClientMessage(sorter, clientPtr, msg, callback);
}

export function disconnect(sorter: ButtplugMessageSorter, clientPtr: number, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.ClientMessage.create({
    message: Buttplug.ClientMessage.FFIMessage.create({
      disconnect: Buttplug.ClientMessage.Disconnect.create({})
    })
  });
  return sendClientMessage(sorter, clientPtr, msg, callback);
}

export function startScanning(sorter: ButtplugMessageSorter, clientPtr: number, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.ClientMessage.create({
    message: Buttplug.ClientMessage.FFIMessage.create({
      startScanning: Buttplug.ClientMessage.StartScanning.create({})
    }),
    id: 1
  });
  return sendClientMessage(sorter, clientPtr, msg, callback);
}

export function stopScanning(sorter: ButtplugMessageSorter, clientPtr: number, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.ClientMessage.create({
    message: Buttplug.ClientMessage.FFIMessage.create({
      stopScanning: Buttplug.ClientMessage.StopScanning.create({})
    }),
    id: 1
  });
  return sendClientMessage(sorter, clientPtr, msg, callback);
}

export function stopAllDevices(sorter: ButtplugMessageSorter, clientPtr: number, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.ClientMessage.create({
    message: Buttplug.ClientMessage.FFIMessage.create({
      stopAllDevices: Buttplug.ClientMessage.StopAllDevices.create({})
    }),
    id: 1
  });
  return sendClientMessage(sorter, clientPtr, msg, callback);
}

function sendDeviceMessage(sorter: ButtplugMessageSorter, devicePtr: number, message: Buttplug.DeviceMessage, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let promise = sorter.PrepareOutgoingMessage(message);
  let buffer = Buffer.from(Buttplug.DeviceMessage.encode(message).finish())
  buttplug_device_protobuf_message(devicePtr, buffer, callback);
  return promise;
}

export function vibrate(sorter: ButtplugMessageSorter, devicePtr: number, speeds: Buttplug.DeviceMessage.VibrateComponent[], callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      vibrateCmd: Buttplug.DeviceMessage.VibrateCmd.create({
        speeds: speeds
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function rotate(sorter: ButtplugMessageSorter, devicePtr: number, rotations: Buttplug.DeviceMessage.RotateComponent[], callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      rotateCmd: Buttplug.DeviceMessage.RotateCmd.create({
        rotations: rotations
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function linear(sorter: ButtplugMessageSorter, devicePtr: number, vectors: Buttplug.DeviceMessage.LinearComponent[], callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      linearCmd: Buttplug.DeviceMessage.LinearCmd.create({
        movements: vectors
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function stopDevice(sorter: ButtplugMessageSorter, devicePtr: number, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      stopDeviceCmd: Buttplug.DeviceMessage.StopDeviceCmd.create({
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function batteryLevel(sorter: ButtplugMessageSorter, devicePtr: number, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      batteryLevelCmd: Buttplug.DeviceMessage.BatteryLevelCmd.create({
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function rssiLevel(sorter: ButtplugMessageSorter, devicePtr: number, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      rssiLevelCmd: Buttplug.DeviceMessage.RSSILevelCmd.create({
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function rawRead(sorter: ButtplugMessageSorter, devicePtr: number, endpoint: Buttplug.Endpoint, expectedLength: number, timeout: number, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      rawReadCmd: Buttplug.DeviceMessage.RawReadCmd.create({
        endpoint: endpoint,
        expectedLength: expectedLength,
        timeout: timeout
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function rawWrite(sorter: ButtplugMessageSorter, devicePtr: number, endpoint: Buttplug.Endpoint, data: Uint8Array, writeWithResponse: boolean, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      rawWriteCmd: Buttplug.DeviceMessage.RawWriteCmd.create({
        endpoint: endpoint,
        data: data,
        writeWithResponse: writeWithResponse
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function rawSubscribe(sorter: ButtplugMessageSorter, devicePtr: number, endpoint: Buttplug.Endpoint, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      rawSubscribeCmd: Buttplug.DeviceMessage.RawSubscribeCmd.create({
        endpoint: endpoint
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function rawUnsubscribe(sorter: ButtplugMessageSorter, devicePtr: number, endpoint: Buttplug.Endpoint, callback: (buf: Buffer) => void): Promise<Buttplug.ButtplugFFIServerMessage> {
  let msg = Buttplug.DeviceMessage.create({
    message: Buttplug.DeviceMessage.FFIMessage.create({
      rawUnsubscribeCmd: Buttplug.DeviceMessage.RawUnsubscribeCmd.create({
        endpoint: endpoint
      })
    }),
    id: 1
  });
  return sendDeviceMessage(sorter, devicePtr, msg, callback);
}

export function createClientPtr(eventCallback: (buf: Buffer) => void, clientName: string): number {
  return buttplug_create_protobuf_client(clientName, eventCallback);
}

export function createDevicePtr(clientPtr: number, deviceIndex: number): number | null {
  return buttplug_create_device(clientPtr, deviceIndex);
}

export function freeClientPtr(clientPtr: number) {
  buttplug_free_client(clientPtr);
}

export function freeDevicePtr(devicePtr: number) {
  buttplug_free_device(devicePtr);
}

export function activateConsoleLogger(logLevel: "error" | "warn" | "info" | "debug" | "trace") {
  buttplug_activate_env_logger(logLevel);
}

/*
export function addLogHandler(logCallback: (buf: Buffer) => void, logLevel: "error" | "warn" | "info" | "debug" | "trace", useJSON: boolean) {
  buttplug_add_log_handler(logCallback, logLevel, useJSON);
}
*/