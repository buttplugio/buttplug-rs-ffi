/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Buttplug = (function() {

    /**
     * Namespace Buttplug.
     * @exports Buttplug
     * @namespace
     */
    var Buttplug = {};

    /**
     * Endpoint enum.
     * @name Buttplug.Endpoint
     * @enum {number}
     * @property {number} Command=0 Command value
     * @property {number} Firmware=1 Firmware value
     * @property {number} Rx=2 Rx value
     * @property {number} RxAccel=3 RxAccel value
     * @property {number} RxBLEBattery=4 RxBLEBattery value
     * @property {number} RxPressure=5 RxPressure value
     * @property {number} RxTouch=6 RxTouch value
     * @property {number} Tx=7 Tx value
     * @property {number} TxMode=8 TxMode value
     * @property {number} TxShock=9 TxShock value
     * @property {number} TxVibrate=10 TxVibrate value
     * @property {number} TxVendorControl=11 TxVendorControl value
     * @property {number} Whitelist=12 Whitelist value
     * @property {number} Generic0=13 Generic0 value
     * @property {number} Generic1=14 Generic1 value
     * @property {number} Generic2=15 Generic2 value
     * @property {number} Generic3=16 Generic3 value
     * @property {number} Generic4=17 Generic4 value
     * @property {number} Generic5=18 Generic5 value
     * @property {number} Generic6=19 Generic6 value
     * @property {number} Generic7=20 Generic7 value
     * @property {number} Generic8=21 Generic8 value
     * @property {number} Generic9=22 Generic9 value
     * @property {number} Generic10=23 Generic10 value
     * @property {number} Generic11=24 Generic11 value
     * @property {number} Generic12=25 Generic12 value
     * @property {number} Generic13=26 Generic13 value
     * @property {number} Generic14=27 Generic14 value
     * @property {number} Generic15=28 Generic15 value
     * @property {number} Generic16=29 Generic16 value
     * @property {number} Generic17=30 Generic17 value
     * @property {number} Generic18=31 Generic18 value
     * @property {number} Generic19=32 Generic19 value
     * @property {number} Generic20=33 Generic20 value
     * @property {number} Generic21=34 Generic21 value
     * @property {number} Generic22=35 Generic22 value
     * @property {number} Generic23=36 Generic23 value
     * @property {number} Generic24=37 Generic24 value
     * @property {number} Generic25=38 Generic25 value
     * @property {number} Generic26=39 Generic26 value
     * @property {number} Generic27=40 Generic27 value
     * @property {number} Generic28=41 Generic28 value
     * @property {number} Generic29=42 Generic29 value
     * @property {number} Generic30=43 Generic30 value
     * @property {number} Generic31=44 Generic31 value
     */
    Buttplug.Endpoint = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Command"] = 0;
        values[valuesById[1] = "Firmware"] = 1;
        values[valuesById[2] = "Rx"] = 2;
        values[valuesById[3] = "RxAccel"] = 3;
        values[valuesById[4] = "RxBLEBattery"] = 4;
        values[valuesById[5] = "RxPressure"] = 5;
        values[valuesById[6] = "RxTouch"] = 6;
        values[valuesById[7] = "Tx"] = 7;
        values[valuesById[8] = "TxMode"] = 8;
        values[valuesById[9] = "TxShock"] = 9;
        values[valuesById[10] = "TxVibrate"] = 10;
        values[valuesById[11] = "TxVendorControl"] = 11;
        values[valuesById[12] = "Whitelist"] = 12;
        values[valuesById[13] = "Generic0"] = 13;
        values[valuesById[14] = "Generic1"] = 14;
        values[valuesById[15] = "Generic2"] = 15;
        values[valuesById[16] = "Generic3"] = 16;
        values[valuesById[17] = "Generic4"] = 17;
        values[valuesById[18] = "Generic5"] = 18;
        values[valuesById[19] = "Generic6"] = 19;
        values[valuesById[20] = "Generic7"] = 20;
        values[valuesById[21] = "Generic8"] = 21;
        values[valuesById[22] = "Generic9"] = 22;
        values[valuesById[23] = "Generic10"] = 23;
        values[valuesById[24] = "Generic11"] = 24;
        values[valuesById[25] = "Generic12"] = 25;
        values[valuesById[26] = "Generic13"] = 26;
        values[valuesById[27] = "Generic14"] = 27;
        values[valuesById[28] = "Generic15"] = 28;
        values[valuesById[29] = "Generic16"] = 29;
        values[valuesById[30] = "Generic17"] = 30;
        values[valuesById[31] = "Generic18"] = 31;
        values[valuesById[32] = "Generic19"] = 32;
        values[valuesById[33] = "Generic20"] = 33;
        values[valuesById[34] = "Generic21"] = 34;
        values[valuesById[35] = "Generic22"] = 35;
        values[valuesById[36] = "Generic23"] = 36;
        values[valuesById[37] = "Generic24"] = 37;
        values[valuesById[38] = "Generic25"] = 38;
        values[valuesById[39] = "Generic26"] = 39;
        values[valuesById[40] = "Generic27"] = 40;
        values[valuesById[41] = "Generic28"] = 41;
        values[valuesById[42] = "Generic29"] = 42;
        values[valuesById[43] = "Generic30"] = 43;
        values[valuesById[44] = "Generic31"] = 44;
        return values;
    })();

    Buttplug.ClientMessage = (function() {

        /**
         * Properties of a ClientMessage.
         * @memberof Buttplug
         * @interface IClientMessage
         * @property {number|null} [id] ClientMessage id
         * @property {Buttplug.ClientMessage.IFFIMessage|null} [message] ClientMessage message
         */

        /**
         * Constructs a new ClientMessage.
         * @memberof Buttplug
         * @classdesc Represents a ClientMessage.
         * @implements IClientMessage
         * @constructor
         * @param {Buttplug.IClientMessage=} [properties] Properties to set
         */
        function ClientMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientMessage id.
         * @member {number} id
         * @memberof Buttplug.ClientMessage
         * @instance
         */
        ClientMessage.prototype.id = 0;

        /**
         * ClientMessage message.
         * @member {Buttplug.ClientMessage.IFFIMessage|null|undefined} message
         * @memberof Buttplug.ClientMessage
         * @instance
         */
        ClientMessage.prototype.message = null;

        /**
         * Creates a new ClientMessage instance using the specified properties.
         * @function create
         * @memberof Buttplug.ClientMessage
         * @static
         * @param {Buttplug.IClientMessage=} [properties] Properties to set
         * @returns {Buttplug.ClientMessage} ClientMessage instance
         */
        ClientMessage.create = function create(properties) {
            return new ClientMessage(properties);
        };

        /**
         * Encodes the specified ClientMessage message. Does not implicitly {@link Buttplug.ClientMessage.verify|verify} messages.
         * @function encode
         * @memberof Buttplug.ClientMessage
         * @static
         * @param {Buttplug.IClientMessage} message ClientMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                $root.Buttplug.ClientMessage.FFIMessage.encode(message.message, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Buttplug.ClientMessage
         * @static
         * @param {Buttplug.IClientMessage} message ClientMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientMessage message from the specified reader or buffer.
         * @function decode
         * @memberof Buttplug.ClientMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Buttplug.ClientMessage} ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ClientMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.message = $root.Buttplug.ClientMessage.FFIMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ClientMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Buttplug.ClientMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Buttplug.ClientMessage} ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientMessage message.
         * @function verify
         * @memberof Buttplug.ClientMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.message != null && message.hasOwnProperty("message")) {
                var error = $root.Buttplug.ClientMessage.FFIMessage.verify(message.message);
                if (error)
                    return "message." + error;
            }
            return null;
        };

        /**
         * Creates a ClientMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Buttplug.ClientMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Buttplug.ClientMessage} ClientMessage
         */
        ClientMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.Buttplug.ClientMessage)
                return object;
            var message = new $root.Buttplug.ClientMessage();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.message != null) {
                if (typeof object.message !== "object")
                    throw TypeError(".Buttplug.ClientMessage.message: object expected");
                message.message = $root.Buttplug.ClientMessage.FFIMessage.fromObject(object.message);
            }
            return message;
        };

        /**
         * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Buttplug.ClientMessage
         * @static
         * @param {Buttplug.ClientMessage} message ClientMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.message = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = $root.Buttplug.ClientMessage.FFIMessage.toObject(message.message, options);
            return object;
        };

        /**
         * Converts this ClientMessage to JSON.
         * @function toJSON
         * @memberof Buttplug.ClientMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * DeviceCommunicationManagerTypes enum.
         * @name Buttplug.ClientMessage.DeviceCommunicationManagerTypes
         * @enum {number}
         * @property {number} All=0 All value
         * @property {number} Btleplug=1 Btleplug value
         * @property {number} XInput=2 XInput value
         * @property {number} SerialPort=4 SerialPort value
         * @property {number} LovenseHIDDongle=8 LovenseHIDDongle value
         * @property {number} LovenseSerialDongle=16 LovenseSerialDongle value
         */
        ClientMessage.DeviceCommunicationManagerTypes = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "All"] = 0;
            values[valuesById[1] = "Btleplug"] = 1;
            values[valuesById[2] = "XInput"] = 2;
            values[valuesById[4] = "SerialPort"] = 4;
            values[valuesById[8] = "LovenseHIDDongle"] = 8;
            values[valuesById[16] = "LovenseSerialDongle"] = 16;
            return values;
        })();

        ClientMessage.ConnectLocal = (function() {

            /**
             * Properties of a ConnectLocal.
             * @memberof Buttplug.ClientMessage
             * @interface IConnectLocal
             * @property {string|null} [serverName] ConnectLocal serverName
             * @property {number|null} [maxPingTime] ConnectLocal maxPingTime
             * @property {boolean|null} [allowRawMessages] ConnectLocal allowRawMessages
             * @property {string|null} [deviceConfigurationJson] ConnectLocal deviceConfigurationJson
             * @property {string|null} [userDeviceConfigurationJson] ConnectLocal userDeviceConfigurationJson
             * @property {number|null} [commManagerTypes] ConnectLocal commManagerTypes
             */

            /**
             * Constructs a new ConnectLocal.
             * @memberof Buttplug.ClientMessage
             * @classdesc Represents a ConnectLocal.
             * @implements IConnectLocal
             * @constructor
             * @param {Buttplug.ClientMessage.IConnectLocal=} [properties] Properties to set
             */
            function ConnectLocal(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConnectLocal serverName.
             * @member {string} serverName
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @instance
             */
            ConnectLocal.prototype.serverName = "";

            /**
             * ConnectLocal maxPingTime.
             * @member {number} maxPingTime
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @instance
             */
            ConnectLocal.prototype.maxPingTime = 0;

            /**
             * ConnectLocal allowRawMessages.
             * @member {boolean} allowRawMessages
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @instance
             */
            ConnectLocal.prototype.allowRawMessages = false;

            /**
             * ConnectLocal deviceConfigurationJson.
             * @member {string} deviceConfigurationJson
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @instance
             */
            ConnectLocal.prototype.deviceConfigurationJson = "";

            /**
             * ConnectLocal userDeviceConfigurationJson.
             * @member {string} userDeviceConfigurationJson
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @instance
             */
            ConnectLocal.prototype.userDeviceConfigurationJson = "";

            /**
             * ConnectLocal commManagerTypes.
             * @member {number} commManagerTypes
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @instance
             */
            ConnectLocal.prototype.commManagerTypes = 0;

            /**
             * Creates a new ConnectLocal instance using the specified properties.
             * @function create
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @static
             * @param {Buttplug.ClientMessage.IConnectLocal=} [properties] Properties to set
             * @returns {Buttplug.ClientMessage.ConnectLocal} ConnectLocal instance
             */
            ConnectLocal.create = function create(properties) {
                return new ConnectLocal(properties);
            };

            /**
             * Encodes the specified ConnectLocal message. Does not implicitly {@link Buttplug.ClientMessage.ConnectLocal.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @static
             * @param {Buttplug.ClientMessage.IConnectLocal} message ConnectLocal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectLocal.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.serverName != null && Object.hasOwnProperty.call(message, "serverName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.serverName);
                if (message.maxPingTime != null && Object.hasOwnProperty.call(message, "maxPingTime"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.maxPingTime);
                if (message.allowRawMessages != null && Object.hasOwnProperty.call(message, "allowRawMessages"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.allowRawMessages);
                if (message.deviceConfigurationJson != null && Object.hasOwnProperty.call(message, "deviceConfigurationJson"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.deviceConfigurationJson);
                if (message.userDeviceConfigurationJson != null && Object.hasOwnProperty.call(message, "userDeviceConfigurationJson"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.userDeviceConfigurationJson);
                if (message.commManagerTypes != null && Object.hasOwnProperty.call(message, "commManagerTypes"))
                    writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.commManagerTypes);
                return writer;
            };

            /**
             * Encodes the specified ConnectLocal message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.ConnectLocal.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @static
             * @param {Buttplug.ClientMessage.IConnectLocal} message ConnectLocal message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectLocal.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConnectLocal message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ClientMessage.ConnectLocal} ConnectLocal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectLocal.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ClientMessage.ConnectLocal();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
            };

            /**
             * Decodes a ConnectLocal message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ClientMessage.ConnectLocal} ConnectLocal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectLocal.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConnectLocal message.
             * @function verify
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConnectLocal.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.serverName != null && message.hasOwnProperty("serverName"))
                    if (!$util.isString(message.serverName))
                        return "serverName: string expected";
                if (message.maxPingTime != null && message.hasOwnProperty("maxPingTime"))
                    if (!$util.isInteger(message.maxPingTime))
                        return "maxPingTime: integer expected";
                if (message.allowRawMessages != null && message.hasOwnProperty("allowRawMessages"))
                    if (typeof message.allowRawMessages !== "boolean")
                        return "allowRawMessages: boolean expected";
                if (message.deviceConfigurationJson != null && message.hasOwnProperty("deviceConfigurationJson"))
                    if (!$util.isString(message.deviceConfigurationJson))
                        return "deviceConfigurationJson: string expected";
                if (message.userDeviceConfigurationJson != null && message.hasOwnProperty("userDeviceConfigurationJson"))
                    if (!$util.isString(message.userDeviceConfigurationJson))
                        return "userDeviceConfigurationJson: string expected";
                if (message.commManagerTypes != null && message.hasOwnProperty("commManagerTypes"))
                    if (!$util.isInteger(message.commManagerTypes))
                        return "commManagerTypes: integer expected";
                return null;
            };

            /**
             * Creates a ConnectLocal message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ClientMessage.ConnectLocal} ConnectLocal
             */
            ConnectLocal.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ClientMessage.ConnectLocal)
                    return object;
                var message = new $root.Buttplug.ClientMessage.ConnectLocal();
                if (object.serverName != null)
                    message.serverName = String(object.serverName);
                if (object.maxPingTime != null)
                    message.maxPingTime = object.maxPingTime >>> 0;
                if (object.allowRawMessages != null)
                    message.allowRawMessages = Boolean(object.allowRawMessages);
                if (object.deviceConfigurationJson != null)
                    message.deviceConfigurationJson = String(object.deviceConfigurationJson);
                if (object.userDeviceConfigurationJson != null)
                    message.userDeviceConfigurationJson = String(object.userDeviceConfigurationJson);
                if (object.commManagerTypes != null)
                    message.commManagerTypes = object.commManagerTypes >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a ConnectLocal message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @static
             * @param {Buttplug.ClientMessage.ConnectLocal} message ConnectLocal
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConnectLocal.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.serverName = "";
                    object.maxPingTime = 0;
                    object.allowRawMessages = false;
                    object.deviceConfigurationJson = "";
                    object.userDeviceConfigurationJson = "";
                    object.commManagerTypes = 0;
                }
                if (message.serverName != null && message.hasOwnProperty("serverName"))
                    object.serverName = message.serverName;
                if (message.maxPingTime != null && message.hasOwnProperty("maxPingTime"))
                    object.maxPingTime = message.maxPingTime;
                if (message.allowRawMessages != null && message.hasOwnProperty("allowRawMessages"))
                    object.allowRawMessages = message.allowRawMessages;
                if (message.deviceConfigurationJson != null && message.hasOwnProperty("deviceConfigurationJson"))
                    object.deviceConfigurationJson = message.deviceConfigurationJson;
                if (message.userDeviceConfigurationJson != null && message.hasOwnProperty("userDeviceConfigurationJson"))
                    object.userDeviceConfigurationJson = message.userDeviceConfigurationJson;
                if (message.commManagerTypes != null && message.hasOwnProperty("commManagerTypes"))
                    object.commManagerTypes = message.commManagerTypes;
                return object;
            };

            /**
             * Converts this ConnectLocal to JSON.
             * @function toJSON
             * @memberof Buttplug.ClientMessage.ConnectLocal
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConnectLocal.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConnectLocal;
        })();

        ClientMessage.ConnectWebsocket = (function() {

            /**
             * Properties of a ConnectWebsocket.
             * @memberof Buttplug.ClientMessage
             * @interface IConnectWebsocket
             * @property {string|null} [address] ConnectWebsocket address
             * @property {boolean|null} [bypassCertVerification] ConnectWebsocket bypassCertVerification
             */

            /**
             * Constructs a new ConnectWebsocket.
             * @memberof Buttplug.ClientMessage
             * @classdesc Represents a ConnectWebsocket.
             * @implements IConnectWebsocket
             * @constructor
             * @param {Buttplug.ClientMessage.IConnectWebsocket=} [properties] Properties to set
             */
            function ConnectWebsocket(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ConnectWebsocket address.
             * @member {string} address
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @instance
             */
            ConnectWebsocket.prototype.address = "";

            /**
             * ConnectWebsocket bypassCertVerification.
             * @member {boolean} bypassCertVerification
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @instance
             */
            ConnectWebsocket.prototype.bypassCertVerification = false;

            /**
             * Creates a new ConnectWebsocket instance using the specified properties.
             * @function create
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @static
             * @param {Buttplug.ClientMessage.IConnectWebsocket=} [properties] Properties to set
             * @returns {Buttplug.ClientMessage.ConnectWebsocket} ConnectWebsocket instance
             */
            ConnectWebsocket.create = function create(properties) {
                return new ConnectWebsocket(properties);
            };

            /**
             * Encodes the specified ConnectWebsocket message. Does not implicitly {@link Buttplug.ClientMessage.ConnectWebsocket.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @static
             * @param {Buttplug.ClientMessage.IConnectWebsocket} message ConnectWebsocket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectWebsocket.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.address != null && Object.hasOwnProperty.call(message, "address"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.address);
                if (message.bypassCertVerification != null && Object.hasOwnProperty.call(message, "bypassCertVerification"))
                    writer.uint32(/* id 2, wireType 0 =*/16).bool(message.bypassCertVerification);
                return writer;
            };

            /**
             * Encodes the specified ConnectWebsocket message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.ConnectWebsocket.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @static
             * @param {Buttplug.ClientMessage.IConnectWebsocket} message ConnectWebsocket message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ConnectWebsocket.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ConnectWebsocket message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ClientMessage.ConnectWebsocket} ConnectWebsocket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectWebsocket.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ClientMessage.ConnectWebsocket();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
            };

            /**
             * Decodes a ConnectWebsocket message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ClientMessage.ConnectWebsocket} ConnectWebsocket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ConnectWebsocket.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ConnectWebsocket message.
             * @function verify
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ConnectWebsocket.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.address != null && message.hasOwnProperty("address"))
                    if (!$util.isString(message.address))
                        return "address: string expected";
                if (message.bypassCertVerification != null && message.hasOwnProperty("bypassCertVerification"))
                    if (typeof message.bypassCertVerification !== "boolean")
                        return "bypassCertVerification: boolean expected";
                return null;
            };

            /**
             * Creates a ConnectWebsocket message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ClientMessage.ConnectWebsocket} ConnectWebsocket
             */
            ConnectWebsocket.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ClientMessage.ConnectWebsocket)
                    return object;
                var message = new $root.Buttplug.ClientMessage.ConnectWebsocket();
                if (object.address != null)
                    message.address = String(object.address);
                if (object.bypassCertVerification != null)
                    message.bypassCertVerification = Boolean(object.bypassCertVerification);
                return message;
            };

            /**
             * Creates a plain object from a ConnectWebsocket message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @static
             * @param {Buttplug.ClientMessage.ConnectWebsocket} message ConnectWebsocket
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ConnectWebsocket.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.address = "";
                    object.bypassCertVerification = false;
                }
                if (message.address != null && message.hasOwnProperty("address"))
                    object.address = message.address;
                if (message.bypassCertVerification != null && message.hasOwnProperty("bypassCertVerification"))
                    object.bypassCertVerification = message.bypassCertVerification;
                return object;
            };

            /**
             * Converts this ConnectWebsocket to JSON.
             * @function toJSON
             * @memberof Buttplug.ClientMessage.ConnectWebsocket
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ConnectWebsocket.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ConnectWebsocket;
        })();

        ClientMessage.StartScanning = (function() {

            /**
             * Properties of a StartScanning.
             * @memberof Buttplug.ClientMessage
             * @interface IStartScanning
             */

            /**
             * Constructs a new StartScanning.
             * @memberof Buttplug.ClientMessage
             * @classdesc Represents a StartScanning.
             * @implements IStartScanning
             * @constructor
             * @param {Buttplug.ClientMessage.IStartScanning=} [properties] Properties to set
             */
            function StartScanning(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new StartScanning instance using the specified properties.
             * @function create
             * @memberof Buttplug.ClientMessage.StartScanning
             * @static
             * @param {Buttplug.ClientMessage.IStartScanning=} [properties] Properties to set
             * @returns {Buttplug.ClientMessage.StartScanning} StartScanning instance
             */
            StartScanning.create = function create(properties) {
                return new StartScanning(properties);
            };

            /**
             * Encodes the specified StartScanning message. Does not implicitly {@link Buttplug.ClientMessage.StartScanning.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ClientMessage.StartScanning
             * @static
             * @param {Buttplug.ClientMessage.IStartScanning} message StartScanning message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartScanning.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified StartScanning message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.StartScanning.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ClientMessage.StartScanning
             * @static
             * @param {Buttplug.ClientMessage.IStartScanning} message StartScanning message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StartScanning.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StartScanning message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ClientMessage.StartScanning
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ClientMessage.StartScanning} StartScanning
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartScanning.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ClientMessage.StartScanning();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StartScanning message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ClientMessage.StartScanning
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ClientMessage.StartScanning} StartScanning
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StartScanning.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StartScanning message.
             * @function verify
             * @memberof Buttplug.ClientMessage.StartScanning
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StartScanning.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a StartScanning message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ClientMessage.StartScanning
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ClientMessage.StartScanning} StartScanning
             */
            StartScanning.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ClientMessage.StartScanning)
                    return object;
                return new $root.Buttplug.ClientMessage.StartScanning();
            };

            /**
             * Creates a plain object from a StartScanning message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ClientMessage.StartScanning
             * @static
             * @param {Buttplug.ClientMessage.StartScanning} message StartScanning
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StartScanning.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this StartScanning to JSON.
             * @function toJSON
             * @memberof Buttplug.ClientMessage.StartScanning
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StartScanning.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StartScanning;
        })();

        ClientMessage.StopScanning = (function() {

            /**
             * Properties of a StopScanning.
             * @memberof Buttplug.ClientMessage
             * @interface IStopScanning
             */

            /**
             * Constructs a new StopScanning.
             * @memberof Buttplug.ClientMessage
             * @classdesc Represents a StopScanning.
             * @implements IStopScanning
             * @constructor
             * @param {Buttplug.ClientMessage.IStopScanning=} [properties] Properties to set
             */
            function StopScanning(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new StopScanning instance using the specified properties.
             * @function create
             * @memberof Buttplug.ClientMessage.StopScanning
             * @static
             * @param {Buttplug.ClientMessage.IStopScanning=} [properties] Properties to set
             * @returns {Buttplug.ClientMessage.StopScanning} StopScanning instance
             */
            StopScanning.create = function create(properties) {
                return new StopScanning(properties);
            };

            /**
             * Encodes the specified StopScanning message. Does not implicitly {@link Buttplug.ClientMessage.StopScanning.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ClientMessage.StopScanning
             * @static
             * @param {Buttplug.ClientMessage.IStopScanning} message StopScanning message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopScanning.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified StopScanning message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.StopScanning.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ClientMessage.StopScanning
             * @static
             * @param {Buttplug.ClientMessage.IStopScanning} message StopScanning message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopScanning.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StopScanning message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ClientMessage.StopScanning
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ClientMessage.StopScanning} StopScanning
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopScanning.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ClientMessage.StopScanning();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StopScanning message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ClientMessage.StopScanning
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ClientMessage.StopScanning} StopScanning
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopScanning.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StopScanning message.
             * @function verify
             * @memberof Buttplug.ClientMessage.StopScanning
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StopScanning.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a StopScanning message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ClientMessage.StopScanning
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ClientMessage.StopScanning} StopScanning
             */
            StopScanning.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ClientMessage.StopScanning)
                    return object;
                return new $root.Buttplug.ClientMessage.StopScanning();
            };

            /**
             * Creates a plain object from a StopScanning message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ClientMessage.StopScanning
             * @static
             * @param {Buttplug.ClientMessage.StopScanning} message StopScanning
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StopScanning.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this StopScanning to JSON.
             * @function toJSON
             * @memberof Buttplug.ClientMessage.StopScanning
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StopScanning.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StopScanning;
        })();

        ClientMessage.StopAllDevices = (function() {

            /**
             * Properties of a StopAllDevices.
             * @memberof Buttplug.ClientMessage
             * @interface IStopAllDevices
             */

            /**
             * Constructs a new StopAllDevices.
             * @memberof Buttplug.ClientMessage
             * @classdesc Represents a StopAllDevices.
             * @implements IStopAllDevices
             * @constructor
             * @param {Buttplug.ClientMessage.IStopAllDevices=} [properties] Properties to set
             */
            function StopAllDevices(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new StopAllDevices instance using the specified properties.
             * @function create
             * @memberof Buttplug.ClientMessage.StopAllDevices
             * @static
             * @param {Buttplug.ClientMessage.IStopAllDevices=} [properties] Properties to set
             * @returns {Buttplug.ClientMessage.StopAllDevices} StopAllDevices instance
             */
            StopAllDevices.create = function create(properties) {
                return new StopAllDevices(properties);
            };

            /**
             * Encodes the specified StopAllDevices message. Does not implicitly {@link Buttplug.ClientMessage.StopAllDevices.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ClientMessage.StopAllDevices
             * @static
             * @param {Buttplug.ClientMessage.IStopAllDevices} message StopAllDevices message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopAllDevices.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified StopAllDevices message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.StopAllDevices.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ClientMessage.StopAllDevices
             * @static
             * @param {Buttplug.ClientMessage.IStopAllDevices} message StopAllDevices message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopAllDevices.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StopAllDevices message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ClientMessage.StopAllDevices
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ClientMessage.StopAllDevices} StopAllDevices
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopAllDevices.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ClientMessage.StopAllDevices();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StopAllDevices message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ClientMessage.StopAllDevices
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ClientMessage.StopAllDevices} StopAllDevices
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopAllDevices.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StopAllDevices message.
             * @function verify
             * @memberof Buttplug.ClientMessage.StopAllDevices
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StopAllDevices.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a StopAllDevices message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ClientMessage.StopAllDevices
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ClientMessage.StopAllDevices} StopAllDevices
             */
            StopAllDevices.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ClientMessage.StopAllDevices)
                    return object;
                return new $root.Buttplug.ClientMessage.StopAllDevices();
            };

            /**
             * Creates a plain object from a StopAllDevices message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ClientMessage.StopAllDevices
             * @static
             * @param {Buttplug.ClientMessage.StopAllDevices} message StopAllDevices
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StopAllDevices.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this StopAllDevices to JSON.
             * @function toJSON
             * @memberof Buttplug.ClientMessage.StopAllDevices
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StopAllDevices.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StopAllDevices;
        })();

        ClientMessage.Disconnect = (function() {

            /**
             * Properties of a Disconnect.
             * @memberof Buttplug.ClientMessage
             * @interface IDisconnect
             */

            /**
             * Constructs a new Disconnect.
             * @memberof Buttplug.ClientMessage
             * @classdesc Represents a Disconnect.
             * @implements IDisconnect
             * @constructor
             * @param {Buttplug.ClientMessage.IDisconnect=} [properties] Properties to set
             */
            function Disconnect(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Disconnect instance using the specified properties.
             * @function create
             * @memberof Buttplug.ClientMessage.Disconnect
             * @static
             * @param {Buttplug.ClientMessage.IDisconnect=} [properties] Properties to set
             * @returns {Buttplug.ClientMessage.Disconnect} Disconnect instance
             */
            Disconnect.create = function create(properties) {
                return new Disconnect(properties);
            };

            /**
             * Encodes the specified Disconnect message. Does not implicitly {@link Buttplug.ClientMessage.Disconnect.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ClientMessage.Disconnect
             * @static
             * @param {Buttplug.ClientMessage.IDisconnect} message Disconnect message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Disconnect.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.Disconnect.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ClientMessage.Disconnect
             * @static
             * @param {Buttplug.ClientMessage.IDisconnect} message Disconnect message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Disconnect.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Disconnect message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ClientMessage.Disconnect
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ClientMessage.Disconnect} Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Disconnect.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ClientMessage.Disconnect();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Disconnect message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ClientMessage.Disconnect
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ClientMessage.Disconnect} Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Disconnect.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Disconnect message.
             * @function verify
             * @memberof Buttplug.ClientMessage.Disconnect
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Disconnect.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ClientMessage.Disconnect
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ClientMessage.Disconnect} Disconnect
             */
            Disconnect.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ClientMessage.Disconnect)
                    return object;
                return new $root.Buttplug.ClientMessage.Disconnect();
            };

            /**
             * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ClientMessage.Disconnect
             * @static
             * @param {Buttplug.ClientMessage.Disconnect} message Disconnect
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Disconnect.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Disconnect to JSON.
             * @function toJSON
             * @memberof Buttplug.ClientMessage.Disconnect
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Disconnect.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Disconnect;
        })();

        ClientMessage.Ping = (function() {

            /**
             * Properties of a Ping.
             * @memberof Buttplug.ClientMessage
             * @interface IPing
             */

            /**
             * Constructs a new Ping.
             * @memberof Buttplug.ClientMessage
             * @classdesc Represents a Ping.
             * @implements IPing
             * @constructor
             * @param {Buttplug.ClientMessage.IPing=} [properties] Properties to set
             */
            function Ping(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Ping instance using the specified properties.
             * @function create
             * @memberof Buttplug.ClientMessage.Ping
             * @static
             * @param {Buttplug.ClientMessage.IPing=} [properties] Properties to set
             * @returns {Buttplug.ClientMessage.Ping} Ping instance
             */
            Ping.create = function create(properties) {
                return new Ping(properties);
            };

            /**
             * Encodes the specified Ping message. Does not implicitly {@link Buttplug.ClientMessage.Ping.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ClientMessage.Ping
             * @static
             * @param {Buttplug.ClientMessage.IPing} message Ping message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Ping.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Ping message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.Ping.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ClientMessage.Ping
             * @static
             * @param {Buttplug.ClientMessage.IPing} message Ping message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Ping.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Ping message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ClientMessage.Ping
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ClientMessage.Ping} Ping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Ping.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ClientMessage.Ping();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Ping message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ClientMessage.Ping
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ClientMessage.Ping} Ping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Ping.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Ping message.
             * @function verify
             * @memberof Buttplug.ClientMessage.Ping
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Ping.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a Ping message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ClientMessage.Ping
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ClientMessage.Ping} Ping
             */
            Ping.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ClientMessage.Ping)
                    return object;
                return new $root.Buttplug.ClientMessage.Ping();
            };

            /**
             * Creates a plain object from a Ping message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ClientMessage.Ping
             * @static
             * @param {Buttplug.ClientMessage.Ping} message Ping
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Ping.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Ping to JSON.
             * @function toJSON
             * @memberof Buttplug.ClientMessage.Ping
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Ping.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Ping;
        })();

        ClientMessage.FFIMessage = (function() {

            /**
             * Properties of a FFIMessage.
             * @memberof Buttplug.ClientMessage
             * @interface IFFIMessage
             * @property {Buttplug.ClientMessage.IConnectLocal|null} [connectLocal] FFIMessage connectLocal
             * @property {Buttplug.ClientMessage.IConnectWebsocket|null} [connectWebsocket] FFIMessage connectWebsocket
             * @property {Buttplug.ClientMessage.IStartScanning|null} [startScanning] FFIMessage startScanning
             * @property {Buttplug.ClientMessage.IStopScanning|null} [stopScanning] FFIMessage stopScanning
             * @property {Buttplug.ClientMessage.IStopAllDevices|null} [stopAllDevices] FFIMessage stopAllDevices
             * @property {Buttplug.ClientMessage.IDisconnect|null} [disconnect] FFIMessage disconnect
             * @property {Buttplug.ClientMessage.IPing|null} [ping] FFIMessage ping
             */

            /**
             * Constructs a new FFIMessage.
             * @memberof Buttplug.ClientMessage
             * @classdesc Represents a FFIMessage.
             * @implements IFFIMessage
             * @constructor
             * @param {Buttplug.ClientMessage.IFFIMessage=} [properties] Properties to set
             */
            function FFIMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FFIMessage connectLocal.
             * @member {Buttplug.ClientMessage.IConnectLocal|null|undefined} connectLocal
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.connectLocal = null;

            /**
             * FFIMessage connectWebsocket.
             * @member {Buttplug.ClientMessage.IConnectWebsocket|null|undefined} connectWebsocket
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.connectWebsocket = null;

            /**
             * FFIMessage startScanning.
             * @member {Buttplug.ClientMessage.IStartScanning|null|undefined} startScanning
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.startScanning = null;

            /**
             * FFIMessage stopScanning.
             * @member {Buttplug.ClientMessage.IStopScanning|null|undefined} stopScanning
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.stopScanning = null;

            /**
             * FFIMessage stopAllDevices.
             * @member {Buttplug.ClientMessage.IStopAllDevices|null|undefined} stopAllDevices
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.stopAllDevices = null;

            /**
             * FFIMessage disconnect.
             * @member {Buttplug.ClientMessage.IDisconnect|null|undefined} disconnect
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.disconnect = null;

            /**
             * FFIMessage ping.
             * @member {Buttplug.ClientMessage.IPing|null|undefined} ping
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.ping = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * FFIMessage msg.
             * @member {"connectLocal"|"connectWebsocket"|"startScanning"|"stopScanning"|"stopAllDevices"|"disconnect"|"ping"|undefined} msg
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @instance
             */
            Object.defineProperty(FFIMessage.prototype, "msg", {
                get: $util.oneOfGetter($oneOfFields = ["connectLocal", "connectWebsocket", "startScanning", "stopScanning", "stopAllDevices", "disconnect", "ping"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new FFIMessage instance using the specified properties.
             * @function create
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @static
             * @param {Buttplug.ClientMessage.IFFIMessage=} [properties] Properties to set
             * @returns {Buttplug.ClientMessage.FFIMessage} FFIMessage instance
             */
            FFIMessage.create = function create(properties) {
                return new FFIMessage(properties);
            };

            /**
             * Encodes the specified FFIMessage message. Does not implicitly {@link Buttplug.ClientMessage.FFIMessage.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @static
             * @param {Buttplug.ClientMessage.IFFIMessage} message FFIMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FFIMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.connectLocal != null && Object.hasOwnProperty.call(message, "connectLocal"))
                    $root.Buttplug.ClientMessage.ConnectLocal.encode(message.connectLocal, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.connectWebsocket != null && Object.hasOwnProperty.call(message, "connectWebsocket"))
                    $root.Buttplug.ClientMessage.ConnectWebsocket.encode(message.connectWebsocket, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.startScanning != null && Object.hasOwnProperty.call(message, "startScanning"))
                    $root.Buttplug.ClientMessage.StartScanning.encode(message.startScanning, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.stopScanning != null && Object.hasOwnProperty.call(message, "stopScanning"))
                    $root.Buttplug.ClientMessage.StopScanning.encode(message.stopScanning, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.stopAllDevices != null && Object.hasOwnProperty.call(message, "stopAllDevices"))
                    $root.Buttplug.ClientMessage.StopAllDevices.encode(message.stopAllDevices, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.disconnect != null && Object.hasOwnProperty.call(message, "disconnect"))
                    $root.Buttplug.ClientMessage.Disconnect.encode(message.disconnect, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.ping != null && Object.hasOwnProperty.call(message, "ping"))
                    $root.Buttplug.ClientMessage.Ping.encode(message.ping, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified FFIMessage message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.FFIMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @static
             * @param {Buttplug.ClientMessage.IFFIMessage} message FFIMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FFIMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FFIMessage message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ClientMessage.FFIMessage} FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FFIMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ClientMessage.FFIMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.connectLocal = $root.Buttplug.ClientMessage.ConnectLocal.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.connectWebsocket = $root.Buttplug.ClientMessage.ConnectWebsocket.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.startScanning = $root.Buttplug.ClientMessage.StartScanning.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.stopScanning = $root.Buttplug.ClientMessage.StopScanning.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.stopAllDevices = $root.Buttplug.ClientMessage.StopAllDevices.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.disconnect = $root.Buttplug.ClientMessage.Disconnect.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.ping = $root.Buttplug.ClientMessage.Ping.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a FFIMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ClientMessage.FFIMessage} FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FFIMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FFIMessage message.
             * @function verify
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FFIMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.connectLocal != null && message.hasOwnProperty("connectLocal")) {
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.ClientMessage.ConnectLocal.verify(message.connectLocal);
                        if (error)
                            return "connectLocal." + error;
                    }
                }
                if (message.connectWebsocket != null && message.hasOwnProperty("connectWebsocket")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.ClientMessage.ConnectWebsocket.verify(message.connectWebsocket);
                        if (error)
                            return "connectWebsocket." + error;
                    }
                }
                if (message.startScanning != null && message.hasOwnProperty("startScanning")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.ClientMessage.StartScanning.verify(message.startScanning);
                        if (error)
                            return "startScanning." + error;
                    }
                }
                if (message.stopScanning != null && message.hasOwnProperty("stopScanning")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.ClientMessage.StopScanning.verify(message.stopScanning);
                        if (error)
                            return "stopScanning." + error;
                    }
                }
                if (message.stopAllDevices != null && message.hasOwnProperty("stopAllDevices")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.ClientMessage.StopAllDevices.verify(message.stopAllDevices);
                        if (error)
                            return "stopAllDevices." + error;
                    }
                }
                if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.ClientMessage.Disconnect.verify(message.disconnect);
                        if (error)
                            return "disconnect." + error;
                    }
                }
                if (message.ping != null && message.hasOwnProperty("ping")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.ClientMessage.Ping.verify(message.ping);
                        if (error)
                            return "ping." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a FFIMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ClientMessage.FFIMessage} FFIMessage
             */
            FFIMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ClientMessage.FFIMessage)
                    return object;
                var message = new $root.Buttplug.ClientMessage.FFIMessage();
                if (object.connectLocal != null) {
                    if (typeof object.connectLocal !== "object")
                        throw TypeError(".Buttplug.ClientMessage.FFIMessage.connectLocal: object expected");
                    message.connectLocal = $root.Buttplug.ClientMessage.ConnectLocal.fromObject(object.connectLocal);
                }
                if (object.connectWebsocket != null) {
                    if (typeof object.connectWebsocket !== "object")
                        throw TypeError(".Buttplug.ClientMessage.FFIMessage.connectWebsocket: object expected");
                    message.connectWebsocket = $root.Buttplug.ClientMessage.ConnectWebsocket.fromObject(object.connectWebsocket);
                }
                if (object.startScanning != null) {
                    if (typeof object.startScanning !== "object")
                        throw TypeError(".Buttplug.ClientMessage.FFIMessage.startScanning: object expected");
                    message.startScanning = $root.Buttplug.ClientMessage.StartScanning.fromObject(object.startScanning);
                }
                if (object.stopScanning != null) {
                    if (typeof object.stopScanning !== "object")
                        throw TypeError(".Buttplug.ClientMessage.FFIMessage.stopScanning: object expected");
                    message.stopScanning = $root.Buttplug.ClientMessage.StopScanning.fromObject(object.stopScanning);
                }
                if (object.stopAllDevices != null) {
                    if (typeof object.stopAllDevices !== "object")
                        throw TypeError(".Buttplug.ClientMessage.FFIMessage.stopAllDevices: object expected");
                    message.stopAllDevices = $root.Buttplug.ClientMessage.StopAllDevices.fromObject(object.stopAllDevices);
                }
                if (object.disconnect != null) {
                    if (typeof object.disconnect !== "object")
                        throw TypeError(".Buttplug.ClientMessage.FFIMessage.disconnect: object expected");
                    message.disconnect = $root.Buttplug.ClientMessage.Disconnect.fromObject(object.disconnect);
                }
                if (object.ping != null) {
                    if (typeof object.ping !== "object")
                        throw TypeError(".Buttplug.ClientMessage.FFIMessage.ping: object expected");
                    message.ping = $root.Buttplug.ClientMessage.Ping.fromObject(object.ping);
                }
                return message;
            };

            /**
             * Creates a plain object from a FFIMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @static
             * @param {Buttplug.ClientMessage.FFIMessage} message FFIMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FFIMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.connectLocal != null && message.hasOwnProperty("connectLocal")) {
                    object.connectLocal = $root.Buttplug.ClientMessage.ConnectLocal.toObject(message.connectLocal, options);
                    if (options.oneofs)
                        object.msg = "connectLocal";
                }
                if (message.connectWebsocket != null && message.hasOwnProperty("connectWebsocket")) {
                    object.connectWebsocket = $root.Buttplug.ClientMessage.ConnectWebsocket.toObject(message.connectWebsocket, options);
                    if (options.oneofs)
                        object.msg = "connectWebsocket";
                }
                if (message.startScanning != null && message.hasOwnProperty("startScanning")) {
                    object.startScanning = $root.Buttplug.ClientMessage.StartScanning.toObject(message.startScanning, options);
                    if (options.oneofs)
                        object.msg = "startScanning";
                }
                if (message.stopScanning != null && message.hasOwnProperty("stopScanning")) {
                    object.stopScanning = $root.Buttplug.ClientMessage.StopScanning.toObject(message.stopScanning, options);
                    if (options.oneofs)
                        object.msg = "stopScanning";
                }
                if (message.stopAllDevices != null && message.hasOwnProperty("stopAllDevices")) {
                    object.stopAllDevices = $root.Buttplug.ClientMessage.StopAllDevices.toObject(message.stopAllDevices, options);
                    if (options.oneofs)
                        object.msg = "stopAllDevices";
                }
                if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                    object.disconnect = $root.Buttplug.ClientMessage.Disconnect.toObject(message.disconnect, options);
                    if (options.oneofs)
                        object.msg = "disconnect";
                }
                if (message.ping != null && message.hasOwnProperty("ping")) {
                    object.ping = $root.Buttplug.ClientMessage.Ping.toObject(message.ping, options);
                    if (options.oneofs)
                        object.msg = "ping";
                }
                return object;
            };

            /**
             * Converts this FFIMessage to JSON.
             * @function toJSON
             * @memberof Buttplug.ClientMessage.FFIMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FFIMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FFIMessage;
        })();

        return ClientMessage;
    })();

    Buttplug.DeviceMessage = (function() {

        /**
         * Properties of a DeviceMessage.
         * @memberof Buttplug
         * @interface IDeviceMessage
         * @property {number|null} [id] DeviceMessage id
         * @property {number|null} [index] DeviceMessage index
         * @property {Buttplug.DeviceMessage.IFFIMessage|null} [message] DeviceMessage message
         */

        /**
         * Constructs a new DeviceMessage.
         * @memberof Buttplug
         * @classdesc Represents a DeviceMessage.
         * @implements IDeviceMessage
         * @constructor
         * @param {Buttplug.IDeviceMessage=} [properties] Properties to set
         */
        function DeviceMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceMessage id.
         * @member {number} id
         * @memberof Buttplug.DeviceMessage
         * @instance
         */
        DeviceMessage.prototype.id = 0;

        /**
         * DeviceMessage index.
         * @member {number} index
         * @memberof Buttplug.DeviceMessage
         * @instance
         */
        DeviceMessage.prototype.index = 0;

        /**
         * DeviceMessage message.
         * @member {Buttplug.DeviceMessage.IFFIMessage|null|undefined} message
         * @memberof Buttplug.DeviceMessage
         * @instance
         */
        DeviceMessage.prototype.message = null;

        /**
         * Creates a new DeviceMessage instance using the specified properties.
         * @function create
         * @memberof Buttplug.DeviceMessage
         * @static
         * @param {Buttplug.IDeviceMessage=} [properties] Properties to set
         * @returns {Buttplug.DeviceMessage} DeviceMessage instance
         */
        DeviceMessage.create = function create(properties) {
            return new DeviceMessage(properties);
        };

        /**
         * Encodes the specified DeviceMessage message. Does not implicitly {@link Buttplug.DeviceMessage.verify|verify} messages.
         * @function encode
         * @memberof Buttplug.DeviceMessage
         * @static
         * @param {Buttplug.IDeviceMessage} message DeviceMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.index);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                $root.Buttplug.DeviceMessage.FFIMessage.encode(message.message, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DeviceMessage message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Buttplug.DeviceMessage
         * @static
         * @param {Buttplug.IDeviceMessage} message DeviceMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeviceMessage message from the specified reader or buffer.
         * @function decode
         * @memberof Buttplug.DeviceMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Buttplug.DeviceMessage} DeviceMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.index = reader.uint32();
                    break;
                case 3:
                    message.message = $root.Buttplug.DeviceMessage.FFIMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeviceMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Buttplug.DeviceMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Buttplug.DeviceMessage} DeviceMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceMessage message.
         * @function verify
         * @memberof Buttplug.DeviceMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.index != null && message.hasOwnProperty("index"))
                if (!$util.isInteger(message.index))
                    return "index: integer expected";
            if (message.message != null && message.hasOwnProperty("message")) {
                var error = $root.Buttplug.DeviceMessage.FFIMessage.verify(message.message);
                if (error)
                    return "message." + error;
            }
            return null;
        };

        /**
         * Creates a DeviceMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Buttplug.DeviceMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Buttplug.DeviceMessage} DeviceMessage
         */
        DeviceMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.Buttplug.DeviceMessage)
                return object;
            var message = new $root.Buttplug.DeviceMessage();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.index != null)
                message.index = object.index >>> 0;
            if (object.message != null) {
                if (typeof object.message !== "object")
                    throw TypeError(".Buttplug.DeviceMessage.message: object expected");
                message.message = $root.Buttplug.DeviceMessage.FFIMessage.fromObject(object.message);
            }
            return message;
        };

        /**
         * Creates a plain object from a DeviceMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Buttplug.DeviceMessage
         * @static
         * @param {Buttplug.DeviceMessage} message DeviceMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.index = 0;
                object.message = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.index != null && message.hasOwnProperty("index"))
                object.index = message.index;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = $root.Buttplug.DeviceMessage.FFIMessage.toObject(message.message, options);
            return object;
        };

        /**
         * Converts this DeviceMessage to JSON.
         * @function toJSON
         * @memberof Buttplug.DeviceMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        DeviceMessage.VibrateComponent = (function() {

            /**
             * Properties of a VibrateComponent.
             * @memberof Buttplug.DeviceMessage
             * @interface IVibrateComponent
             * @property {number|null} [index] VibrateComponent index
             * @property {number|null} [speed] VibrateComponent speed
             */

            /**
             * Constructs a new VibrateComponent.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a VibrateComponent.
             * @implements IVibrateComponent
             * @constructor
             * @param {Buttplug.DeviceMessage.IVibrateComponent=} [properties] Properties to set
             */
            function VibrateComponent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VibrateComponent index.
             * @member {number} index
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @instance
             */
            VibrateComponent.prototype.index = 0;

            /**
             * VibrateComponent speed.
             * @member {number} speed
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @instance
             */
            VibrateComponent.prototype.speed = 0;

            /**
             * Creates a new VibrateComponent instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @static
             * @param {Buttplug.DeviceMessage.IVibrateComponent=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.VibrateComponent} VibrateComponent instance
             */
            VibrateComponent.create = function create(properties) {
                return new VibrateComponent(properties);
            };

            /**
             * Encodes the specified VibrateComponent message. Does not implicitly {@link Buttplug.DeviceMessage.VibrateComponent.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @static
             * @param {Buttplug.DeviceMessage.IVibrateComponent} message VibrateComponent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VibrateComponent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.speed);
                return writer;
            };

            /**
             * Encodes the specified VibrateComponent message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.VibrateComponent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @static
             * @param {Buttplug.DeviceMessage.IVibrateComponent} message VibrateComponent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VibrateComponent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a VibrateComponent message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.VibrateComponent} VibrateComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VibrateComponent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.VibrateComponent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
            };

            /**
             * Decodes a VibrateComponent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.VibrateComponent} VibrateComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VibrateComponent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a VibrateComponent message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VibrateComponent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.speed != null && message.hasOwnProperty("speed"))
                    if (typeof message.speed !== "number")
                        return "speed: number expected";
                return null;
            };

            /**
             * Creates a VibrateComponent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.VibrateComponent} VibrateComponent
             */
            VibrateComponent.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.VibrateComponent)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.VibrateComponent();
                if (object.index != null)
                    message.index = object.index >>> 0;
                if (object.speed != null)
                    message.speed = Number(object.speed);
                return message;
            };

            /**
             * Creates a plain object from a VibrateComponent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @static
             * @param {Buttplug.DeviceMessage.VibrateComponent} message VibrateComponent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VibrateComponent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.index = 0;
                    object.speed = 0;
                }
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.speed != null && message.hasOwnProperty("speed"))
                    object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
                return object;
            };

            /**
             * Converts this VibrateComponent to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.VibrateComponent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VibrateComponent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return VibrateComponent;
        })();

        DeviceMessage.VibrateCmd = (function() {

            /**
             * Properties of a VibrateCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface IVibrateCmd
             * @property {Array.<Buttplug.DeviceMessage.IVibrateComponent>|null} [speeds] VibrateCmd speeds
             */

            /**
             * Constructs a new VibrateCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a VibrateCmd.
             * @implements IVibrateCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.IVibrateCmd=} [properties] Properties to set
             */
            function VibrateCmd(properties) {
                this.speeds = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * VibrateCmd speeds.
             * @member {Array.<Buttplug.DeviceMessage.IVibrateComponent>} speeds
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @instance
             */
            VibrateCmd.prototype.speeds = $util.emptyArray;

            /**
             * Creates a new VibrateCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @static
             * @param {Buttplug.DeviceMessage.IVibrateCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.VibrateCmd} VibrateCmd instance
             */
            VibrateCmd.create = function create(properties) {
                return new VibrateCmd(properties);
            };

            /**
             * Encodes the specified VibrateCmd message. Does not implicitly {@link Buttplug.DeviceMessage.VibrateCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @static
             * @param {Buttplug.DeviceMessage.IVibrateCmd} message VibrateCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VibrateCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.speeds != null && message.speeds.length)
                    for (var i = 0; i < message.speeds.length; ++i)
                        $root.Buttplug.DeviceMessage.VibrateComponent.encode(message.speeds[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified VibrateCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.VibrateCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @static
             * @param {Buttplug.DeviceMessage.IVibrateCmd} message VibrateCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            VibrateCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a VibrateCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.VibrateCmd} VibrateCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VibrateCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.VibrateCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.speeds && message.speeds.length))
                            message.speeds = [];
                        message.speeds.push($root.Buttplug.DeviceMessage.VibrateComponent.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a VibrateCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.VibrateCmd} VibrateCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            VibrateCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a VibrateCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            VibrateCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.speeds != null && message.hasOwnProperty("speeds")) {
                    if (!Array.isArray(message.speeds))
                        return "speeds: array expected";
                    for (var i = 0; i < message.speeds.length; ++i) {
                        var error = $root.Buttplug.DeviceMessage.VibrateComponent.verify(message.speeds[i]);
                        if (error)
                            return "speeds." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a VibrateCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.VibrateCmd} VibrateCmd
             */
            VibrateCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.VibrateCmd)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.VibrateCmd();
                if (object.speeds) {
                    if (!Array.isArray(object.speeds))
                        throw TypeError(".Buttplug.DeviceMessage.VibrateCmd.speeds: array expected");
                    message.speeds = [];
                    for (var i = 0; i < object.speeds.length; ++i) {
                        if (typeof object.speeds[i] !== "object")
                            throw TypeError(".Buttplug.DeviceMessage.VibrateCmd.speeds: object expected");
                        message.speeds[i] = $root.Buttplug.DeviceMessage.VibrateComponent.fromObject(object.speeds[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a VibrateCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @static
             * @param {Buttplug.DeviceMessage.VibrateCmd} message VibrateCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            VibrateCmd.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.speeds = [];
                if (message.speeds && message.speeds.length) {
                    object.speeds = [];
                    for (var j = 0; j < message.speeds.length; ++j)
                        object.speeds[j] = $root.Buttplug.DeviceMessage.VibrateComponent.toObject(message.speeds[j], options);
                }
                return object;
            };

            /**
             * Converts this VibrateCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.VibrateCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            VibrateCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return VibrateCmd;
        })();

        DeviceMessage.RotateComponent = (function() {

            /**
             * Properties of a RotateComponent.
             * @memberof Buttplug.DeviceMessage
             * @interface IRotateComponent
             * @property {number|null} [index] RotateComponent index
             * @property {number|null} [speed] RotateComponent speed
             * @property {boolean|null} [clockwise] RotateComponent clockwise
             */

            /**
             * Constructs a new RotateComponent.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a RotateComponent.
             * @implements IRotateComponent
             * @constructor
             * @param {Buttplug.DeviceMessage.IRotateComponent=} [properties] Properties to set
             */
            function RotateComponent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RotateComponent index.
             * @member {number} index
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @instance
             */
            RotateComponent.prototype.index = 0;

            /**
             * RotateComponent speed.
             * @member {number} speed
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @instance
             */
            RotateComponent.prototype.speed = 0;

            /**
             * RotateComponent clockwise.
             * @member {boolean} clockwise
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @instance
             */
            RotateComponent.prototype.clockwise = false;

            /**
             * Creates a new RotateComponent instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @static
             * @param {Buttplug.DeviceMessage.IRotateComponent=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.RotateComponent} RotateComponent instance
             */
            RotateComponent.create = function create(properties) {
                return new RotateComponent(properties);
            };

            /**
             * Encodes the specified RotateComponent message. Does not implicitly {@link Buttplug.DeviceMessage.RotateComponent.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @static
             * @param {Buttplug.DeviceMessage.IRotateComponent} message RotateComponent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RotateComponent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                if (message.speed != null && Object.hasOwnProperty.call(message, "speed"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.speed);
                if (message.clockwise != null && Object.hasOwnProperty.call(message, "clockwise"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.clockwise);
                return writer;
            };

            /**
             * Encodes the specified RotateComponent message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RotateComponent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @static
             * @param {Buttplug.DeviceMessage.IRotateComponent} message RotateComponent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RotateComponent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RotateComponent message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.RotateComponent} RotateComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RotateComponent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.RotateComponent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
            };

            /**
             * Decodes a RotateComponent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.RotateComponent} RotateComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RotateComponent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RotateComponent message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RotateComponent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.speed != null && message.hasOwnProperty("speed"))
                    if (typeof message.speed !== "number")
                        return "speed: number expected";
                if (message.clockwise != null && message.hasOwnProperty("clockwise"))
                    if (typeof message.clockwise !== "boolean")
                        return "clockwise: boolean expected";
                return null;
            };

            /**
             * Creates a RotateComponent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.RotateComponent} RotateComponent
             */
            RotateComponent.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.RotateComponent)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.RotateComponent();
                if (object.index != null)
                    message.index = object.index >>> 0;
                if (object.speed != null)
                    message.speed = Number(object.speed);
                if (object.clockwise != null)
                    message.clockwise = Boolean(object.clockwise);
                return message;
            };

            /**
             * Creates a plain object from a RotateComponent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @static
             * @param {Buttplug.DeviceMessage.RotateComponent} message RotateComponent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RotateComponent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.index = 0;
                    object.speed = 0;
                    object.clockwise = false;
                }
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.speed != null && message.hasOwnProperty("speed"))
                    object.speed = options.json && !isFinite(message.speed) ? String(message.speed) : message.speed;
                if (message.clockwise != null && message.hasOwnProperty("clockwise"))
                    object.clockwise = message.clockwise;
                return object;
            };

            /**
             * Converts this RotateComponent to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.RotateComponent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RotateComponent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RotateComponent;
        })();

        DeviceMessage.RotateCmd = (function() {

            /**
             * Properties of a RotateCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface IRotateCmd
             * @property {Array.<Buttplug.DeviceMessage.IRotateComponent>|null} [rotations] RotateCmd rotations
             */

            /**
             * Constructs a new RotateCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a RotateCmd.
             * @implements IRotateCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.IRotateCmd=} [properties] Properties to set
             */
            function RotateCmd(properties) {
                this.rotations = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RotateCmd rotations.
             * @member {Array.<Buttplug.DeviceMessage.IRotateComponent>} rotations
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @instance
             */
            RotateCmd.prototype.rotations = $util.emptyArray;

            /**
             * Creates a new RotateCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRotateCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.RotateCmd} RotateCmd instance
             */
            RotateCmd.create = function create(properties) {
                return new RotateCmd(properties);
            };

            /**
             * Encodes the specified RotateCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RotateCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRotateCmd} message RotateCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RotateCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.rotations != null && message.rotations.length)
                    for (var i = 0; i < message.rotations.length; ++i)
                        $root.Buttplug.DeviceMessage.RotateComponent.encode(message.rotations[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified RotateCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RotateCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRotateCmd} message RotateCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RotateCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RotateCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.RotateCmd} RotateCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RotateCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.RotateCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.rotations && message.rotations.length))
                            message.rotations = [];
                        message.rotations.push($root.Buttplug.DeviceMessage.RotateComponent.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RotateCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.RotateCmd} RotateCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RotateCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RotateCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RotateCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.rotations != null && message.hasOwnProperty("rotations")) {
                    if (!Array.isArray(message.rotations))
                        return "rotations: array expected";
                    for (var i = 0; i < message.rotations.length; ++i) {
                        var error = $root.Buttplug.DeviceMessage.RotateComponent.verify(message.rotations[i]);
                        if (error)
                            return "rotations." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a RotateCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.RotateCmd} RotateCmd
             */
            RotateCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.RotateCmd)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.RotateCmd();
                if (object.rotations) {
                    if (!Array.isArray(object.rotations))
                        throw TypeError(".Buttplug.DeviceMessage.RotateCmd.rotations: array expected");
                    message.rotations = [];
                    for (var i = 0; i < object.rotations.length; ++i) {
                        if (typeof object.rotations[i] !== "object")
                            throw TypeError(".Buttplug.DeviceMessage.RotateCmd.rotations: object expected");
                        message.rotations[i] = $root.Buttplug.DeviceMessage.RotateComponent.fromObject(object.rotations[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a RotateCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @static
             * @param {Buttplug.DeviceMessage.RotateCmd} message RotateCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RotateCmd.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.rotations = [];
                if (message.rotations && message.rotations.length) {
                    object.rotations = [];
                    for (var j = 0; j < message.rotations.length; ++j)
                        object.rotations[j] = $root.Buttplug.DeviceMessage.RotateComponent.toObject(message.rotations[j], options);
                }
                return object;
            };

            /**
             * Converts this RotateCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.RotateCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RotateCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RotateCmd;
        })();

        DeviceMessage.LinearComponent = (function() {

            /**
             * Properties of a LinearComponent.
             * @memberof Buttplug.DeviceMessage
             * @interface ILinearComponent
             * @property {number|null} [index] LinearComponent index
             * @property {number|null} [duration] LinearComponent duration
             * @property {number|null} [position] LinearComponent position
             */

            /**
             * Constructs a new LinearComponent.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a LinearComponent.
             * @implements ILinearComponent
             * @constructor
             * @param {Buttplug.DeviceMessage.ILinearComponent=} [properties] Properties to set
             */
            function LinearComponent(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LinearComponent index.
             * @member {number} index
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @instance
             */
            LinearComponent.prototype.index = 0;

            /**
             * LinearComponent duration.
             * @member {number} duration
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @instance
             */
            LinearComponent.prototype.duration = 0;

            /**
             * LinearComponent position.
             * @member {number} position
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @instance
             */
            LinearComponent.prototype.position = 0;

            /**
             * Creates a new LinearComponent instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @static
             * @param {Buttplug.DeviceMessage.ILinearComponent=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.LinearComponent} LinearComponent instance
             */
            LinearComponent.create = function create(properties) {
                return new LinearComponent(properties);
            };

            /**
             * Encodes the specified LinearComponent message. Does not implicitly {@link Buttplug.DeviceMessage.LinearComponent.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @static
             * @param {Buttplug.DeviceMessage.ILinearComponent} message LinearComponent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LinearComponent.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                if (message.duration != null && Object.hasOwnProperty.call(message, "duration"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.duration);
                if (message.position != null && Object.hasOwnProperty.call(message, "position"))
                    writer.uint32(/* id 3, wireType 1 =*/25).double(message.position);
                return writer;
            };

            /**
             * Encodes the specified LinearComponent message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.LinearComponent.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @static
             * @param {Buttplug.DeviceMessage.ILinearComponent} message LinearComponent message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LinearComponent.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LinearComponent message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.LinearComponent} LinearComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LinearComponent.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.LinearComponent();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
            };

            /**
             * Decodes a LinearComponent message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.LinearComponent} LinearComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LinearComponent.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LinearComponent message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LinearComponent.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.duration != null && message.hasOwnProperty("duration"))
                    if (!$util.isInteger(message.duration))
                        return "duration: integer expected";
                if (message.position != null && message.hasOwnProperty("position"))
                    if (typeof message.position !== "number")
                        return "position: number expected";
                return null;
            };

            /**
             * Creates a LinearComponent message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.LinearComponent} LinearComponent
             */
            LinearComponent.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.LinearComponent)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.LinearComponent();
                if (object.index != null)
                    message.index = object.index >>> 0;
                if (object.duration != null)
                    message.duration = object.duration >>> 0;
                if (object.position != null)
                    message.position = Number(object.position);
                return message;
            };

            /**
             * Creates a plain object from a LinearComponent message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @static
             * @param {Buttplug.DeviceMessage.LinearComponent} message LinearComponent
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LinearComponent.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.index = 0;
                    object.duration = 0;
                    object.position = 0;
                }
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.duration != null && message.hasOwnProperty("duration"))
                    object.duration = message.duration;
                if (message.position != null && message.hasOwnProperty("position"))
                    object.position = options.json && !isFinite(message.position) ? String(message.position) : message.position;
                return object;
            };

            /**
             * Converts this LinearComponent to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.LinearComponent
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LinearComponent.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LinearComponent;
        })();

        DeviceMessage.LinearCmd = (function() {

            /**
             * Properties of a LinearCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface ILinearCmd
             * @property {Array.<Buttplug.DeviceMessage.ILinearComponent>|null} [movements] LinearCmd movements
             */

            /**
             * Constructs a new LinearCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a LinearCmd.
             * @implements ILinearCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.ILinearCmd=} [properties] Properties to set
             */
            function LinearCmd(properties) {
                this.movements = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LinearCmd movements.
             * @member {Array.<Buttplug.DeviceMessage.ILinearComponent>} movements
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @instance
             */
            LinearCmd.prototype.movements = $util.emptyArray;

            /**
             * Creates a new LinearCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @static
             * @param {Buttplug.DeviceMessage.ILinearCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.LinearCmd} LinearCmd instance
             */
            LinearCmd.create = function create(properties) {
                return new LinearCmd(properties);
            };

            /**
             * Encodes the specified LinearCmd message. Does not implicitly {@link Buttplug.DeviceMessage.LinearCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @static
             * @param {Buttplug.DeviceMessage.ILinearCmd} message LinearCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LinearCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.movements != null && message.movements.length)
                    for (var i = 0; i < message.movements.length; ++i)
                        $root.Buttplug.DeviceMessage.LinearComponent.encode(message.movements[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified LinearCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.LinearCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @static
             * @param {Buttplug.DeviceMessage.ILinearCmd} message LinearCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LinearCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LinearCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.LinearCmd} LinearCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LinearCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.LinearCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.movements && message.movements.length))
                            message.movements = [];
                        message.movements.push($root.Buttplug.DeviceMessage.LinearComponent.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LinearCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.LinearCmd} LinearCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LinearCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LinearCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LinearCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.movements != null && message.hasOwnProperty("movements")) {
                    if (!Array.isArray(message.movements))
                        return "movements: array expected";
                    for (var i = 0; i < message.movements.length; ++i) {
                        var error = $root.Buttplug.DeviceMessage.LinearComponent.verify(message.movements[i]);
                        if (error)
                            return "movements." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a LinearCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.LinearCmd} LinearCmd
             */
            LinearCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.LinearCmd)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.LinearCmd();
                if (object.movements) {
                    if (!Array.isArray(object.movements))
                        throw TypeError(".Buttplug.DeviceMessage.LinearCmd.movements: array expected");
                    message.movements = [];
                    for (var i = 0; i < object.movements.length; ++i) {
                        if (typeof object.movements[i] !== "object")
                            throw TypeError(".Buttplug.DeviceMessage.LinearCmd.movements: object expected");
                        message.movements[i] = $root.Buttplug.DeviceMessage.LinearComponent.fromObject(object.movements[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a LinearCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @static
             * @param {Buttplug.DeviceMessage.LinearCmd} message LinearCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LinearCmd.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.movements = [];
                if (message.movements && message.movements.length) {
                    object.movements = [];
                    for (var j = 0; j < message.movements.length; ++j)
                        object.movements[j] = $root.Buttplug.DeviceMessage.LinearComponent.toObject(message.movements[j], options);
                }
                return object;
            };

            /**
             * Converts this LinearCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.LinearCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LinearCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LinearCmd;
        })();

        DeviceMessage.StopDeviceCmd = (function() {

            /**
             * Properties of a StopDeviceCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface IStopDeviceCmd
             */

            /**
             * Constructs a new StopDeviceCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a StopDeviceCmd.
             * @implements IStopDeviceCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.IStopDeviceCmd=} [properties] Properties to set
             */
            function StopDeviceCmd(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new StopDeviceCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.StopDeviceCmd
             * @static
             * @param {Buttplug.DeviceMessage.IStopDeviceCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.StopDeviceCmd} StopDeviceCmd instance
             */
            StopDeviceCmd.create = function create(properties) {
                return new StopDeviceCmd(properties);
            };

            /**
             * Encodes the specified StopDeviceCmd message. Does not implicitly {@link Buttplug.DeviceMessage.StopDeviceCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.StopDeviceCmd
             * @static
             * @param {Buttplug.DeviceMessage.IStopDeviceCmd} message StopDeviceCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopDeviceCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified StopDeviceCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.StopDeviceCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.StopDeviceCmd
             * @static
             * @param {Buttplug.DeviceMessage.IStopDeviceCmd} message StopDeviceCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StopDeviceCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a StopDeviceCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.StopDeviceCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.StopDeviceCmd} StopDeviceCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopDeviceCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.StopDeviceCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a StopDeviceCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.StopDeviceCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.StopDeviceCmd} StopDeviceCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StopDeviceCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a StopDeviceCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.StopDeviceCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StopDeviceCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a StopDeviceCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.StopDeviceCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.StopDeviceCmd} StopDeviceCmd
             */
            StopDeviceCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.StopDeviceCmd)
                    return object;
                return new $root.Buttplug.DeviceMessage.StopDeviceCmd();
            };

            /**
             * Creates a plain object from a StopDeviceCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.StopDeviceCmd
             * @static
             * @param {Buttplug.DeviceMessage.StopDeviceCmd} message StopDeviceCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StopDeviceCmd.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this StopDeviceCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.StopDeviceCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StopDeviceCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return StopDeviceCmd;
        })();

        DeviceMessage.RawReadCmd = (function() {

            /**
             * Properties of a RawReadCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface IRawReadCmd
             * @property {Buttplug.Endpoint|null} [endpoint] RawReadCmd endpoint
             * @property {Uint8Array|null} [data] RawReadCmd data
             * @property {number|null} [expectedLength] RawReadCmd expectedLength
             * @property {number|null} [timeout] RawReadCmd timeout
             */

            /**
             * Constructs a new RawReadCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a RawReadCmd.
             * @implements IRawReadCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.IRawReadCmd=} [properties] Properties to set
             */
            function RawReadCmd(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RawReadCmd endpoint.
             * @member {Buttplug.Endpoint} endpoint
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @instance
             */
            RawReadCmd.prototype.endpoint = 0;

            /**
             * RawReadCmd data.
             * @member {Uint8Array} data
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @instance
             */
            RawReadCmd.prototype.data = $util.newBuffer([]);

            /**
             * RawReadCmd expectedLength.
             * @member {number} expectedLength
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @instance
             */
            RawReadCmd.prototype.expectedLength = 0;

            /**
             * RawReadCmd timeout.
             * @member {number} timeout
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @instance
             */
            RawReadCmd.prototype.timeout = 0;

            /**
             * Creates a new RawReadCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawReadCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.RawReadCmd} RawReadCmd instance
             */
            RawReadCmd.create = function create(properties) {
                return new RawReadCmd(properties);
            };

            /**
             * Encodes the specified RawReadCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RawReadCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawReadCmd} message RawReadCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawReadCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.endpoint != null && Object.hasOwnProperty.call(message, "endpoint"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.endpoint);
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
                if (message.expectedLength != null && Object.hasOwnProperty.call(message, "expectedLength"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint32(message.expectedLength);
                if (message.timeout != null && Object.hasOwnProperty.call(message, "timeout"))
                    writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.timeout);
                return writer;
            };

            /**
             * Encodes the specified RawReadCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RawReadCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawReadCmd} message RawReadCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawReadCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RawReadCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.RawReadCmd} RawReadCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawReadCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.RawReadCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.endpoint = reader.int32();
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
            };

            /**
             * Decodes a RawReadCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.RawReadCmd} RawReadCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawReadCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RawReadCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RawReadCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    switch (message.endpoint) {
                    default:
                        return "endpoint: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                    case 25:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                    case 41:
                    case 42:
                    case 43:
                    case 44:
                        break;
                    }
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                if (message.expectedLength != null && message.hasOwnProperty("expectedLength"))
                    if (!$util.isInteger(message.expectedLength))
                        return "expectedLength: integer expected";
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    if (!$util.isInteger(message.timeout))
                        return "timeout: integer expected";
                return null;
            };

            /**
             * Creates a RawReadCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.RawReadCmd} RawReadCmd
             */
            RawReadCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.RawReadCmd)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.RawReadCmd();
                switch (object.endpoint) {
                case "Command":
                case 0:
                    message.endpoint = 0;
                    break;
                case "Firmware":
                case 1:
                    message.endpoint = 1;
                    break;
                case "Rx":
                case 2:
                    message.endpoint = 2;
                    break;
                case "RxAccel":
                case 3:
                    message.endpoint = 3;
                    break;
                case "RxBLEBattery":
                case 4:
                    message.endpoint = 4;
                    break;
                case "RxPressure":
                case 5:
                    message.endpoint = 5;
                    break;
                case "RxTouch":
                case 6:
                    message.endpoint = 6;
                    break;
                case "Tx":
                case 7:
                    message.endpoint = 7;
                    break;
                case "TxMode":
                case 8:
                    message.endpoint = 8;
                    break;
                case "TxShock":
                case 9:
                    message.endpoint = 9;
                    break;
                case "TxVibrate":
                case 10:
                    message.endpoint = 10;
                    break;
                case "TxVendorControl":
                case 11:
                    message.endpoint = 11;
                    break;
                case "Whitelist":
                case 12:
                    message.endpoint = 12;
                    break;
                case "Generic0":
                case 13:
                    message.endpoint = 13;
                    break;
                case "Generic1":
                case 14:
                    message.endpoint = 14;
                    break;
                case "Generic2":
                case 15:
                    message.endpoint = 15;
                    break;
                case "Generic3":
                case 16:
                    message.endpoint = 16;
                    break;
                case "Generic4":
                case 17:
                    message.endpoint = 17;
                    break;
                case "Generic5":
                case 18:
                    message.endpoint = 18;
                    break;
                case "Generic6":
                case 19:
                    message.endpoint = 19;
                    break;
                case "Generic7":
                case 20:
                    message.endpoint = 20;
                    break;
                case "Generic8":
                case 21:
                    message.endpoint = 21;
                    break;
                case "Generic9":
                case 22:
                    message.endpoint = 22;
                    break;
                case "Generic10":
                case 23:
                    message.endpoint = 23;
                    break;
                case "Generic11":
                case 24:
                    message.endpoint = 24;
                    break;
                case "Generic12":
                case 25:
                    message.endpoint = 25;
                    break;
                case "Generic13":
                case 26:
                    message.endpoint = 26;
                    break;
                case "Generic14":
                case 27:
                    message.endpoint = 27;
                    break;
                case "Generic15":
                case 28:
                    message.endpoint = 28;
                    break;
                case "Generic16":
                case 29:
                    message.endpoint = 29;
                    break;
                case "Generic17":
                case 30:
                    message.endpoint = 30;
                    break;
                case "Generic18":
                case 31:
                    message.endpoint = 31;
                    break;
                case "Generic19":
                case 32:
                    message.endpoint = 32;
                    break;
                case "Generic20":
                case 33:
                    message.endpoint = 33;
                    break;
                case "Generic21":
                case 34:
                    message.endpoint = 34;
                    break;
                case "Generic22":
                case 35:
                    message.endpoint = 35;
                    break;
                case "Generic23":
                case 36:
                    message.endpoint = 36;
                    break;
                case "Generic24":
                case 37:
                    message.endpoint = 37;
                    break;
                case "Generic25":
                case 38:
                    message.endpoint = 38;
                    break;
                case "Generic26":
                case 39:
                    message.endpoint = 39;
                    break;
                case "Generic27":
                case 40:
                    message.endpoint = 40;
                    break;
                case "Generic28":
                case 41:
                    message.endpoint = 41;
                    break;
                case "Generic29":
                case 42:
                    message.endpoint = 42;
                    break;
                case "Generic30":
                case 43:
                    message.endpoint = 43;
                    break;
                case "Generic31":
                case 44:
                    message.endpoint = 44;
                    break;
                }
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                if (object.expectedLength != null)
                    message.expectedLength = object.expectedLength >>> 0;
                if (object.timeout != null)
                    message.timeout = object.timeout >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a RawReadCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @static
             * @param {Buttplug.DeviceMessage.RawReadCmd} message RawReadCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RawReadCmd.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.endpoint = options.enums === String ? "Command" : 0;
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                    object.expectedLength = 0;
                    object.timeout = 0;
                }
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    object.endpoint = options.enums === String ? $root.Buttplug.Endpoint[message.endpoint] : message.endpoint;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                if (message.expectedLength != null && message.hasOwnProperty("expectedLength"))
                    object.expectedLength = message.expectedLength;
                if (message.timeout != null && message.hasOwnProperty("timeout"))
                    object.timeout = message.timeout;
                return object;
            };

            /**
             * Converts this RawReadCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.RawReadCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RawReadCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RawReadCmd;
        })();

        DeviceMessage.RawWriteCmd = (function() {

            /**
             * Properties of a RawWriteCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface IRawWriteCmd
             * @property {Buttplug.Endpoint|null} [endpoint] RawWriteCmd endpoint
             * @property {Uint8Array|null} [data] RawWriteCmd data
             * @property {boolean|null} [writeWithResponse] RawWriteCmd writeWithResponse
             */

            /**
             * Constructs a new RawWriteCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a RawWriteCmd.
             * @implements IRawWriteCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.IRawWriteCmd=} [properties] Properties to set
             */
            function RawWriteCmd(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RawWriteCmd endpoint.
             * @member {Buttplug.Endpoint} endpoint
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @instance
             */
            RawWriteCmd.prototype.endpoint = 0;

            /**
             * RawWriteCmd data.
             * @member {Uint8Array} data
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @instance
             */
            RawWriteCmd.prototype.data = $util.newBuffer([]);

            /**
             * RawWriteCmd writeWithResponse.
             * @member {boolean} writeWithResponse
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @instance
             */
            RawWriteCmd.prototype.writeWithResponse = false;

            /**
             * Creates a new RawWriteCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawWriteCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.RawWriteCmd} RawWriteCmd instance
             */
            RawWriteCmd.create = function create(properties) {
                return new RawWriteCmd(properties);
            };

            /**
             * Encodes the specified RawWriteCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RawWriteCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawWriteCmd} message RawWriteCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawWriteCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.endpoint != null && Object.hasOwnProperty.call(message, "endpoint"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.endpoint);
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.data);
                if (message.writeWithResponse != null && Object.hasOwnProperty.call(message, "writeWithResponse"))
                    writer.uint32(/* id 3, wireType 0 =*/24).bool(message.writeWithResponse);
                return writer;
            };

            /**
             * Encodes the specified RawWriteCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RawWriteCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawWriteCmd} message RawWriteCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawWriteCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RawWriteCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.RawWriteCmd} RawWriteCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawWriteCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.RawWriteCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.endpoint = reader.int32();
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
            };

            /**
             * Decodes a RawWriteCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.RawWriteCmd} RawWriteCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawWriteCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RawWriteCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RawWriteCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    switch (message.endpoint) {
                    default:
                        return "endpoint: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                    case 25:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                    case 41:
                    case 42:
                    case 43:
                    case 44:
                        break;
                    }
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                if (message.writeWithResponse != null && message.hasOwnProperty("writeWithResponse"))
                    if (typeof message.writeWithResponse !== "boolean")
                        return "writeWithResponse: boolean expected";
                return null;
            };

            /**
             * Creates a RawWriteCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.RawWriteCmd} RawWriteCmd
             */
            RawWriteCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.RawWriteCmd)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.RawWriteCmd();
                switch (object.endpoint) {
                case "Command":
                case 0:
                    message.endpoint = 0;
                    break;
                case "Firmware":
                case 1:
                    message.endpoint = 1;
                    break;
                case "Rx":
                case 2:
                    message.endpoint = 2;
                    break;
                case "RxAccel":
                case 3:
                    message.endpoint = 3;
                    break;
                case "RxBLEBattery":
                case 4:
                    message.endpoint = 4;
                    break;
                case "RxPressure":
                case 5:
                    message.endpoint = 5;
                    break;
                case "RxTouch":
                case 6:
                    message.endpoint = 6;
                    break;
                case "Tx":
                case 7:
                    message.endpoint = 7;
                    break;
                case "TxMode":
                case 8:
                    message.endpoint = 8;
                    break;
                case "TxShock":
                case 9:
                    message.endpoint = 9;
                    break;
                case "TxVibrate":
                case 10:
                    message.endpoint = 10;
                    break;
                case "TxVendorControl":
                case 11:
                    message.endpoint = 11;
                    break;
                case "Whitelist":
                case 12:
                    message.endpoint = 12;
                    break;
                case "Generic0":
                case 13:
                    message.endpoint = 13;
                    break;
                case "Generic1":
                case 14:
                    message.endpoint = 14;
                    break;
                case "Generic2":
                case 15:
                    message.endpoint = 15;
                    break;
                case "Generic3":
                case 16:
                    message.endpoint = 16;
                    break;
                case "Generic4":
                case 17:
                    message.endpoint = 17;
                    break;
                case "Generic5":
                case 18:
                    message.endpoint = 18;
                    break;
                case "Generic6":
                case 19:
                    message.endpoint = 19;
                    break;
                case "Generic7":
                case 20:
                    message.endpoint = 20;
                    break;
                case "Generic8":
                case 21:
                    message.endpoint = 21;
                    break;
                case "Generic9":
                case 22:
                    message.endpoint = 22;
                    break;
                case "Generic10":
                case 23:
                    message.endpoint = 23;
                    break;
                case "Generic11":
                case 24:
                    message.endpoint = 24;
                    break;
                case "Generic12":
                case 25:
                    message.endpoint = 25;
                    break;
                case "Generic13":
                case 26:
                    message.endpoint = 26;
                    break;
                case "Generic14":
                case 27:
                    message.endpoint = 27;
                    break;
                case "Generic15":
                case 28:
                    message.endpoint = 28;
                    break;
                case "Generic16":
                case 29:
                    message.endpoint = 29;
                    break;
                case "Generic17":
                case 30:
                    message.endpoint = 30;
                    break;
                case "Generic18":
                case 31:
                    message.endpoint = 31;
                    break;
                case "Generic19":
                case 32:
                    message.endpoint = 32;
                    break;
                case "Generic20":
                case 33:
                    message.endpoint = 33;
                    break;
                case "Generic21":
                case 34:
                    message.endpoint = 34;
                    break;
                case "Generic22":
                case 35:
                    message.endpoint = 35;
                    break;
                case "Generic23":
                case 36:
                    message.endpoint = 36;
                    break;
                case "Generic24":
                case 37:
                    message.endpoint = 37;
                    break;
                case "Generic25":
                case 38:
                    message.endpoint = 38;
                    break;
                case "Generic26":
                case 39:
                    message.endpoint = 39;
                    break;
                case "Generic27":
                case 40:
                    message.endpoint = 40;
                    break;
                case "Generic28":
                case 41:
                    message.endpoint = 41;
                    break;
                case "Generic29":
                case 42:
                    message.endpoint = 42;
                    break;
                case "Generic30":
                case 43:
                    message.endpoint = 43;
                    break;
                case "Generic31":
                case 44:
                    message.endpoint = 44;
                    break;
                }
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                if (object.writeWithResponse != null)
                    message.writeWithResponse = Boolean(object.writeWithResponse);
                return message;
            };

            /**
             * Creates a plain object from a RawWriteCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @static
             * @param {Buttplug.DeviceMessage.RawWriteCmd} message RawWriteCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RawWriteCmd.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.endpoint = options.enums === String ? "Command" : 0;
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                    object.writeWithResponse = false;
                }
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    object.endpoint = options.enums === String ? $root.Buttplug.Endpoint[message.endpoint] : message.endpoint;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                if (message.writeWithResponse != null && message.hasOwnProperty("writeWithResponse"))
                    object.writeWithResponse = message.writeWithResponse;
                return object;
            };

            /**
             * Converts this RawWriteCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.RawWriteCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RawWriteCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RawWriteCmd;
        })();

        DeviceMessage.RawSubscribeCmd = (function() {

            /**
             * Properties of a RawSubscribeCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface IRawSubscribeCmd
             * @property {Buttplug.Endpoint|null} [endpoint] RawSubscribeCmd endpoint
             */

            /**
             * Constructs a new RawSubscribeCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a RawSubscribeCmd.
             * @implements IRawSubscribeCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.IRawSubscribeCmd=} [properties] Properties to set
             */
            function RawSubscribeCmd(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RawSubscribeCmd endpoint.
             * @member {Buttplug.Endpoint} endpoint
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @instance
             */
            RawSubscribeCmd.prototype.endpoint = 0;

            /**
             * Creates a new RawSubscribeCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawSubscribeCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.RawSubscribeCmd} RawSubscribeCmd instance
             */
            RawSubscribeCmd.create = function create(properties) {
                return new RawSubscribeCmd(properties);
            };

            /**
             * Encodes the specified RawSubscribeCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RawSubscribeCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawSubscribeCmd} message RawSubscribeCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawSubscribeCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.endpoint != null && Object.hasOwnProperty.call(message, "endpoint"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.endpoint);
                return writer;
            };

            /**
             * Encodes the specified RawSubscribeCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RawSubscribeCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawSubscribeCmd} message RawSubscribeCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawSubscribeCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RawSubscribeCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.RawSubscribeCmd} RawSubscribeCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawSubscribeCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.RawSubscribeCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.endpoint = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RawSubscribeCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.RawSubscribeCmd} RawSubscribeCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawSubscribeCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RawSubscribeCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RawSubscribeCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    switch (message.endpoint) {
                    default:
                        return "endpoint: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                    case 25:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                    case 41:
                    case 42:
                    case 43:
                    case 44:
                        break;
                    }
                return null;
            };

            /**
             * Creates a RawSubscribeCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.RawSubscribeCmd} RawSubscribeCmd
             */
            RawSubscribeCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.RawSubscribeCmd)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.RawSubscribeCmd();
                switch (object.endpoint) {
                case "Command":
                case 0:
                    message.endpoint = 0;
                    break;
                case "Firmware":
                case 1:
                    message.endpoint = 1;
                    break;
                case "Rx":
                case 2:
                    message.endpoint = 2;
                    break;
                case "RxAccel":
                case 3:
                    message.endpoint = 3;
                    break;
                case "RxBLEBattery":
                case 4:
                    message.endpoint = 4;
                    break;
                case "RxPressure":
                case 5:
                    message.endpoint = 5;
                    break;
                case "RxTouch":
                case 6:
                    message.endpoint = 6;
                    break;
                case "Tx":
                case 7:
                    message.endpoint = 7;
                    break;
                case "TxMode":
                case 8:
                    message.endpoint = 8;
                    break;
                case "TxShock":
                case 9:
                    message.endpoint = 9;
                    break;
                case "TxVibrate":
                case 10:
                    message.endpoint = 10;
                    break;
                case "TxVendorControl":
                case 11:
                    message.endpoint = 11;
                    break;
                case "Whitelist":
                case 12:
                    message.endpoint = 12;
                    break;
                case "Generic0":
                case 13:
                    message.endpoint = 13;
                    break;
                case "Generic1":
                case 14:
                    message.endpoint = 14;
                    break;
                case "Generic2":
                case 15:
                    message.endpoint = 15;
                    break;
                case "Generic3":
                case 16:
                    message.endpoint = 16;
                    break;
                case "Generic4":
                case 17:
                    message.endpoint = 17;
                    break;
                case "Generic5":
                case 18:
                    message.endpoint = 18;
                    break;
                case "Generic6":
                case 19:
                    message.endpoint = 19;
                    break;
                case "Generic7":
                case 20:
                    message.endpoint = 20;
                    break;
                case "Generic8":
                case 21:
                    message.endpoint = 21;
                    break;
                case "Generic9":
                case 22:
                    message.endpoint = 22;
                    break;
                case "Generic10":
                case 23:
                    message.endpoint = 23;
                    break;
                case "Generic11":
                case 24:
                    message.endpoint = 24;
                    break;
                case "Generic12":
                case 25:
                    message.endpoint = 25;
                    break;
                case "Generic13":
                case 26:
                    message.endpoint = 26;
                    break;
                case "Generic14":
                case 27:
                    message.endpoint = 27;
                    break;
                case "Generic15":
                case 28:
                    message.endpoint = 28;
                    break;
                case "Generic16":
                case 29:
                    message.endpoint = 29;
                    break;
                case "Generic17":
                case 30:
                    message.endpoint = 30;
                    break;
                case "Generic18":
                case 31:
                    message.endpoint = 31;
                    break;
                case "Generic19":
                case 32:
                    message.endpoint = 32;
                    break;
                case "Generic20":
                case 33:
                    message.endpoint = 33;
                    break;
                case "Generic21":
                case 34:
                    message.endpoint = 34;
                    break;
                case "Generic22":
                case 35:
                    message.endpoint = 35;
                    break;
                case "Generic23":
                case 36:
                    message.endpoint = 36;
                    break;
                case "Generic24":
                case 37:
                    message.endpoint = 37;
                    break;
                case "Generic25":
                case 38:
                    message.endpoint = 38;
                    break;
                case "Generic26":
                case 39:
                    message.endpoint = 39;
                    break;
                case "Generic27":
                case 40:
                    message.endpoint = 40;
                    break;
                case "Generic28":
                case 41:
                    message.endpoint = 41;
                    break;
                case "Generic29":
                case 42:
                    message.endpoint = 42;
                    break;
                case "Generic30":
                case 43:
                    message.endpoint = 43;
                    break;
                case "Generic31":
                case 44:
                    message.endpoint = 44;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a RawSubscribeCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @static
             * @param {Buttplug.DeviceMessage.RawSubscribeCmd} message RawSubscribeCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RawSubscribeCmd.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.endpoint = options.enums === String ? "Command" : 0;
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    object.endpoint = options.enums === String ? $root.Buttplug.Endpoint[message.endpoint] : message.endpoint;
                return object;
            };

            /**
             * Converts this RawSubscribeCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.RawSubscribeCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RawSubscribeCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RawSubscribeCmd;
        })();

        DeviceMessage.RawUnsubscribeCmd = (function() {

            /**
             * Properties of a RawUnsubscribeCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface IRawUnsubscribeCmd
             * @property {Buttplug.Endpoint|null} [endpoint] RawUnsubscribeCmd endpoint
             */

            /**
             * Constructs a new RawUnsubscribeCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a RawUnsubscribeCmd.
             * @implements IRawUnsubscribeCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.IRawUnsubscribeCmd=} [properties] Properties to set
             */
            function RawUnsubscribeCmd(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RawUnsubscribeCmd endpoint.
             * @member {Buttplug.Endpoint} endpoint
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @instance
             */
            RawUnsubscribeCmd.prototype.endpoint = 0;

            /**
             * Creates a new RawUnsubscribeCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawUnsubscribeCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.RawUnsubscribeCmd} RawUnsubscribeCmd instance
             */
            RawUnsubscribeCmd.create = function create(properties) {
                return new RawUnsubscribeCmd(properties);
            };

            /**
             * Encodes the specified RawUnsubscribeCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RawUnsubscribeCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawUnsubscribeCmd} message RawUnsubscribeCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawUnsubscribeCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.endpoint != null && Object.hasOwnProperty.call(message, "endpoint"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.endpoint);
                return writer;
            };

            /**
             * Encodes the specified RawUnsubscribeCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RawUnsubscribeCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRawUnsubscribeCmd} message RawUnsubscribeCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawUnsubscribeCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RawUnsubscribeCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.RawUnsubscribeCmd} RawUnsubscribeCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawUnsubscribeCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.RawUnsubscribeCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.endpoint = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RawUnsubscribeCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.RawUnsubscribeCmd} RawUnsubscribeCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawUnsubscribeCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RawUnsubscribeCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RawUnsubscribeCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    switch (message.endpoint) {
                    default:
                        return "endpoint: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                    case 25:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                    case 41:
                    case 42:
                    case 43:
                    case 44:
                        break;
                    }
                return null;
            };

            /**
             * Creates a RawUnsubscribeCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.RawUnsubscribeCmd} RawUnsubscribeCmd
             */
            RawUnsubscribeCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.RawUnsubscribeCmd)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.RawUnsubscribeCmd();
                switch (object.endpoint) {
                case "Command":
                case 0:
                    message.endpoint = 0;
                    break;
                case "Firmware":
                case 1:
                    message.endpoint = 1;
                    break;
                case "Rx":
                case 2:
                    message.endpoint = 2;
                    break;
                case "RxAccel":
                case 3:
                    message.endpoint = 3;
                    break;
                case "RxBLEBattery":
                case 4:
                    message.endpoint = 4;
                    break;
                case "RxPressure":
                case 5:
                    message.endpoint = 5;
                    break;
                case "RxTouch":
                case 6:
                    message.endpoint = 6;
                    break;
                case "Tx":
                case 7:
                    message.endpoint = 7;
                    break;
                case "TxMode":
                case 8:
                    message.endpoint = 8;
                    break;
                case "TxShock":
                case 9:
                    message.endpoint = 9;
                    break;
                case "TxVibrate":
                case 10:
                    message.endpoint = 10;
                    break;
                case "TxVendorControl":
                case 11:
                    message.endpoint = 11;
                    break;
                case "Whitelist":
                case 12:
                    message.endpoint = 12;
                    break;
                case "Generic0":
                case 13:
                    message.endpoint = 13;
                    break;
                case "Generic1":
                case 14:
                    message.endpoint = 14;
                    break;
                case "Generic2":
                case 15:
                    message.endpoint = 15;
                    break;
                case "Generic3":
                case 16:
                    message.endpoint = 16;
                    break;
                case "Generic4":
                case 17:
                    message.endpoint = 17;
                    break;
                case "Generic5":
                case 18:
                    message.endpoint = 18;
                    break;
                case "Generic6":
                case 19:
                    message.endpoint = 19;
                    break;
                case "Generic7":
                case 20:
                    message.endpoint = 20;
                    break;
                case "Generic8":
                case 21:
                    message.endpoint = 21;
                    break;
                case "Generic9":
                case 22:
                    message.endpoint = 22;
                    break;
                case "Generic10":
                case 23:
                    message.endpoint = 23;
                    break;
                case "Generic11":
                case 24:
                    message.endpoint = 24;
                    break;
                case "Generic12":
                case 25:
                    message.endpoint = 25;
                    break;
                case "Generic13":
                case 26:
                    message.endpoint = 26;
                    break;
                case "Generic14":
                case 27:
                    message.endpoint = 27;
                    break;
                case "Generic15":
                case 28:
                    message.endpoint = 28;
                    break;
                case "Generic16":
                case 29:
                    message.endpoint = 29;
                    break;
                case "Generic17":
                case 30:
                    message.endpoint = 30;
                    break;
                case "Generic18":
                case 31:
                    message.endpoint = 31;
                    break;
                case "Generic19":
                case 32:
                    message.endpoint = 32;
                    break;
                case "Generic20":
                case 33:
                    message.endpoint = 33;
                    break;
                case "Generic21":
                case 34:
                    message.endpoint = 34;
                    break;
                case "Generic22":
                case 35:
                    message.endpoint = 35;
                    break;
                case "Generic23":
                case 36:
                    message.endpoint = 36;
                    break;
                case "Generic24":
                case 37:
                    message.endpoint = 37;
                    break;
                case "Generic25":
                case 38:
                    message.endpoint = 38;
                    break;
                case "Generic26":
                case 39:
                    message.endpoint = 39;
                    break;
                case "Generic27":
                case 40:
                    message.endpoint = 40;
                    break;
                case "Generic28":
                case 41:
                    message.endpoint = 41;
                    break;
                case "Generic29":
                case 42:
                    message.endpoint = 42;
                    break;
                case "Generic30":
                case 43:
                    message.endpoint = 43;
                    break;
                case "Generic31":
                case 44:
                    message.endpoint = 44;
                    break;
                }
                return message;
            };

            /**
             * Creates a plain object from a RawUnsubscribeCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @static
             * @param {Buttplug.DeviceMessage.RawUnsubscribeCmd} message RawUnsubscribeCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RawUnsubscribeCmd.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.endpoint = options.enums === String ? "Command" : 0;
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    object.endpoint = options.enums === String ? $root.Buttplug.Endpoint[message.endpoint] : message.endpoint;
                return object;
            };

            /**
             * Converts this RawUnsubscribeCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.RawUnsubscribeCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RawUnsubscribeCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RawUnsubscribeCmd;
        })();

        DeviceMessage.BatteryLevelCmd = (function() {

            /**
             * Properties of a BatteryLevelCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface IBatteryLevelCmd
             */

            /**
             * Constructs a new BatteryLevelCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a BatteryLevelCmd.
             * @implements IBatteryLevelCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.IBatteryLevelCmd=} [properties] Properties to set
             */
            function BatteryLevelCmd(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new BatteryLevelCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.BatteryLevelCmd
             * @static
             * @param {Buttplug.DeviceMessage.IBatteryLevelCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.BatteryLevelCmd} BatteryLevelCmd instance
             */
            BatteryLevelCmd.create = function create(properties) {
                return new BatteryLevelCmd(properties);
            };

            /**
             * Encodes the specified BatteryLevelCmd message. Does not implicitly {@link Buttplug.DeviceMessage.BatteryLevelCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.BatteryLevelCmd
             * @static
             * @param {Buttplug.DeviceMessage.IBatteryLevelCmd} message BatteryLevelCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BatteryLevelCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified BatteryLevelCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.BatteryLevelCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.BatteryLevelCmd
             * @static
             * @param {Buttplug.DeviceMessage.IBatteryLevelCmd} message BatteryLevelCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BatteryLevelCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BatteryLevelCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.BatteryLevelCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.BatteryLevelCmd} BatteryLevelCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BatteryLevelCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.BatteryLevelCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BatteryLevelCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.BatteryLevelCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.BatteryLevelCmd} BatteryLevelCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BatteryLevelCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BatteryLevelCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.BatteryLevelCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BatteryLevelCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a BatteryLevelCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.BatteryLevelCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.BatteryLevelCmd} BatteryLevelCmd
             */
            BatteryLevelCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.BatteryLevelCmd)
                    return object;
                return new $root.Buttplug.DeviceMessage.BatteryLevelCmd();
            };

            /**
             * Creates a plain object from a BatteryLevelCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.BatteryLevelCmd
             * @static
             * @param {Buttplug.DeviceMessage.BatteryLevelCmd} message BatteryLevelCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BatteryLevelCmd.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this BatteryLevelCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.BatteryLevelCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BatteryLevelCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return BatteryLevelCmd;
        })();

        DeviceMessage.RSSILevelCmd = (function() {

            /**
             * Properties of a RSSILevelCmd.
             * @memberof Buttplug.DeviceMessage
             * @interface IRSSILevelCmd
             */

            /**
             * Constructs a new RSSILevelCmd.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a RSSILevelCmd.
             * @implements IRSSILevelCmd
             * @constructor
             * @param {Buttplug.DeviceMessage.IRSSILevelCmd=} [properties] Properties to set
             */
            function RSSILevelCmd(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new RSSILevelCmd instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.RSSILevelCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRSSILevelCmd=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.RSSILevelCmd} RSSILevelCmd instance
             */
            RSSILevelCmd.create = function create(properties) {
                return new RSSILevelCmd(properties);
            };

            /**
             * Encodes the specified RSSILevelCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RSSILevelCmd.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.RSSILevelCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRSSILevelCmd} message RSSILevelCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RSSILevelCmd.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified RSSILevelCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RSSILevelCmd.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.RSSILevelCmd
             * @static
             * @param {Buttplug.DeviceMessage.IRSSILevelCmd} message RSSILevelCmd message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RSSILevelCmd.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RSSILevelCmd message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.RSSILevelCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.RSSILevelCmd} RSSILevelCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RSSILevelCmd.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.RSSILevelCmd();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a RSSILevelCmd message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.RSSILevelCmd
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.RSSILevelCmd} RSSILevelCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RSSILevelCmd.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RSSILevelCmd message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.RSSILevelCmd
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RSSILevelCmd.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a RSSILevelCmd message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.RSSILevelCmd
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.RSSILevelCmd} RSSILevelCmd
             */
            RSSILevelCmd.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.RSSILevelCmd)
                    return object;
                return new $root.Buttplug.DeviceMessage.RSSILevelCmd();
            };

            /**
             * Creates a plain object from a RSSILevelCmd message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.RSSILevelCmd
             * @static
             * @param {Buttplug.DeviceMessage.RSSILevelCmd} message RSSILevelCmd
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RSSILevelCmd.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this RSSILevelCmd to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.RSSILevelCmd
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RSSILevelCmd.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RSSILevelCmd;
        })();

        DeviceMessage.FFIMessage = (function() {

            /**
             * Properties of a FFIMessage.
             * @memberof Buttplug.DeviceMessage
             * @interface IFFIMessage
             * @property {Buttplug.DeviceMessage.IVibrateCmd|null} [vibrateCmd] FFIMessage vibrateCmd
             * @property {Buttplug.DeviceMessage.IRotateCmd|null} [rotateCmd] FFIMessage rotateCmd
             * @property {Buttplug.DeviceMessage.ILinearCmd|null} [linearCmd] FFIMessage linearCmd
             * @property {Buttplug.DeviceMessage.IStopDeviceCmd|null} [stopDeviceCmd] FFIMessage stopDeviceCmd
             * @property {Buttplug.DeviceMessage.IRawReadCmd|null} [rawReadCmd] FFIMessage rawReadCmd
             * @property {Buttplug.DeviceMessage.IRawWriteCmd|null} [rawWriteCmd] FFIMessage rawWriteCmd
             * @property {Buttplug.DeviceMessage.IRawSubscribeCmd|null} [rawSubscribeCmd] FFIMessage rawSubscribeCmd
             * @property {Buttplug.DeviceMessage.IRawUnsubscribeCmd|null} [rawUnsubscribeCmd] FFIMessage rawUnsubscribeCmd
             * @property {Buttplug.DeviceMessage.IBatteryLevelCmd|null} [batteryLevelCmd] FFIMessage batteryLevelCmd
             * @property {Buttplug.DeviceMessage.IRSSILevelCmd|null} [rssiLevelCmd] FFIMessage rssiLevelCmd
             */

            /**
             * Constructs a new FFIMessage.
             * @memberof Buttplug.DeviceMessage
             * @classdesc Represents a FFIMessage.
             * @implements IFFIMessage
             * @constructor
             * @param {Buttplug.DeviceMessage.IFFIMessage=} [properties] Properties to set
             */
            function FFIMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FFIMessage vibrateCmd.
             * @member {Buttplug.DeviceMessage.IVibrateCmd|null|undefined} vibrateCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.vibrateCmd = null;

            /**
             * FFIMessage rotateCmd.
             * @member {Buttplug.DeviceMessage.IRotateCmd|null|undefined} rotateCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.rotateCmd = null;

            /**
             * FFIMessage linearCmd.
             * @member {Buttplug.DeviceMessage.ILinearCmd|null|undefined} linearCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.linearCmd = null;

            /**
             * FFIMessage stopDeviceCmd.
             * @member {Buttplug.DeviceMessage.IStopDeviceCmd|null|undefined} stopDeviceCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.stopDeviceCmd = null;

            /**
             * FFIMessage rawReadCmd.
             * @member {Buttplug.DeviceMessage.IRawReadCmd|null|undefined} rawReadCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.rawReadCmd = null;

            /**
             * FFIMessage rawWriteCmd.
             * @member {Buttplug.DeviceMessage.IRawWriteCmd|null|undefined} rawWriteCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.rawWriteCmd = null;

            /**
             * FFIMessage rawSubscribeCmd.
             * @member {Buttplug.DeviceMessage.IRawSubscribeCmd|null|undefined} rawSubscribeCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.rawSubscribeCmd = null;

            /**
             * FFIMessage rawUnsubscribeCmd.
             * @member {Buttplug.DeviceMessage.IRawUnsubscribeCmd|null|undefined} rawUnsubscribeCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.rawUnsubscribeCmd = null;

            /**
             * FFIMessage batteryLevelCmd.
             * @member {Buttplug.DeviceMessage.IBatteryLevelCmd|null|undefined} batteryLevelCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.batteryLevelCmd = null;

            /**
             * FFIMessage rssiLevelCmd.
             * @member {Buttplug.DeviceMessage.IRSSILevelCmd|null|undefined} rssiLevelCmd
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.rssiLevelCmd = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * FFIMessage msg.
             * @member {"vibrateCmd"|"rotateCmd"|"linearCmd"|"stopDeviceCmd"|"rawReadCmd"|"rawWriteCmd"|"rawSubscribeCmd"|"rawUnsubscribeCmd"|"batteryLevelCmd"|"rssiLevelCmd"|undefined} msg
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             */
            Object.defineProperty(FFIMessage.prototype, "msg", {
                get: $util.oneOfGetter($oneOfFields = ["vibrateCmd", "rotateCmd", "linearCmd", "stopDeviceCmd", "rawReadCmd", "rawWriteCmd", "rawSubscribeCmd", "rawUnsubscribeCmd", "batteryLevelCmd", "rssiLevelCmd"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new FFIMessage instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @static
             * @param {Buttplug.DeviceMessage.IFFIMessage=} [properties] Properties to set
             * @returns {Buttplug.DeviceMessage.FFIMessage} FFIMessage instance
             */
            FFIMessage.create = function create(properties) {
                return new FFIMessage(properties);
            };

            /**
             * Encodes the specified FFIMessage message. Does not implicitly {@link Buttplug.DeviceMessage.FFIMessage.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @static
             * @param {Buttplug.DeviceMessage.IFFIMessage} message FFIMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FFIMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.vibrateCmd != null && Object.hasOwnProperty.call(message, "vibrateCmd"))
                    $root.Buttplug.DeviceMessage.VibrateCmd.encode(message.vibrateCmd, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.rotateCmd != null && Object.hasOwnProperty.call(message, "rotateCmd"))
                    $root.Buttplug.DeviceMessage.RotateCmd.encode(message.rotateCmd, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.linearCmd != null && Object.hasOwnProperty.call(message, "linearCmd"))
                    $root.Buttplug.DeviceMessage.LinearCmd.encode(message.linearCmd, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.stopDeviceCmd != null && Object.hasOwnProperty.call(message, "stopDeviceCmd"))
                    $root.Buttplug.DeviceMessage.StopDeviceCmd.encode(message.stopDeviceCmd, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.rawReadCmd != null && Object.hasOwnProperty.call(message, "rawReadCmd"))
                    $root.Buttplug.DeviceMessage.RawReadCmd.encode(message.rawReadCmd, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.rawWriteCmd != null && Object.hasOwnProperty.call(message, "rawWriteCmd"))
                    $root.Buttplug.DeviceMessage.RawWriteCmd.encode(message.rawWriteCmd, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                if (message.rawSubscribeCmd != null && Object.hasOwnProperty.call(message, "rawSubscribeCmd"))
                    $root.Buttplug.DeviceMessage.RawSubscribeCmd.encode(message.rawSubscribeCmd, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
                if (message.rawUnsubscribeCmd != null && Object.hasOwnProperty.call(message, "rawUnsubscribeCmd"))
                    $root.Buttplug.DeviceMessage.RawUnsubscribeCmd.encode(message.rawUnsubscribeCmd, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                if (message.batteryLevelCmd != null && Object.hasOwnProperty.call(message, "batteryLevelCmd"))
                    $root.Buttplug.DeviceMessage.BatteryLevelCmd.encode(message.batteryLevelCmd, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                if (message.rssiLevelCmd != null && Object.hasOwnProperty.call(message, "rssiLevelCmd"))
                    $root.Buttplug.DeviceMessage.RSSILevelCmd.encode(message.rssiLevelCmd, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified FFIMessage message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.FFIMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @static
             * @param {Buttplug.DeviceMessage.IFFIMessage} message FFIMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FFIMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FFIMessage message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceMessage.FFIMessage} FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FFIMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceMessage.FFIMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.vibrateCmd = $root.Buttplug.DeviceMessage.VibrateCmd.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.rotateCmd = $root.Buttplug.DeviceMessage.RotateCmd.decode(reader, reader.uint32());
                        break;
                    case 3:
                        message.linearCmd = $root.Buttplug.DeviceMessage.LinearCmd.decode(reader, reader.uint32());
                        break;
                    case 4:
                        message.stopDeviceCmd = $root.Buttplug.DeviceMessage.StopDeviceCmd.decode(reader, reader.uint32());
                        break;
                    case 5:
                        message.rawReadCmd = $root.Buttplug.DeviceMessage.RawReadCmd.decode(reader, reader.uint32());
                        break;
                    case 6:
                        message.rawWriteCmd = $root.Buttplug.DeviceMessage.RawWriteCmd.decode(reader, reader.uint32());
                        break;
                    case 7:
                        message.rawSubscribeCmd = $root.Buttplug.DeviceMessage.RawSubscribeCmd.decode(reader, reader.uint32());
                        break;
                    case 8:
                        message.rawUnsubscribeCmd = $root.Buttplug.DeviceMessage.RawUnsubscribeCmd.decode(reader, reader.uint32());
                        break;
                    case 9:
                        message.batteryLevelCmd = $root.Buttplug.DeviceMessage.BatteryLevelCmd.decode(reader, reader.uint32());
                        break;
                    case 10:
                        message.rssiLevelCmd = $root.Buttplug.DeviceMessage.RSSILevelCmd.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a FFIMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceMessage.FFIMessage} FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FFIMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FFIMessage message.
             * @function verify
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FFIMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.vibrateCmd != null && message.hasOwnProperty("vibrateCmd")) {
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.VibrateCmd.verify(message.vibrateCmd);
                        if (error)
                            return "vibrateCmd." + error;
                    }
                }
                if (message.rotateCmd != null && message.hasOwnProperty("rotateCmd")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.RotateCmd.verify(message.rotateCmd);
                        if (error)
                            return "rotateCmd." + error;
                    }
                }
                if (message.linearCmd != null && message.hasOwnProperty("linearCmd")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.LinearCmd.verify(message.linearCmd);
                        if (error)
                            return "linearCmd." + error;
                    }
                }
                if (message.stopDeviceCmd != null && message.hasOwnProperty("stopDeviceCmd")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.StopDeviceCmd.verify(message.stopDeviceCmd);
                        if (error)
                            return "stopDeviceCmd." + error;
                    }
                }
                if (message.rawReadCmd != null && message.hasOwnProperty("rawReadCmd")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.RawReadCmd.verify(message.rawReadCmd);
                        if (error)
                            return "rawReadCmd." + error;
                    }
                }
                if (message.rawWriteCmd != null && message.hasOwnProperty("rawWriteCmd")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.RawWriteCmd.verify(message.rawWriteCmd);
                        if (error)
                            return "rawWriteCmd." + error;
                    }
                }
                if (message.rawSubscribeCmd != null && message.hasOwnProperty("rawSubscribeCmd")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.RawSubscribeCmd.verify(message.rawSubscribeCmd);
                        if (error)
                            return "rawSubscribeCmd." + error;
                    }
                }
                if (message.rawUnsubscribeCmd != null && message.hasOwnProperty("rawUnsubscribeCmd")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.RawUnsubscribeCmd.verify(message.rawUnsubscribeCmd);
                        if (error)
                            return "rawUnsubscribeCmd." + error;
                    }
                }
                if (message.batteryLevelCmd != null && message.hasOwnProperty("batteryLevelCmd")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.BatteryLevelCmd.verify(message.batteryLevelCmd);
                        if (error)
                            return "batteryLevelCmd." + error;
                    }
                }
                if (message.rssiLevelCmd != null && message.hasOwnProperty("rssiLevelCmd")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceMessage.RSSILevelCmd.verify(message.rssiLevelCmd);
                        if (error)
                            return "rssiLevelCmd." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a FFIMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceMessage.FFIMessage} FFIMessage
             */
            FFIMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceMessage.FFIMessage)
                    return object;
                var message = new $root.Buttplug.DeviceMessage.FFIMessage();
                if (object.vibrateCmd != null) {
                    if (typeof object.vibrateCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.vibrateCmd: object expected");
                    message.vibrateCmd = $root.Buttplug.DeviceMessage.VibrateCmd.fromObject(object.vibrateCmd);
                }
                if (object.rotateCmd != null) {
                    if (typeof object.rotateCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.rotateCmd: object expected");
                    message.rotateCmd = $root.Buttplug.DeviceMessage.RotateCmd.fromObject(object.rotateCmd);
                }
                if (object.linearCmd != null) {
                    if (typeof object.linearCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.linearCmd: object expected");
                    message.linearCmd = $root.Buttplug.DeviceMessage.LinearCmd.fromObject(object.linearCmd);
                }
                if (object.stopDeviceCmd != null) {
                    if (typeof object.stopDeviceCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.stopDeviceCmd: object expected");
                    message.stopDeviceCmd = $root.Buttplug.DeviceMessage.StopDeviceCmd.fromObject(object.stopDeviceCmd);
                }
                if (object.rawReadCmd != null) {
                    if (typeof object.rawReadCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.rawReadCmd: object expected");
                    message.rawReadCmd = $root.Buttplug.DeviceMessage.RawReadCmd.fromObject(object.rawReadCmd);
                }
                if (object.rawWriteCmd != null) {
                    if (typeof object.rawWriteCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.rawWriteCmd: object expected");
                    message.rawWriteCmd = $root.Buttplug.DeviceMessage.RawWriteCmd.fromObject(object.rawWriteCmd);
                }
                if (object.rawSubscribeCmd != null) {
                    if (typeof object.rawSubscribeCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.rawSubscribeCmd: object expected");
                    message.rawSubscribeCmd = $root.Buttplug.DeviceMessage.RawSubscribeCmd.fromObject(object.rawSubscribeCmd);
                }
                if (object.rawUnsubscribeCmd != null) {
                    if (typeof object.rawUnsubscribeCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.rawUnsubscribeCmd: object expected");
                    message.rawUnsubscribeCmd = $root.Buttplug.DeviceMessage.RawUnsubscribeCmd.fromObject(object.rawUnsubscribeCmd);
                }
                if (object.batteryLevelCmd != null) {
                    if (typeof object.batteryLevelCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.batteryLevelCmd: object expected");
                    message.batteryLevelCmd = $root.Buttplug.DeviceMessage.BatteryLevelCmd.fromObject(object.batteryLevelCmd);
                }
                if (object.rssiLevelCmd != null) {
                    if (typeof object.rssiLevelCmd !== "object")
                        throw TypeError(".Buttplug.DeviceMessage.FFIMessage.rssiLevelCmd: object expected");
                    message.rssiLevelCmd = $root.Buttplug.DeviceMessage.RSSILevelCmd.fromObject(object.rssiLevelCmd);
                }
                return message;
            };

            /**
             * Creates a plain object from a FFIMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @static
             * @param {Buttplug.DeviceMessage.FFIMessage} message FFIMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FFIMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.vibrateCmd != null && message.hasOwnProperty("vibrateCmd")) {
                    object.vibrateCmd = $root.Buttplug.DeviceMessage.VibrateCmd.toObject(message.vibrateCmd, options);
                    if (options.oneofs)
                        object.msg = "vibrateCmd";
                }
                if (message.rotateCmd != null && message.hasOwnProperty("rotateCmd")) {
                    object.rotateCmd = $root.Buttplug.DeviceMessage.RotateCmd.toObject(message.rotateCmd, options);
                    if (options.oneofs)
                        object.msg = "rotateCmd";
                }
                if (message.linearCmd != null && message.hasOwnProperty("linearCmd")) {
                    object.linearCmd = $root.Buttplug.DeviceMessage.LinearCmd.toObject(message.linearCmd, options);
                    if (options.oneofs)
                        object.msg = "linearCmd";
                }
                if (message.stopDeviceCmd != null && message.hasOwnProperty("stopDeviceCmd")) {
                    object.stopDeviceCmd = $root.Buttplug.DeviceMessage.StopDeviceCmd.toObject(message.stopDeviceCmd, options);
                    if (options.oneofs)
                        object.msg = "stopDeviceCmd";
                }
                if (message.rawReadCmd != null && message.hasOwnProperty("rawReadCmd")) {
                    object.rawReadCmd = $root.Buttplug.DeviceMessage.RawReadCmd.toObject(message.rawReadCmd, options);
                    if (options.oneofs)
                        object.msg = "rawReadCmd";
                }
                if (message.rawWriteCmd != null && message.hasOwnProperty("rawWriteCmd")) {
                    object.rawWriteCmd = $root.Buttplug.DeviceMessage.RawWriteCmd.toObject(message.rawWriteCmd, options);
                    if (options.oneofs)
                        object.msg = "rawWriteCmd";
                }
                if (message.rawSubscribeCmd != null && message.hasOwnProperty("rawSubscribeCmd")) {
                    object.rawSubscribeCmd = $root.Buttplug.DeviceMessage.RawSubscribeCmd.toObject(message.rawSubscribeCmd, options);
                    if (options.oneofs)
                        object.msg = "rawSubscribeCmd";
                }
                if (message.rawUnsubscribeCmd != null && message.hasOwnProperty("rawUnsubscribeCmd")) {
                    object.rawUnsubscribeCmd = $root.Buttplug.DeviceMessage.RawUnsubscribeCmd.toObject(message.rawUnsubscribeCmd, options);
                    if (options.oneofs)
                        object.msg = "rawUnsubscribeCmd";
                }
                if (message.batteryLevelCmd != null && message.hasOwnProperty("batteryLevelCmd")) {
                    object.batteryLevelCmd = $root.Buttplug.DeviceMessage.BatteryLevelCmd.toObject(message.batteryLevelCmd, options);
                    if (options.oneofs)
                        object.msg = "batteryLevelCmd";
                }
                if (message.rssiLevelCmd != null && message.hasOwnProperty("rssiLevelCmd")) {
                    object.rssiLevelCmd = $root.Buttplug.DeviceMessage.RSSILevelCmd.toObject(message.rssiLevelCmd, options);
                    if (options.oneofs)
                        object.msg = "rssiLevelCmd";
                }
                return object;
            };

            /**
             * Converts this FFIMessage to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceMessage.FFIMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FFIMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FFIMessage;
        })();

        return DeviceMessage;
    })();

    Buttplug.ServerMessage = (function() {

        /**
         * Properties of a ServerMessage.
         * @memberof Buttplug
         * @interface IServerMessage
         * @property {Buttplug.ServerMessage.IOk|null} [ok] ServerMessage ok
         * @property {Buttplug.ServerMessage.IError|null} [error] ServerMessage error
         * @property {Buttplug.ServerMessage.IScanningFinished|null} [scanningFinished] ServerMessage scanningFinished
         * @property {Buttplug.ServerMessage.IDeviceAdded|null} [deviceAdded] ServerMessage deviceAdded
         * @property {Buttplug.ServerMessage.IDeviceRemoved|null} [deviceRemoved] ServerMessage deviceRemoved
         * @property {Buttplug.ServerMessage.IDisconnect|null} [disconnect] ServerMessage disconnect
         */

        /**
         * Constructs a new ServerMessage.
         * @memberof Buttplug
         * @classdesc Represents a ServerMessage.
         * @implements IServerMessage
         * @constructor
         * @param {Buttplug.IServerMessage=} [properties] Properties to set
         */
        function ServerMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerMessage ok.
         * @member {Buttplug.ServerMessage.IOk|null|undefined} ok
         * @memberof Buttplug.ServerMessage
         * @instance
         */
        ServerMessage.prototype.ok = null;

        /**
         * ServerMessage error.
         * @member {Buttplug.ServerMessage.IError|null|undefined} error
         * @memberof Buttplug.ServerMessage
         * @instance
         */
        ServerMessage.prototype.error = null;

        /**
         * ServerMessage scanningFinished.
         * @member {Buttplug.ServerMessage.IScanningFinished|null|undefined} scanningFinished
         * @memberof Buttplug.ServerMessage
         * @instance
         */
        ServerMessage.prototype.scanningFinished = null;

        /**
         * ServerMessage deviceAdded.
         * @member {Buttplug.ServerMessage.IDeviceAdded|null|undefined} deviceAdded
         * @memberof Buttplug.ServerMessage
         * @instance
         */
        ServerMessage.prototype.deviceAdded = null;

        /**
         * ServerMessage deviceRemoved.
         * @member {Buttplug.ServerMessage.IDeviceRemoved|null|undefined} deviceRemoved
         * @memberof Buttplug.ServerMessage
         * @instance
         */
        ServerMessage.prototype.deviceRemoved = null;

        /**
         * ServerMessage disconnect.
         * @member {Buttplug.ServerMessage.IDisconnect|null|undefined} disconnect
         * @memberof Buttplug.ServerMessage
         * @instance
         */
        ServerMessage.prototype.disconnect = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * ServerMessage msg.
         * @member {"ok"|"error"|"scanningFinished"|"deviceAdded"|"deviceRemoved"|"disconnect"|undefined} msg
         * @memberof Buttplug.ServerMessage
         * @instance
         */
        Object.defineProperty(ServerMessage.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["ok", "error", "scanningFinished", "deviceAdded", "deviceRemoved", "disconnect"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new ServerMessage instance using the specified properties.
         * @function create
         * @memberof Buttplug.ServerMessage
         * @static
         * @param {Buttplug.IServerMessage=} [properties] Properties to set
         * @returns {Buttplug.ServerMessage} ServerMessage instance
         */
        ServerMessage.create = function create(properties) {
            return new ServerMessage(properties);
        };

        /**
         * Encodes the specified ServerMessage message. Does not implicitly {@link Buttplug.ServerMessage.verify|verify} messages.
         * @function encode
         * @memberof Buttplug.ServerMessage
         * @static
         * @param {Buttplug.IServerMessage} message ServerMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ok != null && Object.hasOwnProperty.call(message, "ok"))
                $root.Buttplug.ServerMessage.Ok.encode(message.ok, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
                $root.Buttplug.ServerMessage.Error.encode(message.error, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.scanningFinished != null && Object.hasOwnProperty.call(message, "scanningFinished"))
                $root.Buttplug.ServerMessage.ScanningFinished.encode(message.scanningFinished, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.deviceAdded != null && Object.hasOwnProperty.call(message, "deviceAdded"))
                $root.Buttplug.ServerMessage.DeviceAdded.encode(message.deviceAdded, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.deviceRemoved != null && Object.hasOwnProperty.call(message, "deviceRemoved"))
                $root.Buttplug.ServerMessage.DeviceRemoved.encode(message.deviceRemoved, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.disconnect != null && Object.hasOwnProperty.call(message, "disconnect"))
                $root.Buttplug.ServerMessage.Disconnect.encode(message.disconnect, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Buttplug.ServerMessage
         * @static
         * @param {Buttplug.IServerMessage} message ServerMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerMessage message from the specified reader or buffer.
         * @function decode
         * @memberof Buttplug.ServerMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Buttplug.ServerMessage} ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ServerMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ok = $root.Buttplug.ServerMessage.Ok.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.error = $root.Buttplug.ServerMessage.Error.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.scanningFinished = $root.Buttplug.ServerMessage.ScanningFinished.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.deviceAdded = $root.Buttplug.ServerMessage.DeviceAdded.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.deviceRemoved = $root.Buttplug.ServerMessage.DeviceRemoved.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.disconnect = $root.Buttplug.ServerMessage.Disconnect.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Buttplug.ServerMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Buttplug.ServerMessage} ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerMessage message.
         * @function verify
         * @memberof Buttplug.ServerMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.ok != null && message.hasOwnProperty("ok")) {
                properties.msg = 1;
                {
                    var error = $root.Buttplug.ServerMessage.Ok.verify(message.ok);
                    if (error)
                        return "ok." + error;
                }
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    var error = $root.Buttplug.ServerMessage.Error.verify(message.error);
                    if (error)
                        return "error." + error;
                }
            }
            if (message.scanningFinished != null && message.hasOwnProperty("scanningFinished")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    var error = $root.Buttplug.ServerMessage.ScanningFinished.verify(message.scanningFinished);
                    if (error)
                        return "scanningFinished." + error;
                }
            }
            if (message.deviceAdded != null && message.hasOwnProperty("deviceAdded")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    var error = $root.Buttplug.ServerMessage.DeviceAdded.verify(message.deviceAdded);
                    if (error)
                        return "deviceAdded." + error;
                }
            }
            if (message.deviceRemoved != null && message.hasOwnProperty("deviceRemoved")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    var error = $root.Buttplug.ServerMessage.DeviceRemoved.verify(message.deviceRemoved);
                    if (error)
                        return "deviceRemoved." + error;
                }
            }
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    var error = $root.Buttplug.ServerMessage.Disconnect.verify(message.disconnect);
                    if (error)
                        return "disconnect." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Buttplug.ServerMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Buttplug.ServerMessage} ServerMessage
         */
        ServerMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.Buttplug.ServerMessage)
                return object;
            var message = new $root.Buttplug.ServerMessage();
            if (object.ok != null) {
                if (typeof object.ok !== "object")
                    throw TypeError(".Buttplug.ServerMessage.ok: object expected");
                message.ok = $root.Buttplug.ServerMessage.Ok.fromObject(object.ok);
            }
            if (object.error != null) {
                if (typeof object.error !== "object")
                    throw TypeError(".Buttplug.ServerMessage.error: object expected");
                message.error = $root.Buttplug.ServerMessage.Error.fromObject(object.error);
            }
            if (object.scanningFinished != null) {
                if (typeof object.scanningFinished !== "object")
                    throw TypeError(".Buttplug.ServerMessage.scanningFinished: object expected");
                message.scanningFinished = $root.Buttplug.ServerMessage.ScanningFinished.fromObject(object.scanningFinished);
            }
            if (object.deviceAdded != null) {
                if (typeof object.deviceAdded !== "object")
                    throw TypeError(".Buttplug.ServerMessage.deviceAdded: object expected");
                message.deviceAdded = $root.Buttplug.ServerMessage.DeviceAdded.fromObject(object.deviceAdded);
            }
            if (object.deviceRemoved != null) {
                if (typeof object.deviceRemoved !== "object")
                    throw TypeError(".Buttplug.ServerMessage.deviceRemoved: object expected");
                message.deviceRemoved = $root.Buttplug.ServerMessage.DeviceRemoved.fromObject(object.deviceRemoved);
            }
            if (object.disconnect != null) {
                if (typeof object.disconnect !== "object")
                    throw TypeError(".Buttplug.ServerMessage.disconnect: object expected");
                message.disconnect = $root.Buttplug.ServerMessage.Disconnect.fromObject(object.disconnect);
            }
            return message;
        };

        /**
         * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Buttplug.ServerMessage
         * @static
         * @param {Buttplug.ServerMessage} message ServerMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.ok != null && message.hasOwnProperty("ok")) {
                object.ok = $root.Buttplug.ServerMessage.Ok.toObject(message.ok, options);
                if (options.oneofs)
                    object.msg = "ok";
            }
            if (message.error != null && message.hasOwnProperty("error")) {
                object.error = $root.Buttplug.ServerMessage.Error.toObject(message.error, options);
                if (options.oneofs)
                    object.msg = "error";
            }
            if (message.scanningFinished != null && message.hasOwnProperty("scanningFinished")) {
                object.scanningFinished = $root.Buttplug.ServerMessage.ScanningFinished.toObject(message.scanningFinished, options);
                if (options.oneofs)
                    object.msg = "scanningFinished";
            }
            if (message.deviceAdded != null && message.hasOwnProperty("deviceAdded")) {
                object.deviceAdded = $root.Buttplug.ServerMessage.DeviceAdded.toObject(message.deviceAdded, options);
                if (options.oneofs)
                    object.msg = "deviceAdded";
            }
            if (message.deviceRemoved != null && message.hasOwnProperty("deviceRemoved")) {
                object.deviceRemoved = $root.Buttplug.ServerMessage.DeviceRemoved.toObject(message.deviceRemoved, options);
                if (options.oneofs)
                    object.msg = "deviceRemoved";
            }
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                object.disconnect = $root.Buttplug.ServerMessage.Disconnect.toObject(message.disconnect, options);
                if (options.oneofs)
                    object.msg = "disconnect";
            }
            return object;
        };

        /**
         * Converts this ServerMessage to JSON.
         * @function toJSON
         * @memberof Buttplug.ServerMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * ButtplugErrorType enum.
         * @name Buttplug.ServerMessage.ButtplugErrorType
         * @enum {number}
         * @property {number} ButtplugConnectorError=0 ButtplugConnectorError value
         * @property {number} ButtplugHandshakeError=1 ButtplugHandshakeError value
         * @property {number} ButtplugDeviceError=2 ButtplugDeviceError value
         * @property {number} ButtplugPingError=3 ButtplugPingError value
         * @property {number} ButtplugMessageError=4 ButtplugMessageError value
         * @property {number} ButtplugUnknownError=5 ButtplugUnknownError value
         */
        ServerMessage.ButtplugErrorType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "ButtplugConnectorError"] = 0;
            values[valuesById[1] = "ButtplugHandshakeError"] = 1;
            values[valuesById[2] = "ButtplugDeviceError"] = 2;
            values[valuesById[3] = "ButtplugPingError"] = 3;
            values[valuesById[4] = "ButtplugMessageError"] = 4;
            values[valuesById[5] = "ButtplugUnknownError"] = 5;
            return values;
        })();

        /**
         * MessageAttributeType enum.
         * @name Buttplug.ServerMessage.MessageAttributeType
         * @enum {number}
         * @property {number} VibrateCmd=0 VibrateCmd value
         * @property {number} RotateCmd=1 RotateCmd value
         * @property {number} LinearCmd=2 LinearCmd value
         * @property {number} StopDeviceCmd=3 StopDeviceCmd value
         * @property {number} RawReadCmd=4 RawReadCmd value
         * @property {number} RawWriteCmd=5 RawWriteCmd value
         * @property {number} RawSubscribeCmd=6 RawSubscribeCmd value
         * @property {number} RawUnsubscribeCmd=7 RawUnsubscribeCmd value
         * @property {number} BatteryLevelCmd=8 BatteryLevelCmd value
         * @property {number} RSSILevelCmd=9 RSSILevelCmd value
         */
        ServerMessage.MessageAttributeType = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "VibrateCmd"] = 0;
            values[valuesById[1] = "RotateCmd"] = 1;
            values[valuesById[2] = "LinearCmd"] = 2;
            values[valuesById[3] = "StopDeviceCmd"] = 3;
            values[valuesById[4] = "RawReadCmd"] = 4;
            values[valuesById[5] = "RawWriteCmd"] = 5;
            values[valuesById[6] = "RawSubscribeCmd"] = 6;
            values[valuesById[7] = "RawUnsubscribeCmd"] = 7;
            values[valuesById[8] = "BatteryLevelCmd"] = 8;
            values[valuesById[9] = "RSSILevelCmd"] = 9;
            return values;
        })();

        ServerMessage.MessageAttributes = (function() {

            /**
             * Properties of a MessageAttributes.
             * @memberof Buttplug.ServerMessage
             * @interface IMessageAttributes
             * @property {Buttplug.ServerMessage.MessageAttributeType|null} [messageType] MessageAttributes messageType
             * @property {number|null} [featureCount] MessageAttributes featureCount
             * @property {Array.<number>|null} [stepCount] MessageAttributes stepCount
             * @property {Array.<Buttplug.Endpoint>|null} [endpoints] MessageAttributes endpoints
             * @property {Array.<number>|null} [maxDuration] MessageAttributes maxDuration
             */

            /**
             * Constructs a new MessageAttributes.
             * @memberof Buttplug.ServerMessage
             * @classdesc Represents a MessageAttributes.
             * @implements IMessageAttributes
             * @constructor
             * @param {Buttplug.ServerMessage.IMessageAttributes=} [properties] Properties to set
             */
            function MessageAttributes(properties) {
                this.stepCount = [];
                this.endpoints = [];
                this.maxDuration = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * MessageAttributes messageType.
             * @member {Buttplug.ServerMessage.MessageAttributeType} messageType
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @instance
             */
            MessageAttributes.prototype.messageType = 0;

            /**
             * MessageAttributes featureCount.
             * @member {number} featureCount
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @instance
             */
            MessageAttributes.prototype.featureCount = 0;

            /**
             * MessageAttributes stepCount.
             * @member {Array.<number>} stepCount
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @instance
             */
            MessageAttributes.prototype.stepCount = $util.emptyArray;

            /**
             * MessageAttributes endpoints.
             * @member {Array.<Buttplug.Endpoint>} endpoints
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @instance
             */
            MessageAttributes.prototype.endpoints = $util.emptyArray;

            /**
             * MessageAttributes maxDuration.
             * @member {Array.<number>} maxDuration
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @instance
             */
            MessageAttributes.prototype.maxDuration = $util.emptyArray;

            /**
             * Creates a new MessageAttributes instance using the specified properties.
             * @function create
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @static
             * @param {Buttplug.ServerMessage.IMessageAttributes=} [properties] Properties to set
             * @returns {Buttplug.ServerMessage.MessageAttributes} MessageAttributes instance
             */
            MessageAttributes.create = function create(properties) {
                return new MessageAttributes(properties);
            };

            /**
             * Encodes the specified MessageAttributes message. Does not implicitly {@link Buttplug.ServerMessage.MessageAttributes.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @static
             * @param {Buttplug.ServerMessage.IMessageAttributes} message MessageAttributes message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MessageAttributes.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.messageType != null && Object.hasOwnProperty.call(message, "messageType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.messageType);
                if (message.featureCount != null && Object.hasOwnProperty.call(message, "featureCount"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.featureCount);
                if (message.stepCount != null && message.stepCount.length) {
                    writer.uint32(/* id 3, wireType 2 =*/26).fork();
                    for (var i = 0; i < message.stepCount.length; ++i)
                        writer.uint32(message.stepCount[i]);
                    writer.ldelim();
                }
                if (message.endpoints != null && message.endpoints.length) {
                    writer.uint32(/* id 4, wireType 2 =*/34).fork();
                    for (var i = 0; i < message.endpoints.length; ++i)
                        writer.int32(message.endpoints[i]);
                    writer.ldelim();
                }
                if (message.maxDuration != null && message.maxDuration.length) {
                    writer.uint32(/* id 5, wireType 2 =*/42).fork();
                    for (var i = 0; i < message.maxDuration.length; ++i)
                        writer.uint32(message.maxDuration[i]);
                    writer.ldelim();
                }
                return writer;
            };

            /**
             * Encodes the specified MessageAttributes message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.MessageAttributes.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @static
             * @param {Buttplug.ServerMessage.IMessageAttributes} message MessageAttributes message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            MessageAttributes.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a MessageAttributes message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ServerMessage.MessageAttributes} MessageAttributes
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MessageAttributes.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ServerMessage.MessageAttributes();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.messageType = reader.int32();
                        break;
                    case 2:
                        message.featureCount = reader.uint32();
                        break;
                    case 3:
                        if (!(message.stepCount && message.stepCount.length))
                            message.stepCount = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.stepCount.push(reader.uint32());
                        } else
                            message.stepCount.push(reader.uint32());
                        break;
                    case 4:
                        if (!(message.endpoints && message.endpoints.length))
                            message.endpoints = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.endpoints.push(reader.int32());
                        } else
                            message.endpoints.push(reader.int32());
                        break;
                    case 5:
                        if (!(message.maxDuration && message.maxDuration.length))
                            message.maxDuration = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.maxDuration.push(reader.uint32());
                        } else
                            message.maxDuration.push(reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a MessageAttributes message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ServerMessage.MessageAttributes} MessageAttributes
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            MessageAttributes.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a MessageAttributes message.
             * @function verify
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            MessageAttributes.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.messageType != null && message.hasOwnProperty("messageType"))
                    switch (message.messageType) {
                    default:
                        return "messageType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                        break;
                    }
                if (message.featureCount != null && message.hasOwnProperty("featureCount"))
                    if (!$util.isInteger(message.featureCount))
                        return "featureCount: integer expected";
                if (message.stepCount != null && message.hasOwnProperty("stepCount")) {
                    if (!Array.isArray(message.stepCount))
                        return "stepCount: array expected";
                    for (var i = 0; i < message.stepCount.length; ++i)
                        if (!$util.isInteger(message.stepCount[i]))
                            return "stepCount: integer[] expected";
                }
                if (message.endpoints != null && message.hasOwnProperty("endpoints")) {
                    if (!Array.isArray(message.endpoints))
                        return "endpoints: array expected";
                    for (var i = 0; i < message.endpoints.length; ++i)
                        switch (message.endpoints[i]) {
                        default:
                            return "endpoints: enum value[] expected";
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                        case 24:
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                        case 41:
                        case 42:
                        case 43:
                        case 44:
                            break;
                        }
                }
                if (message.maxDuration != null && message.hasOwnProperty("maxDuration")) {
                    if (!Array.isArray(message.maxDuration))
                        return "maxDuration: array expected";
                    for (var i = 0; i < message.maxDuration.length; ++i)
                        if (!$util.isInteger(message.maxDuration[i]))
                            return "maxDuration: integer[] expected";
                }
                return null;
            };

            /**
             * Creates a MessageAttributes message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ServerMessage.MessageAttributes} MessageAttributes
             */
            MessageAttributes.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ServerMessage.MessageAttributes)
                    return object;
                var message = new $root.Buttplug.ServerMessage.MessageAttributes();
                switch (object.messageType) {
                case "VibrateCmd":
                case 0:
                    message.messageType = 0;
                    break;
                case "RotateCmd":
                case 1:
                    message.messageType = 1;
                    break;
                case "LinearCmd":
                case 2:
                    message.messageType = 2;
                    break;
                case "StopDeviceCmd":
                case 3:
                    message.messageType = 3;
                    break;
                case "RawReadCmd":
                case 4:
                    message.messageType = 4;
                    break;
                case "RawWriteCmd":
                case 5:
                    message.messageType = 5;
                    break;
                case "RawSubscribeCmd":
                case 6:
                    message.messageType = 6;
                    break;
                case "RawUnsubscribeCmd":
                case 7:
                    message.messageType = 7;
                    break;
                case "BatteryLevelCmd":
                case 8:
                    message.messageType = 8;
                    break;
                case "RSSILevelCmd":
                case 9:
                    message.messageType = 9;
                    break;
                }
                if (object.featureCount != null)
                    message.featureCount = object.featureCount >>> 0;
                if (object.stepCount) {
                    if (!Array.isArray(object.stepCount))
                        throw TypeError(".Buttplug.ServerMessage.MessageAttributes.stepCount: array expected");
                    message.stepCount = [];
                    for (var i = 0; i < object.stepCount.length; ++i)
                        message.stepCount[i] = object.stepCount[i] >>> 0;
                }
                if (object.endpoints) {
                    if (!Array.isArray(object.endpoints))
                        throw TypeError(".Buttplug.ServerMessage.MessageAttributes.endpoints: array expected");
                    message.endpoints = [];
                    for (var i = 0; i < object.endpoints.length; ++i)
                        switch (object.endpoints[i]) {
                        default:
                        case "Command":
                        case 0:
                            message.endpoints[i] = 0;
                            break;
                        case "Firmware":
                        case 1:
                            message.endpoints[i] = 1;
                            break;
                        case "Rx":
                        case 2:
                            message.endpoints[i] = 2;
                            break;
                        case "RxAccel":
                        case 3:
                            message.endpoints[i] = 3;
                            break;
                        case "RxBLEBattery":
                        case 4:
                            message.endpoints[i] = 4;
                            break;
                        case "RxPressure":
                        case 5:
                            message.endpoints[i] = 5;
                            break;
                        case "RxTouch":
                        case 6:
                            message.endpoints[i] = 6;
                            break;
                        case "Tx":
                        case 7:
                            message.endpoints[i] = 7;
                            break;
                        case "TxMode":
                        case 8:
                            message.endpoints[i] = 8;
                            break;
                        case "TxShock":
                        case 9:
                            message.endpoints[i] = 9;
                            break;
                        case "TxVibrate":
                        case 10:
                            message.endpoints[i] = 10;
                            break;
                        case "TxVendorControl":
                        case 11:
                            message.endpoints[i] = 11;
                            break;
                        case "Whitelist":
                        case 12:
                            message.endpoints[i] = 12;
                            break;
                        case "Generic0":
                        case 13:
                            message.endpoints[i] = 13;
                            break;
                        case "Generic1":
                        case 14:
                            message.endpoints[i] = 14;
                            break;
                        case "Generic2":
                        case 15:
                            message.endpoints[i] = 15;
                            break;
                        case "Generic3":
                        case 16:
                            message.endpoints[i] = 16;
                            break;
                        case "Generic4":
                        case 17:
                            message.endpoints[i] = 17;
                            break;
                        case "Generic5":
                        case 18:
                            message.endpoints[i] = 18;
                            break;
                        case "Generic6":
                        case 19:
                            message.endpoints[i] = 19;
                            break;
                        case "Generic7":
                        case 20:
                            message.endpoints[i] = 20;
                            break;
                        case "Generic8":
                        case 21:
                            message.endpoints[i] = 21;
                            break;
                        case "Generic9":
                        case 22:
                            message.endpoints[i] = 22;
                            break;
                        case "Generic10":
                        case 23:
                            message.endpoints[i] = 23;
                            break;
                        case "Generic11":
                        case 24:
                            message.endpoints[i] = 24;
                            break;
                        case "Generic12":
                        case 25:
                            message.endpoints[i] = 25;
                            break;
                        case "Generic13":
                        case 26:
                            message.endpoints[i] = 26;
                            break;
                        case "Generic14":
                        case 27:
                            message.endpoints[i] = 27;
                            break;
                        case "Generic15":
                        case 28:
                            message.endpoints[i] = 28;
                            break;
                        case "Generic16":
                        case 29:
                            message.endpoints[i] = 29;
                            break;
                        case "Generic17":
                        case 30:
                            message.endpoints[i] = 30;
                            break;
                        case "Generic18":
                        case 31:
                            message.endpoints[i] = 31;
                            break;
                        case "Generic19":
                        case 32:
                            message.endpoints[i] = 32;
                            break;
                        case "Generic20":
                        case 33:
                            message.endpoints[i] = 33;
                            break;
                        case "Generic21":
                        case 34:
                            message.endpoints[i] = 34;
                            break;
                        case "Generic22":
                        case 35:
                            message.endpoints[i] = 35;
                            break;
                        case "Generic23":
                        case 36:
                            message.endpoints[i] = 36;
                            break;
                        case "Generic24":
                        case 37:
                            message.endpoints[i] = 37;
                            break;
                        case "Generic25":
                        case 38:
                            message.endpoints[i] = 38;
                            break;
                        case "Generic26":
                        case 39:
                            message.endpoints[i] = 39;
                            break;
                        case "Generic27":
                        case 40:
                            message.endpoints[i] = 40;
                            break;
                        case "Generic28":
                        case 41:
                            message.endpoints[i] = 41;
                            break;
                        case "Generic29":
                        case 42:
                            message.endpoints[i] = 42;
                            break;
                        case "Generic30":
                        case 43:
                            message.endpoints[i] = 43;
                            break;
                        case "Generic31":
                        case 44:
                            message.endpoints[i] = 44;
                            break;
                        }
                }
                if (object.maxDuration) {
                    if (!Array.isArray(object.maxDuration))
                        throw TypeError(".Buttplug.ServerMessage.MessageAttributes.maxDuration: array expected");
                    message.maxDuration = [];
                    for (var i = 0; i < object.maxDuration.length; ++i)
                        message.maxDuration[i] = object.maxDuration[i] >>> 0;
                }
                return message;
            };

            /**
             * Creates a plain object from a MessageAttributes message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @static
             * @param {Buttplug.ServerMessage.MessageAttributes} message MessageAttributes
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            MessageAttributes.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.stepCount = [];
                    object.endpoints = [];
                    object.maxDuration = [];
                }
                if (options.defaults) {
                    object.messageType = options.enums === String ? "VibrateCmd" : 0;
                    object.featureCount = 0;
                }
                if (message.messageType != null && message.hasOwnProperty("messageType"))
                    object.messageType = options.enums === String ? $root.Buttplug.ServerMessage.MessageAttributeType[message.messageType] : message.messageType;
                if (message.featureCount != null && message.hasOwnProperty("featureCount"))
                    object.featureCount = message.featureCount;
                if (message.stepCount && message.stepCount.length) {
                    object.stepCount = [];
                    for (var j = 0; j < message.stepCount.length; ++j)
                        object.stepCount[j] = message.stepCount[j];
                }
                if (message.endpoints && message.endpoints.length) {
                    object.endpoints = [];
                    for (var j = 0; j < message.endpoints.length; ++j)
                        object.endpoints[j] = options.enums === String ? $root.Buttplug.Endpoint[message.endpoints[j]] : message.endpoints[j];
                }
                if (message.maxDuration && message.maxDuration.length) {
                    object.maxDuration = [];
                    for (var j = 0; j < message.maxDuration.length; ++j)
                        object.maxDuration[j] = message.maxDuration[j];
                }
                return object;
            };

            /**
             * Converts this MessageAttributes to JSON.
             * @function toJSON
             * @memberof Buttplug.ServerMessage.MessageAttributes
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            MessageAttributes.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return MessageAttributes;
        })();

        ServerMessage.Ok = (function() {

            /**
             * Properties of an Ok.
             * @memberof Buttplug.ServerMessage
             * @interface IOk
             */

            /**
             * Constructs a new Ok.
             * @memberof Buttplug.ServerMessage
             * @classdesc Represents an Ok.
             * @implements IOk
             * @constructor
             * @param {Buttplug.ServerMessage.IOk=} [properties] Properties to set
             */
            function Ok(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Ok instance using the specified properties.
             * @function create
             * @memberof Buttplug.ServerMessage.Ok
             * @static
             * @param {Buttplug.ServerMessage.IOk=} [properties] Properties to set
             * @returns {Buttplug.ServerMessage.Ok} Ok instance
             */
            Ok.create = function create(properties) {
                return new Ok(properties);
            };

            /**
             * Encodes the specified Ok message. Does not implicitly {@link Buttplug.ServerMessage.Ok.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ServerMessage.Ok
             * @static
             * @param {Buttplug.ServerMessage.IOk} message Ok message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Ok.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Ok message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.Ok.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ServerMessage.Ok
             * @static
             * @param {Buttplug.ServerMessage.IOk} message Ok message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Ok.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Ok message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ServerMessage.Ok
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ServerMessage.Ok} Ok
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Ok.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ServerMessage.Ok();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Ok message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ServerMessage.Ok
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ServerMessage.Ok} Ok
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Ok.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Ok message.
             * @function verify
             * @memberof Buttplug.ServerMessage.Ok
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Ok.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates an Ok message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ServerMessage.Ok
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ServerMessage.Ok} Ok
             */
            Ok.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ServerMessage.Ok)
                    return object;
                return new $root.Buttplug.ServerMessage.Ok();
            };

            /**
             * Creates a plain object from an Ok message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ServerMessage.Ok
             * @static
             * @param {Buttplug.ServerMessage.Ok} message Ok
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Ok.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Ok to JSON.
             * @function toJSON
             * @memberof Buttplug.ServerMessage.Ok
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Ok.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Ok;
        })();

        ServerMessage.Error = (function() {

            /**
             * Properties of an Error.
             * @memberof Buttplug.ServerMessage
             * @interface IError
             * @property {Buttplug.ServerMessage.ButtplugErrorType|null} [errorType] Error errorType
             * @property {string|null} [message] Error message
             * @property {string|null} [backtrace] Error backtrace
             */

            /**
             * Constructs a new Error.
             * @memberof Buttplug.ServerMessage
             * @classdesc Represents an Error.
             * @implements IError
             * @constructor
             * @param {Buttplug.ServerMessage.IError=} [properties] Properties to set
             */
            function Error(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Error errorType.
             * @member {Buttplug.ServerMessage.ButtplugErrorType} errorType
             * @memberof Buttplug.ServerMessage.Error
             * @instance
             */
            Error.prototype.errorType = 0;

            /**
             * Error message.
             * @member {string} message
             * @memberof Buttplug.ServerMessage.Error
             * @instance
             */
            Error.prototype.message = "";

            /**
             * Error backtrace.
             * @member {string} backtrace
             * @memberof Buttplug.ServerMessage.Error
             * @instance
             */
            Error.prototype.backtrace = "";

            /**
             * Creates a new Error instance using the specified properties.
             * @function create
             * @memberof Buttplug.ServerMessage.Error
             * @static
             * @param {Buttplug.ServerMessage.IError=} [properties] Properties to set
             * @returns {Buttplug.ServerMessage.Error} Error instance
             */
            Error.create = function create(properties) {
                return new Error(properties);
            };

            /**
             * Encodes the specified Error message. Does not implicitly {@link Buttplug.ServerMessage.Error.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ServerMessage.Error
             * @static
             * @param {Buttplug.ServerMessage.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.errorType != null && Object.hasOwnProperty.call(message, "errorType"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.errorType);
                if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
                if (message.backtrace != null && Object.hasOwnProperty.call(message, "backtrace"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.backtrace);
                return writer;
            };

            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.Error.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ServerMessage.Error
             * @static
             * @param {Buttplug.ServerMessage.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Error message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ServerMessage.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ServerMessage.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ServerMessage.Error();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.errorType = reader.int32();
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
            };

            /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ServerMessage.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ServerMessage.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Error message.
             * @function verify
             * @memberof Buttplug.ServerMessage.Error
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Error.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.errorType != null && message.hasOwnProperty("errorType"))
                    switch (message.errorType) {
                    default:
                        return "errorType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    }
                if (message.message != null && message.hasOwnProperty("message"))
                    if (!$util.isString(message.message))
                        return "message: string expected";
                if (message.backtrace != null && message.hasOwnProperty("backtrace"))
                    if (!$util.isString(message.backtrace))
                        return "backtrace: string expected";
                return null;
            };

            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ServerMessage.Error
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ServerMessage.Error} Error
             */
            Error.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ServerMessage.Error)
                    return object;
                var message = new $root.Buttplug.ServerMessage.Error();
                switch (object.errorType) {
                case "ButtplugConnectorError":
                case 0:
                    message.errorType = 0;
                    break;
                case "ButtplugHandshakeError":
                case 1:
                    message.errorType = 1;
                    break;
                case "ButtplugDeviceError":
                case 2:
                    message.errorType = 2;
                    break;
                case "ButtplugPingError":
                case 3:
                    message.errorType = 3;
                    break;
                case "ButtplugMessageError":
                case 4:
                    message.errorType = 4;
                    break;
                case "ButtplugUnknownError":
                case 5:
                    message.errorType = 5;
                    break;
                }
                if (object.message != null)
                    message.message = String(object.message);
                if (object.backtrace != null)
                    message.backtrace = String(object.backtrace);
                return message;
            };

            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ServerMessage.Error
             * @static
             * @param {Buttplug.ServerMessage.Error} message Error
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Error.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.errorType = options.enums === String ? "ButtplugConnectorError" : 0;
                    object.message = "";
                    object.backtrace = "";
                }
                if (message.errorType != null && message.hasOwnProperty("errorType"))
                    object.errorType = options.enums === String ? $root.Buttplug.ServerMessage.ButtplugErrorType[message.errorType] : message.errorType;
                if (message.message != null && message.hasOwnProperty("message"))
                    object.message = message.message;
                if (message.backtrace != null && message.hasOwnProperty("backtrace"))
                    object.backtrace = message.backtrace;
                return object;
            };

            /**
             * Converts this Error to JSON.
             * @function toJSON
             * @memberof Buttplug.ServerMessage.Error
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Error.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Error;
        })();

        ServerMessage.ScanningFinished = (function() {

            /**
             * Properties of a ScanningFinished.
             * @memberof Buttplug.ServerMessage
             * @interface IScanningFinished
             */

            /**
             * Constructs a new ScanningFinished.
             * @memberof Buttplug.ServerMessage
             * @classdesc Represents a ScanningFinished.
             * @implements IScanningFinished
             * @constructor
             * @param {Buttplug.ServerMessage.IScanningFinished=} [properties] Properties to set
             */
            function ScanningFinished(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new ScanningFinished instance using the specified properties.
             * @function create
             * @memberof Buttplug.ServerMessage.ScanningFinished
             * @static
             * @param {Buttplug.ServerMessage.IScanningFinished=} [properties] Properties to set
             * @returns {Buttplug.ServerMessage.ScanningFinished} ScanningFinished instance
             */
            ScanningFinished.create = function create(properties) {
                return new ScanningFinished(properties);
            };

            /**
             * Encodes the specified ScanningFinished message. Does not implicitly {@link Buttplug.ServerMessage.ScanningFinished.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ServerMessage.ScanningFinished
             * @static
             * @param {Buttplug.ServerMessage.IScanningFinished} message ScanningFinished message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ScanningFinished.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified ScanningFinished message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.ScanningFinished.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ServerMessage.ScanningFinished
             * @static
             * @param {Buttplug.ServerMessage.IScanningFinished} message ScanningFinished message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ScanningFinished.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ScanningFinished message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ServerMessage.ScanningFinished
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ServerMessage.ScanningFinished} ScanningFinished
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ScanningFinished.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ServerMessage.ScanningFinished();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ScanningFinished message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ServerMessage.ScanningFinished
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ServerMessage.ScanningFinished} ScanningFinished
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ScanningFinished.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ScanningFinished message.
             * @function verify
             * @memberof Buttplug.ServerMessage.ScanningFinished
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ScanningFinished.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a ScanningFinished message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ServerMessage.ScanningFinished
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ServerMessage.ScanningFinished} ScanningFinished
             */
            ScanningFinished.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ServerMessage.ScanningFinished)
                    return object;
                return new $root.Buttplug.ServerMessage.ScanningFinished();
            };

            /**
             * Creates a plain object from a ScanningFinished message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ServerMessage.ScanningFinished
             * @static
             * @param {Buttplug.ServerMessage.ScanningFinished} message ScanningFinished
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ScanningFinished.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this ScanningFinished to JSON.
             * @function toJSON
             * @memberof Buttplug.ServerMessage.ScanningFinished
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ScanningFinished.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return ScanningFinished;
        })();

        ServerMessage.DeviceAdded = (function() {

            /**
             * Properties of a DeviceAdded.
             * @memberof Buttplug.ServerMessage
             * @interface IDeviceAdded
             * @property {string|null} [name] DeviceAdded name
             * @property {number|null} [index] DeviceAdded index
             * @property {Array.<Buttplug.ServerMessage.IMessageAttributes>|null} [messageAttributes] DeviceAdded messageAttributes
             */

            /**
             * Constructs a new DeviceAdded.
             * @memberof Buttplug.ServerMessage
             * @classdesc Represents a DeviceAdded.
             * @implements IDeviceAdded
             * @constructor
             * @param {Buttplug.ServerMessage.IDeviceAdded=} [properties] Properties to set
             */
            function DeviceAdded(properties) {
                this.messageAttributes = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DeviceAdded name.
             * @member {string} name
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @instance
             */
            DeviceAdded.prototype.name = "";

            /**
             * DeviceAdded index.
             * @member {number} index
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @instance
             */
            DeviceAdded.prototype.index = 0;

            /**
             * DeviceAdded messageAttributes.
             * @member {Array.<Buttplug.ServerMessage.IMessageAttributes>} messageAttributes
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @instance
             */
            DeviceAdded.prototype.messageAttributes = $util.emptyArray;

            /**
             * Creates a new DeviceAdded instance using the specified properties.
             * @function create
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @static
             * @param {Buttplug.ServerMessage.IDeviceAdded=} [properties] Properties to set
             * @returns {Buttplug.ServerMessage.DeviceAdded} DeviceAdded instance
             */
            DeviceAdded.create = function create(properties) {
                return new DeviceAdded(properties);
            };

            /**
             * Encodes the specified DeviceAdded message. Does not implicitly {@link Buttplug.ServerMessage.DeviceAdded.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @static
             * @param {Buttplug.ServerMessage.IDeviceAdded} message DeviceAdded message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeviceAdded.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.index);
                if (message.messageAttributes != null && message.messageAttributes.length)
                    for (var i = 0; i < message.messageAttributes.length; ++i)
                        $root.Buttplug.ServerMessage.MessageAttributes.encode(message.messageAttributes[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified DeviceAdded message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.DeviceAdded.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @static
             * @param {Buttplug.ServerMessage.IDeviceAdded} message DeviceAdded message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeviceAdded.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DeviceAdded message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ServerMessage.DeviceAdded} DeviceAdded
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeviceAdded.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ServerMessage.DeviceAdded();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.name = reader.string();
                        break;
                    case 2:
                        message.index = reader.uint32();
                        break;
                    case 3:
                        if (!(message.messageAttributes && message.messageAttributes.length))
                            message.messageAttributes = [];
                        message.messageAttributes.push($root.Buttplug.ServerMessage.MessageAttributes.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a DeviceAdded message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ServerMessage.DeviceAdded} DeviceAdded
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeviceAdded.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DeviceAdded message.
             * @function verify
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DeviceAdded.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.name != null && message.hasOwnProperty("name"))
                    if (!$util.isString(message.name))
                        return "name: string expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.messageAttributes != null && message.hasOwnProperty("messageAttributes")) {
                    if (!Array.isArray(message.messageAttributes))
                        return "messageAttributes: array expected";
                    for (var i = 0; i < message.messageAttributes.length; ++i) {
                        var error = $root.Buttplug.ServerMessage.MessageAttributes.verify(message.messageAttributes[i]);
                        if (error)
                            return "messageAttributes." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a DeviceAdded message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ServerMessage.DeviceAdded} DeviceAdded
             */
            DeviceAdded.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ServerMessage.DeviceAdded)
                    return object;
                var message = new $root.Buttplug.ServerMessage.DeviceAdded();
                if (object.name != null)
                    message.name = String(object.name);
                if (object.index != null)
                    message.index = object.index >>> 0;
                if (object.messageAttributes) {
                    if (!Array.isArray(object.messageAttributes))
                        throw TypeError(".Buttplug.ServerMessage.DeviceAdded.messageAttributes: array expected");
                    message.messageAttributes = [];
                    for (var i = 0; i < object.messageAttributes.length; ++i) {
                        if (typeof object.messageAttributes[i] !== "object")
                            throw TypeError(".Buttplug.ServerMessage.DeviceAdded.messageAttributes: object expected");
                        message.messageAttributes[i] = $root.Buttplug.ServerMessage.MessageAttributes.fromObject(object.messageAttributes[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a DeviceAdded message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @static
             * @param {Buttplug.ServerMessage.DeviceAdded} message DeviceAdded
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DeviceAdded.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.messageAttributes = [];
                if (options.defaults) {
                    object.name = "";
                    object.index = 0;
                }
                if (message.name != null && message.hasOwnProperty("name"))
                    object.name = message.name;
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.messageAttributes && message.messageAttributes.length) {
                    object.messageAttributes = [];
                    for (var j = 0; j < message.messageAttributes.length; ++j)
                        object.messageAttributes[j] = $root.Buttplug.ServerMessage.MessageAttributes.toObject(message.messageAttributes[j], options);
                }
                return object;
            };

            /**
             * Converts this DeviceAdded to JSON.
             * @function toJSON
             * @memberof Buttplug.ServerMessage.DeviceAdded
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DeviceAdded.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DeviceAdded;
        })();

        ServerMessage.DeviceRemoved = (function() {

            /**
             * Properties of a DeviceRemoved.
             * @memberof Buttplug.ServerMessage
             * @interface IDeviceRemoved
             * @property {number|null} [index] DeviceRemoved index
             */

            /**
             * Constructs a new DeviceRemoved.
             * @memberof Buttplug.ServerMessage
             * @classdesc Represents a DeviceRemoved.
             * @implements IDeviceRemoved
             * @constructor
             * @param {Buttplug.ServerMessage.IDeviceRemoved=} [properties] Properties to set
             */
            function DeviceRemoved(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * DeviceRemoved index.
             * @member {number} index
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @instance
             */
            DeviceRemoved.prototype.index = 0;

            /**
             * Creates a new DeviceRemoved instance using the specified properties.
             * @function create
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @static
             * @param {Buttplug.ServerMessage.IDeviceRemoved=} [properties] Properties to set
             * @returns {Buttplug.ServerMessage.DeviceRemoved} DeviceRemoved instance
             */
            DeviceRemoved.create = function create(properties) {
                return new DeviceRemoved(properties);
            };

            /**
             * Encodes the specified DeviceRemoved message. Does not implicitly {@link Buttplug.ServerMessage.DeviceRemoved.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @static
             * @param {Buttplug.ServerMessage.IDeviceRemoved} message DeviceRemoved message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeviceRemoved.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                return writer;
            };

            /**
             * Encodes the specified DeviceRemoved message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.DeviceRemoved.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @static
             * @param {Buttplug.ServerMessage.IDeviceRemoved} message DeviceRemoved message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            DeviceRemoved.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a DeviceRemoved message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ServerMessage.DeviceRemoved} DeviceRemoved
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeviceRemoved.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ServerMessage.DeviceRemoved();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
            };

            /**
             * Decodes a DeviceRemoved message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ServerMessage.DeviceRemoved} DeviceRemoved
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            DeviceRemoved.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a DeviceRemoved message.
             * @function verify
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            DeviceRemoved.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                return null;
            };

            /**
             * Creates a DeviceRemoved message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ServerMessage.DeviceRemoved} DeviceRemoved
             */
            DeviceRemoved.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ServerMessage.DeviceRemoved)
                    return object;
                var message = new $root.Buttplug.ServerMessage.DeviceRemoved();
                if (object.index != null)
                    message.index = object.index >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a DeviceRemoved message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @static
             * @param {Buttplug.ServerMessage.DeviceRemoved} message DeviceRemoved
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            DeviceRemoved.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.index = 0;
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                return object;
            };

            /**
             * Converts this DeviceRemoved to JSON.
             * @function toJSON
             * @memberof Buttplug.ServerMessage.DeviceRemoved
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            DeviceRemoved.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return DeviceRemoved;
        })();

        ServerMessage.Disconnect = (function() {

            /**
             * Properties of a Disconnect.
             * @memberof Buttplug.ServerMessage
             * @interface IDisconnect
             */

            /**
             * Constructs a new Disconnect.
             * @memberof Buttplug.ServerMessage
             * @classdesc Represents a Disconnect.
             * @implements IDisconnect
             * @constructor
             * @param {Buttplug.ServerMessage.IDisconnect=} [properties] Properties to set
             */
            function Disconnect(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Creates a new Disconnect instance using the specified properties.
             * @function create
             * @memberof Buttplug.ServerMessage.Disconnect
             * @static
             * @param {Buttplug.ServerMessage.IDisconnect=} [properties] Properties to set
             * @returns {Buttplug.ServerMessage.Disconnect} Disconnect instance
             */
            Disconnect.create = function create(properties) {
                return new Disconnect(properties);
            };

            /**
             * Encodes the specified Disconnect message. Does not implicitly {@link Buttplug.ServerMessage.Disconnect.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ServerMessage.Disconnect
             * @static
             * @param {Buttplug.ServerMessage.IDisconnect} message Disconnect message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Disconnect.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };

            /**
             * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.Disconnect.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ServerMessage.Disconnect
             * @static
             * @param {Buttplug.ServerMessage.IDisconnect} message Disconnect message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Disconnect.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Disconnect message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ServerMessage.Disconnect
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ServerMessage.Disconnect} Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Disconnect.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ServerMessage.Disconnect();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Disconnect message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ServerMessage.Disconnect
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ServerMessage.Disconnect} Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Disconnect.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Disconnect message.
             * @function verify
             * @memberof Buttplug.ServerMessage.Disconnect
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Disconnect.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };

            /**
             * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ServerMessage.Disconnect
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ServerMessage.Disconnect} Disconnect
             */
            Disconnect.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ServerMessage.Disconnect)
                    return object;
                return new $root.Buttplug.ServerMessage.Disconnect();
            };

            /**
             * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ServerMessage.Disconnect
             * @static
             * @param {Buttplug.ServerMessage.Disconnect} message Disconnect
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Disconnect.toObject = function toObject() {
                return {};
            };

            /**
             * Converts this Disconnect to JSON.
             * @function toJSON
             * @memberof Buttplug.ServerMessage.Disconnect
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Disconnect.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Disconnect;
        })();

        return ServerMessage;
    })();

    Buttplug.DeviceEvent = (function() {

        /**
         * Properties of a DeviceEvent.
         * @memberof Buttplug
         * @interface IDeviceEvent
         * @property {Buttplug.DeviceEvent.IDisconnect|null} [disconnect] DeviceEvent disconnect
         * @property {Buttplug.DeviceEvent.IBatteryLevelReading|null} [batteryLevelReading] DeviceEvent batteryLevelReading
         * @property {Buttplug.DeviceEvent.IRSSILevelReading|null} [rssiLevelReading] DeviceEvent rssiLevelReading
         * @property {Buttplug.DeviceEvent.IRawReading|null} [rawReading] DeviceEvent rawReading
         */

        /**
         * Constructs a new DeviceEvent.
         * @memberof Buttplug
         * @classdesc Represents a DeviceEvent.
         * @implements IDeviceEvent
         * @constructor
         * @param {Buttplug.IDeviceEvent=} [properties] Properties to set
         */
        function DeviceEvent(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * DeviceEvent disconnect.
         * @member {Buttplug.DeviceEvent.IDisconnect|null|undefined} disconnect
         * @memberof Buttplug.DeviceEvent
         * @instance
         */
        DeviceEvent.prototype.disconnect = null;

        /**
         * DeviceEvent batteryLevelReading.
         * @member {Buttplug.DeviceEvent.IBatteryLevelReading|null|undefined} batteryLevelReading
         * @memberof Buttplug.DeviceEvent
         * @instance
         */
        DeviceEvent.prototype.batteryLevelReading = null;

        /**
         * DeviceEvent rssiLevelReading.
         * @member {Buttplug.DeviceEvent.IRSSILevelReading|null|undefined} rssiLevelReading
         * @memberof Buttplug.DeviceEvent
         * @instance
         */
        DeviceEvent.prototype.rssiLevelReading = null;

        /**
         * DeviceEvent rawReading.
         * @member {Buttplug.DeviceEvent.IRawReading|null|undefined} rawReading
         * @memberof Buttplug.DeviceEvent
         * @instance
         */
        DeviceEvent.prototype.rawReading = null;

        // OneOf field names bound to virtual getters and setters
        var $oneOfFields;

        /**
         * DeviceEvent msg.
         * @member {"disconnect"|"batteryLevelReading"|"rssiLevelReading"|"rawReading"|undefined} msg
         * @memberof Buttplug.DeviceEvent
         * @instance
         */
        Object.defineProperty(DeviceEvent.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["disconnect", "batteryLevelReading", "rssiLevelReading", "rawReading"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new DeviceEvent instance using the specified properties.
         * @function create
         * @memberof Buttplug.DeviceEvent
         * @static
         * @param {Buttplug.IDeviceEvent=} [properties] Properties to set
         * @returns {Buttplug.DeviceEvent} DeviceEvent instance
         */
        DeviceEvent.create = function create(properties) {
            return new DeviceEvent(properties);
        };

        /**
         * Encodes the specified DeviceEvent message. Does not implicitly {@link Buttplug.DeviceEvent.verify|verify} messages.
         * @function encode
         * @memberof Buttplug.DeviceEvent
         * @static
         * @param {Buttplug.IDeviceEvent} message DeviceEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.disconnect != null && Object.hasOwnProperty.call(message, "disconnect"))
                $root.Buttplug.DeviceEvent.Disconnect.encode(message.disconnect, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.batteryLevelReading != null && Object.hasOwnProperty.call(message, "batteryLevelReading"))
                $root.Buttplug.DeviceEvent.BatteryLevelReading.encode(message.batteryLevelReading, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.rssiLevelReading != null && Object.hasOwnProperty.call(message, "rssiLevelReading"))
                $root.Buttplug.DeviceEvent.RSSILevelReading.encode(message.rssiLevelReading, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.rawReading != null && Object.hasOwnProperty.call(message, "rawReading"))
                $root.Buttplug.DeviceEvent.RawReading.encode(message.rawReading, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified DeviceEvent message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Buttplug.DeviceEvent
         * @static
         * @param {Buttplug.IDeviceEvent} message DeviceEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        DeviceEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a DeviceEvent message from the specified reader or buffer.
         * @function decode
         * @memberof Buttplug.DeviceEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Buttplug.DeviceEvent} DeviceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceEvent();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.disconnect = $root.Buttplug.DeviceEvent.Disconnect.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.batteryLevelReading = $root.Buttplug.DeviceEvent.BatteryLevelReading.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.rssiLevelReading = $root.Buttplug.DeviceEvent.RSSILevelReading.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.rawReading = $root.Buttplug.DeviceEvent.RawReading.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a DeviceEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Buttplug.DeviceEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Buttplug.DeviceEvent} DeviceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        DeviceEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a DeviceEvent message.
         * @function verify
         * @memberof Buttplug.DeviceEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        DeviceEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            var properties = {};
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                properties.msg = 1;
                {
                    var error = $root.Buttplug.DeviceEvent.Disconnect.verify(message.disconnect);
                    if (error)
                        return "disconnect." + error;
                }
            }
            if (message.batteryLevelReading != null && message.hasOwnProperty("batteryLevelReading")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    var error = $root.Buttplug.DeviceEvent.BatteryLevelReading.verify(message.batteryLevelReading);
                    if (error)
                        return "batteryLevelReading." + error;
                }
            }
            if (message.rssiLevelReading != null && message.hasOwnProperty("rssiLevelReading")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    var error = $root.Buttplug.DeviceEvent.RSSILevelReading.verify(message.rssiLevelReading);
                    if (error)
                        return "rssiLevelReading." + error;
                }
            }
            if (message.rawReading != null && message.hasOwnProperty("rawReading")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    var error = $root.Buttplug.DeviceEvent.RawReading.verify(message.rawReading);
                    if (error)
                        return "rawReading." + error;
                }
            }
            return null;
        };

        /**
         * Creates a DeviceEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Buttplug.DeviceEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Buttplug.DeviceEvent} DeviceEvent
         */
        DeviceEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.Buttplug.DeviceEvent)
                return object;
            var message = new $root.Buttplug.DeviceEvent();
            if (object.disconnect != null) {
                if (typeof object.disconnect !== "object")
                    throw TypeError(".Buttplug.DeviceEvent.disconnect: object expected");
                message.disconnect = $root.Buttplug.DeviceEvent.Disconnect.fromObject(object.disconnect);
            }
            if (object.batteryLevelReading != null) {
                if (typeof object.batteryLevelReading !== "object")
                    throw TypeError(".Buttplug.DeviceEvent.batteryLevelReading: object expected");
                message.batteryLevelReading = $root.Buttplug.DeviceEvent.BatteryLevelReading.fromObject(object.batteryLevelReading);
            }
            if (object.rssiLevelReading != null) {
                if (typeof object.rssiLevelReading !== "object")
                    throw TypeError(".Buttplug.DeviceEvent.rssiLevelReading: object expected");
                message.rssiLevelReading = $root.Buttplug.DeviceEvent.RSSILevelReading.fromObject(object.rssiLevelReading);
            }
            if (object.rawReading != null) {
                if (typeof object.rawReading !== "object")
                    throw TypeError(".Buttplug.DeviceEvent.rawReading: object expected");
                message.rawReading = $root.Buttplug.DeviceEvent.RawReading.fromObject(object.rawReading);
            }
            return message;
        };

        /**
         * Creates a plain object from a DeviceEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Buttplug.DeviceEvent
         * @static
         * @param {Buttplug.DeviceEvent} message DeviceEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        DeviceEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (message.disconnect != null && message.hasOwnProperty("disconnect")) {
                object.disconnect = $root.Buttplug.DeviceEvent.Disconnect.toObject(message.disconnect, options);
                if (options.oneofs)
                    object.msg = "disconnect";
            }
            if (message.batteryLevelReading != null && message.hasOwnProperty("batteryLevelReading")) {
                object.batteryLevelReading = $root.Buttplug.DeviceEvent.BatteryLevelReading.toObject(message.batteryLevelReading, options);
                if (options.oneofs)
                    object.msg = "batteryLevelReading";
            }
            if (message.rssiLevelReading != null && message.hasOwnProperty("rssiLevelReading")) {
                object.rssiLevelReading = $root.Buttplug.DeviceEvent.RSSILevelReading.toObject(message.rssiLevelReading, options);
                if (options.oneofs)
                    object.msg = "rssiLevelReading";
            }
            if (message.rawReading != null && message.hasOwnProperty("rawReading")) {
                object.rawReading = $root.Buttplug.DeviceEvent.RawReading.toObject(message.rawReading, options);
                if (options.oneofs)
                    object.msg = "rawReading";
            }
            return object;
        };

        /**
         * Converts this DeviceEvent to JSON.
         * @function toJSON
         * @memberof Buttplug.DeviceEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        DeviceEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        DeviceEvent.Disconnect = (function() {

            /**
             * Properties of a Disconnect.
             * @memberof Buttplug.DeviceEvent
             * @interface IDisconnect
             * @property {number|null} [index] Disconnect index
             */

            /**
             * Constructs a new Disconnect.
             * @memberof Buttplug.DeviceEvent
             * @classdesc Represents a Disconnect.
             * @implements IDisconnect
             * @constructor
             * @param {Buttplug.DeviceEvent.IDisconnect=} [properties] Properties to set
             */
            function Disconnect(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Disconnect index.
             * @member {number} index
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @instance
             */
            Disconnect.prototype.index = 0;

            /**
             * Creates a new Disconnect instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @static
             * @param {Buttplug.DeviceEvent.IDisconnect=} [properties] Properties to set
             * @returns {Buttplug.DeviceEvent.Disconnect} Disconnect instance
             */
            Disconnect.create = function create(properties) {
                return new Disconnect(properties);
            };

            /**
             * Encodes the specified Disconnect message. Does not implicitly {@link Buttplug.DeviceEvent.Disconnect.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @static
             * @param {Buttplug.DeviceEvent.IDisconnect} message Disconnect message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Disconnect.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                return writer;
            };

            /**
             * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.Disconnect.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @static
             * @param {Buttplug.DeviceEvent.IDisconnect} message Disconnect message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Disconnect.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Disconnect message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceEvent.Disconnect} Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Disconnect.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceEvent.Disconnect();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
            };

            /**
             * Decodes a Disconnect message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceEvent.Disconnect} Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Disconnect.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Disconnect message.
             * @function verify
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Disconnect.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                return null;
            };

            /**
             * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceEvent.Disconnect} Disconnect
             */
            Disconnect.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceEvent.Disconnect)
                    return object;
                var message = new $root.Buttplug.DeviceEvent.Disconnect();
                if (object.index != null)
                    message.index = object.index >>> 0;
                return message;
            };

            /**
             * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @static
             * @param {Buttplug.DeviceEvent.Disconnect} message Disconnect
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Disconnect.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.index = 0;
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                return object;
            };

            /**
             * Converts this Disconnect to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceEvent.Disconnect
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Disconnect.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return Disconnect;
        })();

        DeviceEvent.RawReading = (function() {

            /**
             * Properties of a RawReading.
             * @memberof Buttplug.DeviceEvent
             * @interface IRawReading
             * @property {number|null} [index] RawReading index
             * @property {Buttplug.Endpoint|null} [endpoint] RawReading endpoint
             * @property {Uint8Array|null} [data] RawReading data
             */

            /**
             * Constructs a new RawReading.
             * @memberof Buttplug.DeviceEvent
             * @classdesc Represents a RawReading.
             * @implements IRawReading
             * @constructor
             * @param {Buttplug.DeviceEvent.IRawReading=} [properties] Properties to set
             */
            function RawReading(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RawReading index.
             * @member {number} index
             * @memberof Buttplug.DeviceEvent.RawReading
             * @instance
             */
            RawReading.prototype.index = 0;

            /**
             * RawReading endpoint.
             * @member {Buttplug.Endpoint} endpoint
             * @memberof Buttplug.DeviceEvent.RawReading
             * @instance
             */
            RawReading.prototype.endpoint = 0;

            /**
             * RawReading data.
             * @member {Uint8Array} data
             * @memberof Buttplug.DeviceEvent.RawReading
             * @instance
             */
            RawReading.prototype.data = $util.newBuffer([]);

            /**
             * Creates a new RawReading instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceEvent.RawReading
             * @static
             * @param {Buttplug.DeviceEvent.IRawReading=} [properties] Properties to set
             * @returns {Buttplug.DeviceEvent.RawReading} RawReading instance
             */
            RawReading.create = function create(properties) {
                return new RawReading(properties);
            };

            /**
             * Encodes the specified RawReading message. Does not implicitly {@link Buttplug.DeviceEvent.RawReading.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceEvent.RawReading
             * @static
             * @param {Buttplug.DeviceEvent.IRawReading} message RawReading message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawReading.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                if (message.endpoint != null && Object.hasOwnProperty.call(message, "endpoint"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.endpoint);
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.data);
                return writer;
            };

            /**
             * Encodes the specified RawReading message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.RawReading.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceEvent.RawReading
             * @static
             * @param {Buttplug.DeviceEvent.IRawReading} message RawReading message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RawReading.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RawReading message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceEvent.RawReading
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceEvent.RawReading} RawReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawReading.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceEvent.RawReading();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.index = reader.uint32();
                        break;
                    case 2:
                        message.endpoint = reader.int32();
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
            };

            /**
             * Decodes a RawReading message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceEvent.RawReading
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceEvent.RawReading} RawReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RawReading.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RawReading message.
             * @function verify
             * @memberof Buttplug.DeviceEvent.RawReading
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RawReading.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    switch (message.endpoint) {
                    default:
                        return "endpoint: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14:
                    case 15:
                    case 16:
                    case 17:
                    case 18:
                    case 19:
                    case 20:
                    case 21:
                    case 22:
                    case 23:
                    case 24:
                    case 25:
                    case 26:
                    case 27:
                    case 28:
                    case 29:
                    case 30:
                    case 31:
                    case 32:
                    case 33:
                    case 34:
                    case 35:
                    case 36:
                    case 37:
                    case 38:
                    case 39:
                    case 40:
                    case 41:
                    case 42:
                    case 43:
                    case 44:
                        break;
                    }
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                return null;
            };

            /**
             * Creates a RawReading message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceEvent.RawReading
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceEvent.RawReading} RawReading
             */
            RawReading.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceEvent.RawReading)
                    return object;
                var message = new $root.Buttplug.DeviceEvent.RawReading();
                if (object.index != null)
                    message.index = object.index >>> 0;
                switch (object.endpoint) {
                case "Command":
                case 0:
                    message.endpoint = 0;
                    break;
                case "Firmware":
                case 1:
                    message.endpoint = 1;
                    break;
                case "Rx":
                case 2:
                    message.endpoint = 2;
                    break;
                case "RxAccel":
                case 3:
                    message.endpoint = 3;
                    break;
                case "RxBLEBattery":
                case 4:
                    message.endpoint = 4;
                    break;
                case "RxPressure":
                case 5:
                    message.endpoint = 5;
                    break;
                case "RxTouch":
                case 6:
                    message.endpoint = 6;
                    break;
                case "Tx":
                case 7:
                    message.endpoint = 7;
                    break;
                case "TxMode":
                case 8:
                    message.endpoint = 8;
                    break;
                case "TxShock":
                case 9:
                    message.endpoint = 9;
                    break;
                case "TxVibrate":
                case 10:
                    message.endpoint = 10;
                    break;
                case "TxVendorControl":
                case 11:
                    message.endpoint = 11;
                    break;
                case "Whitelist":
                case 12:
                    message.endpoint = 12;
                    break;
                case "Generic0":
                case 13:
                    message.endpoint = 13;
                    break;
                case "Generic1":
                case 14:
                    message.endpoint = 14;
                    break;
                case "Generic2":
                case 15:
                    message.endpoint = 15;
                    break;
                case "Generic3":
                case 16:
                    message.endpoint = 16;
                    break;
                case "Generic4":
                case 17:
                    message.endpoint = 17;
                    break;
                case "Generic5":
                case 18:
                    message.endpoint = 18;
                    break;
                case "Generic6":
                case 19:
                    message.endpoint = 19;
                    break;
                case "Generic7":
                case 20:
                    message.endpoint = 20;
                    break;
                case "Generic8":
                case 21:
                    message.endpoint = 21;
                    break;
                case "Generic9":
                case 22:
                    message.endpoint = 22;
                    break;
                case "Generic10":
                case 23:
                    message.endpoint = 23;
                    break;
                case "Generic11":
                case 24:
                    message.endpoint = 24;
                    break;
                case "Generic12":
                case 25:
                    message.endpoint = 25;
                    break;
                case "Generic13":
                case 26:
                    message.endpoint = 26;
                    break;
                case "Generic14":
                case 27:
                    message.endpoint = 27;
                    break;
                case "Generic15":
                case 28:
                    message.endpoint = 28;
                    break;
                case "Generic16":
                case 29:
                    message.endpoint = 29;
                    break;
                case "Generic17":
                case 30:
                    message.endpoint = 30;
                    break;
                case "Generic18":
                case 31:
                    message.endpoint = 31;
                    break;
                case "Generic19":
                case 32:
                    message.endpoint = 32;
                    break;
                case "Generic20":
                case 33:
                    message.endpoint = 33;
                    break;
                case "Generic21":
                case 34:
                    message.endpoint = 34;
                    break;
                case "Generic22":
                case 35:
                    message.endpoint = 35;
                    break;
                case "Generic23":
                case 36:
                    message.endpoint = 36;
                    break;
                case "Generic24":
                case 37:
                    message.endpoint = 37;
                    break;
                case "Generic25":
                case 38:
                    message.endpoint = 38;
                    break;
                case "Generic26":
                case 39:
                    message.endpoint = 39;
                    break;
                case "Generic27":
                case 40:
                    message.endpoint = 40;
                    break;
                case "Generic28":
                case 41:
                    message.endpoint = 41;
                    break;
                case "Generic29":
                case 42:
                    message.endpoint = 42;
                    break;
                case "Generic30":
                case 43:
                    message.endpoint = 43;
                    break;
                case "Generic31":
                case 44:
                    message.endpoint = 44;
                    break;
                }
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                return message;
            };

            /**
             * Creates a plain object from a RawReading message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceEvent.RawReading
             * @static
             * @param {Buttplug.DeviceEvent.RawReading} message RawReading
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RawReading.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.index = 0;
                    object.endpoint = options.enums === String ? "Command" : 0;
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                }
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.endpoint != null && message.hasOwnProperty("endpoint"))
                    object.endpoint = options.enums === String ? $root.Buttplug.Endpoint[message.endpoint] : message.endpoint;
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                return object;
            };

            /**
             * Converts this RawReading to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceEvent.RawReading
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RawReading.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RawReading;
        })();

        DeviceEvent.BatteryLevelReading = (function() {

            /**
             * Properties of a BatteryLevelReading.
             * @memberof Buttplug.DeviceEvent
             * @interface IBatteryLevelReading
             * @property {number|null} [index] BatteryLevelReading index
             * @property {number|null} [reading] BatteryLevelReading reading
             */

            /**
             * Constructs a new BatteryLevelReading.
             * @memberof Buttplug.DeviceEvent
             * @classdesc Represents a BatteryLevelReading.
             * @implements IBatteryLevelReading
             * @constructor
             * @param {Buttplug.DeviceEvent.IBatteryLevelReading=} [properties] Properties to set
             */
            function BatteryLevelReading(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BatteryLevelReading index.
             * @member {number} index
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @instance
             */
            BatteryLevelReading.prototype.index = 0;

            /**
             * BatteryLevelReading reading.
             * @member {number} reading
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @instance
             */
            BatteryLevelReading.prototype.reading = 0;

            /**
             * Creates a new BatteryLevelReading instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @static
             * @param {Buttplug.DeviceEvent.IBatteryLevelReading=} [properties] Properties to set
             * @returns {Buttplug.DeviceEvent.BatteryLevelReading} BatteryLevelReading instance
             */
            BatteryLevelReading.create = function create(properties) {
                return new BatteryLevelReading(properties);
            };

            /**
             * Encodes the specified BatteryLevelReading message. Does not implicitly {@link Buttplug.DeviceEvent.BatteryLevelReading.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @static
             * @param {Buttplug.DeviceEvent.IBatteryLevelReading} message BatteryLevelReading message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BatteryLevelReading.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                if (message.reading != null && Object.hasOwnProperty.call(message, "reading"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.reading);
                return writer;
            };

            /**
             * Encodes the specified BatteryLevelReading message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.BatteryLevelReading.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @static
             * @param {Buttplug.DeviceEvent.IBatteryLevelReading} message BatteryLevelReading message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BatteryLevelReading.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BatteryLevelReading message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceEvent.BatteryLevelReading} BatteryLevelReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BatteryLevelReading.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceEvent.BatteryLevelReading();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
            };

            /**
             * Decodes a BatteryLevelReading message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceEvent.BatteryLevelReading} BatteryLevelReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BatteryLevelReading.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BatteryLevelReading message.
             * @function verify
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BatteryLevelReading.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.reading != null && message.hasOwnProperty("reading"))
                    if (typeof message.reading !== "number")
                        return "reading: number expected";
                return null;
            };

            /**
             * Creates a BatteryLevelReading message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceEvent.BatteryLevelReading} BatteryLevelReading
             */
            BatteryLevelReading.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceEvent.BatteryLevelReading)
                    return object;
                var message = new $root.Buttplug.DeviceEvent.BatteryLevelReading();
                if (object.index != null)
                    message.index = object.index >>> 0;
                if (object.reading != null)
                    message.reading = Number(object.reading);
                return message;
            };

            /**
             * Creates a plain object from a BatteryLevelReading message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @static
             * @param {Buttplug.DeviceEvent.BatteryLevelReading} message BatteryLevelReading
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BatteryLevelReading.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.index = 0;
                    object.reading = 0;
                }
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.reading != null && message.hasOwnProperty("reading"))
                    object.reading = options.json && !isFinite(message.reading) ? String(message.reading) : message.reading;
                return object;
            };

            /**
             * Converts this BatteryLevelReading to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceEvent.BatteryLevelReading
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BatteryLevelReading.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return BatteryLevelReading;
        })();

        DeviceEvent.RSSILevelReading = (function() {

            /**
             * Properties of a RSSILevelReading.
             * @memberof Buttplug.DeviceEvent
             * @interface IRSSILevelReading
             * @property {number|null} [index] RSSILevelReading index
             * @property {number|null} [reading] RSSILevelReading reading
             */

            /**
             * Constructs a new RSSILevelReading.
             * @memberof Buttplug.DeviceEvent
             * @classdesc Represents a RSSILevelReading.
             * @implements IRSSILevelReading
             * @constructor
             * @param {Buttplug.DeviceEvent.IRSSILevelReading=} [properties] Properties to set
             */
            function RSSILevelReading(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * RSSILevelReading index.
             * @member {number} index
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @instance
             */
            RSSILevelReading.prototype.index = 0;

            /**
             * RSSILevelReading reading.
             * @member {number} reading
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @instance
             */
            RSSILevelReading.prototype.reading = 0;

            /**
             * Creates a new RSSILevelReading instance using the specified properties.
             * @function create
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @static
             * @param {Buttplug.DeviceEvent.IRSSILevelReading=} [properties] Properties to set
             * @returns {Buttplug.DeviceEvent.RSSILevelReading} RSSILevelReading instance
             */
            RSSILevelReading.create = function create(properties) {
                return new RSSILevelReading(properties);
            };

            /**
             * Encodes the specified RSSILevelReading message. Does not implicitly {@link Buttplug.DeviceEvent.RSSILevelReading.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @static
             * @param {Buttplug.DeviceEvent.IRSSILevelReading} message RSSILevelReading message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RSSILevelReading.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.index != null && Object.hasOwnProperty.call(message, "index"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.index);
                if (message.reading != null && Object.hasOwnProperty.call(message, "reading"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.reading);
                return writer;
            };

            /**
             * Encodes the specified RSSILevelReading message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.RSSILevelReading.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @static
             * @param {Buttplug.DeviceEvent.IRSSILevelReading} message RSSILevelReading message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RSSILevelReading.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a RSSILevelReading message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.DeviceEvent.RSSILevelReading} RSSILevelReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RSSILevelReading.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.DeviceEvent.RSSILevelReading();
                while (reader.pos < end) {
                    var tag = reader.uint32();
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
            };

            /**
             * Decodes a RSSILevelReading message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.DeviceEvent.RSSILevelReading} RSSILevelReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RSSILevelReading.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a RSSILevelReading message.
             * @function verify
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RSSILevelReading.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.index != null && message.hasOwnProperty("index"))
                    if (!$util.isInteger(message.index))
                        return "index: integer expected";
                if (message.reading != null && message.hasOwnProperty("reading"))
                    if (!$util.isInteger(message.reading))
                        return "reading: integer expected";
                return null;
            };

            /**
             * Creates a RSSILevelReading message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.DeviceEvent.RSSILevelReading} RSSILevelReading
             */
            RSSILevelReading.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.DeviceEvent.RSSILevelReading)
                    return object;
                var message = new $root.Buttplug.DeviceEvent.RSSILevelReading();
                if (object.index != null)
                    message.index = object.index >>> 0;
                if (object.reading != null)
                    message.reading = object.reading | 0;
                return message;
            };

            /**
             * Creates a plain object from a RSSILevelReading message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @static
             * @param {Buttplug.DeviceEvent.RSSILevelReading} message RSSILevelReading
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RSSILevelReading.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.index = 0;
                    object.reading = 0;
                }
                if (message.index != null && message.hasOwnProperty("index"))
                    object.index = message.index;
                if (message.reading != null && message.hasOwnProperty("reading"))
                    object.reading = message.reading;
                return object;
            };

            /**
             * Converts this RSSILevelReading to JSON.
             * @function toJSON
             * @memberof Buttplug.DeviceEvent.RSSILevelReading
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RSSILevelReading.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return RSSILevelReading;
        })();

        return DeviceEvent;
    })();

    Buttplug.ButtplugFFIServerMessage = (function() {

        /**
         * Properties of a ButtplugFFIServerMessage.
         * @memberof Buttplug
         * @interface IButtplugFFIServerMessage
         * @property {number|null} [id] ButtplugFFIServerMessage id
         * @property {Buttplug.ButtplugFFIServerMessage.IFFIMessage|null} [message] ButtplugFFIServerMessage message
         */

        /**
         * Constructs a new ButtplugFFIServerMessage.
         * @memberof Buttplug
         * @classdesc Represents a ButtplugFFIServerMessage.
         * @implements IButtplugFFIServerMessage
         * @constructor
         * @param {Buttplug.IButtplugFFIServerMessage=} [properties] Properties to set
         */
        function ButtplugFFIServerMessage(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ButtplugFFIServerMessage id.
         * @member {number} id
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @instance
         */
        ButtplugFFIServerMessage.prototype.id = 0;

        /**
         * ButtplugFFIServerMessage message.
         * @member {Buttplug.ButtplugFFIServerMessage.IFFIMessage|null|undefined} message
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @instance
         */
        ButtplugFFIServerMessage.prototype.message = null;

        /**
         * Creates a new ButtplugFFIServerMessage instance using the specified properties.
         * @function create
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @static
         * @param {Buttplug.IButtplugFFIServerMessage=} [properties] Properties to set
         * @returns {Buttplug.ButtplugFFIServerMessage} ButtplugFFIServerMessage instance
         */
        ButtplugFFIServerMessage.create = function create(properties) {
            return new ButtplugFFIServerMessage(properties);
        };

        /**
         * Encodes the specified ButtplugFFIServerMessage message. Does not implicitly {@link Buttplug.ButtplugFFIServerMessage.verify|verify} messages.
         * @function encode
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @static
         * @param {Buttplug.IButtplugFFIServerMessage} message ButtplugFFIServerMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ButtplugFFIServerMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.message != null && Object.hasOwnProperty.call(message, "message"))
                $root.Buttplug.ButtplugFFIServerMessage.FFIMessage.encode(message.message, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ButtplugFFIServerMessage message, length delimited. Does not implicitly {@link Buttplug.ButtplugFFIServerMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @static
         * @param {Buttplug.IButtplugFFIServerMessage} message ButtplugFFIServerMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ButtplugFFIServerMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ButtplugFFIServerMessage message from the specified reader or buffer.
         * @function decode
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Buttplug.ButtplugFFIServerMessage} ButtplugFFIServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ButtplugFFIServerMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ButtplugFFIServerMessage();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.message = $root.Buttplug.ButtplugFFIServerMessage.FFIMessage.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ButtplugFFIServerMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Buttplug.ButtplugFFIServerMessage} ButtplugFFIServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ButtplugFFIServerMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ButtplugFFIServerMessage message.
         * @function verify
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ButtplugFFIServerMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.message != null && message.hasOwnProperty("message")) {
                var error = $root.Buttplug.ButtplugFFIServerMessage.FFIMessage.verify(message.message);
                if (error)
                    return "message." + error;
            }
            return null;
        };

        /**
         * Creates a ButtplugFFIServerMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Buttplug.ButtplugFFIServerMessage} ButtplugFFIServerMessage
         */
        ButtplugFFIServerMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.Buttplug.ButtplugFFIServerMessage)
                return object;
            var message = new $root.Buttplug.ButtplugFFIServerMessage();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.message != null) {
                if (typeof object.message !== "object")
                    throw TypeError(".Buttplug.ButtplugFFIServerMessage.message: object expected");
                message.message = $root.Buttplug.ButtplugFFIServerMessage.FFIMessage.fromObject(object.message);
            }
            return message;
        };

        /**
         * Creates a plain object from a ButtplugFFIServerMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @static
         * @param {Buttplug.ButtplugFFIServerMessage} message ButtplugFFIServerMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ButtplugFFIServerMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.message = null;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = $root.Buttplug.ButtplugFFIServerMessage.FFIMessage.toObject(message.message, options);
            return object;
        };

        /**
         * Converts this ButtplugFFIServerMessage to JSON.
         * @function toJSON
         * @memberof Buttplug.ButtplugFFIServerMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ButtplugFFIServerMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        ButtplugFFIServerMessage.FFIMessage = (function() {

            /**
             * Properties of a FFIMessage.
             * @memberof Buttplug.ButtplugFFIServerMessage
             * @interface IFFIMessage
             * @property {Buttplug.IServerMessage|null} [serverMessage] FFIMessage serverMessage
             * @property {Buttplug.IDeviceEvent|null} [deviceEvent] FFIMessage deviceEvent
             */

            /**
             * Constructs a new FFIMessage.
             * @memberof Buttplug.ButtplugFFIServerMessage
             * @classdesc Represents a FFIMessage.
             * @implements IFFIMessage
             * @constructor
             * @param {Buttplug.ButtplugFFIServerMessage.IFFIMessage=} [properties] Properties to set
             */
            function FFIMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * FFIMessage serverMessage.
             * @member {Buttplug.IServerMessage|null|undefined} serverMessage
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.serverMessage = null;

            /**
             * FFIMessage deviceEvent.
             * @member {Buttplug.IDeviceEvent|null|undefined} deviceEvent
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @instance
             */
            FFIMessage.prototype.deviceEvent = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * FFIMessage msg.
             * @member {"serverMessage"|"deviceEvent"|undefined} msg
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @instance
             */
            Object.defineProperty(FFIMessage.prototype, "msg", {
                get: $util.oneOfGetter($oneOfFields = ["serverMessage", "deviceEvent"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new FFIMessage instance using the specified properties.
             * @function create
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @static
             * @param {Buttplug.ButtplugFFIServerMessage.IFFIMessage=} [properties] Properties to set
             * @returns {Buttplug.ButtplugFFIServerMessage.FFIMessage} FFIMessage instance
             */
            FFIMessage.create = function create(properties) {
                return new FFIMessage(properties);
            };

            /**
             * Encodes the specified FFIMessage message. Does not implicitly {@link Buttplug.ButtplugFFIServerMessage.FFIMessage.verify|verify} messages.
             * @function encode
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @static
             * @param {Buttplug.ButtplugFFIServerMessage.IFFIMessage} message FFIMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FFIMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.serverMessage != null && Object.hasOwnProperty.call(message, "serverMessage"))
                    $root.Buttplug.ServerMessage.encode(message.serverMessage, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                if (message.deviceEvent != null && Object.hasOwnProperty.call(message, "deviceEvent"))
                    $root.Buttplug.DeviceEvent.encode(message.deviceEvent, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified FFIMessage message, length delimited. Does not implicitly {@link Buttplug.ButtplugFFIServerMessage.FFIMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @static
             * @param {Buttplug.ButtplugFFIServerMessage.IFFIMessage} message FFIMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            FFIMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a FFIMessage message from the specified reader or buffer.
             * @function decode
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {Buttplug.ButtplugFFIServerMessage.FFIMessage} FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FFIMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Buttplug.ButtplugFFIServerMessage.FFIMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.serverMessage = $root.Buttplug.ServerMessage.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.deviceEvent = $root.Buttplug.DeviceEvent.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a FFIMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {Buttplug.ButtplugFFIServerMessage.FFIMessage} FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            FFIMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a FFIMessage message.
             * @function verify
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            FFIMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.serverMessage != null && message.hasOwnProperty("serverMessage")) {
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.ServerMessage.verify(message.serverMessage);
                        if (error)
                            return "serverMessage." + error;
                    }
                }
                if (message.deviceEvent != null && message.hasOwnProperty("deviceEvent")) {
                    if (properties.msg === 1)
                        return "msg: multiple values";
                    properties.msg = 1;
                    {
                        var error = $root.Buttplug.DeviceEvent.verify(message.deviceEvent);
                        if (error)
                            return "deviceEvent." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a FFIMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {Buttplug.ButtplugFFIServerMessage.FFIMessage} FFIMessage
             */
            FFIMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.Buttplug.ButtplugFFIServerMessage.FFIMessage)
                    return object;
                var message = new $root.Buttplug.ButtplugFFIServerMessage.FFIMessage();
                if (object.serverMessage != null) {
                    if (typeof object.serverMessage !== "object")
                        throw TypeError(".Buttplug.ButtplugFFIServerMessage.FFIMessage.serverMessage: object expected");
                    message.serverMessage = $root.Buttplug.ServerMessage.fromObject(object.serverMessage);
                }
                if (object.deviceEvent != null) {
                    if (typeof object.deviceEvent !== "object")
                        throw TypeError(".Buttplug.ButtplugFFIServerMessage.FFIMessage.deviceEvent: object expected");
                    message.deviceEvent = $root.Buttplug.DeviceEvent.fromObject(object.deviceEvent);
                }
                return message;
            };

            /**
             * Creates a plain object from a FFIMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @static
             * @param {Buttplug.ButtplugFFIServerMessage.FFIMessage} message FFIMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            FFIMessage.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.serverMessage != null && message.hasOwnProperty("serverMessage")) {
                    object.serverMessage = $root.Buttplug.ServerMessage.toObject(message.serverMessage, options);
                    if (options.oneofs)
                        object.msg = "serverMessage";
                }
                if (message.deviceEvent != null && message.hasOwnProperty("deviceEvent")) {
                    object.deviceEvent = $root.Buttplug.DeviceEvent.toObject(message.deviceEvent, options);
                    if (options.oneofs)
                        object.msg = "deviceEvent";
                }
                return object;
            };

            /**
             * Converts this FFIMessage to JSON.
             * @function toJSON
             * @memberof Buttplug.ButtplugFFIServerMessage.FFIMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            FFIMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return FFIMessage;
        })();

        return ButtplugFFIServerMessage;
    })();

    return Buttplug;
})();

module.exports = $root;
