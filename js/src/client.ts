/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";

import { EventEmitter } from "events";
import { Buttplug } from "./buttplug_ffi.js";
import { ButtplugClientConnectorError } from "./errors.js";
import { createClientPtr, createDevicePtr, connectEmbedded, connectWebsocket, startScanning, stopScanning, stopAllDevices, disconnect, freeClientPtr } from "./ffi.js";
import { ButtplugEmbeddedConnectorOptions, ButtplugWebsocketConnectorOptions } from "./connectors.js";
import { ButtplugMessageSorter } from "./sorter.js";
import { ButtplugClientDevice } from "./device.js";

const clientFinalizer = typeof FinalizationRegistry !== "function" ? undefined : new FinalizationRegistry((clientPtr: number) => {
  freeClientPtr(clientPtr);
});

export class ButtplugClient extends EventEmitter {
  protected _devices: Map<number, ButtplugClientDevice> = new Map();
  protected _clientName: string;
  // This will either be null, or our WASM heap pointer for our connected client object.
  private _clientPtr: number;
  protected _isScanning = false;
  private _connected = false;
  private _disposed = false;
  private _sorter: ButtplugMessageSorter = new ButtplugMessageSorter();
  private _unregisterToken = {};

  constructor(clientName: string = "Generic Buttplug Client") {
    super();
    this._clientName = clientName;
    this._clientPtr = createClientPtr(this.sorterCallback, clientName);
    clientFinalizer?.register(this, this._clientPtr, this._unregisterToken);
  }

  public get Connected(): boolean {
    return this._connected;
  }

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

  public get isScanning(): boolean {
    return this._isScanning;
  }

  public connect = async (options: ButtplugEmbeddedConnectorOptions | ButtplugWebsocketConnectorOptions): Promise<void> => {
    this.throwIfDisposed();
    if (this._connected) {
      throw new ButtplugClientConnectorError("Client already connected.");
    }
    if (options instanceof ButtplugEmbeddedConnectorOptions) {
      await connectEmbedded(this._sorter, this._clientPtr!, options, this.sorterCallback);
    } else if (options instanceof ButtplugWebsocketConnectorOptions) {
      await connectWebsocket(this._sorter, this._clientPtr!, options, this.sorterCallback);
    } else {
      throw new ButtplugClientConnectorError("Invalid connector type.");
    }
    this._connected = true;
  }

  public disconnect = async () => {
    this.throwIfDisposed();
    if (!this._connected) {
      throw new ButtplugClientConnectorError("Not connected.");
    }
    await disconnect(this._sorter, this._clientPtr!, this.sorterCallback);
  }

  public startScanning = async () => {
    this.throwIfDisposed();
    if (!this._connected) {
      throw new ButtplugClientConnectorError("Not connected.");
    }
    this._isScanning = true;
    await startScanning(this._sorter, this._clientPtr!, this.sorterCallback);
  }

  public stopScanning = async () => {
    this.throwIfDisposed();
    if (!this._connected) {
      throw new ButtplugClientConnectorError("Not connected.");
    }
    this._isScanning = false;
    await stopScanning(this._sorter, this._clientPtr!, this.sorterCallback);
  }

  public stopAllDevices = async () => {
    this.throwIfDisposed();
    if (!this._connected) {
      throw new ButtplugClientConnectorError("Not connected.");
    }
    await stopAllDevices(this._sorter, this._clientPtr!, this.sorterCallback);
  }

  protected CheckConnector() {
    this.throwIfDisposed();
    if (!this.Connected) {
      throw new ButtplugClientConnectorError("ButtplugClient not connected");
    }
  }

  private sorterCallback = (buf: Uint8Array) => {
    try {
      this.throwIfDisposed();
      const msg = Buttplug.ButtplugFFIServerMessage.decode(buf);
      if (msg.id > 0) {
        this._sorter.ParseIncomingMessages(msg);
        return;
      }
      if (msg.message?.serverMessage?.deviceAdded) {
        const addedMsg = msg.message?.serverMessage?.deviceAdded;
        const devicePtr = createDevicePtr(this._clientPtr!, addedMsg.index!);
        const device = new ButtplugClientDevice(devicePtr!, this._sorter, this.sorterCallback, addedMsg.index!, addedMsg.name!, addedMsg.messageAttributes!);
        this._devices.set(addedMsg.index!, device);
        this.emit("deviceadded", device);
        return;
      }
      if (msg.message?.serverMessage?.deviceRemoved) {
        const removedMsg = msg.message?.serverMessage?.deviceRemoved;
        if (this._devices.has(removedMsg.index!)) {
          const removedDevice = this._devices.get(removedMsg.index!);
          removedDevice?.emitDisconnected();
          this._devices.delete(removedMsg.index!);
          this.emit("deviceremoved", removedDevice);
        }
        return;
      }
      if (msg.message?.serverMessage?.scanningFinished) {
        this._isScanning = false;
        this.emit("scanningfinished");
        return;
      }
      if (msg.message?.serverMessage?.disconnect) {
        this._connected = false;
        this.emit("serverdisconnect");
      }
    }
    catch (e) {
      this.emit("error", e);
    }
  };

  private throwIfDisposed() {
    if (this._clientPtr === undefined) {
      throw new ReferenceError();
    }
  }

  dispose() {
    if (!this._disposed) {
      this._disposed = true;
      clientFinalizer?.unregister(this._unregisterToken);
      try {
        for (const device of this._devices.values()) {
          device.dispose();
        }
      }
      finally {
        freeClientPtr(this._clientPtr);
        this._clientPtr = 0;
      }
    }
  }
}
