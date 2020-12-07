/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

"use strict";
import { ButtplugDeviceError } from "errors";
import { EventEmitter } from "events";

/**
 * Represents an abstract device, capable of taking certain kinds of messages.
 */
export class ButtplugClientDevice extends EventEmitter {

  private _name: string;
  private _index: number;

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
  constructor(_devicePtr: number,
    _index: number,
    _name: string,
    allowedMsgsObj: object) {
    super();
  }

  /**
   * Return the message attributes related to the given message
   */
  /*
  public MessageAttributes(messageName: string): Messages.MessageAttributes {
    return this.allowedMsgs.get(messageName)!;
  }
  */

}
