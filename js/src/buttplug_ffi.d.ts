import * as $protobuf from "protobufjs";
/** Namespace Buttplug. */
export namespace Buttplug {

    /** Endpoint enum. */
    enum Endpoint {
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
        RxBLEModel = 45
    }

    /** Properties of a ClientMessage. */
    interface IClientMessage {

        /** ClientMessage id */
        id?: (number|null);

        /** ClientMessage message */
        message?: (Buttplug.ClientMessage.IFFIMessage|null);
    }

    /** Represents a ClientMessage. */
    class ClientMessage implements IClientMessage {

        /**
         * Constructs a new ClientMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: Buttplug.IClientMessage);

        /** ClientMessage id. */
        public id: number;

        /** ClientMessage message. */
        public message?: (Buttplug.ClientMessage.IFFIMessage|null);

        /**
         * Creates a new ClientMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientMessage instance
         */
        public static create(properties?: Buttplug.IClientMessage): Buttplug.ClientMessage;

        /**
         * Encodes the specified ClientMessage message. Does not implicitly {@link Buttplug.ClientMessage.verify|verify} messages.
         * @param message ClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Buttplug.IClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientMessage message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.verify|verify} messages.
         * @param message ClientMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Buttplug.IClientMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ClientMessage;

        /**
         * Decodes a ClientMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ClientMessage;

        /**
         * Verifies a ClientMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientMessage
         */
        public static fromObject(object: { [k: string]: any }): Buttplug.ClientMessage;

        /**
         * Creates a plain object from a ClientMessage message. Also converts values to other types if specified.
         * @param message ClientMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Buttplug.ClientMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ClientMessage {

        /** DeviceCommunicationManagerTypes enum. */
        enum DeviceCommunicationManagerTypes {
            All = 0,
            Btleplug = 1,
            XInput = 2,
            SerialPort = 4,
            LovenseHIDDongle = 8,
            LovenseSerialDongle = 16
        }

        /** Properties of a ConnectLocal. */
        interface IConnectLocal {

            /** ConnectLocal serverName */
            serverName?: (string|null);

            /** ConnectLocal maxPingTime */
            maxPingTime?: (number|null);

            /** ConnectLocal allowRawMessages */
            allowRawMessages?: (boolean|null);

            /** ConnectLocal deviceConfigurationJson */
            deviceConfigurationJson?: (string|null);

            /** ConnectLocal userDeviceConfigurationJson */
            userDeviceConfigurationJson?: (string|null);

            /** ConnectLocal commManagerTypes */
            commManagerTypes?: (number|null);
        }

        /** Represents a ConnectLocal. */
        class ConnectLocal implements IConnectLocal {

            /**
             * Constructs a new ConnectLocal.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ClientMessage.IConnectLocal);

            /** ConnectLocal serverName. */
            public serverName: string;

            /** ConnectLocal maxPingTime. */
            public maxPingTime: number;

            /** ConnectLocal allowRawMessages. */
            public allowRawMessages: boolean;

            /** ConnectLocal deviceConfigurationJson. */
            public deviceConfigurationJson: string;

            /** ConnectLocal userDeviceConfigurationJson. */
            public userDeviceConfigurationJson: string;

            /** ConnectLocal commManagerTypes. */
            public commManagerTypes: number;

            /**
             * Creates a new ConnectLocal instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConnectLocal instance
             */
            public static create(properties?: Buttplug.ClientMessage.IConnectLocal): Buttplug.ClientMessage.ConnectLocal;

            /**
             * Encodes the specified ConnectLocal message. Does not implicitly {@link Buttplug.ClientMessage.ConnectLocal.verify|verify} messages.
             * @param message ConnectLocal message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ClientMessage.IConnectLocal, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConnectLocal message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.ConnectLocal.verify|verify} messages.
             * @param message ConnectLocal message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ClientMessage.IConnectLocal, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConnectLocal message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConnectLocal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ClientMessage.ConnectLocal;

            /**
             * Decodes a ConnectLocal message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConnectLocal
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ClientMessage.ConnectLocal;

            /**
             * Verifies a ConnectLocal message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConnectLocal message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConnectLocal
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ClientMessage.ConnectLocal;

            /**
             * Creates a plain object from a ConnectLocal message. Also converts values to other types if specified.
             * @param message ConnectLocal
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ClientMessage.ConnectLocal, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConnectLocal to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ConnectWebsocket. */
        interface IConnectWebsocket {

            /** ConnectWebsocket address */
            address?: (string|null);

            /** ConnectWebsocket bypassCertVerification */
            bypassCertVerification?: (boolean|null);
        }

        /** Represents a ConnectWebsocket. */
        class ConnectWebsocket implements IConnectWebsocket {

            /**
             * Constructs a new ConnectWebsocket.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ClientMessage.IConnectWebsocket);

            /** ConnectWebsocket address. */
            public address: string;

            /** ConnectWebsocket bypassCertVerification. */
            public bypassCertVerification: boolean;

            /**
             * Creates a new ConnectWebsocket instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ConnectWebsocket instance
             */
            public static create(properties?: Buttplug.ClientMessage.IConnectWebsocket): Buttplug.ClientMessage.ConnectWebsocket;

            /**
             * Encodes the specified ConnectWebsocket message. Does not implicitly {@link Buttplug.ClientMessage.ConnectWebsocket.verify|verify} messages.
             * @param message ConnectWebsocket message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ClientMessage.IConnectWebsocket, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ConnectWebsocket message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.ConnectWebsocket.verify|verify} messages.
             * @param message ConnectWebsocket message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ClientMessage.IConnectWebsocket, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ConnectWebsocket message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ConnectWebsocket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ClientMessage.ConnectWebsocket;

            /**
             * Decodes a ConnectWebsocket message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ConnectWebsocket
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ClientMessage.ConnectWebsocket;

            /**
             * Verifies a ConnectWebsocket message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ConnectWebsocket message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ConnectWebsocket
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ClientMessage.ConnectWebsocket;

            /**
             * Creates a plain object from a ConnectWebsocket message. Also converts values to other types if specified.
             * @param message ConnectWebsocket
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ClientMessage.ConnectWebsocket, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ConnectWebsocket to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a StartScanning. */
        interface IStartScanning {
        }

        /** Represents a StartScanning. */
        class StartScanning implements IStartScanning {

            /**
             * Constructs a new StartScanning.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ClientMessage.IStartScanning);

            /**
             * Creates a new StartScanning instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StartScanning instance
             */
            public static create(properties?: Buttplug.ClientMessage.IStartScanning): Buttplug.ClientMessage.StartScanning;

            /**
             * Encodes the specified StartScanning message. Does not implicitly {@link Buttplug.ClientMessage.StartScanning.verify|verify} messages.
             * @param message StartScanning message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ClientMessage.IStartScanning, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StartScanning message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.StartScanning.verify|verify} messages.
             * @param message StartScanning message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ClientMessage.IStartScanning, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StartScanning message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StartScanning
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ClientMessage.StartScanning;

            /**
             * Decodes a StartScanning message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StartScanning
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ClientMessage.StartScanning;

            /**
             * Verifies a StartScanning message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StartScanning message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StartScanning
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ClientMessage.StartScanning;

            /**
             * Creates a plain object from a StartScanning message. Also converts values to other types if specified.
             * @param message StartScanning
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ClientMessage.StartScanning, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StartScanning to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a StopScanning. */
        interface IStopScanning {
        }

        /** Represents a StopScanning. */
        class StopScanning implements IStopScanning {

            /**
             * Constructs a new StopScanning.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ClientMessage.IStopScanning);

            /**
             * Creates a new StopScanning instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StopScanning instance
             */
            public static create(properties?: Buttplug.ClientMessage.IStopScanning): Buttplug.ClientMessage.StopScanning;

            /**
             * Encodes the specified StopScanning message. Does not implicitly {@link Buttplug.ClientMessage.StopScanning.verify|verify} messages.
             * @param message StopScanning message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ClientMessage.IStopScanning, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StopScanning message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.StopScanning.verify|verify} messages.
             * @param message StopScanning message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ClientMessage.IStopScanning, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StopScanning message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StopScanning
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ClientMessage.StopScanning;

            /**
             * Decodes a StopScanning message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StopScanning
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ClientMessage.StopScanning;

            /**
             * Verifies a StopScanning message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StopScanning message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StopScanning
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ClientMessage.StopScanning;

            /**
             * Creates a plain object from a StopScanning message. Also converts values to other types if specified.
             * @param message StopScanning
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ClientMessage.StopScanning, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StopScanning to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a StopAllDevices. */
        interface IStopAllDevices {
        }

        /** Represents a StopAllDevices. */
        class StopAllDevices implements IStopAllDevices {

            /**
             * Constructs a new StopAllDevices.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ClientMessage.IStopAllDevices);

            /**
             * Creates a new StopAllDevices instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StopAllDevices instance
             */
            public static create(properties?: Buttplug.ClientMessage.IStopAllDevices): Buttplug.ClientMessage.StopAllDevices;

            /**
             * Encodes the specified StopAllDevices message. Does not implicitly {@link Buttplug.ClientMessage.StopAllDevices.verify|verify} messages.
             * @param message StopAllDevices message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ClientMessage.IStopAllDevices, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StopAllDevices message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.StopAllDevices.verify|verify} messages.
             * @param message StopAllDevices message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ClientMessage.IStopAllDevices, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StopAllDevices message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StopAllDevices
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ClientMessage.StopAllDevices;

            /**
             * Decodes a StopAllDevices message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StopAllDevices
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ClientMessage.StopAllDevices;

            /**
             * Verifies a StopAllDevices message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StopAllDevices message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StopAllDevices
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ClientMessage.StopAllDevices;

            /**
             * Creates a plain object from a StopAllDevices message. Also converts values to other types if specified.
             * @param message StopAllDevices
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ClientMessage.StopAllDevices, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StopAllDevices to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Disconnect. */
        interface IDisconnect {
        }

        /** Represents a Disconnect. */
        class Disconnect implements IDisconnect {

            /**
             * Constructs a new Disconnect.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ClientMessage.IDisconnect);

            /**
             * Creates a new Disconnect instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Disconnect instance
             */
            public static create(properties?: Buttplug.ClientMessage.IDisconnect): Buttplug.ClientMessage.Disconnect;

            /**
             * Encodes the specified Disconnect message. Does not implicitly {@link Buttplug.ClientMessage.Disconnect.verify|verify} messages.
             * @param message Disconnect message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ClientMessage.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.Disconnect.verify|verify} messages.
             * @param message Disconnect message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ClientMessage.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Disconnect message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ClientMessage.Disconnect;

            /**
             * Decodes a Disconnect message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ClientMessage.Disconnect;

            /**
             * Verifies a Disconnect message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Disconnect
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ClientMessage.Disconnect;

            /**
             * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
             * @param message Disconnect
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ClientMessage.Disconnect, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Disconnect to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Ping. */
        interface IPing {
        }

        /** Represents a Ping. */
        class Ping implements IPing {

            /**
             * Constructs a new Ping.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ClientMessage.IPing);

            /**
             * Creates a new Ping instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Ping instance
             */
            public static create(properties?: Buttplug.ClientMessage.IPing): Buttplug.ClientMessage.Ping;

            /**
             * Encodes the specified Ping message. Does not implicitly {@link Buttplug.ClientMessage.Ping.verify|verify} messages.
             * @param message Ping message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ClientMessage.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Ping message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.Ping.verify|verify} messages.
             * @param message Ping message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ClientMessage.IPing, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Ping message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Ping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ClientMessage.Ping;

            /**
             * Decodes a Ping message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Ping
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ClientMessage.Ping;

            /**
             * Verifies a Ping message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Ping message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Ping
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ClientMessage.Ping;

            /**
             * Creates a plain object from a Ping message. Also converts values to other types if specified.
             * @param message Ping
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ClientMessage.Ping, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Ping to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FFIMessage. */
        interface IFFIMessage {

            /** FFIMessage connectLocal */
            connectLocal?: (Buttplug.ClientMessage.IConnectLocal|null);

            /** FFIMessage connectWebsocket */
            connectWebsocket?: (Buttplug.ClientMessage.IConnectWebsocket|null);

            /** FFIMessage startScanning */
            startScanning?: (Buttplug.ClientMessage.IStartScanning|null);

            /** FFIMessage stopScanning */
            stopScanning?: (Buttplug.ClientMessage.IStopScanning|null);

            /** FFIMessage stopAllDevices */
            stopAllDevices?: (Buttplug.ClientMessage.IStopAllDevices|null);

            /** FFIMessage disconnect */
            disconnect?: (Buttplug.ClientMessage.IDisconnect|null);

            /** FFIMessage ping */
            ping?: (Buttplug.ClientMessage.IPing|null);
        }

        /** Represents a FFIMessage. */
        class FFIMessage implements IFFIMessage {

            /**
             * Constructs a new FFIMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ClientMessage.IFFIMessage);

            /** FFIMessage connectLocal. */
            public connectLocal?: (Buttplug.ClientMessage.IConnectLocal|null);

            /** FFIMessage connectWebsocket. */
            public connectWebsocket?: (Buttplug.ClientMessage.IConnectWebsocket|null);

            /** FFIMessage startScanning. */
            public startScanning?: (Buttplug.ClientMessage.IStartScanning|null);

            /** FFIMessage stopScanning. */
            public stopScanning?: (Buttplug.ClientMessage.IStopScanning|null);

            /** FFIMessage stopAllDevices. */
            public stopAllDevices?: (Buttplug.ClientMessage.IStopAllDevices|null);

            /** FFIMessage disconnect. */
            public disconnect?: (Buttplug.ClientMessage.IDisconnect|null);

            /** FFIMessage ping. */
            public ping?: (Buttplug.ClientMessage.IPing|null);

            /** FFIMessage msg. */
            public msg?: ("connectLocal"|"connectWebsocket"|"startScanning"|"stopScanning"|"stopAllDevices"|"disconnect"|"ping");

            /**
             * Creates a new FFIMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FFIMessage instance
             */
            public static create(properties?: Buttplug.ClientMessage.IFFIMessage): Buttplug.ClientMessage.FFIMessage;

            /**
             * Encodes the specified FFIMessage message. Does not implicitly {@link Buttplug.ClientMessage.FFIMessage.verify|verify} messages.
             * @param message FFIMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ClientMessage.IFFIMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FFIMessage message, length delimited. Does not implicitly {@link Buttplug.ClientMessage.FFIMessage.verify|verify} messages.
             * @param message FFIMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ClientMessage.IFFIMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FFIMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ClientMessage.FFIMessage;

            /**
             * Decodes a FFIMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ClientMessage.FFIMessage;

            /**
             * Verifies a FFIMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FFIMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FFIMessage
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ClientMessage.FFIMessage;

            /**
             * Creates a plain object from a FFIMessage message. Also converts values to other types if specified.
             * @param message FFIMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ClientMessage.FFIMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FFIMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a DeviceMessage. */
    interface IDeviceMessage {

        /** DeviceMessage id */
        id?: (number|null);

        /** DeviceMessage index */
        index?: (number|null);

        /** DeviceMessage message */
        message?: (Buttplug.DeviceMessage.IFFIMessage|null);
    }

    /** Represents a DeviceMessage. */
    class DeviceMessage implements IDeviceMessage {

        /**
         * Constructs a new DeviceMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: Buttplug.IDeviceMessage);

        /** DeviceMessage id. */
        public id: number;

        /** DeviceMessage index. */
        public index: number;

        /** DeviceMessage message. */
        public message?: (Buttplug.DeviceMessage.IFFIMessage|null);

        /**
         * Creates a new DeviceMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeviceMessage instance
         */
        public static create(properties?: Buttplug.IDeviceMessage): Buttplug.DeviceMessage;

        /**
         * Encodes the specified DeviceMessage message. Does not implicitly {@link Buttplug.DeviceMessage.verify|verify} messages.
         * @param message DeviceMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Buttplug.IDeviceMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeviceMessage message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.verify|verify} messages.
         * @param message DeviceMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Buttplug.IDeviceMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeviceMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeviceMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage;

        /**
         * Decodes a DeviceMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeviceMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage;

        /**
         * Verifies a DeviceMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeviceMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeviceMessage
         */
        public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage;

        /**
         * Creates a plain object from a DeviceMessage message. Also converts values to other types if specified.
         * @param message DeviceMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Buttplug.DeviceMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeviceMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace DeviceMessage {

        /** Properties of a VibrateComponent. */
        interface IVibrateComponent {

            /** VibrateComponent index */
            index?: (number|null);

            /** VibrateComponent speed */
            speed?: (number|null);
        }

        /** Represents a VibrateComponent. */
        class VibrateComponent implements IVibrateComponent {

            /**
             * Constructs a new VibrateComponent.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IVibrateComponent);

            /** VibrateComponent index. */
            public index: number;

            /** VibrateComponent speed. */
            public speed: number;

            /**
             * Creates a new VibrateComponent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VibrateComponent instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IVibrateComponent): Buttplug.DeviceMessage.VibrateComponent;

            /**
             * Encodes the specified VibrateComponent message. Does not implicitly {@link Buttplug.DeviceMessage.VibrateComponent.verify|verify} messages.
             * @param message VibrateComponent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IVibrateComponent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VibrateComponent message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.VibrateComponent.verify|verify} messages.
             * @param message VibrateComponent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IVibrateComponent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VibrateComponent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VibrateComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.VibrateComponent;

            /**
             * Decodes a VibrateComponent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VibrateComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.VibrateComponent;

            /**
             * Verifies a VibrateComponent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VibrateComponent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VibrateComponent
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.VibrateComponent;

            /**
             * Creates a plain object from a VibrateComponent message. Also converts values to other types if specified.
             * @param message VibrateComponent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.VibrateComponent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VibrateComponent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a VibrateCmd. */
        interface IVibrateCmd {

            /** VibrateCmd speeds */
            speeds?: (Buttplug.DeviceMessage.IVibrateComponent[]|null);
        }

        /** Represents a VibrateCmd. */
        class VibrateCmd implements IVibrateCmd {

            /**
             * Constructs a new VibrateCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IVibrateCmd);

            /** VibrateCmd speeds. */
            public speeds: Buttplug.DeviceMessage.IVibrateComponent[];

            /**
             * Creates a new VibrateCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns VibrateCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IVibrateCmd): Buttplug.DeviceMessage.VibrateCmd;

            /**
             * Encodes the specified VibrateCmd message. Does not implicitly {@link Buttplug.DeviceMessage.VibrateCmd.verify|verify} messages.
             * @param message VibrateCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IVibrateCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified VibrateCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.VibrateCmd.verify|verify} messages.
             * @param message VibrateCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IVibrateCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a VibrateCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns VibrateCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.VibrateCmd;

            /**
             * Decodes a VibrateCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns VibrateCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.VibrateCmd;

            /**
             * Verifies a VibrateCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a VibrateCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns VibrateCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.VibrateCmd;

            /**
             * Creates a plain object from a VibrateCmd message. Also converts values to other types if specified.
             * @param message VibrateCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.VibrateCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this VibrateCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RotateComponent. */
        interface IRotateComponent {

            /** RotateComponent index */
            index?: (number|null);

            /** RotateComponent speed */
            speed?: (number|null);

            /** RotateComponent clockwise */
            clockwise?: (boolean|null);
        }

        /** Represents a RotateComponent. */
        class RotateComponent implements IRotateComponent {

            /**
             * Constructs a new RotateComponent.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IRotateComponent);

            /** RotateComponent index. */
            public index: number;

            /** RotateComponent speed. */
            public speed: number;

            /** RotateComponent clockwise. */
            public clockwise: boolean;

            /**
             * Creates a new RotateComponent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RotateComponent instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IRotateComponent): Buttplug.DeviceMessage.RotateComponent;

            /**
             * Encodes the specified RotateComponent message. Does not implicitly {@link Buttplug.DeviceMessage.RotateComponent.verify|verify} messages.
             * @param message RotateComponent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IRotateComponent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RotateComponent message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RotateComponent.verify|verify} messages.
             * @param message RotateComponent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IRotateComponent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RotateComponent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RotateComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.RotateComponent;

            /**
             * Decodes a RotateComponent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RotateComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.RotateComponent;

            /**
             * Verifies a RotateComponent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RotateComponent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RotateComponent
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.RotateComponent;

            /**
             * Creates a plain object from a RotateComponent message. Also converts values to other types if specified.
             * @param message RotateComponent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.RotateComponent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RotateComponent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RotateCmd. */
        interface IRotateCmd {

            /** RotateCmd rotations */
            rotations?: (Buttplug.DeviceMessage.IRotateComponent[]|null);
        }

        /** Represents a RotateCmd. */
        class RotateCmd implements IRotateCmd {

            /**
             * Constructs a new RotateCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IRotateCmd);

            /** RotateCmd rotations. */
            public rotations: Buttplug.DeviceMessage.IRotateComponent[];

            /**
             * Creates a new RotateCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RotateCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IRotateCmd): Buttplug.DeviceMessage.RotateCmd;

            /**
             * Encodes the specified RotateCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RotateCmd.verify|verify} messages.
             * @param message RotateCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IRotateCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RotateCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RotateCmd.verify|verify} messages.
             * @param message RotateCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IRotateCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RotateCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RotateCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.RotateCmd;

            /**
             * Decodes a RotateCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RotateCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.RotateCmd;

            /**
             * Verifies a RotateCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RotateCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RotateCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.RotateCmd;

            /**
             * Creates a plain object from a RotateCmd message. Also converts values to other types if specified.
             * @param message RotateCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.RotateCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RotateCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LinearComponent. */
        interface ILinearComponent {

            /** LinearComponent index */
            index?: (number|null);

            /** LinearComponent duration */
            duration?: (number|null);

            /** LinearComponent position */
            position?: (number|null);
        }

        /** Represents a LinearComponent. */
        class LinearComponent implements ILinearComponent {

            /**
             * Constructs a new LinearComponent.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.ILinearComponent);

            /** LinearComponent index. */
            public index: number;

            /** LinearComponent duration. */
            public duration: number;

            /** LinearComponent position. */
            public position: number;

            /**
             * Creates a new LinearComponent instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LinearComponent instance
             */
            public static create(properties?: Buttplug.DeviceMessage.ILinearComponent): Buttplug.DeviceMessage.LinearComponent;

            /**
             * Encodes the specified LinearComponent message. Does not implicitly {@link Buttplug.DeviceMessage.LinearComponent.verify|verify} messages.
             * @param message LinearComponent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.ILinearComponent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LinearComponent message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.LinearComponent.verify|verify} messages.
             * @param message LinearComponent message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.ILinearComponent, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LinearComponent message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LinearComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.LinearComponent;

            /**
             * Decodes a LinearComponent message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LinearComponent
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.LinearComponent;

            /**
             * Verifies a LinearComponent message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LinearComponent message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LinearComponent
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.LinearComponent;

            /**
             * Creates a plain object from a LinearComponent message. Also converts values to other types if specified.
             * @param message LinearComponent
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.LinearComponent, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LinearComponent to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LinearCmd. */
        interface ILinearCmd {

            /** LinearCmd movements */
            movements?: (Buttplug.DeviceMessage.ILinearComponent[]|null);
        }

        /** Represents a LinearCmd. */
        class LinearCmd implements ILinearCmd {

            /**
             * Constructs a new LinearCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.ILinearCmd);

            /** LinearCmd movements. */
            public movements: Buttplug.DeviceMessage.ILinearComponent[];

            /**
             * Creates a new LinearCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LinearCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.ILinearCmd): Buttplug.DeviceMessage.LinearCmd;

            /**
             * Encodes the specified LinearCmd message. Does not implicitly {@link Buttplug.DeviceMessage.LinearCmd.verify|verify} messages.
             * @param message LinearCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.ILinearCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LinearCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.LinearCmd.verify|verify} messages.
             * @param message LinearCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.ILinearCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LinearCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LinearCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.LinearCmd;

            /**
             * Decodes a LinearCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LinearCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.LinearCmd;

            /**
             * Verifies a LinearCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LinearCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LinearCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.LinearCmd;

            /**
             * Creates a plain object from a LinearCmd message. Also converts values to other types if specified.
             * @param message LinearCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.LinearCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LinearCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a StopDeviceCmd. */
        interface IStopDeviceCmd {
        }

        /** Represents a StopDeviceCmd. */
        class StopDeviceCmd implements IStopDeviceCmd {

            /**
             * Constructs a new StopDeviceCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IStopDeviceCmd);

            /**
             * Creates a new StopDeviceCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns StopDeviceCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IStopDeviceCmd): Buttplug.DeviceMessage.StopDeviceCmd;

            /**
             * Encodes the specified StopDeviceCmd message. Does not implicitly {@link Buttplug.DeviceMessage.StopDeviceCmd.verify|verify} messages.
             * @param message StopDeviceCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IStopDeviceCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified StopDeviceCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.StopDeviceCmd.verify|verify} messages.
             * @param message StopDeviceCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IStopDeviceCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a StopDeviceCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns StopDeviceCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.StopDeviceCmd;

            /**
             * Decodes a StopDeviceCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns StopDeviceCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.StopDeviceCmd;

            /**
             * Verifies a StopDeviceCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a StopDeviceCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns StopDeviceCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.StopDeviceCmd;

            /**
             * Creates a plain object from a StopDeviceCmd message. Also converts values to other types if specified.
             * @param message StopDeviceCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.StopDeviceCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this StopDeviceCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RawReadCmd. */
        interface IRawReadCmd {

            /** RawReadCmd endpoint */
            endpoint?: (Buttplug.Endpoint|null);

            /** RawReadCmd data */
            data?: (Uint8Array|null);

            /** RawReadCmd expectedLength */
            expectedLength?: (number|null);

            /** RawReadCmd timeout */
            timeout?: (number|null);
        }

        /** Represents a RawReadCmd. */
        class RawReadCmd implements IRawReadCmd {

            /**
             * Constructs a new RawReadCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IRawReadCmd);

            /** RawReadCmd endpoint. */
            public endpoint: Buttplug.Endpoint;

            /** RawReadCmd data. */
            public data: Uint8Array;

            /** RawReadCmd expectedLength. */
            public expectedLength: number;

            /** RawReadCmd timeout. */
            public timeout: number;

            /**
             * Creates a new RawReadCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RawReadCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IRawReadCmd): Buttplug.DeviceMessage.RawReadCmd;

            /**
             * Encodes the specified RawReadCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RawReadCmd.verify|verify} messages.
             * @param message RawReadCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IRawReadCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RawReadCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RawReadCmd.verify|verify} messages.
             * @param message RawReadCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IRawReadCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RawReadCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RawReadCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.RawReadCmd;

            /**
             * Decodes a RawReadCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RawReadCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.RawReadCmd;

            /**
             * Verifies a RawReadCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RawReadCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RawReadCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.RawReadCmd;

            /**
             * Creates a plain object from a RawReadCmd message. Also converts values to other types if specified.
             * @param message RawReadCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.RawReadCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RawReadCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RawWriteCmd. */
        interface IRawWriteCmd {

            /** RawWriteCmd endpoint */
            endpoint?: (Buttplug.Endpoint|null);

            /** RawWriteCmd data */
            data?: (Uint8Array|null);

            /** RawWriteCmd writeWithResponse */
            writeWithResponse?: (boolean|null);
        }

        /** Represents a RawWriteCmd. */
        class RawWriteCmd implements IRawWriteCmd {

            /**
             * Constructs a new RawWriteCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IRawWriteCmd);

            /** RawWriteCmd endpoint. */
            public endpoint: Buttplug.Endpoint;

            /** RawWriteCmd data. */
            public data: Uint8Array;

            /** RawWriteCmd writeWithResponse. */
            public writeWithResponse: boolean;

            /**
             * Creates a new RawWriteCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RawWriteCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IRawWriteCmd): Buttplug.DeviceMessage.RawWriteCmd;

            /**
             * Encodes the specified RawWriteCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RawWriteCmd.verify|verify} messages.
             * @param message RawWriteCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IRawWriteCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RawWriteCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RawWriteCmd.verify|verify} messages.
             * @param message RawWriteCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IRawWriteCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RawWriteCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RawWriteCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.RawWriteCmd;

            /**
             * Decodes a RawWriteCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RawWriteCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.RawWriteCmd;

            /**
             * Verifies a RawWriteCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RawWriteCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RawWriteCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.RawWriteCmd;

            /**
             * Creates a plain object from a RawWriteCmd message. Also converts values to other types if specified.
             * @param message RawWriteCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.RawWriteCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RawWriteCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RawSubscribeCmd. */
        interface IRawSubscribeCmd {

            /** RawSubscribeCmd endpoint */
            endpoint?: (Buttplug.Endpoint|null);
        }

        /** Represents a RawSubscribeCmd. */
        class RawSubscribeCmd implements IRawSubscribeCmd {

            /**
             * Constructs a new RawSubscribeCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IRawSubscribeCmd);

            /** RawSubscribeCmd endpoint. */
            public endpoint: Buttplug.Endpoint;

            /**
             * Creates a new RawSubscribeCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RawSubscribeCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IRawSubscribeCmd): Buttplug.DeviceMessage.RawSubscribeCmd;

            /**
             * Encodes the specified RawSubscribeCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RawSubscribeCmd.verify|verify} messages.
             * @param message RawSubscribeCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IRawSubscribeCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RawSubscribeCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RawSubscribeCmd.verify|verify} messages.
             * @param message RawSubscribeCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IRawSubscribeCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RawSubscribeCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RawSubscribeCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.RawSubscribeCmd;

            /**
             * Decodes a RawSubscribeCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RawSubscribeCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.RawSubscribeCmd;

            /**
             * Verifies a RawSubscribeCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RawSubscribeCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RawSubscribeCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.RawSubscribeCmd;

            /**
             * Creates a plain object from a RawSubscribeCmd message. Also converts values to other types if specified.
             * @param message RawSubscribeCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.RawSubscribeCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RawSubscribeCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RawUnsubscribeCmd. */
        interface IRawUnsubscribeCmd {

            /** RawUnsubscribeCmd endpoint */
            endpoint?: (Buttplug.Endpoint|null);
        }

        /** Represents a RawUnsubscribeCmd. */
        class RawUnsubscribeCmd implements IRawUnsubscribeCmd {

            /**
             * Constructs a new RawUnsubscribeCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IRawUnsubscribeCmd);

            /** RawUnsubscribeCmd endpoint. */
            public endpoint: Buttplug.Endpoint;

            /**
             * Creates a new RawUnsubscribeCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RawUnsubscribeCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IRawUnsubscribeCmd): Buttplug.DeviceMessage.RawUnsubscribeCmd;

            /**
             * Encodes the specified RawUnsubscribeCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RawUnsubscribeCmd.verify|verify} messages.
             * @param message RawUnsubscribeCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IRawUnsubscribeCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RawUnsubscribeCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RawUnsubscribeCmd.verify|verify} messages.
             * @param message RawUnsubscribeCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IRawUnsubscribeCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RawUnsubscribeCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RawUnsubscribeCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.RawUnsubscribeCmd;

            /**
             * Decodes a RawUnsubscribeCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RawUnsubscribeCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.RawUnsubscribeCmd;

            /**
             * Verifies a RawUnsubscribeCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RawUnsubscribeCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RawUnsubscribeCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.RawUnsubscribeCmd;

            /**
             * Creates a plain object from a RawUnsubscribeCmd message. Also converts values to other types if specified.
             * @param message RawUnsubscribeCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.RawUnsubscribeCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RawUnsubscribeCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BatteryLevelCmd. */
        interface IBatteryLevelCmd {
        }

        /** Represents a BatteryLevelCmd. */
        class BatteryLevelCmd implements IBatteryLevelCmd {

            /**
             * Constructs a new BatteryLevelCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IBatteryLevelCmd);

            /**
             * Creates a new BatteryLevelCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BatteryLevelCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IBatteryLevelCmd): Buttplug.DeviceMessage.BatteryLevelCmd;

            /**
             * Encodes the specified BatteryLevelCmd message. Does not implicitly {@link Buttplug.DeviceMessage.BatteryLevelCmd.verify|verify} messages.
             * @param message BatteryLevelCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IBatteryLevelCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BatteryLevelCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.BatteryLevelCmd.verify|verify} messages.
             * @param message BatteryLevelCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IBatteryLevelCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BatteryLevelCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BatteryLevelCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.BatteryLevelCmd;

            /**
             * Decodes a BatteryLevelCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BatteryLevelCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.BatteryLevelCmd;

            /**
             * Verifies a BatteryLevelCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BatteryLevelCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BatteryLevelCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.BatteryLevelCmd;

            /**
             * Creates a plain object from a BatteryLevelCmd message. Also converts values to other types if specified.
             * @param message BatteryLevelCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.BatteryLevelCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BatteryLevelCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RSSILevelCmd. */
        interface IRSSILevelCmd {
        }

        /** Represents a RSSILevelCmd. */
        class RSSILevelCmd implements IRSSILevelCmd {

            /**
             * Constructs a new RSSILevelCmd.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IRSSILevelCmd);

            /**
             * Creates a new RSSILevelCmd instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RSSILevelCmd instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IRSSILevelCmd): Buttplug.DeviceMessage.RSSILevelCmd;

            /**
             * Encodes the specified RSSILevelCmd message. Does not implicitly {@link Buttplug.DeviceMessage.RSSILevelCmd.verify|verify} messages.
             * @param message RSSILevelCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IRSSILevelCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RSSILevelCmd message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.RSSILevelCmd.verify|verify} messages.
             * @param message RSSILevelCmd message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IRSSILevelCmd, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RSSILevelCmd message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RSSILevelCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.RSSILevelCmd;

            /**
             * Decodes a RSSILevelCmd message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RSSILevelCmd
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.RSSILevelCmd;

            /**
             * Verifies a RSSILevelCmd message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RSSILevelCmd message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RSSILevelCmd
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.RSSILevelCmd;

            /**
             * Creates a plain object from a RSSILevelCmd message. Also converts values to other types if specified.
             * @param message RSSILevelCmd
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.RSSILevelCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RSSILevelCmd to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a FFIMessage. */
        interface IFFIMessage {

            /** FFIMessage vibrateCmd */
            vibrateCmd?: (Buttplug.DeviceMessage.IVibrateCmd|null);

            /** FFIMessage rotateCmd */
            rotateCmd?: (Buttplug.DeviceMessage.IRotateCmd|null);

            /** FFIMessage linearCmd */
            linearCmd?: (Buttplug.DeviceMessage.ILinearCmd|null);

            /** FFIMessage stopDeviceCmd */
            stopDeviceCmd?: (Buttplug.DeviceMessage.IStopDeviceCmd|null);

            /** FFIMessage rawReadCmd */
            rawReadCmd?: (Buttplug.DeviceMessage.IRawReadCmd|null);

            /** FFIMessage rawWriteCmd */
            rawWriteCmd?: (Buttplug.DeviceMessage.IRawWriteCmd|null);

            /** FFIMessage rawSubscribeCmd */
            rawSubscribeCmd?: (Buttplug.DeviceMessage.IRawSubscribeCmd|null);

            /** FFIMessage rawUnsubscribeCmd */
            rawUnsubscribeCmd?: (Buttplug.DeviceMessage.IRawUnsubscribeCmd|null);

            /** FFIMessage batteryLevelCmd */
            batteryLevelCmd?: (Buttplug.DeviceMessage.IBatteryLevelCmd|null);

            /** FFIMessage rssiLevelCmd */
            rssiLevelCmd?: (Buttplug.DeviceMessage.IRSSILevelCmd|null);
        }

        /** Represents a FFIMessage. */
        class FFIMessage implements IFFIMessage {

            /**
             * Constructs a new FFIMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceMessage.IFFIMessage);

            /** FFIMessage vibrateCmd. */
            public vibrateCmd?: (Buttplug.DeviceMessage.IVibrateCmd|null);

            /** FFIMessage rotateCmd. */
            public rotateCmd?: (Buttplug.DeviceMessage.IRotateCmd|null);

            /** FFIMessage linearCmd. */
            public linearCmd?: (Buttplug.DeviceMessage.ILinearCmd|null);

            /** FFIMessage stopDeviceCmd. */
            public stopDeviceCmd?: (Buttplug.DeviceMessage.IStopDeviceCmd|null);

            /** FFIMessage rawReadCmd. */
            public rawReadCmd?: (Buttplug.DeviceMessage.IRawReadCmd|null);

            /** FFIMessage rawWriteCmd. */
            public rawWriteCmd?: (Buttplug.DeviceMessage.IRawWriteCmd|null);

            /** FFIMessage rawSubscribeCmd. */
            public rawSubscribeCmd?: (Buttplug.DeviceMessage.IRawSubscribeCmd|null);

            /** FFIMessage rawUnsubscribeCmd. */
            public rawUnsubscribeCmd?: (Buttplug.DeviceMessage.IRawUnsubscribeCmd|null);

            /** FFIMessage batteryLevelCmd. */
            public batteryLevelCmd?: (Buttplug.DeviceMessage.IBatteryLevelCmd|null);

            /** FFIMessage rssiLevelCmd. */
            public rssiLevelCmd?: (Buttplug.DeviceMessage.IRSSILevelCmd|null);

            /** FFIMessage msg. */
            public msg?: ("vibrateCmd"|"rotateCmd"|"linearCmd"|"stopDeviceCmd"|"rawReadCmd"|"rawWriteCmd"|"rawSubscribeCmd"|"rawUnsubscribeCmd"|"batteryLevelCmd"|"rssiLevelCmd");

            /**
             * Creates a new FFIMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FFIMessage instance
             */
            public static create(properties?: Buttplug.DeviceMessage.IFFIMessage): Buttplug.DeviceMessage.FFIMessage;

            /**
             * Encodes the specified FFIMessage message. Does not implicitly {@link Buttplug.DeviceMessage.FFIMessage.verify|verify} messages.
             * @param message FFIMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceMessage.IFFIMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FFIMessage message, length delimited. Does not implicitly {@link Buttplug.DeviceMessage.FFIMessage.verify|verify} messages.
             * @param message FFIMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceMessage.IFFIMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FFIMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceMessage.FFIMessage;

            /**
             * Decodes a FFIMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceMessage.FFIMessage;

            /**
             * Verifies a FFIMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FFIMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FFIMessage
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceMessage.FFIMessage;

            /**
             * Creates a plain object from a FFIMessage message. Also converts values to other types if specified.
             * @param message FFIMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceMessage.FFIMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FFIMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a ServerMessage. */
    interface IServerMessage {

        /** ServerMessage ok */
        ok?: (Buttplug.ServerMessage.IOk|null);

        /** ServerMessage error */
        error?: (Buttplug.ServerMessage.IError|null);

        /** ServerMessage scanningFinished */
        scanningFinished?: (Buttplug.ServerMessage.IScanningFinished|null);

        /** ServerMessage deviceAdded */
        deviceAdded?: (Buttplug.ServerMessage.IDeviceAdded|null);

        /** ServerMessage deviceRemoved */
        deviceRemoved?: (Buttplug.ServerMessage.IDeviceRemoved|null);

        /** ServerMessage disconnect */
        disconnect?: (Buttplug.ServerMessage.IDisconnect|null);
    }

    /** Represents a ServerMessage. */
    class ServerMessage implements IServerMessage {

        /**
         * Constructs a new ServerMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: Buttplug.IServerMessage);

        /** ServerMessage ok. */
        public ok?: (Buttplug.ServerMessage.IOk|null);

        /** ServerMessage error. */
        public error?: (Buttplug.ServerMessage.IError|null);

        /** ServerMessage scanningFinished. */
        public scanningFinished?: (Buttplug.ServerMessage.IScanningFinished|null);

        /** ServerMessage deviceAdded. */
        public deviceAdded?: (Buttplug.ServerMessage.IDeviceAdded|null);

        /** ServerMessage deviceRemoved. */
        public deviceRemoved?: (Buttplug.ServerMessage.IDeviceRemoved|null);

        /** ServerMessage disconnect. */
        public disconnect?: (Buttplug.ServerMessage.IDisconnect|null);

        /** ServerMessage msg. */
        public msg?: ("ok"|"error"|"scanningFinished"|"deviceAdded"|"deviceRemoved"|"disconnect");

        /**
         * Creates a new ServerMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerMessage instance
         */
        public static create(properties?: Buttplug.IServerMessage): Buttplug.ServerMessage;

        /**
         * Encodes the specified ServerMessage message. Does not implicitly {@link Buttplug.ServerMessage.verify|verify} messages.
         * @param message ServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Buttplug.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ServerMessage message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.verify|verify} messages.
         * @param message ServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Buttplug.IServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ServerMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ServerMessage;

        /**
         * Decodes a ServerMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ServerMessage;

        /**
         * Verifies a ServerMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ServerMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ServerMessage
         */
        public static fromObject(object: { [k: string]: any }): Buttplug.ServerMessage;

        /**
         * Creates a plain object from a ServerMessage message. Also converts values to other types if specified.
         * @param message ServerMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Buttplug.ServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ServerMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ServerMessage {

        /** ButtplugErrorType enum. */
        enum ButtplugErrorType {
            ButtplugConnectorError = 0,
            ButtplugHandshakeError = 1,
            ButtplugDeviceError = 2,
            ButtplugPingError = 3,
            ButtplugMessageError = 4,
            ButtplugUnknownError = 5
        }

        /** MessageAttributeType enum. */
        enum MessageAttributeType {
            VibrateCmd = 0,
            RotateCmd = 1,
            LinearCmd = 2,
            StopDeviceCmd = 3,
            RawReadCmd = 4,
            RawWriteCmd = 5,
            RawSubscribeCmd = 6,
            RawUnsubscribeCmd = 7,
            BatteryLevelCmd = 8,
            RSSILevelCmd = 9
        }

        /** Properties of a MessageAttributes. */
        interface IMessageAttributes {

            /** MessageAttributes messageType */
            messageType?: (Buttplug.ServerMessage.MessageAttributeType|null);

            /** MessageAttributes featureCount */
            featureCount?: (number|null);

            /** MessageAttributes stepCount */
            stepCount?: (number[]|null);

            /** MessageAttributes endpoints */
            endpoints?: (Buttplug.Endpoint[]|null);

            /** MessageAttributes maxDuration */
            maxDuration?: (number[]|null);
        }

        /** Represents a MessageAttributes. */
        class MessageAttributes implements IMessageAttributes {

            /**
             * Constructs a new MessageAttributes.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ServerMessage.IMessageAttributes);

            /** MessageAttributes messageType. */
            public messageType: Buttplug.ServerMessage.MessageAttributeType;

            /** MessageAttributes featureCount. */
            public featureCount: number;

            /** MessageAttributes stepCount. */
            public stepCount: number[];

            /** MessageAttributes endpoints. */
            public endpoints: Buttplug.Endpoint[];

            /** MessageAttributes maxDuration. */
            public maxDuration: number[];

            /**
             * Creates a new MessageAttributes instance using the specified properties.
             * @param [properties] Properties to set
             * @returns MessageAttributes instance
             */
            public static create(properties?: Buttplug.ServerMessage.IMessageAttributes): Buttplug.ServerMessage.MessageAttributes;

            /**
             * Encodes the specified MessageAttributes message. Does not implicitly {@link Buttplug.ServerMessage.MessageAttributes.verify|verify} messages.
             * @param message MessageAttributes message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ServerMessage.IMessageAttributes, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified MessageAttributes message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.MessageAttributes.verify|verify} messages.
             * @param message MessageAttributes message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ServerMessage.IMessageAttributes, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a MessageAttributes message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns MessageAttributes
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ServerMessage.MessageAttributes;

            /**
             * Decodes a MessageAttributes message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns MessageAttributes
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ServerMessage.MessageAttributes;

            /**
             * Verifies a MessageAttributes message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a MessageAttributes message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns MessageAttributes
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ServerMessage.MessageAttributes;

            /**
             * Creates a plain object from a MessageAttributes message. Also converts values to other types if specified.
             * @param message MessageAttributes
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ServerMessage.MessageAttributes, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this MessageAttributes to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Ok. */
        interface IOk {
        }

        /** Represents an Ok. */
        class Ok implements IOk {

            /**
             * Constructs a new Ok.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ServerMessage.IOk);

            /**
             * Creates a new Ok instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Ok instance
             */
            public static create(properties?: Buttplug.ServerMessage.IOk): Buttplug.ServerMessage.Ok;

            /**
             * Encodes the specified Ok message. Does not implicitly {@link Buttplug.ServerMessage.Ok.verify|verify} messages.
             * @param message Ok message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ServerMessage.IOk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Ok message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.Ok.verify|verify} messages.
             * @param message Ok message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ServerMessage.IOk, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Ok message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Ok
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ServerMessage.Ok;

            /**
             * Decodes an Ok message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Ok
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ServerMessage.Ok;

            /**
             * Verifies an Ok message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Ok message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Ok
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ServerMessage.Ok;

            /**
             * Creates a plain object from an Ok message. Also converts values to other types if specified.
             * @param message Ok
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ServerMessage.Ok, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Ok to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an Error. */
        interface IError {

            /** Error errorType */
            errorType?: (Buttplug.ServerMessage.ButtplugErrorType|null);

            /** Error message */
            message?: (string|null);

            /** Error backtrace */
            backtrace?: (string|null);
        }

        /** Represents an Error. */
        class Error implements IError {

            /**
             * Constructs a new Error.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ServerMessage.IError);

            /** Error errorType. */
            public errorType: Buttplug.ServerMessage.ButtplugErrorType;

            /** Error message. */
            public message: string;

            /** Error backtrace. */
            public backtrace: string;

            /**
             * Creates a new Error instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Error instance
             */
            public static create(properties?: Buttplug.ServerMessage.IError): Buttplug.ServerMessage.Error;

            /**
             * Encodes the specified Error message. Does not implicitly {@link Buttplug.ServerMessage.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ServerMessage.IError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.Error.verify|verify} messages.
             * @param message Error message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ServerMessage.IError, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Error message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ServerMessage.Error;

            /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ServerMessage.Error;

            /**
             * Verifies an Error message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Error
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ServerMessage.Error;

            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @param message Error
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ServerMessage.Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Error to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a ScanningFinished. */
        interface IScanningFinished {
        }

        /** Represents a ScanningFinished. */
        class ScanningFinished implements IScanningFinished {

            /**
             * Constructs a new ScanningFinished.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ServerMessage.IScanningFinished);

            /**
             * Creates a new ScanningFinished instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ScanningFinished instance
             */
            public static create(properties?: Buttplug.ServerMessage.IScanningFinished): Buttplug.ServerMessage.ScanningFinished;

            /**
             * Encodes the specified ScanningFinished message. Does not implicitly {@link Buttplug.ServerMessage.ScanningFinished.verify|verify} messages.
             * @param message ScanningFinished message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ServerMessage.IScanningFinished, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ScanningFinished message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.ScanningFinished.verify|verify} messages.
             * @param message ScanningFinished message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ServerMessage.IScanningFinished, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ScanningFinished message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ScanningFinished
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ServerMessage.ScanningFinished;

            /**
             * Decodes a ScanningFinished message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ScanningFinished
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ServerMessage.ScanningFinished;

            /**
             * Verifies a ScanningFinished message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ScanningFinished message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ScanningFinished
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ServerMessage.ScanningFinished;

            /**
             * Creates a plain object from a ScanningFinished message. Also converts values to other types if specified.
             * @param message ScanningFinished
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ServerMessage.ScanningFinished, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ScanningFinished to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DeviceAdded. */
        interface IDeviceAdded {

            /** DeviceAdded name */
            name?: (string|null);

            /** DeviceAdded index */
            index?: (number|null);

            /** DeviceAdded messageAttributes */
            messageAttributes?: (Buttplug.ServerMessage.IMessageAttributes[]|null);
        }

        /** Represents a DeviceAdded. */
        class DeviceAdded implements IDeviceAdded {

            /**
             * Constructs a new DeviceAdded.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ServerMessage.IDeviceAdded);

            /** DeviceAdded name. */
            public name: string;

            /** DeviceAdded index. */
            public index: number;

            /** DeviceAdded messageAttributes. */
            public messageAttributes: Buttplug.ServerMessage.IMessageAttributes[];

            /**
             * Creates a new DeviceAdded instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeviceAdded instance
             */
            public static create(properties?: Buttplug.ServerMessage.IDeviceAdded): Buttplug.ServerMessage.DeviceAdded;

            /**
             * Encodes the specified DeviceAdded message. Does not implicitly {@link Buttplug.ServerMessage.DeviceAdded.verify|verify} messages.
             * @param message DeviceAdded message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ServerMessage.IDeviceAdded, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeviceAdded message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.DeviceAdded.verify|verify} messages.
             * @param message DeviceAdded message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ServerMessage.IDeviceAdded, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeviceAdded message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeviceAdded
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ServerMessage.DeviceAdded;

            /**
             * Decodes a DeviceAdded message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeviceAdded
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ServerMessage.DeviceAdded;

            /**
             * Verifies a DeviceAdded message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeviceAdded message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeviceAdded
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ServerMessage.DeviceAdded;

            /**
             * Creates a plain object from a DeviceAdded message. Also converts values to other types if specified.
             * @param message DeviceAdded
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ServerMessage.DeviceAdded, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeviceAdded to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a DeviceRemoved. */
        interface IDeviceRemoved {

            /** DeviceRemoved index */
            index?: (number|null);
        }

        /** Represents a DeviceRemoved. */
        class DeviceRemoved implements IDeviceRemoved {

            /**
             * Constructs a new DeviceRemoved.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ServerMessage.IDeviceRemoved);

            /** DeviceRemoved index. */
            public index: number;

            /**
             * Creates a new DeviceRemoved instance using the specified properties.
             * @param [properties] Properties to set
             * @returns DeviceRemoved instance
             */
            public static create(properties?: Buttplug.ServerMessage.IDeviceRemoved): Buttplug.ServerMessage.DeviceRemoved;

            /**
             * Encodes the specified DeviceRemoved message. Does not implicitly {@link Buttplug.ServerMessage.DeviceRemoved.verify|verify} messages.
             * @param message DeviceRemoved message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ServerMessage.IDeviceRemoved, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified DeviceRemoved message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.DeviceRemoved.verify|verify} messages.
             * @param message DeviceRemoved message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ServerMessage.IDeviceRemoved, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a DeviceRemoved message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns DeviceRemoved
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ServerMessage.DeviceRemoved;

            /**
             * Decodes a DeviceRemoved message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns DeviceRemoved
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ServerMessage.DeviceRemoved;

            /**
             * Verifies a DeviceRemoved message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a DeviceRemoved message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns DeviceRemoved
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ServerMessage.DeviceRemoved;

            /**
             * Creates a plain object from a DeviceRemoved message. Also converts values to other types if specified.
             * @param message DeviceRemoved
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ServerMessage.DeviceRemoved, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this DeviceRemoved to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Disconnect. */
        interface IDisconnect {
        }

        /** Represents a Disconnect. */
        class Disconnect implements IDisconnect {

            /**
             * Constructs a new Disconnect.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ServerMessage.IDisconnect);

            /**
             * Creates a new Disconnect instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Disconnect instance
             */
            public static create(properties?: Buttplug.ServerMessage.IDisconnect): Buttplug.ServerMessage.Disconnect;

            /**
             * Encodes the specified Disconnect message. Does not implicitly {@link Buttplug.ServerMessage.Disconnect.verify|verify} messages.
             * @param message Disconnect message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ServerMessage.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link Buttplug.ServerMessage.Disconnect.verify|verify} messages.
             * @param message Disconnect message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ServerMessage.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Disconnect message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ServerMessage.Disconnect;

            /**
             * Decodes a Disconnect message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ServerMessage.Disconnect;

            /**
             * Verifies a Disconnect message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Disconnect
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ServerMessage.Disconnect;

            /**
             * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
             * @param message Disconnect
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ServerMessage.Disconnect, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Disconnect to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a DeviceEvent. */
    interface IDeviceEvent {

        /** DeviceEvent disconnect */
        disconnect?: (Buttplug.DeviceEvent.IDisconnect|null);

        /** DeviceEvent batteryLevelReading */
        batteryLevelReading?: (Buttplug.DeviceEvent.IBatteryLevelReading|null);

        /** DeviceEvent rssiLevelReading */
        rssiLevelReading?: (Buttplug.DeviceEvent.IRSSILevelReading|null);

        /** DeviceEvent rawReading */
        rawReading?: (Buttplug.DeviceEvent.IRawReading|null);
    }

    /** Represents a DeviceEvent. */
    class DeviceEvent implements IDeviceEvent {

        /**
         * Constructs a new DeviceEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: Buttplug.IDeviceEvent);

        /** DeviceEvent disconnect. */
        public disconnect?: (Buttplug.DeviceEvent.IDisconnect|null);

        /** DeviceEvent batteryLevelReading. */
        public batteryLevelReading?: (Buttplug.DeviceEvent.IBatteryLevelReading|null);

        /** DeviceEvent rssiLevelReading. */
        public rssiLevelReading?: (Buttplug.DeviceEvent.IRSSILevelReading|null);

        /** DeviceEvent rawReading. */
        public rawReading?: (Buttplug.DeviceEvent.IRawReading|null);

        /** DeviceEvent msg. */
        public msg?: ("disconnect"|"batteryLevelReading"|"rssiLevelReading"|"rawReading");

        /**
         * Creates a new DeviceEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns DeviceEvent instance
         */
        public static create(properties?: Buttplug.IDeviceEvent): Buttplug.DeviceEvent;

        /**
         * Encodes the specified DeviceEvent message. Does not implicitly {@link Buttplug.DeviceEvent.verify|verify} messages.
         * @param message DeviceEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Buttplug.IDeviceEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified DeviceEvent message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.verify|verify} messages.
         * @param message DeviceEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Buttplug.IDeviceEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a DeviceEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns DeviceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceEvent;

        /**
         * Decodes a DeviceEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns DeviceEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceEvent;

        /**
         * Verifies a DeviceEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a DeviceEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns DeviceEvent
         */
        public static fromObject(object: { [k: string]: any }): Buttplug.DeviceEvent;

        /**
         * Creates a plain object from a DeviceEvent message. Also converts values to other types if specified.
         * @param message DeviceEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Buttplug.DeviceEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this DeviceEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace DeviceEvent {

        /** Properties of a Disconnect. */
        interface IDisconnect {

            /** Disconnect index */
            index?: (number|null);
        }

        /** Represents a Disconnect. */
        class Disconnect implements IDisconnect {

            /**
             * Constructs a new Disconnect.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceEvent.IDisconnect);

            /** Disconnect index. */
            public index: number;

            /**
             * Creates a new Disconnect instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Disconnect instance
             */
            public static create(properties?: Buttplug.DeviceEvent.IDisconnect): Buttplug.DeviceEvent.Disconnect;

            /**
             * Encodes the specified Disconnect message. Does not implicitly {@link Buttplug.DeviceEvent.Disconnect.verify|verify} messages.
             * @param message Disconnect message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceEvent.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Disconnect message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.Disconnect.verify|verify} messages.
             * @param message Disconnect message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceEvent.IDisconnect, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Disconnect message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceEvent.Disconnect;

            /**
             * Decodes a Disconnect message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Disconnect
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceEvent.Disconnect;

            /**
             * Verifies a Disconnect message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Disconnect message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Disconnect
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceEvent.Disconnect;

            /**
             * Creates a plain object from a Disconnect message. Also converts values to other types if specified.
             * @param message Disconnect
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceEvent.Disconnect, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Disconnect to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RawReading. */
        interface IRawReading {

            /** RawReading index */
            index?: (number|null);

            /** RawReading endpoint */
            endpoint?: (Buttplug.Endpoint|null);

            /** RawReading data */
            data?: (Uint8Array|null);
        }

        /** Represents a RawReading. */
        class RawReading implements IRawReading {

            /**
             * Constructs a new RawReading.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceEvent.IRawReading);

            /** RawReading index. */
            public index: number;

            /** RawReading endpoint. */
            public endpoint: Buttplug.Endpoint;

            /** RawReading data. */
            public data: Uint8Array;

            /**
             * Creates a new RawReading instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RawReading instance
             */
            public static create(properties?: Buttplug.DeviceEvent.IRawReading): Buttplug.DeviceEvent.RawReading;

            /**
             * Encodes the specified RawReading message. Does not implicitly {@link Buttplug.DeviceEvent.RawReading.verify|verify} messages.
             * @param message RawReading message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceEvent.IRawReading, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RawReading message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.RawReading.verify|verify} messages.
             * @param message RawReading message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceEvent.IRawReading, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RawReading message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RawReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceEvent.RawReading;

            /**
             * Decodes a RawReading message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RawReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceEvent.RawReading;

            /**
             * Verifies a RawReading message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RawReading message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RawReading
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceEvent.RawReading;

            /**
             * Creates a plain object from a RawReading message. Also converts values to other types if specified.
             * @param message RawReading
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceEvent.RawReading, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RawReading to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a BatteryLevelReading. */
        interface IBatteryLevelReading {

            /** BatteryLevelReading index */
            index?: (number|null);

            /** BatteryLevelReading reading */
            reading?: (number|null);
        }

        /** Represents a BatteryLevelReading. */
        class BatteryLevelReading implements IBatteryLevelReading {

            /**
             * Constructs a new BatteryLevelReading.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceEvent.IBatteryLevelReading);

            /** BatteryLevelReading index. */
            public index: number;

            /** BatteryLevelReading reading. */
            public reading: number;

            /**
             * Creates a new BatteryLevelReading instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BatteryLevelReading instance
             */
            public static create(properties?: Buttplug.DeviceEvent.IBatteryLevelReading): Buttplug.DeviceEvent.BatteryLevelReading;

            /**
             * Encodes the specified BatteryLevelReading message. Does not implicitly {@link Buttplug.DeviceEvent.BatteryLevelReading.verify|verify} messages.
             * @param message BatteryLevelReading message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceEvent.IBatteryLevelReading, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BatteryLevelReading message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.BatteryLevelReading.verify|verify} messages.
             * @param message BatteryLevelReading message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceEvent.IBatteryLevelReading, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BatteryLevelReading message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BatteryLevelReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceEvent.BatteryLevelReading;

            /**
             * Decodes a BatteryLevelReading message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BatteryLevelReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceEvent.BatteryLevelReading;

            /**
             * Verifies a BatteryLevelReading message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BatteryLevelReading message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BatteryLevelReading
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceEvent.BatteryLevelReading;

            /**
             * Creates a plain object from a BatteryLevelReading message. Also converts values to other types if specified.
             * @param message BatteryLevelReading
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceEvent.BatteryLevelReading, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BatteryLevelReading to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a RSSILevelReading. */
        interface IRSSILevelReading {

            /** RSSILevelReading index */
            index?: (number|null);

            /** RSSILevelReading reading */
            reading?: (number|null);
        }

        /** Represents a RSSILevelReading. */
        class RSSILevelReading implements IRSSILevelReading {

            /**
             * Constructs a new RSSILevelReading.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.DeviceEvent.IRSSILevelReading);

            /** RSSILevelReading index. */
            public index: number;

            /** RSSILevelReading reading. */
            public reading: number;

            /**
             * Creates a new RSSILevelReading instance using the specified properties.
             * @param [properties] Properties to set
             * @returns RSSILevelReading instance
             */
            public static create(properties?: Buttplug.DeviceEvent.IRSSILevelReading): Buttplug.DeviceEvent.RSSILevelReading;

            /**
             * Encodes the specified RSSILevelReading message. Does not implicitly {@link Buttplug.DeviceEvent.RSSILevelReading.verify|verify} messages.
             * @param message RSSILevelReading message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.DeviceEvent.IRSSILevelReading, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified RSSILevelReading message, length delimited. Does not implicitly {@link Buttplug.DeviceEvent.RSSILevelReading.verify|verify} messages.
             * @param message RSSILevelReading message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.DeviceEvent.IRSSILevelReading, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a RSSILevelReading message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns RSSILevelReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.DeviceEvent.RSSILevelReading;

            /**
             * Decodes a RSSILevelReading message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns RSSILevelReading
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.DeviceEvent.RSSILevelReading;

            /**
             * Verifies a RSSILevelReading message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a RSSILevelReading message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns RSSILevelReading
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.DeviceEvent.RSSILevelReading;

            /**
             * Creates a plain object from a RSSILevelReading message. Also converts values to other types if specified.
             * @param message RSSILevelReading
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.DeviceEvent.RSSILevelReading, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this RSSILevelReading to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }

    /** Properties of a ButtplugFFIServerMessage. */
    interface IButtplugFFIServerMessage {

        /** ButtplugFFIServerMessage id */
        id?: (number|null);

        /** ButtplugFFIServerMessage message */
        message?: (Buttplug.ButtplugFFIServerMessage.IFFIMessage|null);
    }

    /** Represents a ButtplugFFIServerMessage. */
    class ButtplugFFIServerMessage implements IButtplugFFIServerMessage {

        /**
         * Constructs a new ButtplugFFIServerMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: Buttplug.IButtplugFFIServerMessage);

        /** ButtplugFFIServerMessage id. */
        public id: number;

        /** ButtplugFFIServerMessage message. */
        public message?: (Buttplug.ButtplugFFIServerMessage.IFFIMessage|null);

        /**
         * Creates a new ButtplugFFIServerMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ButtplugFFIServerMessage instance
         */
        public static create(properties?: Buttplug.IButtplugFFIServerMessage): Buttplug.ButtplugFFIServerMessage;

        /**
         * Encodes the specified ButtplugFFIServerMessage message. Does not implicitly {@link Buttplug.ButtplugFFIServerMessage.verify|verify} messages.
         * @param message ButtplugFFIServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Buttplug.IButtplugFFIServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ButtplugFFIServerMessage message, length delimited. Does not implicitly {@link Buttplug.ButtplugFFIServerMessage.verify|verify} messages.
         * @param message ButtplugFFIServerMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Buttplug.IButtplugFFIServerMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ButtplugFFIServerMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ButtplugFFIServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ButtplugFFIServerMessage;

        /**
         * Decodes a ButtplugFFIServerMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ButtplugFFIServerMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ButtplugFFIServerMessage;

        /**
         * Verifies a ButtplugFFIServerMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ButtplugFFIServerMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ButtplugFFIServerMessage
         */
        public static fromObject(object: { [k: string]: any }): Buttplug.ButtplugFFIServerMessage;

        /**
         * Creates a plain object from a ButtplugFFIServerMessage message. Also converts values to other types if specified.
         * @param message ButtplugFFIServerMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Buttplug.ButtplugFFIServerMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ButtplugFFIServerMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace ButtplugFFIServerMessage {

        /** Properties of a FFIMessage. */
        interface IFFIMessage {

            /** FFIMessage serverMessage */
            serverMessage?: (Buttplug.IServerMessage|null);

            /** FFIMessage deviceEvent */
            deviceEvent?: (Buttplug.IDeviceEvent|null);
        }

        /** Represents a FFIMessage. */
        class FFIMessage implements IFFIMessage {

            /**
             * Constructs a new FFIMessage.
             * @param [properties] Properties to set
             */
            constructor(properties?: Buttplug.ButtplugFFIServerMessage.IFFIMessage);

            /** FFIMessage serverMessage. */
            public serverMessage?: (Buttplug.IServerMessage|null);

            /** FFIMessage deviceEvent. */
            public deviceEvent?: (Buttplug.IDeviceEvent|null);

            /** FFIMessage msg. */
            public msg?: ("serverMessage"|"deviceEvent");

            /**
             * Creates a new FFIMessage instance using the specified properties.
             * @param [properties] Properties to set
             * @returns FFIMessage instance
             */
            public static create(properties?: Buttplug.ButtplugFFIServerMessage.IFFIMessage): Buttplug.ButtplugFFIServerMessage.FFIMessage;

            /**
             * Encodes the specified FFIMessage message. Does not implicitly {@link Buttplug.ButtplugFFIServerMessage.FFIMessage.verify|verify} messages.
             * @param message FFIMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: Buttplug.ButtplugFFIServerMessage.IFFIMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified FFIMessage message, length delimited. Does not implicitly {@link Buttplug.ButtplugFFIServerMessage.FFIMessage.verify|verify} messages.
             * @param message FFIMessage message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: Buttplug.ButtplugFFIServerMessage.IFFIMessage, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a FFIMessage message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Buttplug.ButtplugFFIServerMessage.FFIMessage;

            /**
             * Decodes a FFIMessage message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns FFIMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Buttplug.ButtplugFFIServerMessage.FFIMessage;

            /**
             * Verifies a FFIMessage message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a FFIMessage message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns FFIMessage
             */
            public static fromObject(object: { [k: string]: any }): Buttplug.ButtplugFFIServerMessage.FFIMessage;

            /**
             * Creates a plain object from a FFIMessage message. Also converts values to other types if specified.
             * @param message FFIMessage
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: Buttplug.ButtplugFFIServerMessage.FFIMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this FFIMessage to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }
    }
}
