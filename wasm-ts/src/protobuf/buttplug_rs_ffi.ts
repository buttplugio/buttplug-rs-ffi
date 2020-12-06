/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface ClientMessage {
  id: number;
  message: ClientMessage_FFIMessage | undefined;
}

export interface ClientMessage_ConnectLocal {
  serverName: string;
  maxPingTime: number;
  allowRawMessages: boolean;
  deviceConfigurationJson: string;
  userDeviceConfigurationJson: string;
  commManagerTypes: number;
}

export interface ClientMessage_ConnectWebsocket {
  address: string;
  bypassCertVerification: boolean;
}

export interface ClientMessage_StartScanning {
}

export interface ClientMessage_StopScanning {
}

export interface ClientMessage_StopAllDevices {
}

export interface ClientMessage_Disconnect {
}

export interface ClientMessage_Ping {
}

export interface ClientMessage_FFIMessage {
  connectLocal: ClientMessage_ConnectLocal | undefined;
  connectWebsocket: ClientMessage_ConnectWebsocket | undefined;
  startScanning: ClientMessage_StartScanning | undefined;
  stopScanning: ClientMessage_StopScanning | undefined;
  stopAllDevices: ClientMessage_StopAllDevices | undefined;
  disconnect: ClientMessage_Disconnect | undefined;
  ping: ClientMessage_Ping | undefined;
}

export interface DeviceMessage {
  id: number;
  index: number;
  message: DeviceMessage_FFIMessage | undefined;
}

export interface DeviceMessage_VibrateComponent {
  index: number;
  speed: number;
}

export interface DeviceMessage_VibrateCmd {
  speeds: DeviceMessage_VibrateComponent[];
}

export interface DeviceMessage_RotateComponent {
  index: number;
  speed: number;
  clockwise: boolean;
}

export interface DeviceMessage_RotateCmd {
  rotations: DeviceMessage_RotateComponent[];
}

export interface DeviceMessage_LinearComponent {
  index: number;
  duration: number;
  position: number;
}

export interface DeviceMessage_LinearCmd {
  movements: DeviceMessage_LinearComponent[];
}

export interface DeviceMessage_StopDeviceCmd {
}

export interface DeviceMessage_RawReadCmd {
  endpoint: Endpoint;
  data: Uint8Array;
  expectedLength: number;
  timeout: number;
}

export interface DeviceMessage_RawWriteCmd {
  endpoint: Endpoint;
  data: Uint8Array;
  writeWithResponse: boolean;
}

export interface DeviceMessage_RawSubscribeCmd {
  endpoint: Endpoint;
}

export interface DeviceMessage_RawUnsubscribeCmd {
  endpoint: Endpoint;
}

export interface DeviceMessage_BatteryLevelCmd {
}

export interface DeviceMessage_RSSILevelCmd {
}

export interface DeviceMessage_FFIMessage {
  vibrateCmd: DeviceMessage_VibrateCmd | undefined;
  rotateCmd: DeviceMessage_RotateCmd | undefined;
  linearCmd: DeviceMessage_LinearCmd | undefined;
  stopDeviceCmd: DeviceMessage_StopDeviceCmd | undefined;
  rawReadCmd: DeviceMessage_RawReadCmd | undefined;
  rawWriteCmd: DeviceMessage_RawWriteCmd | undefined;
  rawSubscribeCmd: DeviceMessage_RawSubscribeCmd | undefined;
  rawUnsubscribeCmd: DeviceMessage_RawUnsubscribeCmd | undefined;
  batteryLevelCmd: DeviceMessage_BatteryLevelCmd | undefined;
  rssiLevelCmd: DeviceMessage_RSSILevelCmd | undefined;
}

export interface ServerMessage {
  ok: ServerMessage_Ok | undefined;
  error: ServerMessage_Error | undefined;
  scanningFinished: ServerMessage_ScanningFinished | undefined;
  deviceAdded: ServerMessage_DeviceAdded | undefined;
  deviceRemoved: ServerMessage_DeviceRemoved | undefined;
  disconnect: ServerMessage_Disconnect | undefined;
}

export interface ServerMessage_MessageAttributes {
  messageType: ServerMessage_MessageAttributeType;
  featureCount: number;
  stepCount: number[];
  endpoints: Endpoint[];
  /**
   *  TODO Patterns
   *  TODO Actuator Type
   */
  maxDuration: number[];
}

export interface ServerMessage_Ok {
}

export interface ServerMessage_Error {
  errorType: ServerMessage_ButtplugErrorType;
  message: string;
  backtrace: string;
}

export interface ServerMessage_ScanningFinished {
}

export interface ServerMessage_DeviceAdded {
  name: string;
  index: number;
  messageAttributes: ServerMessage_MessageAttributes[];
}

export interface ServerMessage_DeviceRemoved {
  index: number;
}

export interface ServerMessage_Disconnect {
}

export interface DeviceEvent {
  disconnect: DeviceEvent_Disconnect | undefined;
  batteryLevelReading: DeviceEvent_BatteryLevelReading | undefined;
  rssiLevelReading: DeviceEvent_RSSILevelReading | undefined;
  rawReading: DeviceEvent_RawReading | undefined;
}

export interface DeviceEvent_Disconnect {
  index: number;
}

export interface DeviceEvent_RawReading {
  index: number;
  endpoint: Endpoint;
  data: Uint8Array;
}

export interface DeviceEvent_BatteryLevelReading {
  index: number;
  reading: number;
}

export interface DeviceEvent_RSSILevelReading {
  index: number;
  reading: number;
}

export interface ButtplugFFIServerMessage {
  id: number;
  message: ButtplugFFIServerMessage_FFIMessage | undefined;
}

export interface ButtplugFFIServerMessage_FFIMessage {
  serverMessage: ServerMessage | undefined;
  deviceEvent: DeviceEvent | undefined;
}

const baseClientMessage: object = {
  id: 0,
};

const baseClientMessage_ConnectLocal: object = {
  serverName: "",
  maxPingTime: 0,
  allowRawMessages: false,
  deviceConfigurationJson: "",
  userDeviceConfigurationJson: "",
  commManagerTypes: 0,
};

const baseClientMessage_ConnectWebsocket: object = {
  address: "",
  bypassCertVerification: false,
};

const baseClientMessage_StartScanning: object = {
};

const baseClientMessage_StopScanning: object = {
};

const baseClientMessage_StopAllDevices: object = {
};

const baseClientMessage_Disconnect: object = {
};

const baseClientMessage_Ping: object = {
};

const baseClientMessage_FFIMessage: object = {
};

const baseDeviceMessage: object = {
  id: 0,
  index: 0,
};

const baseDeviceMessage_VibrateComponent: object = {
  index: 0,
  speed: 0,
};

const baseDeviceMessage_VibrateCmd: object = {
};

const baseDeviceMessage_RotateComponent: object = {
  index: 0,
  speed: 0,
  clockwise: false,
};

const baseDeviceMessage_RotateCmd: object = {
};

const baseDeviceMessage_LinearComponent: object = {
  index: 0,
  duration: 0,
  position: 0,
};

const baseDeviceMessage_LinearCmd: object = {
};

const baseDeviceMessage_StopDeviceCmd: object = {
};

const baseDeviceMessage_RawReadCmd: object = {
  endpoint: 0,
  expectedLength: 0,
  timeout: 0,
};

const baseDeviceMessage_RawWriteCmd: object = {
  endpoint: 0,
  writeWithResponse: false,
};

const baseDeviceMessage_RawSubscribeCmd: object = {
  endpoint: 0,
};

const baseDeviceMessage_RawUnsubscribeCmd: object = {
  endpoint: 0,
};

const baseDeviceMessage_BatteryLevelCmd: object = {
};

const baseDeviceMessage_RSSILevelCmd: object = {
};

const baseDeviceMessage_FFIMessage: object = {
};

const baseServerMessage: object = {
};

const baseServerMessage_MessageAttributes: object = {
  messageType: 0,
  featureCount: 0,
  stepCount: 0,
  endpoints: 0,
  maxDuration: 0,
};

const baseServerMessage_Ok: object = {
};

const baseServerMessage_Error: object = {
  errorType: 0,
  message: "",
  backtrace: "",
};

const baseServerMessage_ScanningFinished: object = {
};

const baseServerMessage_DeviceAdded: object = {
  name: "",
  index: 0,
};

const baseServerMessage_DeviceRemoved: object = {
  index: 0,
};

const baseServerMessage_Disconnect: object = {
};

const baseDeviceEvent: object = {
};

const baseDeviceEvent_Disconnect: object = {
  index: 0,
};

const baseDeviceEvent_RawReading: object = {
  index: 0,
  endpoint: 0,
};

const baseDeviceEvent_BatteryLevelReading: object = {
  index: 0,
  reading: 0,
};

const baseDeviceEvent_RSSILevelReading: object = {
  index: 0,
  reading: 0,
};

const baseButtplugFFIServerMessage: object = {
  id: 0,
};

const baseButtplugFFIServerMessage_FFIMessage: object = {
};

export const protobufPackage = 'Buttplug'

export enum Endpoint {
  Command = 0,
  Firmware = 1,
  Rx = 2,
  RxAccel = 3,
  RxBLEBattery = 4,
  RxPressure = 5,
  RxTouch = 6,
  Tx = 7,
  TxMode = 8,
  TxShock = 9,
  TxVibrate = 10,
  TxVendorControl = 11,
  Whitelist = 12,
  Generic0 = 13,
  Generic1 = 14,
  Generic2 = 15,
  Generic3 = 16,
  Generic4 = 17,
  Generic5 = 18,
  Generic6 = 19,
  Generic7 = 20,
  Generic8 = 21,
  Generic9 = 22,
  Generic10 = 23,
  Generic11 = 24,
  Generic12 = 25,
  Generic13 = 26,
  Generic14 = 27,
  Generic15 = 28,
  Generic16 = 29,
  Generic17 = 30,
  Generic18 = 31,
  Generic19 = 32,
  Generic20 = 33,
  Generic21 = 34,
  Generic22 = 35,
  Generic23 = 36,
  Generic24 = 37,
  Generic25 = 38,
  Generic26 = 39,
  Generic27 = 40,
  Generic28 = 41,
  Generic29 = 42,
  Generic30 = 43,
  Generic31 = 44,
  UNRECOGNIZED = -1,
}

export function endpointFromJSON(object: any): Endpoint {
  switch (object) {
    case 0:
    case "Command":
      return Endpoint.Command;
    case 1:
    case "Firmware":
      return Endpoint.Firmware;
    case 2:
    case "Rx":
      return Endpoint.Rx;
    case 3:
    case "RxAccel":
      return Endpoint.RxAccel;
    case 4:
    case "RxBLEBattery":
      return Endpoint.RxBLEBattery;
    case 5:
    case "RxPressure":
      return Endpoint.RxPressure;
    case 6:
    case "RxTouch":
      return Endpoint.RxTouch;
    case 7:
    case "Tx":
      return Endpoint.Tx;
    case 8:
    case "TxMode":
      return Endpoint.TxMode;
    case 9:
    case "TxShock":
      return Endpoint.TxShock;
    case 10:
    case "TxVibrate":
      return Endpoint.TxVibrate;
    case 11:
    case "TxVendorControl":
      return Endpoint.TxVendorControl;
    case 12:
    case "Whitelist":
      return Endpoint.Whitelist;
    case 13:
    case "Generic0":
      return Endpoint.Generic0;
    case 14:
    case "Generic1":
      return Endpoint.Generic1;
    case 15:
    case "Generic2":
      return Endpoint.Generic2;
    case 16:
    case "Generic3":
      return Endpoint.Generic3;
    case 17:
    case "Generic4":
      return Endpoint.Generic4;
    case 18:
    case "Generic5":
      return Endpoint.Generic5;
    case 19:
    case "Generic6":
      return Endpoint.Generic6;
    case 20:
    case "Generic7":
      return Endpoint.Generic7;
    case 21:
    case "Generic8":
      return Endpoint.Generic8;
    case 22:
    case "Generic9":
      return Endpoint.Generic9;
    case 23:
    case "Generic10":
      return Endpoint.Generic10;
    case 24:
    case "Generic11":
      return Endpoint.Generic11;
    case 25:
    case "Generic12":
      return Endpoint.Generic12;
    case 26:
    case "Generic13":
      return Endpoint.Generic13;
    case 27:
    case "Generic14":
      return Endpoint.Generic14;
    case 28:
    case "Generic15":
      return Endpoint.Generic15;
    case 29:
    case "Generic16":
      return Endpoint.Generic16;
    case 30:
    case "Generic17":
      return Endpoint.Generic17;
    case 31:
    case "Generic18":
      return Endpoint.Generic18;
    case 32:
    case "Generic19":
      return Endpoint.Generic19;
    case 33:
    case "Generic20":
      return Endpoint.Generic20;
    case 34:
    case "Generic21":
      return Endpoint.Generic21;
    case 35:
    case "Generic22":
      return Endpoint.Generic22;
    case 36:
    case "Generic23":
      return Endpoint.Generic23;
    case 37:
    case "Generic24":
      return Endpoint.Generic24;
    case 38:
    case "Generic25":
      return Endpoint.Generic25;
    case 39:
    case "Generic26":
      return Endpoint.Generic26;
    case 40:
    case "Generic27":
      return Endpoint.Generic27;
    case 41:
    case "Generic28":
      return Endpoint.Generic28;
    case 42:
    case "Generic29":
      return Endpoint.Generic29;
    case 43:
    case "Generic30":
      return Endpoint.Generic30;
    case 44:
    case "Generic31":
      return Endpoint.Generic31;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Endpoint.UNRECOGNIZED;
  }
}

export function endpointToJSON(object: Endpoint): string {
  switch (object) {
    case Endpoint.Command:
      return "Command";
    case Endpoint.Firmware:
      return "Firmware";
    case Endpoint.Rx:
      return "Rx";
    case Endpoint.RxAccel:
      return "RxAccel";
    case Endpoint.RxBLEBattery:
      return "RxBLEBattery";
    case Endpoint.RxPressure:
      return "RxPressure";
    case Endpoint.RxTouch:
      return "RxTouch";
    case Endpoint.Tx:
      return "Tx";
    case Endpoint.TxMode:
      return "TxMode";
    case Endpoint.TxShock:
      return "TxShock";
    case Endpoint.TxVibrate:
      return "TxVibrate";
    case Endpoint.TxVendorControl:
      return "TxVendorControl";
    case Endpoint.Whitelist:
      return "Whitelist";
    case Endpoint.Generic0:
      return "Generic0";
    case Endpoint.Generic1:
      return "Generic1";
    case Endpoint.Generic2:
      return "Generic2";
    case Endpoint.Generic3:
      return "Generic3";
    case Endpoint.Generic4:
      return "Generic4";
    case Endpoint.Generic5:
      return "Generic5";
    case Endpoint.Generic6:
      return "Generic6";
    case Endpoint.Generic7:
      return "Generic7";
    case Endpoint.Generic8:
      return "Generic8";
    case Endpoint.Generic9:
      return "Generic9";
    case Endpoint.Generic10:
      return "Generic10";
    case Endpoint.Generic11:
      return "Generic11";
    case Endpoint.Generic12:
      return "Generic12";
    case Endpoint.Generic13:
      return "Generic13";
    case Endpoint.Generic14:
      return "Generic14";
    case Endpoint.Generic15:
      return "Generic15";
    case Endpoint.Generic16:
      return "Generic16";
    case Endpoint.Generic17:
      return "Generic17";
    case Endpoint.Generic18:
      return "Generic18";
    case Endpoint.Generic19:
      return "Generic19";
    case Endpoint.Generic20:
      return "Generic20";
    case Endpoint.Generic21:
      return "Generic21";
    case Endpoint.Generic22:
      return "Generic22";
    case Endpoint.Generic23:
      return "Generic23";
    case Endpoint.Generic24:
      return "Generic24";
    case Endpoint.Generic25:
      return "Generic25";
    case Endpoint.Generic26:
      return "Generic26";
    case Endpoint.Generic27:
      return "Generic27";
    case Endpoint.Generic28:
      return "Generic28";
    case Endpoint.Generic29:
      return "Generic29";
    case Endpoint.Generic30:
      return "Generic30";
    case Endpoint.Generic31:
      return "Generic31";
    default:
      return "UNKNOWN";
  }
}

/**  This is a bitfield, not a normal enum
 */
export enum ClientMessage_DeviceCommunicationManagerTypes {
  All = 0,
  Btleplug = 1,
  XInput = 2,
  SerialPort = 4,
  LovenseHIDDongle = 8,
  LovenseSerialDongle = 16,
  UNRECOGNIZED = -1,
}

export function clientMessage_DeviceCommunicationManagerTypesFromJSON(object: any): ClientMessage_DeviceCommunicationManagerTypes {
  switch (object) {
    case 0:
    case "All":
      return ClientMessage_DeviceCommunicationManagerTypes.All;
    case 1:
    case "Btleplug":
      return ClientMessage_DeviceCommunicationManagerTypes.Btleplug;
    case 2:
    case "XInput":
      return ClientMessage_DeviceCommunicationManagerTypes.XInput;
    case 4:
    case "SerialPort":
      return ClientMessage_DeviceCommunicationManagerTypes.SerialPort;
    case 8:
    case "LovenseHIDDongle":
      return ClientMessage_DeviceCommunicationManagerTypes.LovenseHIDDongle;
    case 16:
    case "LovenseSerialDongle":
      return ClientMessage_DeviceCommunicationManagerTypes.LovenseSerialDongle;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ClientMessage_DeviceCommunicationManagerTypes.UNRECOGNIZED;
  }
}

export function clientMessage_DeviceCommunicationManagerTypesToJSON(object: ClientMessage_DeviceCommunicationManagerTypes): string {
  switch (object) {
    case ClientMessage_DeviceCommunicationManagerTypes.All:
      return "All";
    case ClientMessage_DeviceCommunicationManagerTypes.Btleplug:
      return "Btleplug";
    case ClientMessage_DeviceCommunicationManagerTypes.XInput:
      return "XInput";
    case ClientMessage_DeviceCommunicationManagerTypes.SerialPort:
      return "SerialPort";
    case ClientMessage_DeviceCommunicationManagerTypes.LovenseHIDDongle:
      return "LovenseHIDDongle";
    case ClientMessage_DeviceCommunicationManagerTypes.LovenseSerialDongle:
      return "LovenseSerialDongle";
    default:
      return "UNKNOWN";
  }
}

export enum ServerMessage_ButtplugErrorType {
  ButtplugConnectorError = 0,
  ButtplugHandshakeError = 1,
  ButtplugDeviceError = 2,
  ButtplugPingError = 3,
  ButtplugMessageError = 4,
  ButtplugUnknownError = 5,
  UNRECOGNIZED = -1,
}

export function serverMessage_ButtplugErrorTypeFromJSON(object: any): ServerMessage_ButtplugErrorType {
  switch (object) {
    case 0:
    case "ButtplugConnectorError":
      return ServerMessage_ButtplugErrorType.ButtplugConnectorError;
    case 1:
    case "ButtplugHandshakeError":
      return ServerMessage_ButtplugErrorType.ButtplugHandshakeError;
    case 2:
    case "ButtplugDeviceError":
      return ServerMessage_ButtplugErrorType.ButtplugDeviceError;
    case 3:
    case "ButtplugPingError":
      return ServerMessage_ButtplugErrorType.ButtplugPingError;
    case 4:
    case "ButtplugMessageError":
      return ServerMessage_ButtplugErrorType.ButtplugMessageError;
    case 5:
    case "ButtplugUnknownError":
      return ServerMessage_ButtplugErrorType.ButtplugUnknownError;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ServerMessage_ButtplugErrorType.UNRECOGNIZED;
  }
}

export function serverMessage_ButtplugErrorTypeToJSON(object: ServerMessage_ButtplugErrorType): string {
  switch (object) {
    case ServerMessage_ButtplugErrorType.ButtplugConnectorError:
      return "ButtplugConnectorError";
    case ServerMessage_ButtplugErrorType.ButtplugHandshakeError:
      return "ButtplugHandshakeError";
    case ServerMessage_ButtplugErrorType.ButtplugDeviceError:
      return "ButtplugDeviceError";
    case ServerMessage_ButtplugErrorType.ButtplugPingError:
      return "ButtplugPingError";
    case ServerMessage_ButtplugErrorType.ButtplugMessageError:
      return "ButtplugMessageError";
    case ServerMessage_ButtplugErrorType.ButtplugUnknownError:
      return "ButtplugUnknownError";
    default:
      return "UNKNOWN";
  }
}

export enum ServerMessage_MessageAttributeType {
  VibrateCmd = 0,
  RotateCmd = 1,
  LinearCmd = 2,
  StopDeviceCmd = 3,
  RawReadCmd = 4,
  RawWriteCmd = 5,
  RawSubscribeCmd = 6,
  RawUnsubscribeCmd = 7,
  BatteryLevelCmd = 8,
  RSSILevelCmd = 9,
  UNRECOGNIZED = -1,
}

export function serverMessage_MessageAttributeTypeFromJSON(object: any): ServerMessage_MessageAttributeType {
  switch (object) {
    case 0:
    case "VibrateCmd":
      return ServerMessage_MessageAttributeType.VibrateCmd;
    case 1:
    case "RotateCmd":
      return ServerMessage_MessageAttributeType.RotateCmd;
    case 2:
    case "LinearCmd":
      return ServerMessage_MessageAttributeType.LinearCmd;
    case 3:
    case "StopDeviceCmd":
      return ServerMessage_MessageAttributeType.StopDeviceCmd;
    case 4:
    case "RawReadCmd":
      return ServerMessage_MessageAttributeType.RawReadCmd;
    case 5:
    case "RawWriteCmd":
      return ServerMessage_MessageAttributeType.RawWriteCmd;
    case 6:
    case "RawSubscribeCmd":
      return ServerMessage_MessageAttributeType.RawSubscribeCmd;
    case 7:
    case "RawUnsubscribeCmd":
      return ServerMessage_MessageAttributeType.RawUnsubscribeCmd;
    case 8:
    case "BatteryLevelCmd":
      return ServerMessage_MessageAttributeType.BatteryLevelCmd;
    case 9:
    case "RSSILevelCmd":
      return ServerMessage_MessageAttributeType.RSSILevelCmd;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ServerMessage_MessageAttributeType.UNRECOGNIZED;
  }
}

export function serverMessage_MessageAttributeTypeToJSON(object: ServerMessage_MessageAttributeType): string {
  switch (object) {
    case ServerMessage_MessageAttributeType.VibrateCmd:
      return "VibrateCmd";
    case ServerMessage_MessageAttributeType.RotateCmd:
      return "RotateCmd";
    case ServerMessage_MessageAttributeType.LinearCmd:
      return "LinearCmd";
    case ServerMessage_MessageAttributeType.StopDeviceCmd:
      return "StopDeviceCmd";
    case ServerMessage_MessageAttributeType.RawReadCmd:
      return "RawReadCmd";
    case ServerMessage_MessageAttributeType.RawWriteCmd:
      return "RawWriteCmd";
    case ServerMessage_MessageAttributeType.RawSubscribeCmd:
      return "RawSubscribeCmd";
    case ServerMessage_MessageAttributeType.RawUnsubscribeCmd:
      return "RawUnsubscribeCmd";
    case ServerMessage_MessageAttributeType.BatteryLevelCmd:
      return "BatteryLevelCmd";
    case ServerMessage_MessageAttributeType.RSSILevelCmd:
      return "RSSILevelCmd";
    default:
      return "UNKNOWN";
  }
}

export const ClientMessage = {
  encode(message: ClientMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.id);
    if (message.message !== undefined && message.message !== undefined) {
      ClientMessage_FFIMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientMessage } as ClientMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.message = ClientMessage_FFIMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ClientMessage {
    const message = { ...baseClientMessage } as ClientMessage;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = ClientMessage_FFIMessage.fromJSON(object.message);
    } else {
      message.message = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ClientMessage>): ClientMessage {
    const message = { ...baseClientMessage } as ClientMessage;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = ClientMessage_FFIMessage.fromPartial(object.message);
    } else {
      message.message = undefined;
    }
    return message;
  },
  toJSON(message: ClientMessage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.message !== undefined && (obj.message = message.message ? ClientMessage_FFIMessage.toJSON(message.message) : undefined);
    return obj;
  },
};

export const ClientMessage_ConnectLocal = {
  encode(message: ClientMessage_ConnectLocal, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.serverName);
    writer.uint32(16).uint32(message.maxPingTime);
    writer.uint32(24).bool(message.allowRawMessages);
    writer.uint32(34).string(message.deviceConfigurationJson);
    writer.uint32(42).string(message.userDeviceConfigurationJson);
    writer.uint32(48).uint32(message.commManagerTypes);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientMessage_ConnectLocal {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientMessage_ConnectLocal } as ClientMessage_ConnectLocal;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverName = reader.string();
          break;
        case 2:
          message.maxPingTime = reader.uint32();
          break;
        case 3:
          message.allowRawMessages = reader.bool();
          break;
        case 4:
          message.deviceConfigurationJson = reader.string();
          break;
        case 5:
          message.userDeviceConfigurationJson = reader.string();
          break;
        case 6:
          message.commManagerTypes = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ClientMessage_ConnectLocal {
    const message = { ...baseClientMessage_ConnectLocal } as ClientMessage_ConnectLocal;
    if (object.serverName !== undefined && object.serverName !== null) {
      message.serverName = String(object.serverName);
    } else {
      message.serverName = "";
    }
    if (object.maxPingTime !== undefined && object.maxPingTime !== null) {
      message.maxPingTime = Number(object.maxPingTime);
    } else {
      message.maxPingTime = 0;
    }
    if (object.allowRawMessages !== undefined && object.allowRawMessages !== null) {
      message.allowRawMessages = Boolean(object.allowRawMessages);
    } else {
      message.allowRawMessages = false;
    }
    if (object.deviceConfigurationJson !== undefined && object.deviceConfigurationJson !== null) {
      message.deviceConfigurationJson = String(object.deviceConfigurationJson);
    } else {
      message.deviceConfigurationJson = "";
    }
    if (object.userDeviceConfigurationJson !== undefined && object.userDeviceConfigurationJson !== null) {
      message.userDeviceConfigurationJson = String(object.userDeviceConfigurationJson);
    } else {
      message.userDeviceConfigurationJson = "";
    }
    if (object.commManagerTypes !== undefined && object.commManagerTypes !== null) {
      message.commManagerTypes = Number(object.commManagerTypes);
    } else {
      message.commManagerTypes = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ClientMessage_ConnectLocal>): ClientMessage_ConnectLocal {
    const message = { ...baseClientMessage_ConnectLocal } as ClientMessage_ConnectLocal;
    if (object.serverName !== undefined && object.serverName !== null) {
      message.serverName = object.serverName;
    } else {
      message.serverName = "";
    }
    if (object.maxPingTime !== undefined && object.maxPingTime !== null) {
      message.maxPingTime = object.maxPingTime;
    } else {
      message.maxPingTime = 0;
    }
    if (object.allowRawMessages !== undefined && object.allowRawMessages !== null) {
      message.allowRawMessages = object.allowRawMessages;
    } else {
      message.allowRawMessages = false;
    }
    if (object.deviceConfigurationJson !== undefined && object.deviceConfigurationJson !== null) {
      message.deviceConfigurationJson = object.deviceConfigurationJson;
    } else {
      message.deviceConfigurationJson = "";
    }
    if (object.userDeviceConfigurationJson !== undefined && object.userDeviceConfigurationJson !== null) {
      message.userDeviceConfigurationJson = object.userDeviceConfigurationJson;
    } else {
      message.userDeviceConfigurationJson = "";
    }
    if (object.commManagerTypes !== undefined && object.commManagerTypes !== null) {
      message.commManagerTypes = object.commManagerTypes;
    } else {
      message.commManagerTypes = 0;
    }
    return message;
  },
  toJSON(message: ClientMessage_ConnectLocal): unknown {
    const obj: any = {};
    message.serverName !== undefined && (obj.serverName = message.serverName);
    message.maxPingTime !== undefined && (obj.maxPingTime = message.maxPingTime);
    message.allowRawMessages !== undefined && (obj.allowRawMessages = message.allowRawMessages);
    message.deviceConfigurationJson !== undefined && (obj.deviceConfigurationJson = message.deviceConfigurationJson);
    message.userDeviceConfigurationJson !== undefined && (obj.userDeviceConfigurationJson = message.userDeviceConfigurationJson);
    message.commManagerTypes !== undefined && (obj.commManagerTypes = message.commManagerTypes);
    return obj;
  },
};

export const ClientMessage_ConnectWebsocket = {
  encode(message: ClientMessage_ConnectWebsocket, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.address);
    writer.uint32(16).bool(message.bypassCertVerification);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientMessage_ConnectWebsocket {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientMessage_ConnectWebsocket } as ClientMessage_ConnectWebsocket;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.bypassCertVerification = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ClientMessage_ConnectWebsocket {
    const message = { ...baseClientMessage_ConnectWebsocket } as ClientMessage_ConnectWebsocket;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.bypassCertVerification !== undefined && object.bypassCertVerification !== null) {
      message.bypassCertVerification = Boolean(object.bypassCertVerification);
    } else {
      message.bypassCertVerification = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ClientMessage_ConnectWebsocket>): ClientMessage_ConnectWebsocket {
    const message = { ...baseClientMessage_ConnectWebsocket } as ClientMessage_ConnectWebsocket;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.bypassCertVerification !== undefined && object.bypassCertVerification !== null) {
      message.bypassCertVerification = object.bypassCertVerification;
    } else {
      message.bypassCertVerification = false;
    }
    return message;
  },
  toJSON(message: ClientMessage_ConnectWebsocket): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.bypassCertVerification !== undefined && (obj.bypassCertVerification = message.bypassCertVerification);
    return obj;
  },
};

export const ClientMessage_StartScanning = {
  encode(_: ClientMessage_StartScanning, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientMessage_StartScanning {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientMessage_StartScanning } as ClientMessage_StartScanning;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ClientMessage_StartScanning {
    const message = { ...baseClientMessage_StartScanning } as ClientMessage_StartScanning;
    return message;
  },
  fromPartial(_: DeepPartial<ClientMessage_StartScanning>): ClientMessage_StartScanning {
    const message = { ...baseClientMessage_StartScanning } as ClientMessage_StartScanning;
    return message;
  },
  toJSON(_: ClientMessage_StartScanning): unknown {
    const obj: any = {};
    return obj;
  },
};

export const ClientMessage_StopScanning = {
  encode(_: ClientMessage_StopScanning, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientMessage_StopScanning {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientMessage_StopScanning } as ClientMessage_StopScanning;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ClientMessage_StopScanning {
    const message = { ...baseClientMessage_StopScanning } as ClientMessage_StopScanning;
    return message;
  },
  fromPartial(_: DeepPartial<ClientMessage_StopScanning>): ClientMessage_StopScanning {
    const message = { ...baseClientMessage_StopScanning } as ClientMessage_StopScanning;
    return message;
  },
  toJSON(_: ClientMessage_StopScanning): unknown {
    const obj: any = {};
    return obj;
  },
};

export const ClientMessage_StopAllDevices = {
  encode(_: ClientMessage_StopAllDevices, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientMessage_StopAllDevices {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientMessage_StopAllDevices } as ClientMessage_StopAllDevices;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ClientMessage_StopAllDevices {
    const message = { ...baseClientMessage_StopAllDevices } as ClientMessage_StopAllDevices;
    return message;
  },
  fromPartial(_: DeepPartial<ClientMessage_StopAllDevices>): ClientMessage_StopAllDevices {
    const message = { ...baseClientMessage_StopAllDevices } as ClientMessage_StopAllDevices;
    return message;
  },
  toJSON(_: ClientMessage_StopAllDevices): unknown {
    const obj: any = {};
    return obj;
  },
};

export const ClientMessage_Disconnect = {
  encode(_: ClientMessage_Disconnect, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientMessage_Disconnect {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientMessage_Disconnect } as ClientMessage_Disconnect;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ClientMessage_Disconnect {
    const message = { ...baseClientMessage_Disconnect } as ClientMessage_Disconnect;
    return message;
  },
  fromPartial(_: DeepPartial<ClientMessage_Disconnect>): ClientMessage_Disconnect {
    const message = { ...baseClientMessage_Disconnect } as ClientMessage_Disconnect;
    return message;
  },
  toJSON(_: ClientMessage_Disconnect): unknown {
    const obj: any = {};
    return obj;
  },
};

export const ClientMessage_Ping = {
  encode(_: ClientMessage_Ping, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientMessage_Ping {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientMessage_Ping } as ClientMessage_Ping;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ClientMessage_Ping {
    const message = { ...baseClientMessage_Ping } as ClientMessage_Ping;
    return message;
  },
  fromPartial(_: DeepPartial<ClientMessage_Ping>): ClientMessage_Ping {
    const message = { ...baseClientMessage_Ping } as ClientMessage_Ping;
    return message;
  },
  toJSON(_: ClientMessage_Ping): unknown {
    const obj: any = {};
    return obj;
  },
};

export const ClientMessage_FFIMessage = {
  encode(message: ClientMessage_FFIMessage, writer: Writer = Writer.create()): Writer {
    if (message.connectLocal !== undefined) {
      ClientMessage_ConnectLocal.encode(message.connectLocal, writer.uint32(10).fork()).ldelim();
    }
    if (message.connectWebsocket !== undefined) {
      ClientMessage_ConnectWebsocket.encode(message.connectWebsocket, writer.uint32(18).fork()).ldelim();
    }
    if (message.startScanning !== undefined) {
      ClientMessage_StartScanning.encode(message.startScanning, writer.uint32(26).fork()).ldelim();
    }
    if (message.stopScanning !== undefined) {
      ClientMessage_StopScanning.encode(message.stopScanning, writer.uint32(34).fork()).ldelim();
    }
    if (message.stopAllDevices !== undefined) {
      ClientMessage_StopAllDevices.encode(message.stopAllDevices, writer.uint32(42).fork()).ldelim();
    }
    if (message.disconnect !== undefined) {
      ClientMessage_Disconnect.encode(message.disconnect, writer.uint32(50).fork()).ldelim();
    }
    if (message.ping !== undefined) {
      ClientMessage_Ping.encode(message.ping, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ClientMessage_FFIMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseClientMessage_FFIMessage } as ClientMessage_FFIMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectLocal = ClientMessage_ConnectLocal.decode(reader, reader.uint32());
          break;
        case 2:
          message.connectWebsocket = ClientMessage_ConnectWebsocket.decode(reader, reader.uint32());
          break;
        case 3:
          message.startScanning = ClientMessage_StartScanning.decode(reader, reader.uint32());
          break;
        case 4:
          message.stopScanning = ClientMessage_StopScanning.decode(reader, reader.uint32());
          break;
        case 5:
          message.stopAllDevices = ClientMessage_StopAllDevices.decode(reader, reader.uint32());
          break;
        case 6:
          message.disconnect = ClientMessage_Disconnect.decode(reader, reader.uint32());
          break;
        case 7:
          message.ping = ClientMessage_Ping.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ClientMessage_FFIMessage {
    const message = { ...baseClientMessage_FFIMessage } as ClientMessage_FFIMessage;
    if (object.connectLocal !== undefined && object.connectLocal !== null) {
      message.connectLocal = ClientMessage_ConnectLocal.fromJSON(object.connectLocal);
    } else {
      message.connectLocal = undefined;
    }
    if (object.connectWebsocket !== undefined && object.connectWebsocket !== null) {
      message.connectWebsocket = ClientMessage_ConnectWebsocket.fromJSON(object.connectWebsocket);
    } else {
      message.connectWebsocket = undefined;
    }
    if (object.startScanning !== undefined && object.startScanning !== null) {
      message.startScanning = ClientMessage_StartScanning.fromJSON(object.startScanning);
    } else {
      message.startScanning = undefined;
    }
    if (object.stopScanning !== undefined && object.stopScanning !== null) {
      message.stopScanning = ClientMessage_StopScanning.fromJSON(object.stopScanning);
    } else {
      message.stopScanning = undefined;
    }
    if (object.stopAllDevices !== undefined && object.stopAllDevices !== null) {
      message.stopAllDevices = ClientMessage_StopAllDevices.fromJSON(object.stopAllDevices);
    } else {
      message.stopAllDevices = undefined;
    }
    if (object.disconnect !== undefined && object.disconnect !== null) {
      message.disconnect = ClientMessage_Disconnect.fromJSON(object.disconnect);
    } else {
      message.disconnect = undefined;
    }
    if (object.ping !== undefined && object.ping !== null) {
      message.ping = ClientMessage_Ping.fromJSON(object.ping);
    } else {
      message.ping = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ClientMessage_FFIMessage>): ClientMessage_FFIMessage {
    const message = { ...baseClientMessage_FFIMessage } as ClientMessage_FFIMessage;
    if (object.connectLocal !== undefined && object.connectLocal !== null) {
      message.connectLocal = ClientMessage_ConnectLocal.fromPartial(object.connectLocal);
    } else {
      message.connectLocal = undefined;
    }
    if (object.connectWebsocket !== undefined && object.connectWebsocket !== null) {
      message.connectWebsocket = ClientMessage_ConnectWebsocket.fromPartial(object.connectWebsocket);
    } else {
      message.connectWebsocket = undefined;
    }
    if (object.startScanning !== undefined && object.startScanning !== null) {
      message.startScanning = ClientMessage_StartScanning.fromPartial(object.startScanning);
    } else {
      message.startScanning = undefined;
    }
    if (object.stopScanning !== undefined && object.stopScanning !== null) {
      message.stopScanning = ClientMessage_StopScanning.fromPartial(object.stopScanning);
    } else {
      message.stopScanning = undefined;
    }
    if (object.stopAllDevices !== undefined && object.stopAllDevices !== null) {
      message.stopAllDevices = ClientMessage_StopAllDevices.fromPartial(object.stopAllDevices);
    } else {
      message.stopAllDevices = undefined;
    }
    if (object.disconnect !== undefined && object.disconnect !== null) {
      message.disconnect = ClientMessage_Disconnect.fromPartial(object.disconnect);
    } else {
      message.disconnect = undefined;
    }
    if (object.ping !== undefined && object.ping !== null) {
      message.ping = ClientMessage_Ping.fromPartial(object.ping);
    } else {
      message.ping = undefined;
    }
    return message;
  },
  toJSON(message: ClientMessage_FFIMessage): unknown {
    const obj: any = {};
    message.connectLocal !== undefined && (obj.connectLocal = message.connectLocal ? ClientMessage_ConnectLocal.toJSON(message.connectLocal) : undefined);
    message.connectWebsocket !== undefined && (obj.connectWebsocket = message.connectWebsocket ? ClientMessage_ConnectWebsocket.toJSON(message.connectWebsocket) : undefined);
    message.startScanning !== undefined && (obj.startScanning = message.startScanning ? ClientMessage_StartScanning.toJSON(message.startScanning) : undefined);
    message.stopScanning !== undefined && (obj.stopScanning = message.stopScanning ? ClientMessage_StopScanning.toJSON(message.stopScanning) : undefined);
    message.stopAllDevices !== undefined && (obj.stopAllDevices = message.stopAllDevices ? ClientMessage_StopAllDevices.toJSON(message.stopAllDevices) : undefined);
    message.disconnect !== undefined && (obj.disconnect = message.disconnect ? ClientMessage_Disconnect.toJSON(message.disconnect) : undefined);
    message.ping !== undefined && (obj.ping = message.ping ? ClientMessage_Ping.toJSON(message.ping) : undefined);
    return obj;
  },
};

export const DeviceMessage = {
  encode(message: DeviceMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.id);
    writer.uint32(16).uint32(message.index);
    if (message.message !== undefined && message.message !== undefined) {
      DeviceMessage_FFIMessage.encode(message.message, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage } as DeviceMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.index = reader.uint32();
          break;
        case 3:
          message.message = DeviceMessage_FFIMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage {
    const message = { ...baseDeviceMessage } as DeviceMessage;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = DeviceMessage_FFIMessage.fromJSON(object.message);
    } else {
      message.message = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage>): DeviceMessage {
    const message = { ...baseDeviceMessage } as DeviceMessage;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = DeviceMessage_FFIMessage.fromPartial(object.message);
    } else {
      message.message = undefined;
    }
    return message;
  },
  toJSON(message: DeviceMessage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.index !== undefined && (obj.index = message.index);
    message.message !== undefined && (obj.message = message.message ? DeviceMessage_FFIMessage.toJSON(message.message) : undefined);
    return obj;
  },
};

export const DeviceMessage_VibrateComponent = {
  encode(message: DeviceMessage_VibrateComponent, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.index);
    writer.uint32(17).double(message.speed);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_VibrateComponent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_VibrateComponent } as DeviceMessage_VibrateComponent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.speed = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_VibrateComponent {
    const message = { ...baseDeviceMessage_VibrateComponent } as DeviceMessage_VibrateComponent;
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    if (object.speed !== undefined && object.speed !== null) {
      message.speed = Number(object.speed);
    } else {
      message.speed = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_VibrateComponent>): DeviceMessage_VibrateComponent {
    const message = { ...baseDeviceMessage_VibrateComponent } as DeviceMessage_VibrateComponent;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    if (object.speed !== undefined && object.speed !== null) {
      message.speed = object.speed;
    } else {
      message.speed = 0;
    }
    return message;
  },
  toJSON(message: DeviceMessage_VibrateComponent): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.speed !== undefined && (obj.speed = message.speed);
    return obj;
  },
};

export const DeviceMessage_VibrateCmd = {
  encode(message: DeviceMessage_VibrateCmd, writer: Writer = Writer.create()): Writer {
    for (const v of message.speeds) {
      DeviceMessage_VibrateComponent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_VibrateCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_VibrateCmd } as DeviceMessage_VibrateCmd;
    message.speeds = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.speeds.push(DeviceMessage_VibrateComponent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_VibrateCmd {
    const message = { ...baseDeviceMessage_VibrateCmd } as DeviceMessage_VibrateCmd;
    message.speeds = [];
    if (object.speeds !== undefined && object.speeds !== null) {
      for (const e of object.speeds) {
        message.speeds.push(DeviceMessage_VibrateComponent.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_VibrateCmd>): DeviceMessage_VibrateCmd {
    const message = { ...baseDeviceMessage_VibrateCmd } as DeviceMessage_VibrateCmd;
    message.speeds = [];
    if (object.speeds !== undefined && object.speeds !== null) {
      for (const e of object.speeds) {
        message.speeds.push(DeviceMessage_VibrateComponent.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: DeviceMessage_VibrateCmd): unknown {
    const obj: any = {};
    if (message.speeds) {
      obj.speeds = message.speeds.map(e => e ? DeviceMessage_VibrateComponent.toJSON(e) : undefined);
    } else {
      obj.speeds = [];
    }
    return obj;
  },
};

export const DeviceMessage_RotateComponent = {
  encode(message: DeviceMessage_RotateComponent, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.index);
    writer.uint32(17).double(message.speed);
    writer.uint32(24).bool(message.clockwise);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_RotateComponent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_RotateComponent } as DeviceMessage_RotateComponent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.speed = reader.double();
          break;
        case 3:
          message.clockwise = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_RotateComponent {
    const message = { ...baseDeviceMessage_RotateComponent } as DeviceMessage_RotateComponent;
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    if (object.speed !== undefined && object.speed !== null) {
      message.speed = Number(object.speed);
    } else {
      message.speed = 0;
    }
    if (object.clockwise !== undefined && object.clockwise !== null) {
      message.clockwise = Boolean(object.clockwise);
    } else {
      message.clockwise = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_RotateComponent>): DeviceMessage_RotateComponent {
    const message = { ...baseDeviceMessage_RotateComponent } as DeviceMessage_RotateComponent;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    if (object.speed !== undefined && object.speed !== null) {
      message.speed = object.speed;
    } else {
      message.speed = 0;
    }
    if (object.clockwise !== undefined && object.clockwise !== null) {
      message.clockwise = object.clockwise;
    } else {
      message.clockwise = false;
    }
    return message;
  },
  toJSON(message: DeviceMessage_RotateComponent): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.speed !== undefined && (obj.speed = message.speed);
    message.clockwise !== undefined && (obj.clockwise = message.clockwise);
    return obj;
  },
};

export const DeviceMessage_RotateCmd = {
  encode(message: DeviceMessage_RotateCmd, writer: Writer = Writer.create()): Writer {
    for (const v of message.rotations) {
      DeviceMessage_RotateComponent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_RotateCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_RotateCmd } as DeviceMessage_RotateCmd;
    message.rotations = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.rotations.push(DeviceMessage_RotateComponent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_RotateCmd {
    const message = { ...baseDeviceMessage_RotateCmd } as DeviceMessage_RotateCmd;
    message.rotations = [];
    if (object.rotations !== undefined && object.rotations !== null) {
      for (const e of object.rotations) {
        message.rotations.push(DeviceMessage_RotateComponent.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_RotateCmd>): DeviceMessage_RotateCmd {
    const message = { ...baseDeviceMessage_RotateCmd } as DeviceMessage_RotateCmd;
    message.rotations = [];
    if (object.rotations !== undefined && object.rotations !== null) {
      for (const e of object.rotations) {
        message.rotations.push(DeviceMessage_RotateComponent.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: DeviceMessage_RotateCmd): unknown {
    const obj: any = {};
    if (message.rotations) {
      obj.rotations = message.rotations.map(e => e ? DeviceMessage_RotateComponent.toJSON(e) : undefined);
    } else {
      obj.rotations = [];
    }
    return obj;
  },
};

export const DeviceMessage_LinearComponent = {
  encode(message: DeviceMessage_LinearComponent, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.index);
    writer.uint32(16).uint32(message.duration);
    writer.uint32(25).double(message.position);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_LinearComponent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_LinearComponent } as DeviceMessage_LinearComponent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.duration = reader.uint32();
          break;
        case 3:
          message.position = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_LinearComponent {
    const message = { ...baseDeviceMessage_LinearComponent } as DeviceMessage_LinearComponent;
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Number(object.duration);
    } else {
      message.duration = 0;
    }
    if (object.position !== undefined && object.position !== null) {
      message.position = Number(object.position);
    } else {
      message.position = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_LinearComponent>): DeviceMessage_LinearComponent {
    const message = { ...baseDeviceMessage_LinearComponent } as DeviceMessage_LinearComponent;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = object.duration;
    } else {
      message.duration = 0;
    }
    if (object.position !== undefined && object.position !== null) {
      message.position = object.position;
    } else {
      message.position = 0;
    }
    return message;
  },
  toJSON(message: DeviceMessage_LinearComponent): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.duration !== undefined && (obj.duration = message.duration);
    message.position !== undefined && (obj.position = message.position);
    return obj;
  },
};

export const DeviceMessage_LinearCmd = {
  encode(message: DeviceMessage_LinearCmd, writer: Writer = Writer.create()): Writer {
    for (const v of message.movements) {
      DeviceMessage_LinearComponent.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_LinearCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_LinearCmd } as DeviceMessage_LinearCmd;
    message.movements = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.movements.push(DeviceMessage_LinearComponent.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_LinearCmd {
    const message = { ...baseDeviceMessage_LinearCmd } as DeviceMessage_LinearCmd;
    message.movements = [];
    if (object.movements !== undefined && object.movements !== null) {
      for (const e of object.movements) {
        message.movements.push(DeviceMessage_LinearComponent.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_LinearCmd>): DeviceMessage_LinearCmd {
    const message = { ...baseDeviceMessage_LinearCmd } as DeviceMessage_LinearCmd;
    message.movements = [];
    if (object.movements !== undefined && object.movements !== null) {
      for (const e of object.movements) {
        message.movements.push(DeviceMessage_LinearComponent.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: DeviceMessage_LinearCmd): unknown {
    const obj: any = {};
    if (message.movements) {
      obj.movements = message.movements.map(e => e ? DeviceMessage_LinearComponent.toJSON(e) : undefined);
    } else {
      obj.movements = [];
    }
    return obj;
  },
};

export const DeviceMessage_StopDeviceCmd = {
  encode(_: DeviceMessage_StopDeviceCmd, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_StopDeviceCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_StopDeviceCmd } as DeviceMessage_StopDeviceCmd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): DeviceMessage_StopDeviceCmd {
    const message = { ...baseDeviceMessage_StopDeviceCmd } as DeviceMessage_StopDeviceCmd;
    return message;
  },
  fromPartial(_: DeepPartial<DeviceMessage_StopDeviceCmd>): DeviceMessage_StopDeviceCmd {
    const message = { ...baseDeviceMessage_StopDeviceCmd } as DeviceMessage_StopDeviceCmd;
    return message;
  },
  toJSON(_: DeviceMessage_StopDeviceCmd): unknown {
    const obj: any = {};
    return obj;
  },
};

export const DeviceMessage_RawReadCmd = {
  encode(message: DeviceMessage_RawReadCmd, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.endpoint);
    writer.uint32(18).bytes(message.data);
    writer.uint32(24).uint32(message.expectedLength);
    writer.uint32(32).uint32(message.timeout);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_RawReadCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_RawReadCmd } as DeviceMessage_RawReadCmd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endpoint = reader.int32() as any;
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.expectedLength = reader.uint32();
          break;
        case 4:
          message.timeout = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_RawReadCmd {
    const message = { ...baseDeviceMessage_RawReadCmd } as DeviceMessage_RawReadCmd;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = endpointFromJSON(object.endpoint);
    } else {
      message.endpoint = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.expectedLength !== undefined && object.expectedLength !== null) {
      message.expectedLength = Number(object.expectedLength);
    } else {
      message.expectedLength = 0;
    }
    if (object.timeout !== undefined && object.timeout !== null) {
      message.timeout = Number(object.timeout);
    } else {
      message.timeout = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_RawReadCmd>): DeviceMessage_RawReadCmd {
    const message = { ...baseDeviceMessage_RawReadCmd } as DeviceMessage_RawReadCmd;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = object.endpoint;
    } else {
      message.endpoint = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.expectedLength !== undefined && object.expectedLength !== null) {
      message.expectedLength = object.expectedLength;
    } else {
      message.expectedLength = 0;
    }
    if (object.timeout !== undefined && object.timeout !== null) {
      message.timeout = object.timeout;
    } else {
      message.timeout = 0;
    }
    return message;
  },
  toJSON(message: DeviceMessage_RawReadCmd): unknown {
    const obj: any = {};
    message.endpoint !== undefined && (obj.endpoint = endpointToJSON(message.endpoint));
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.expectedLength !== undefined && (obj.expectedLength = message.expectedLength);
    message.timeout !== undefined && (obj.timeout = message.timeout);
    return obj;
  },
};

export const DeviceMessage_RawWriteCmd = {
  encode(message: DeviceMessage_RawWriteCmd, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.endpoint);
    writer.uint32(18).bytes(message.data);
    writer.uint32(24).bool(message.writeWithResponse);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_RawWriteCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_RawWriteCmd } as DeviceMessage_RawWriteCmd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endpoint = reader.int32() as any;
          break;
        case 2:
          message.data = reader.bytes();
          break;
        case 3:
          message.writeWithResponse = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_RawWriteCmd {
    const message = { ...baseDeviceMessage_RawWriteCmd } as DeviceMessage_RawWriteCmd;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = endpointFromJSON(object.endpoint);
    } else {
      message.endpoint = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.writeWithResponse !== undefined && object.writeWithResponse !== null) {
      message.writeWithResponse = Boolean(object.writeWithResponse);
    } else {
      message.writeWithResponse = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_RawWriteCmd>): DeviceMessage_RawWriteCmd {
    const message = { ...baseDeviceMessage_RawWriteCmd } as DeviceMessage_RawWriteCmd;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = object.endpoint;
    } else {
      message.endpoint = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.writeWithResponse !== undefined && object.writeWithResponse !== null) {
      message.writeWithResponse = object.writeWithResponse;
    } else {
      message.writeWithResponse = false;
    }
    return message;
  },
  toJSON(message: DeviceMessage_RawWriteCmd): unknown {
    const obj: any = {};
    message.endpoint !== undefined && (obj.endpoint = endpointToJSON(message.endpoint));
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.writeWithResponse !== undefined && (obj.writeWithResponse = message.writeWithResponse);
    return obj;
  },
};

export const DeviceMessage_RawSubscribeCmd = {
  encode(message: DeviceMessage_RawSubscribeCmd, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.endpoint);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_RawSubscribeCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_RawSubscribeCmd } as DeviceMessage_RawSubscribeCmd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endpoint = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_RawSubscribeCmd {
    const message = { ...baseDeviceMessage_RawSubscribeCmd } as DeviceMessage_RawSubscribeCmd;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = endpointFromJSON(object.endpoint);
    } else {
      message.endpoint = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_RawSubscribeCmd>): DeviceMessage_RawSubscribeCmd {
    const message = { ...baseDeviceMessage_RawSubscribeCmd } as DeviceMessage_RawSubscribeCmd;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = object.endpoint;
    } else {
      message.endpoint = 0;
    }
    return message;
  },
  toJSON(message: DeviceMessage_RawSubscribeCmd): unknown {
    const obj: any = {};
    message.endpoint !== undefined && (obj.endpoint = endpointToJSON(message.endpoint));
    return obj;
  },
};

export const DeviceMessage_RawUnsubscribeCmd = {
  encode(message: DeviceMessage_RawUnsubscribeCmd, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.endpoint);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_RawUnsubscribeCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_RawUnsubscribeCmd } as DeviceMessage_RawUnsubscribeCmd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.endpoint = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_RawUnsubscribeCmd {
    const message = { ...baseDeviceMessage_RawUnsubscribeCmd } as DeviceMessage_RawUnsubscribeCmd;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = endpointFromJSON(object.endpoint);
    } else {
      message.endpoint = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_RawUnsubscribeCmd>): DeviceMessage_RawUnsubscribeCmd {
    const message = { ...baseDeviceMessage_RawUnsubscribeCmd } as DeviceMessage_RawUnsubscribeCmd;
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = object.endpoint;
    } else {
      message.endpoint = 0;
    }
    return message;
  },
  toJSON(message: DeviceMessage_RawUnsubscribeCmd): unknown {
    const obj: any = {};
    message.endpoint !== undefined && (obj.endpoint = endpointToJSON(message.endpoint));
    return obj;
  },
};

export const DeviceMessage_BatteryLevelCmd = {
  encode(_: DeviceMessage_BatteryLevelCmd, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_BatteryLevelCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_BatteryLevelCmd } as DeviceMessage_BatteryLevelCmd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): DeviceMessage_BatteryLevelCmd {
    const message = { ...baseDeviceMessage_BatteryLevelCmd } as DeviceMessage_BatteryLevelCmd;
    return message;
  },
  fromPartial(_: DeepPartial<DeviceMessage_BatteryLevelCmd>): DeviceMessage_BatteryLevelCmd {
    const message = { ...baseDeviceMessage_BatteryLevelCmd } as DeviceMessage_BatteryLevelCmd;
    return message;
  },
  toJSON(_: DeviceMessage_BatteryLevelCmd): unknown {
    const obj: any = {};
    return obj;
  },
};

export const DeviceMessage_RSSILevelCmd = {
  encode(_: DeviceMessage_RSSILevelCmd, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_RSSILevelCmd {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_RSSILevelCmd } as DeviceMessage_RSSILevelCmd;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): DeviceMessage_RSSILevelCmd {
    const message = { ...baseDeviceMessage_RSSILevelCmd } as DeviceMessage_RSSILevelCmd;
    return message;
  },
  fromPartial(_: DeepPartial<DeviceMessage_RSSILevelCmd>): DeviceMessage_RSSILevelCmd {
    const message = { ...baseDeviceMessage_RSSILevelCmd } as DeviceMessage_RSSILevelCmd;
    return message;
  },
  toJSON(_: DeviceMessage_RSSILevelCmd): unknown {
    const obj: any = {};
    return obj;
  },
};

export const DeviceMessage_FFIMessage = {
  encode(message: DeviceMessage_FFIMessage, writer: Writer = Writer.create()): Writer {
    if (message.vibrateCmd !== undefined) {
      DeviceMessage_VibrateCmd.encode(message.vibrateCmd, writer.uint32(10).fork()).ldelim();
    }
    if (message.rotateCmd !== undefined) {
      DeviceMessage_RotateCmd.encode(message.rotateCmd, writer.uint32(18).fork()).ldelim();
    }
    if (message.linearCmd !== undefined) {
      DeviceMessage_LinearCmd.encode(message.linearCmd, writer.uint32(26).fork()).ldelim();
    }
    if (message.stopDeviceCmd !== undefined) {
      DeviceMessage_StopDeviceCmd.encode(message.stopDeviceCmd, writer.uint32(34).fork()).ldelim();
    }
    if (message.rawReadCmd !== undefined) {
      DeviceMessage_RawReadCmd.encode(message.rawReadCmd, writer.uint32(42).fork()).ldelim();
    }
    if (message.rawWriteCmd !== undefined) {
      DeviceMessage_RawWriteCmd.encode(message.rawWriteCmd, writer.uint32(50).fork()).ldelim();
    }
    if (message.rawSubscribeCmd !== undefined) {
      DeviceMessage_RawSubscribeCmd.encode(message.rawSubscribeCmd, writer.uint32(58).fork()).ldelim();
    }
    if (message.rawUnsubscribeCmd !== undefined) {
      DeviceMessage_RawUnsubscribeCmd.encode(message.rawUnsubscribeCmd, writer.uint32(66).fork()).ldelim();
    }
    if (message.batteryLevelCmd !== undefined) {
      DeviceMessage_BatteryLevelCmd.encode(message.batteryLevelCmd, writer.uint32(74).fork()).ldelim();
    }
    if (message.rssiLevelCmd !== undefined) {
      DeviceMessage_RSSILevelCmd.encode(message.rssiLevelCmd, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceMessage_FFIMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceMessage_FFIMessage } as DeviceMessage_FFIMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.vibrateCmd = DeviceMessage_VibrateCmd.decode(reader, reader.uint32());
          break;
        case 2:
          message.rotateCmd = DeviceMessage_RotateCmd.decode(reader, reader.uint32());
          break;
        case 3:
          message.linearCmd = DeviceMessage_LinearCmd.decode(reader, reader.uint32());
          break;
        case 4:
          message.stopDeviceCmd = DeviceMessage_StopDeviceCmd.decode(reader, reader.uint32());
          break;
        case 5:
          message.rawReadCmd = DeviceMessage_RawReadCmd.decode(reader, reader.uint32());
          break;
        case 6:
          message.rawWriteCmd = DeviceMessage_RawWriteCmd.decode(reader, reader.uint32());
          break;
        case 7:
          message.rawSubscribeCmd = DeviceMessage_RawSubscribeCmd.decode(reader, reader.uint32());
          break;
        case 8:
          message.rawUnsubscribeCmd = DeviceMessage_RawUnsubscribeCmd.decode(reader, reader.uint32());
          break;
        case 9:
          message.batteryLevelCmd = DeviceMessage_BatteryLevelCmd.decode(reader, reader.uint32());
          break;
        case 10:
          message.rssiLevelCmd = DeviceMessage_RSSILevelCmd.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceMessage_FFIMessage {
    const message = { ...baseDeviceMessage_FFIMessage } as DeviceMessage_FFIMessage;
    if (object.vibrateCmd !== undefined && object.vibrateCmd !== null) {
      message.vibrateCmd = DeviceMessage_VibrateCmd.fromJSON(object.vibrateCmd);
    } else {
      message.vibrateCmd = undefined;
    }
    if (object.rotateCmd !== undefined && object.rotateCmd !== null) {
      message.rotateCmd = DeviceMessage_RotateCmd.fromJSON(object.rotateCmd);
    } else {
      message.rotateCmd = undefined;
    }
    if (object.linearCmd !== undefined && object.linearCmd !== null) {
      message.linearCmd = DeviceMessage_LinearCmd.fromJSON(object.linearCmd);
    } else {
      message.linearCmd = undefined;
    }
    if (object.stopDeviceCmd !== undefined && object.stopDeviceCmd !== null) {
      message.stopDeviceCmd = DeviceMessage_StopDeviceCmd.fromJSON(object.stopDeviceCmd);
    } else {
      message.stopDeviceCmd = undefined;
    }
    if (object.rawReadCmd !== undefined && object.rawReadCmd !== null) {
      message.rawReadCmd = DeviceMessage_RawReadCmd.fromJSON(object.rawReadCmd);
    } else {
      message.rawReadCmd = undefined;
    }
    if (object.rawWriteCmd !== undefined && object.rawWriteCmd !== null) {
      message.rawWriteCmd = DeviceMessage_RawWriteCmd.fromJSON(object.rawWriteCmd);
    } else {
      message.rawWriteCmd = undefined;
    }
    if (object.rawSubscribeCmd !== undefined && object.rawSubscribeCmd !== null) {
      message.rawSubscribeCmd = DeviceMessage_RawSubscribeCmd.fromJSON(object.rawSubscribeCmd);
    } else {
      message.rawSubscribeCmd = undefined;
    }
    if (object.rawUnsubscribeCmd !== undefined && object.rawUnsubscribeCmd !== null) {
      message.rawUnsubscribeCmd = DeviceMessage_RawUnsubscribeCmd.fromJSON(object.rawUnsubscribeCmd);
    } else {
      message.rawUnsubscribeCmd = undefined;
    }
    if (object.batteryLevelCmd !== undefined && object.batteryLevelCmd !== null) {
      message.batteryLevelCmd = DeviceMessage_BatteryLevelCmd.fromJSON(object.batteryLevelCmd);
    } else {
      message.batteryLevelCmd = undefined;
    }
    if (object.rssiLevelCmd !== undefined && object.rssiLevelCmd !== null) {
      message.rssiLevelCmd = DeviceMessage_RSSILevelCmd.fromJSON(object.rssiLevelCmd);
    } else {
      message.rssiLevelCmd = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceMessage_FFIMessage>): DeviceMessage_FFIMessage {
    const message = { ...baseDeviceMessage_FFIMessage } as DeviceMessage_FFIMessage;
    if (object.vibrateCmd !== undefined && object.vibrateCmd !== null) {
      message.vibrateCmd = DeviceMessage_VibrateCmd.fromPartial(object.vibrateCmd);
    } else {
      message.vibrateCmd = undefined;
    }
    if (object.rotateCmd !== undefined && object.rotateCmd !== null) {
      message.rotateCmd = DeviceMessage_RotateCmd.fromPartial(object.rotateCmd);
    } else {
      message.rotateCmd = undefined;
    }
    if (object.linearCmd !== undefined && object.linearCmd !== null) {
      message.linearCmd = DeviceMessage_LinearCmd.fromPartial(object.linearCmd);
    } else {
      message.linearCmd = undefined;
    }
    if (object.stopDeviceCmd !== undefined && object.stopDeviceCmd !== null) {
      message.stopDeviceCmd = DeviceMessage_StopDeviceCmd.fromPartial(object.stopDeviceCmd);
    } else {
      message.stopDeviceCmd = undefined;
    }
    if (object.rawReadCmd !== undefined && object.rawReadCmd !== null) {
      message.rawReadCmd = DeviceMessage_RawReadCmd.fromPartial(object.rawReadCmd);
    } else {
      message.rawReadCmd = undefined;
    }
    if (object.rawWriteCmd !== undefined && object.rawWriteCmd !== null) {
      message.rawWriteCmd = DeviceMessage_RawWriteCmd.fromPartial(object.rawWriteCmd);
    } else {
      message.rawWriteCmd = undefined;
    }
    if (object.rawSubscribeCmd !== undefined && object.rawSubscribeCmd !== null) {
      message.rawSubscribeCmd = DeviceMessage_RawSubscribeCmd.fromPartial(object.rawSubscribeCmd);
    } else {
      message.rawSubscribeCmd = undefined;
    }
    if (object.rawUnsubscribeCmd !== undefined && object.rawUnsubscribeCmd !== null) {
      message.rawUnsubscribeCmd = DeviceMessage_RawUnsubscribeCmd.fromPartial(object.rawUnsubscribeCmd);
    } else {
      message.rawUnsubscribeCmd = undefined;
    }
    if (object.batteryLevelCmd !== undefined && object.batteryLevelCmd !== null) {
      message.batteryLevelCmd = DeviceMessage_BatteryLevelCmd.fromPartial(object.batteryLevelCmd);
    } else {
      message.batteryLevelCmd = undefined;
    }
    if (object.rssiLevelCmd !== undefined && object.rssiLevelCmd !== null) {
      message.rssiLevelCmd = DeviceMessage_RSSILevelCmd.fromPartial(object.rssiLevelCmd);
    } else {
      message.rssiLevelCmd = undefined;
    }
    return message;
  },
  toJSON(message: DeviceMessage_FFIMessage): unknown {
    const obj: any = {};
    message.vibrateCmd !== undefined && (obj.vibrateCmd = message.vibrateCmd ? DeviceMessage_VibrateCmd.toJSON(message.vibrateCmd) : undefined);
    message.rotateCmd !== undefined && (obj.rotateCmd = message.rotateCmd ? DeviceMessage_RotateCmd.toJSON(message.rotateCmd) : undefined);
    message.linearCmd !== undefined && (obj.linearCmd = message.linearCmd ? DeviceMessage_LinearCmd.toJSON(message.linearCmd) : undefined);
    message.stopDeviceCmd !== undefined && (obj.stopDeviceCmd = message.stopDeviceCmd ? DeviceMessage_StopDeviceCmd.toJSON(message.stopDeviceCmd) : undefined);
    message.rawReadCmd !== undefined && (obj.rawReadCmd = message.rawReadCmd ? DeviceMessage_RawReadCmd.toJSON(message.rawReadCmd) : undefined);
    message.rawWriteCmd !== undefined && (obj.rawWriteCmd = message.rawWriteCmd ? DeviceMessage_RawWriteCmd.toJSON(message.rawWriteCmd) : undefined);
    message.rawSubscribeCmd !== undefined && (obj.rawSubscribeCmd = message.rawSubscribeCmd ? DeviceMessage_RawSubscribeCmd.toJSON(message.rawSubscribeCmd) : undefined);
    message.rawUnsubscribeCmd !== undefined && (obj.rawUnsubscribeCmd = message.rawUnsubscribeCmd ? DeviceMessage_RawUnsubscribeCmd.toJSON(message.rawUnsubscribeCmd) : undefined);
    message.batteryLevelCmd !== undefined && (obj.batteryLevelCmd = message.batteryLevelCmd ? DeviceMessage_BatteryLevelCmd.toJSON(message.batteryLevelCmd) : undefined);
    message.rssiLevelCmd !== undefined && (obj.rssiLevelCmd = message.rssiLevelCmd ? DeviceMessage_RSSILevelCmd.toJSON(message.rssiLevelCmd) : undefined);
    return obj;
  },
};

export const ServerMessage = {
  encode(message: ServerMessage, writer: Writer = Writer.create()): Writer {
    if (message.ok !== undefined) {
      ServerMessage_Ok.encode(message.ok, writer.uint32(10).fork()).ldelim();
    }
    if (message.error !== undefined) {
      ServerMessage_Error.encode(message.error, writer.uint32(18).fork()).ldelim();
    }
    if (message.scanningFinished !== undefined) {
      ServerMessage_ScanningFinished.encode(message.scanningFinished, writer.uint32(26).fork()).ldelim();
    }
    if (message.deviceAdded !== undefined) {
      ServerMessage_DeviceAdded.encode(message.deviceAdded, writer.uint32(34).fork()).ldelim();
    }
    if (message.deviceRemoved !== undefined) {
      ServerMessage_DeviceRemoved.encode(message.deviceRemoved, writer.uint32(42).fork()).ldelim();
    }
    if (message.disconnect !== undefined) {
      ServerMessage_Disconnect.encode(message.disconnect, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ServerMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServerMessage } as ServerMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ok = ServerMessage_Ok.decode(reader, reader.uint32());
          break;
        case 2:
          message.error = ServerMessage_Error.decode(reader, reader.uint32());
          break;
        case 3:
          message.scanningFinished = ServerMessage_ScanningFinished.decode(reader, reader.uint32());
          break;
        case 4:
          message.deviceAdded = ServerMessage_DeviceAdded.decode(reader, reader.uint32());
          break;
        case 5:
          message.deviceRemoved = ServerMessage_DeviceRemoved.decode(reader, reader.uint32());
          break;
        case 6:
          message.disconnect = ServerMessage_Disconnect.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ServerMessage {
    const message = { ...baseServerMessage } as ServerMessage;
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = ServerMessage_Ok.fromJSON(object.ok);
    } else {
      message.ok = undefined;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = ServerMessage_Error.fromJSON(object.error);
    } else {
      message.error = undefined;
    }
    if (object.scanningFinished !== undefined && object.scanningFinished !== null) {
      message.scanningFinished = ServerMessage_ScanningFinished.fromJSON(object.scanningFinished);
    } else {
      message.scanningFinished = undefined;
    }
    if (object.deviceAdded !== undefined && object.deviceAdded !== null) {
      message.deviceAdded = ServerMessage_DeviceAdded.fromJSON(object.deviceAdded);
    } else {
      message.deviceAdded = undefined;
    }
    if (object.deviceRemoved !== undefined && object.deviceRemoved !== null) {
      message.deviceRemoved = ServerMessage_DeviceRemoved.fromJSON(object.deviceRemoved);
    } else {
      message.deviceRemoved = undefined;
    }
    if (object.disconnect !== undefined && object.disconnect !== null) {
      message.disconnect = ServerMessage_Disconnect.fromJSON(object.disconnect);
    } else {
      message.disconnect = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ServerMessage>): ServerMessage {
    const message = { ...baseServerMessage } as ServerMessage;
    if (object.ok !== undefined && object.ok !== null) {
      message.ok = ServerMessage_Ok.fromPartial(object.ok);
    } else {
      message.ok = undefined;
    }
    if (object.error !== undefined && object.error !== null) {
      message.error = ServerMessage_Error.fromPartial(object.error);
    } else {
      message.error = undefined;
    }
    if (object.scanningFinished !== undefined && object.scanningFinished !== null) {
      message.scanningFinished = ServerMessage_ScanningFinished.fromPartial(object.scanningFinished);
    } else {
      message.scanningFinished = undefined;
    }
    if (object.deviceAdded !== undefined && object.deviceAdded !== null) {
      message.deviceAdded = ServerMessage_DeviceAdded.fromPartial(object.deviceAdded);
    } else {
      message.deviceAdded = undefined;
    }
    if (object.deviceRemoved !== undefined && object.deviceRemoved !== null) {
      message.deviceRemoved = ServerMessage_DeviceRemoved.fromPartial(object.deviceRemoved);
    } else {
      message.deviceRemoved = undefined;
    }
    if (object.disconnect !== undefined && object.disconnect !== null) {
      message.disconnect = ServerMessage_Disconnect.fromPartial(object.disconnect);
    } else {
      message.disconnect = undefined;
    }
    return message;
  },
  toJSON(message: ServerMessage): unknown {
    const obj: any = {};
    message.ok !== undefined && (obj.ok = message.ok ? ServerMessage_Ok.toJSON(message.ok) : undefined);
    message.error !== undefined && (obj.error = message.error ? ServerMessage_Error.toJSON(message.error) : undefined);
    message.scanningFinished !== undefined && (obj.scanningFinished = message.scanningFinished ? ServerMessage_ScanningFinished.toJSON(message.scanningFinished) : undefined);
    message.deviceAdded !== undefined && (obj.deviceAdded = message.deviceAdded ? ServerMessage_DeviceAdded.toJSON(message.deviceAdded) : undefined);
    message.deviceRemoved !== undefined && (obj.deviceRemoved = message.deviceRemoved ? ServerMessage_DeviceRemoved.toJSON(message.deviceRemoved) : undefined);
    message.disconnect !== undefined && (obj.disconnect = message.disconnect ? ServerMessage_Disconnect.toJSON(message.disconnect) : undefined);
    return obj;
  },
};

export const ServerMessage_MessageAttributes = {
  encode(message: ServerMessage_MessageAttributes, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.messageType);
    writer.uint32(16).uint32(message.featureCount);
    writer.uint32(26).fork();
    for (const v of message.stepCount) {
      writer.uint32(v);
    }
    writer.ldelim();
    writer.uint32(34).fork();
    for (const v of message.endpoints) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(42).fork();
    for (const v of message.maxDuration) {
      writer.uint32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ServerMessage_MessageAttributes {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServerMessage_MessageAttributes } as ServerMessage_MessageAttributes;
    message.stepCount = [];
    message.endpoints = [];
    message.maxDuration = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageType = reader.int32() as any;
          break;
        case 2:
          message.featureCount = reader.uint32();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.stepCount.push(reader.uint32());
            }
          } else {
            message.stepCount.push(reader.uint32());
          }
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.endpoints.push(reader.int32() as any);
            }
          } else {
            message.endpoints.push(reader.int32() as any);
          }
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.maxDuration.push(reader.uint32());
            }
          } else {
            message.maxDuration.push(reader.uint32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ServerMessage_MessageAttributes {
    const message = { ...baseServerMessage_MessageAttributes } as ServerMessage_MessageAttributes;
    message.stepCount = [];
    message.endpoints = [];
    message.maxDuration = [];
    if (object.messageType !== undefined && object.messageType !== null) {
      message.messageType = serverMessage_MessageAttributeTypeFromJSON(object.messageType);
    } else {
      message.messageType = 0;
    }
    if (object.featureCount !== undefined && object.featureCount !== null) {
      message.featureCount = Number(object.featureCount);
    } else {
      message.featureCount = 0;
    }
    if (object.stepCount !== undefined && object.stepCount !== null) {
      for (const e of object.stepCount) {
        message.stepCount.push(Number(e));
      }
    }
    if (object.endpoints !== undefined && object.endpoints !== null) {
      for (const e of object.endpoints) {
        message.endpoints.push(endpointFromJSON(e));
      }
    }
    if (object.maxDuration !== undefined && object.maxDuration !== null) {
      for (const e of object.maxDuration) {
        message.maxDuration.push(Number(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ServerMessage_MessageAttributes>): ServerMessage_MessageAttributes {
    const message = { ...baseServerMessage_MessageAttributes } as ServerMessage_MessageAttributes;
    message.stepCount = [];
    message.endpoints = [];
    message.maxDuration = [];
    if (object.messageType !== undefined && object.messageType !== null) {
      message.messageType = object.messageType;
    } else {
      message.messageType = 0;
    }
    if (object.featureCount !== undefined && object.featureCount !== null) {
      message.featureCount = object.featureCount;
    } else {
      message.featureCount = 0;
    }
    if (object.stepCount !== undefined && object.stepCount !== null) {
      for (const e of object.stepCount) {
        message.stepCount.push(e);
      }
    }
    if (object.endpoints !== undefined && object.endpoints !== null) {
      for (const e of object.endpoints) {
        message.endpoints.push(e);
      }
    }
    if (object.maxDuration !== undefined && object.maxDuration !== null) {
      for (const e of object.maxDuration) {
        message.maxDuration.push(e);
      }
    }
    return message;
  },
  toJSON(message: ServerMessage_MessageAttributes): unknown {
    const obj: any = {};
    message.messageType !== undefined && (obj.messageType = serverMessage_MessageAttributeTypeToJSON(message.messageType));
    message.featureCount !== undefined && (obj.featureCount = message.featureCount);
    if (message.stepCount) {
      obj.stepCount = message.stepCount.map(e => e);
    } else {
      obj.stepCount = [];
    }
    if (message.endpoints) {
      obj.endpoints = message.endpoints.map(e => endpointToJSON(e));
    } else {
      obj.endpoints = [];
    }
    if (message.maxDuration) {
      obj.maxDuration = message.maxDuration.map(e => e);
    } else {
      obj.maxDuration = [];
    }
    return obj;
  },
};

export const ServerMessage_Ok = {
  encode(_: ServerMessage_Ok, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ServerMessage_Ok {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServerMessage_Ok } as ServerMessage_Ok;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ServerMessage_Ok {
    const message = { ...baseServerMessage_Ok } as ServerMessage_Ok;
    return message;
  },
  fromPartial(_: DeepPartial<ServerMessage_Ok>): ServerMessage_Ok {
    const message = { ...baseServerMessage_Ok } as ServerMessage_Ok;
    return message;
  },
  toJSON(_: ServerMessage_Ok): unknown {
    const obj: any = {};
    return obj;
  },
};

export const ServerMessage_Error = {
  encode(message: ServerMessage_Error, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.errorType);
    writer.uint32(18).string(message.message);
    writer.uint32(26).string(message.backtrace);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ServerMessage_Error {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServerMessage_Error } as ServerMessage_Error;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.errorType = reader.int32() as any;
          break;
        case 2:
          message.message = reader.string();
          break;
        case 3:
          message.backtrace = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ServerMessage_Error {
    const message = { ...baseServerMessage_Error } as ServerMessage_Error;
    if (object.errorType !== undefined && object.errorType !== null) {
      message.errorType = serverMessage_ButtplugErrorTypeFromJSON(object.errorType);
    } else {
      message.errorType = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = String(object.message);
    } else {
      message.message = "";
    }
    if (object.backtrace !== undefined && object.backtrace !== null) {
      message.backtrace = String(object.backtrace);
    } else {
      message.backtrace = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ServerMessage_Error>): ServerMessage_Error {
    const message = { ...baseServerMessage_Error } as ServerMessage_Error;
    if (object.errorType !== undefined && object.errorType !== null) {
      message.errorType = object.errorType;
    } else {
      message.errorType = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = object.message;
    } else {
      message.message = "";
    }
    if (object.backtrace !== undefined && object.backtrace !== null) {
      message.backtrace = object.backtrace;
    } else {
      message.backtrace = "";
    }
    return message;
  },
  toJSON(message: ServerMessage_Error): unknown {
    const obj: any = {};
    message.errorType !== undefined && (obj.errorType = serverMessage_ButtplugErrorTypeToJSON(message.errorType));
    message.message !== undefined && (obj.message = message.message);
    message.backtrace !== undefined && (obj.backtrace = message.backtrace);
    return obj;
  },
};

export const ServerMessage_ScanningFinished = {
  encode(_: ServerMessage_ScanningFinished, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ServerMessage_ScanningFinished {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServerMessage_ScanningFinished } as ServerMessage_ScanningFinished;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ServerMessage_ScanningFinished {
    const message = { ...baseServerMessage_ScanningFinished } as ServerMessage_ScanningFinished;
    return message;
  },
  fromPartial(_: DeepPartial<ServerMessage_ScanningFinished>): ServerMessage_ScanningFinished {
    const message = { ...baseServerMessage_ScanningFinished } as ServerMessage_ScanningFinished;
    return message;
  },
  toJSON(_: ServerMessage_ScanningFinished): unknown {
    const obj: any = {};
    return obj;
  },
};

export const ServerMessage_DeviceAdded = {
  encode(message: ServerMessage_DeviceAdded, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(16).uint32(message.index);
    for (const v of message.messageAttributes) {
      ServerMessage_MessageAttributes.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ServerMessage_DeviceAdded {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServerMessage_DeviceAdded } as ServerMessage_DeviceAdded;
    message.messageAttributes = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.index = reader.uint32();
          break;
        case 3:
          message.messageAttributes.push(ServerMessage_MessageAttributes.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ServerMessage_DeviceAdded {
    const message = { ...baseServerMessage_DeviceAdded } as ServerMessage_DeviceAdded;
    message.messageAttributes = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    if (object.messageAttributes !== undefined && object.messageAttributes !== null) {
      for (const e of object.messageAttributes) {
        message.messageAttributes.push(ServerMessage_MessageAttributes.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<ServerMessage_DeviceAdded>): ServerMessage_DeviceAdded {
    const message = { ...baseServerMessage_DeviceAdded } as ServerMessage_DeviceAdded;
    message.messageAttributes = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    if (object.messageAttributes !== undefined && object.messageAttributes !== null) {
      for (const e of object.messageAttributes) {
        message.messageAttributes.push(ServerMessage_MessageAttributes.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: ServerMessage_DeviceAdded): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.index !== undefined && (obj.index = message.index);
    if (message.messageAttributes) {
      obj.messageAttributes = message.messageAttributes.map(e => e ? ServerMessage_MessageAttributes.toJSON(e) : undefined);
    } else {
      obj.messageAttributes = [];
    }
    return obj;
  },
};

export const ServerMessage_DeviceRemoved = {
  encode(message: ServerMessage_DeviceRemoved, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.index);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ServerMessage_DeviceRemoved {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServerMessage_DeviceRemoved } as ServerMessage_DeviceRemoved;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ServerMessage_DeviceRemoved {
    const message = { ...baseServerMessage_DeviceRemoved } as ServerMessage_DeviceRemoved;
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ServerMessage_DeviceRemoved>): ServerMessage_DeviceRemoved {
    const message = { ...baseServerMessage_DeviceRemoved } as ServerMessage_DeviceRemoved;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    return message;
  },
  toJSON(message: ServerMessage_DeviceRemoved): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },
};

export const ServerMessage_Disconnect = {
  encode(_: ServerMessage_Disconnect, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ServerMessage_Disconnect {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServerMessage_Disconnect } as ServerMessage_Disconnect;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): ServerMessage_Disconnect {
    const message = { ...baseServerMessage_Disconnect } as ServerMessage_Disconnect;
    return message;
  },
  fromPartial(_: DeepPartial<ServerMessage_Disconnect>): ServerMessage_Disconnect {
    const message = { ...baseServerMessage_Disconnect } as ServerMessage_Disconnect;
    return message;
  },
  toJSON(_: ServerMessage_Disconnect): unknown {
    const obj: any = {};
    return obj;
  },
};

export const DeviceEvent = {
  encode(message: DeviceEvent, writer: Writer = Writer.create()): Writer {
    if (message.disconnect !== undefined) {
      DeviceEvent_Disconnect.encode(message.disconnect, writer.uint32(10).fork()).ldelim();
    }
    if (message.batteryLevelReading !== undefined) {
      DeviceEvent_BatteryLevelReading.encode(message.batteryLevelReading, writer.uint32(18).fork()).ldelim();
    }
    if (message.rssiLevelReading !== undefined) {
      DeviceEvent_RSSILevelReading.encode(message.rssiLevelReading, writer.uint32(26).fork()).ldelim();
    }
    if (message.rawReading !== undefined) {
      DeviceEvent_RawReading.encode(message.rawReading, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceEvent {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceEvent } as DeviceEvent;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.disconnect = DeviceEvent_Disconnect.decode(reader, reader.uint32());
          break;
        case 2:
          message.batteryLevelReading = DeviceEvent_BatteryLevelReading.decode(reader, reader.uint32());
          break;
        case 3:
          message.rssiLevelReading = DeviceEvent_RSSILevelReading.decode(reader, reader.uint32());
          break;
        case 4:
          message.rawReading = DeviceEvent_RawReading.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceEvent {
    const message = { ...baseDeviceEvent } as DeviceEvent;
    if (object.disconnect !== undefined && object.disconnect !== null) {
      message.disconnect = DeviceEvent_Disconnect.fromJSON(object.disconnect);
    } else {
      message.disconnect = undefined;
    }
    if (object.batteryLevelReading !== undefined && object.batteryLevelReading !== null) {
      message.batteryLevelReading = DeviceEvent_BatteryLevelReading.fromJSON(object.batteryLevelReading);
    } else {
      message.batteryLevelReading = undefined;
    }
    if (object.rssiLevelReading !== undefined && object.rssiLevelReading !== null) {
      message.rssiLevelReading = DeviceEvent_RSSILevelReading.fromJSON(object.rssiLevelReading);
    } else {
      message.rssiLevelReading = undefined;
    }
    if (object.rawReading !== undefined && object.rawReading !== null) {
      message.rawReading = DeviceEvent_RawReading.fromJSON(object.rawReading);
    } else {
      message.rawReading = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceEvent>): DeviceEvent {
    const message = { ...baseDeviceEvent } as DeviceEvent;
    if (object.disconnect !== undefined && object.disconnect !== null) {
      message.disconnect = DeviceEvent_Disconnect.fromPartial(object.disconnect);
    } else {
      message.disconnect = undefined;
    }
    if (object.batteryLevelReading !== undefined && object.batteryLevelReading !== null) {
      message.batteryLevelReading = DeviceEvent_BatteryLevelReading.fromPartial(object.batteryLevelReading);
    } else {
      message.batteryLevelReading = undefined;
    }
    if (object.rssiLevelReading !== undefined && object.rssiLevelReading !== null) {
      message.rssiLevelReading = DeviceEvent_RSSILevelReading.fromPartial(object.rssiLevelReading);
    } else {
      message.rssiLevelReading = undefined;
    }
    if (object.rawReading !== undefined && object.rawReading !== null) {
      message.rawReading = DeviceEvent_RawReading.fromPartial(object.rawReading);
    } else {
      message.rawReading = undefined;
    }
    return message;
  },
  toJSON(message: DeviceEvent): unknown {
    const obj: any = {};
    message.disconnect !== undefined && (obj.disconnect = message.disconnect ? DeviceEvent_Disconnect.toJSON(message.disconnect) : undefined);
    message.batteryLevelReading !== undefined && (obj.batteryLevelReading = message.batteryLevelReading ? DeviceEvent_BatteryLevelReading.toJSON(message.batteryLevelReading) : undefined);
    message.rssiLevelReading !== undefined && (obj.rssiLevelReading = message.rssiLevelReading ? DeviceEvent_RSSILevelReading.toJSON(message.rssiLevelReading) : undefined);
    message.rawReading !== undefined && (obj.rawReading = message.rawReading ? DeviceEvent_RawReading.toJSON(message.rawReading) : undefined);
    return obj;
  },
};

export const DeviceEvent_Disconnect = {
  encode(message: DeviceEvent_Disconnect, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.index);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceEvent_Disconnect {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceEvent_Disconnect } as DeviceEvent_Disconnect;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceEvent_Disconnect {
    const message = { ...baseDeviceEvent_Disconnect } as DeviceEvent_Disconnect;
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceEvent_Disconnect>): DeviceEvent_Disconnect {
    const message = { ...baseDeviceEvent_Disconnect } as DeviceEvent_Disconnect;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    return message;
  },
  toJSON(message: DeviceEvent_Disconnect): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    return obj;
  },
};

export const DeviceEvent_RawReading = {
  encode(message: DeviceEvent_RawReading, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.index);
    writer.uint32(16).int32(message.endpoint);
    writer.uint32(26).bytes(message.data);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceEvent_RawReading {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceEvent_RawReading } as DeviceEvent_RawReading;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.endpoint = reader.int32() as any;
          break;
        case 3:
          message.data = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceEvent_RawReading {
    const message = { ...baseDeviceEvent_RawReading } as DeviceEvent_RawReading;
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = endpointFromJSON(object.endpoint);
    } else {
      message.endpoint = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceEvent_RawReading>): DeviceEvent_RawReading {
    const message = { ...baseDeviceEvent_RawReading } as DeviceEvent_RawReading;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    if (object.endpoint !== undefined && object.endpoint !== null) {
      message.endpoint = object.endpoint;
    } else {
      message.endpoint = 0;
    }
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    return message;
  },
  toJSON(message: DeviceEvent_RawReading): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.endpoint !== undefined && (obj.endpoint = endpointToJSON(message.endpoint));
    message.data !== undefined && (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    return obj;
  },
};

export const DeviceEvent_BatteryLevelReading = {
  encode(message: DeviceEvent_BatteryLevelReading, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.index);
    writer.uint32(17).double(message.reading);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceEvent_BatteryLevelReading {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceEvent_BatteryLevelReading } as DeviceEvent_BatteryLevelReading;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.reading = reader.double();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceEvent_BatteryLevelReading {
    const message = { ...baseDeviceEvent_BatteryLevelReading } as DeviceEvent_BatteryLevelReading;
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    if (object.reading !== undefined && object.reading !== null) {
      message.reading = Number(object.reading);
    } else {
      message.reading = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceEvent_BatteryLevelReading>): DeviceEvent_BatteryLevelReading {
    const message = { ...baseDeviceEvent_BatteryLevelReading } as DeviceEvent_BatteryLevelReading;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    if (object.reading !== undefined && object.reading !== null) {
      message.reading = object.reading;
    } else {
      message.reading = 0;
    }
    return message;
  },
  toJSON(message: DeviceEvent_BatteryLevelReading): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.reading !== undefined && (obj.reading = message.reading);
    return obj;
  },
};

export const DeviceEvent_RSSILevelReading = {
  encode(message: DeviceEvent_RSSILevelReading, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.index);
    writer.uint32(16).int32(message.reading);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DeviceEvent_RSSILevelReading {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeviceEvent_RSSILevelReading } as DeviceEvent_RSSILevelReading;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;
        case 2:
          message.reading = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): DeviceEvent_RSSILevelReading {
    const message = { ...baseDeviceEvent_RSSILevelReading } as DeviceEvent_RSSILevelReading;
    if (object.index !== undefined && object.index !== null) {
      message.index = Number(object.index);
    } else {
      message.index = 0;
    }
    if (object.reading !== undefined && object.reading !== null) {
      message.reading = Number(object.reading);
    } else {
      message.reading = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DeviceEvent_RSSILevelReading>): DeviceEvent_RSSILevelReading {
    const message = { ...baseDeviceEvent_RSSILevelReading } as DeviceEvent_RSSILevelReading;
    if (object.index !== undefined && object.index !== null) {
      message.index = object.index;
    } else {
      message.index = 0;
    }
    if (object.reading !== undefined && object.reading !== null) {
      message.reading = object.reading;
    } else {
      message.reading = 0;
    }
    return message;
  },
  toJSON(message: DeviceEvent_RSSILevelReading): unknown {
    const obj: any = {};
    message.index !== undefined && (obj.index = message.index);
    message.reading !== undefined && (obj.reading = message.reading);
    return obj;
  },
};

export const ButtplugFFIServerMessage = {
  encode(message: ButtplugFFIServerMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).uint32(message.id);
    if (message.message !== undefined && message.message !== undefined) {
      ButtplugFFIServerMessage_FFIMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ButtplugFFIServerMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseButtplugFFIServerMessage } as ButtplugFFIServerMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint32();
          break;
        case 2:
          message.message = ButtplugFFIServerMessage_FFIMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ButtplugFFIServerMessage {
    const message = { ...baseButtplugFFIServerMessage } as ButtplugFFIServerMessage;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = ButtplugFFIServerMessage_FFIMessage.fromJSON(object.message);
    } else {
      message.message = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ButtplugFFIServerMessage>): ButtplugFFIServerMessage {
    const message = { ...baseButtplugFFIServerMessage } as ButtplugFFIServerMessage;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = ButtplugFFIServerMessage_FFIMessage.fromPartial(object.message);
    } else {
      message.message = undefined;
    }
    return message;
  },
  toJSON(message: ButtplugFFIServerMessage): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.message !== undefined && (obj.message = message.message ? ButtplugFFIServerMessage_FFIMessage.toJSON(message.message) : undefined);
    return obj;
  },
};

export const ButtplugFFIServerMessage_FFIMessage = {
  encode(message: ButtplugFFIServerMessage_FFIMessage, writer: Writer = Writer.create()): Writer {
    if (message.serverMessage !== undefined) {
      ServerMessage.encode(message.serverMessage, writer.uint32(10).fork()).ldelim();
    }
    if (message.deviceEvent !== undefined) {
      DeviceEvent.encode(message.deviceEvent, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ButtplugFFIServerMessage_FFIMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseButtplugFFIServerMessage_FFIMessage } as ButtplugFFIServerMessage_FFIMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.serverMessage = ServerMessage.decode(reader, reader.uint32());
          break;
        case 2:
          message.deviceEvent = DeviceEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ButtplugFFIServerMessage_FFIMessage {
    const message = { ...baseButtplugFFIServerMessage_FFIMessage } as ButtplugFFIServerMessage_FFIMessage;
    if (object.serverMessage !== undefined && object.serverMessage !== null) {
      message.serverMessage = ServerMessage.fromJSON(object.serverMessage);
    } else {
      message.serverMessage = undefined;
    }
    if (object.deviceEvent !== undefined && object.deviceEvent !== null) {
      message.deviceEvent = DeviceEvent.fromJSON(object.deviceEvent);
    } else {
      message.deviceEvent = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<ButtplugFFIServerMessage_FFIMessage>): ButtplugFFIServerMessage_FFIMessage {
    const message = { ...baseButtplugFFIServerMessage_FFIMessage } as ButtplugFFIServerMessage_FFIMessage;
    if (object.serverMessage !== undefined && object.serverMessage !== null) {
      message.serverMessage = ServerMessage.fromPartial(object.serverMessage);
    } else {
      message.serverMessage = undefined;
    }
    if (object.deviceEvent !== undefined && object.deviceEvent !== null) {
      message.deviceEvent = DeviceEvent.fromPartial(object.deviceEvent);
    } else {
      message.deviceEvent = undefined;
    }
    return message;
  },
  toJSON(message: ButtplugFFIServerMessage_FFIMessage): unknown {
    const obj: any = {};
    message.serverMessage !== undefined && (obj.serverMessage = message.serverMessage ? ServerMessage.toJSON(message.serverMessage) : undefined);
    message.deviceEvent !== undefined && (obj.deviceEvent = message.deviceEvent ? DeviceEvent.toJSON(message.deviceEvent) : undefined);
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;