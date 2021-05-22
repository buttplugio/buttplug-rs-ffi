import { Buttplug } from "./buttplug_ffi.js";

export class ButtplugError extends Error {
  /*

  public get ErrorClass(): Messages.ErrorClass {
    return this.errorClass;
  }

  public get InnerError(): Error | undefined {
    return this.innerError;
  }

  public get Id(): number | undefined {
    return this.messageId;
  }

  public get ErrorMessage(): Messages.ButtplugMessage {
    return new Messages.Error(this.message, this.ErrorClass, this.Id);
  }

  public static FromError(aError: Messages.Error) {
    switch (aError.ErrorCode) {
      case Messages.ErrorClass.ERROR_DEVICE:
        return new ButtplugDeviceError(aError.ErrorMessage, aError.Id);
      case Messages.ErrorClass.ERROR_INIT:
        return new ButtplugInitError(aError.ErrorMessage, aError.Id);
      case Messages.ErrorClass.ERROR_UNKNOWN:
        return new ButtplugUnknownError(aError.ErrorMessage, aError.Id);
      case Messages.ErrorClass.ERROR_PING:
        return new ButtplugPingError(aError.ErrorMessage, aError.Id);
      case Messages.ErrorClass.ERROR_MSG:
        return new ButtplugMessageError(aError.ErrorMessage, aError.Id);
      default:
        throw new Error(`Message type ${aError.ErrorCode} not handled`);
    }
  }
*/
  public innerError: Error | undefined;
  public messageId: number | undefined;

  protected constructor(aMessage: string,
                        aId: number = 0,
                        aInner?: Error) {
    super(aMessage);
    this.innerError = aInner;
    this.messageId = aId;
  }
}

export class ButtplugHandshakeError extends ButtplugError {
  public constructor(aMessage: string, aId: number = 0) {
    super(aMessage, aId);
  }
}

export class ButtplugDeviceError extends ButtplugError {
  public constructor(aMessage: string, aId: number = 0) {
    super(aMessage, aId);
  }
}

export class ButtplugMessageError extends ButtplugError {
  public constructor(aMessage: string, aId: number = 0) {
    super(aMessage, aId);
  }
}

export class ButtplugPingError extends ButtplugError {
  public constructor(aMessage: string, aId: number = 0) {
    super(aMessage, aId);
  }
}

export class ButtplugUnknownError extends ButtplugError {
  public constructor(aMessage: string, aId: number = 0) {
    super(aMessage, aId);
  }
}

export class ButtplugClientConnectorError extends ButtplugError {
  public constructor(aMessage: string, aId: number = 0) {
    super(aMessage, aId);
  }
}

export function convertPBufError(err: Buttplug.ServerMessage.IError, id: number): ButtplugError {
  if (err.errorType === Buttplug.ServerMessage.ButtplugErrorType.ButtplugConnectorError) {
    return new ButtplugClientConnectorError(err.message!, id);
  }
  if (err.errorType === Buttplug.ServerMessage.ButtplugErrorType.ButtplugDeviceError) {
    return new ButtplugDeviceError(err.message!, id);
  }
  if (err.errorType === Buttplug.ServerMessage.ButtplugErrorType.ButtplugHandshakeError) {
    return new ButtplugHandshakeError(err.message!, id);
  }
  if (err.errorType === Buttplug.ServerMessage.ButtplugErrorType.ButtplugMessageError) {
    return new ButtplugMessageError(err.message!, id);
  }
  if (err.errorType === Buttplug.ServerMessage.ButtplugErrorType.ButtplugPingError) {
    return new ButtplugPingError(err.message!, id);
  }
  if (err.errorType === Buttplug.ServerMessage.ButtplugErrorType.ButtplugUnknownError) {
    return new ButtplugUnknownError(err.message!, id);
  }
  throw new ButtplugUnknownError("Cannot convert error: " + err);
}
