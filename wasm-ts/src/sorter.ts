/*!
 * Buttplug JS Source Code File - Visit https://buttplug.io for more info about
 * the project. Licensed under the BSD 3-Clause license. See LICENSE file in the
 * project root for full license information.
 *
 * @copyright Copyright (c) Nonpolynomial Labs LLC. All rights reserved.
 */

import { Buttplug } from "./buttplug_ffi";

export class ButtplugMessageSorter {
  protected _counter: number = 1;
  protected _waitingMsgs: Map<number, [(val: Buttplug.ServerMessage) => void, (err: Error) => void]> = new Map();

  public constructor() {
  }

  // One of the places we should actually return a promise, as we need to store
  // them while waiting for them to return across the line.
  // tslint:disable:promise-function-async
  public PrepareOutgoingMessage(aMsg: Buttplug.ClientMessage): Promise<Buttplug.ButtplugFFIServerMessage> {
    aMsg.id = this._counter;
    // Always increment last, otherwise we might lose sync
    this._counter += 1;
    let res;
    let rej;
    const msgPromise = new Promise<Buttplug.ButtplugFFIServerMessage>((resolve, reject) => { res = resolve; rej = reject; });
    this._waitingMsgs.set(aMsg.id, [res, rej]);
    return msgPromise;
  }

  public ParseIncomingMessages(msg: Buttplug.ButtplugFFIServerMessage): Buttplug.ServerMessage | null {
    if (msg.id !== 0 && this._waitingMsgs.has(msg.id)) {
      const [res, rej] = this._waitingMsgs.get(msg.id)!;
      // If we've gotten back an error, reject the related promise using a
      // ButtplugException derived type.
      /*
      if (x.Type === Messages.Error) {
        rej(ButtplugException.FromError(x as Messages.Error));
        return null;
      }
      */
      res(msg);
      return null;
    }
    return msg;
  }
}
