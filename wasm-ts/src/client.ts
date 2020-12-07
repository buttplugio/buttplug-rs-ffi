/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";

import { EventEmitter } from "events";
import { Buttplug } from "./buttplug_ffi";
import { ButtplugClientConnectorError } from "./errors";
import { createClientPtr, createDevicePtr, connectEmbedded, connectWebsocket, startScanning, stopScanning } from "./ffi";
import { ButtplugEmbeddedConnectorOptions, ButtplugWebsocketConnectorOptions } from "./connectors";
import { ButtplugMessageSorter } from "./sorter";
/* import { ButtplugClientDevice } from "./ButtplugClientDevice";
import { IButtplugClientConnector } from "./IButtplugClientConnector";
import * as Messages from "../core/Messages";
import { CheckMessage } from "../core/MessageUtils";
import { ButtplugDeviceException, ButtplugException,
         ButtplugInitException, ButtplugMessageException } from "../core/Exceptions";
 */
export class ButtplugClient extends EventEmitter {
  // protected _devices: Map<number, ButtplugClientDevice> = new Map();
  protected _clientName: string;
  // This will either be null, or our WASM heap pointer for our connected client object.
  private _clientPtr?: number = undefined;
  protected _isScanning = false;
  private _connected = false;
  private _sorter: ButtplugMessageSorter = new ButtplugMessageSorter();

  constructor(clientName: string = "Generic Buttplug Client") {
    super();
    this._clientName = clientName;
    this._clientPtr = createClientPtr(this.sorterCallback, clientName);
  }

  public get Connected(): boolean {
    return this._connected;
  }

  /*
  public get Devices(): ButtplugClientDevice[] {
    // While this function doesn't actually send a message, if we don't have a
    // connector, we shouldn't have devices.
    this.CheckConnector();
    const devices: ButtplugClientDevice[] = [];
    this._devices.forEach((d, i) => {
      devices.push(d);
    });
    return devices;
  }
  */

  public get isScanning(): boolean {
    return this._isScanning;
  }

  public connect = async (options: ButtplugEmbeddedConnectorOptions | ButtplugWebsocketConnectorOptions): Promise<void> => {
    if (!this._clientPtr) {

    }
    if (options instanceof ButtplugEmbeddedConnectorOptions) {
      await connectEmbedded(this._sorter, this._clientPtr!, options);
    } else if (options instanceof ButtplugWebsocketConnectorOptions) {
      await connectWebsocket(this._sorter, this._clientPtr!, options);
    } else {
      throw new ButtplugClientConnectorError("Invalid connector type.");
    }
    this._connected = true;
  }

  public disconnect = async () => {
  }

  public startScanning = async () => {
    if (!this._connected) {
      throw new ButtplugClientConnectorError("Not connected.");
    }
    await startScanning(this._sorter, this._clientPtr!);
    this._isScanning = true;
  }

  public stopScanning = async () => {
    if (!this._connected) {
      throw new ButtplugClientConnectorError("Not connected.");
    }
    await stopScanning(this._sorter, this._clientPtr!);
    this._isScanning = false;
  }

  public stopAllDevices = async () => {
  }

  protected CheckConnector() {
    if (!this.Connected) {
      throw new ButtplugClientConnectorError("ButtplugClient not connected");
    }
  }

  private sorterCallback = (buf: Uint8Array) => {
    const msg = Buttplug.ButtplugFFIServerMessage.decode(buf);
    if (msg.id > 0) {
      this._sorter.ParseIncomingMessages(msg);
    }
  }

  /*
  public async SendDeviceMessage(aDevice: ButtplugClientDevice,
                                 aDeviceMsg: Messages.ButtplugDeviceMessage): Promise<void> {
    this.CheckConnector();
    const dev = this._devices.get(aDevice.Index);
    if (dev === undefined) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          `Device ${aDevice.Index} not available.`);
    }
    if (dev.AllowedMessages.indexOf(aDeviceMsg.Type.name) === -1) {
      throw ButtplugException.LogAndError(ButtplugDeviceException,
                                          this._logger,
                                          `Device ${aDevice.Name} does not accept message type ${aDeviceMsg.Type}.`);
    }
    aDeviceMsg.DeviceIndex = aDevice.Index;
    await this.SendMsgExpectOk(aDeviceMsg);
  }

  public ParseMessages = (aMsgs: Messages.ButtplugMessage[]) => {
    this.ParseMessagesInternal(aMsgs);
  }

  protected ParseMessagesInternal(aMsgs: Messages.ButtplugMessage[]) {
    for (const x of aMsgs) {
      switch (x.constructor) {
        case Messages.Log:
          this.emit("log", x);
          break;
        case Messages.DeviceAdded:
          const addedMsg = x as Messages.DeviceAdded;
          const addedDevice = ButtplugClientDevice.fromMsg(addedMsg, this.SendDeviceMessageClosure);
          this._devices.set(addedMsg.DeviceIndex, addedDevice);
          this.emit("deviceadded", addedDevice);
          break;
        case Messages.DeviceRemoved:
          const removedMsg = x as Messages.DeviceRemoved;
          if (this._devices.has(removedMsg.DeviceIndex)) {
            const removedDevice = this._devices.get(removedMsg.DeviceIndex);
            removedDevice?.EmitDisconnected();
            this._devices.delete(removedMsg.DeviceIndex);
            this.emit("deviceremoved", removedDevice);
          }
          break;
        case Messages.ScanningFinished:
          this._isScanning = false;
          this.emit("scanningfinished", x);
          break;
      }
    }
  }

  protected ShutdownConnection = async () => {
    await this.StopAllDevices();
    if (this._pingTimer !== null) {
      clearInterval(this._pingTimer);
      this._pingTimer = null;
    }
  }

  protected async SendMessage(aMsg: Messages.ButtplugMessage): Promise<Messages.ButtplugMessage> {
    this.CheckConnector();
    // This will throw if our message is invalid
    CheckMessage(aMsg);
    return await this._connector!.Send(aMsg);
  }

  protected CheckConnector() {
    if (!this.Connected) {
      throw new ButtplugClientConnectorException("ButtplugClient not connected");
    }
  }

  protected SendMsgExpectOk = async (aMsg: Messages.ButtplugMessage): Promise<void> => {
    const msg = await this.SendMessage(aMsg);
    switch (msg.constructor) {
      case Messages.Ok:
        return;
      case Messages.Error:
        throw ButtplugException.FromError(msg as Messages.Error);
      default:
        throw ButtplugException.LogAndError(ButtplugMessageException,
                                            this._logger,
                                            `Message type ${msg.constructor} not handled bySendMsgExpectOk`);
    }
  }

  protected SendDeviceMessageClosure = async (aDevice: ButtplugClientDevice,
                                              aMsg: Messages.ButtplugDeviceMessage): Promise<void> => {
    await this.SendDeviceMessage(aDevice, aMsg);
  }
  */
}
