/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";
import { Buttplug } from "./buttplug_ffi";
import { ButtplugDeviceError } from "./errors";
import { EventEmitter } from "events";
import { vibrate, rotate, stopDevice, linear, batteryLevel,
  rssiLevel, rawRead, rawWrite, rawSubscribe, rawUnsubscribe } from "./ffi";
import { ButtplugMessageSorter } from "sorter";

class MessageAttributes {
  /** MessageAttributes featureCount */
  featureCount?: (number | null);

  /** MessageAttributes stepCount */
  stepCount?: (number[] | null);

  /** MessageAttributes endpoints */
  endpoints?: (Buttplug.Endpoint[] | null);

  /** MessageAttributes maxDuration */
  maxDuration?: (number[] | null);

  constructor(attributes: Buttplug.ServerMessage.IMessageAttributes) {
    this.featureCount = attributes.featureCount;
    this.stepCount = attributes.stepCount;
    this.maxDuration = attributes.maxDuration;
    this.endpoints = attributes.endpoints;
  }
}

export class VibrationCmd {
  public readonly Index: number;
  public readonly Speed: number;

  constructor(index: number, speed: number) {
    this.Index = index;
    this.Speed = speed;
  }
}

export class RotationCmd {
  public readonly Index: number;
  public readonly Speed: number;
  public readonly Clockwise: boolean;

  constructor(index: number, speed: number, clockwise: boolean) {
    this.Index = index;
    this.Speed = speed;
    this.Clockwise = clockwise;
  }
}

export class VectorCmd {
  public readonly Index: number;
  public readonly Duration: number;
  public readonly Position: number;

  constructor(index: number, duration: number, position: number) {
    this.Index = index;
    this.Duration = duration;
    this.Position = position;
  }
}

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class ButtplugClientDevice extends EventEmitter {

  private _name: string;
  private _index: number;
  private _devicePtr: number;
  private _messageAttributes: Map<Buttplug.ServerMessage.MessageAttributeType, MessageAttributes> = new Map();
  private _sorter: ButtplugMessageSorter;

  /**
   * Return the name of the device.
   */
  public get Name(): string {
    return this._name;
  }

  /**
   * Return the index of the device.
   */
  public get Index(): number {
    return this._index;
  }

  /**
   * Return a list of message types the device accepts.
   */
  public get AllowedMessages(): string[] {
    return [];
    //return Array.from(this.allowedMsgs.keys());
  }

  public get AllowedMessagesObject(): object {
    const obj = {};
    // this.allowedMsgs.forEach((value, key) => { obj[key] = value; });
    return obj;
  }

  // Map of messages and their attributes (feature count, etc...)
  // private allowedMsgs: Map<string, Messages.MessageAttributes> = new Map<string, Messages.MessageAttributes>();

  /**
   * @param _index Index of the device, as created by the device manager.
   * @param _name Name of the device.
   * @param allowedMsgs Buttplug messages the device can receive.
   */
  constructor(
    devicePtr: number,
    sorter: ButtplugMessageSorter,
    index: number,
    name: string,
    allowedMsgsObj: Buttplug.ServerMessage.IMessageAttributes[]) {
    super();
    this._devicePtr = devicePtr;
    this._sorter = sorter;
    this._index = index;
    this._name = name;
    for (let attributes of allowedMsgsObj) {
      this._messageAttributes.set(attributes.messageType!, new MessageAttributes(attributes));
    }
  }

  /**
   * Return the message attributes related to the given message
   */
  /*
  public MessageAttributes(messageName: string): Messages.MessageAttributes {
    return this.allowedMsgs.get(messageName)!;
  }
  */

  protected checkAllowedMessageType(messageType: number) {
    if (!this._messageAttributes.has(messageType)) {
      throw new ButtplugDeviceError(`Message ${Buttplug.ServerMessage.MessageAttributeType[messageType]} does not exist on device ${this._name}`);
    }
  }

  public async vibrate(speeds: number | VibrationCmd[]): Promise<void> {
    this.checkAllowedMessageType(Buttplug.ServerMessage.MessageAttributeType.VibrateCmd);
    let msgSpeeds: Buttplug.DeviceMessage.VibrateComponent[];
    if (typeof (speeds) === "number") {
      // We can skip the check here since we're building the command array ourselves.
      const features = this._messageAttributes.get(Buttplug.ServerMessage.MessageAttributeType.VibrateCmd)!.featureCount!;
      msgSpeeds = Array.from({length: features}, (_, i) => Buttplug.DeviceMessage.VibrateComponent.create({
        index: i,
        speed: speeds,
      }));
    } else if (Array.isArray(speeds) && speeds.every(x => x instanceof VibrationCmd)) {
      msgSpeeds = (speeds as any).map(x => Buttplug.DeviceMessage.VibrateComponent.create({
        index: x.index,
        speed: x.speed
      }));
    } else {
      throw new ButtplugDeviceError("vibrate can only take numbers or arrays of numbers.");
    }
    await vibrate(this._sorter, this._devicePtr, msgSpeeds);
  }

  public async rotate(speeds: number | RotationCmd[], clockwise: boolean | undefined): Promise<void> {
    this.checkAllowedMessageType(Buttplug.ServerMessage.MessageAttributeType.RotateCmd);
    let msgRotations: Buttplug.DeviceMessage.RotateComponent[];
    if (typeof (speeds) === "number" && clockwise !== undefined) {
      // We can skip the check here since we're building the command array ourselves.
      const features = this._messageAttributes.get(Buttplug.ServerMessage.MessageAttributeType.RotateCmd)!.featureCount!;
      msgRotations = Array.from({length: features}, (_, i) => Buttplug.DeviceMessage.RotateComponent.create({
        index: i,
        speed: speeds,
        clockwise: clockwise
      }));
    } else if (Array.isArray(speeds) && speeds.every(x => x instanceof RotationCmd)) {
      msgRotations = (speeds as any).map(x => Buttplug.DeviceMessage.RotateComponent.create({
        index: x.Index,
        speed: x.Speed,
        clockwise: x.Clockwise
      }));
    } else {
      throw new ButtplugDeviceError("rotate can only take number/boolean or arrays of RotateCmds.");
    }
    await rotate(this._sorter, this._devicePtr, msgRotations);
  }

  public async linear(position: number | VectorCmd[], duration: number | undefined): Promise<void> {
    this.checkAllowedMessageType(Buttplug.ServerMessage.MessageAttributeType.RotateCmd);
    let msgVectors: Buttplug.DeviceMessage.LinearComponent[];
    if (typeof (position) === "number" && duration !== undefined) {
      // We can skip the check here since we're building the command array ourselves.
      const features = this._messageAttributes.get(Buttplug.ServerMessage.MessageAttributeType.LinearCmd)!.featureCount!;
      msgVectors = Array.from({length: features}, (_, i) => Buttplug.DeviceMessage.LinearComponent.create({
        index: i,
        position: position,
        duration: duration
      }));
    } else if (Array.isArray(position) && position.every(x => x instanceof VectorCmd)) {
      msgVectors = position.map(x => Buttplug.DeviceMessage.LinearComponent.create({
        index: x.Index,
        position: x.Position,
        duration: x.Duration
      }));
    } else {
      throw new ButtplugDeviceError("linear can only take number/number or arrays of VectorCmds.");
    }
    await linear(this._sorter, this._devicePtr, msgVectors);
  }

  public async batteryLevel(): Promise<number> {
    let batteryMsg = await batteryLevel(this._sorter, this._devicePtr);
    if (batteryMsg.message?.deviceEvent?.batteryLevelReading) {
      let reading = batteryMsg.message?.deviceEvent?.batteryLevelReading;
      return reading.reading!;
    }
    throw new ButtplugDeviceError("Wrong reply message received for batteryLevel: " + batteryMsg);
  }

  public async rssiLevel(): Promise<number> {
    let rssiMsg = await rssiLevel(this._sorter, this._devicePtr);
    if (rssiMsg.message?.deviceEvent?.rssiLevelReading) {
      return rssiMsg.message?.deviceEvent?.rssiLevelReading.reading!;
    }
    throw new ButtplugDeviceError("Wrong reply message received for rssiLevel: " + rssiMsg);
  }

  public async rawRead(endpoint: Buttplug.Endpoint, expectedLength: number, timeout: number): Promise<Uint8Array> {
    let readingMsg = await rawRead(this._sorter, this._devicePtr, endpoint, expectedLength, timeout);
    if (readingMsg.message?.deviceEvent?.rawReading) {
      return readingMsg.message.deviceEvent.rawReading.data!;
    }
    throw new ButtplugDeviceError("Wrong reply message received for rawRead: " + readingMsg);
  }

  public async rawWrite(endpoint: Buttplug.Endpoint, data: Uint8Array, writeWithResponse: boolean): Promise<void> {
    await rawWrite(this._sorter, this._devicePtr, endpoint, data, writeWithResponse);
  }

  public async rawSubscribe(endpoint: Buttplug.Endpoint): Promise<void> {
    await rawSubscribe(this._sorter, this._devicePtr, endpoint);
  }

  public async rawUnsubscribe(endpoint: Buttplug.Endpoint): Promise<void> {
    await rawUnsubscribe(this._sorter, this._devicePtr, endpoint);
  }

  public async stop(): Promise<void> {
    await stopDevice(this._sorter, this._devicePtr);
  }

  public emitDisconnected() {
    this.emit("deviceremoved");
  }
}
