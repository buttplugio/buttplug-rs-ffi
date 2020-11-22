using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Buttplug
{
    public class ButtplugClient : IDisposable
    {
        /// <summary>
        /// Name of the client, used for server UI/permissions.
        /// </summary>
        public readonly string Name;

        private ButtplugFFIMessageSorter _messageSorter = new ButtplugFFIMessageSorter();

        private ButtplugFFIClientHandle _clientHandle;

        /// <summary>
        /// Event fired on Buttplug device added, either after connect or while scanning for devices.
        /// </summary>
        public event EventHandler<DeviceAddedEventArgs> DeviceAdded;

        /// <summary>
        /// Event fired on Buttplug device removed. Can fire at any time after device connection.
        /// </summary>
        public event EventHandler<DeviceRemovedEventArgs> DeviceRemoved;

        /// <summary>
        /// Fires when an error that was not provoked by a client action is received from the server,
        /// such as a device exception, message parsing error, etc... Server may possibly disconnect
        /// after this event fires.
        /// </summary>
        public event EventHandler<ButtplugExceptionEventArgs> ErrorReceived;

        /// <summary>
        /// Event fired when the server has finished scanning for devices.
        /// </summary>
        public event EventHandler ScanningFinished;

        /// <summary>
        /// Event fired when a server ping timeout has occured.
        /// </summary>
        public event EventHandler PingTimeout;

        /// <summary>
        /// Event fired when a server disconnect has occured.
        /// </summary>
        public event EventHandler ServerDisconnect;

        /// <summary>
        /// Stores information about devices currently connected to the server.
        /// </summary>
        private readonly Dictionary<uint, ButtplugClientDevice> _devices =
            new Dictionary<uint, ButtplugClientDevice>();

        public ButtplugClientDevice[] Devices => _devices.Values.ToArray();

        private ButtplugCallback SorterCallbackDelegate;

        public ButtplugClient(string aClientName)
        {
            Name = aClientName;
            SorterCallbackDelegate = SorterCallback;
            _clientHandle = ButtplugFFI.SendCreateClient(aClientName, SorterCallbackDelegate);
        }
        public async Task Connect(ButtplugEmbeddedConnectorOptions aConnector)
        {
            if (aConnector == null)
            {
                aConnector = new ButtplugEmbeddedConnectorOptions();
            }
            Console.WriteLine("Trying to connect");
            await ButtplugFFI.SendConnectLocal(
                _messageSorter,
                _clientHandle,
                aConnector.ServerName,
                aConnector.MaxPingTime,
                aConnector.AllowRawMessages,
                aConnector.DeviceConfigJSON,
                aConnector.UserDeviceConfigJSON,
                aConnector.DeviceCommunicationManagerTypes);
            Console.WriteLine("Connected");
        }

        public async Task Connect(ButtplugWebsocketConnectorOptions aConnector)
        {
            await ButtplugFFI.SendConnectWebsocket(_messageSorter, _clientHandle, aConnector.NetworkAddress, false);
        }

        public async Task Disconnect()
        {
            await ButtplugFFI.SendDisconnect(_messageSorter, _clientHandle);
        }

        public void SorterCallback(UIntPtr buf, int buf_length)
        {
            Span<byte> byteArray;
            unsafe
            {
                byteArray = new Span<byte>(buf.ToPointer(), buf_length);
            }
            var server_message = ButtplugFFIServerMessage.Parser.ParseFrom(byteArray.ToArray());
            if (server_message.Id > 0)
            {
                _messageSorter.CheckMessage(server_message);
            }
            else if (server_message.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.ServerMessage)
            {
                if (server_message.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.DeviceAdded)
                {
                    var device_added_message = server_message.Message.ServerMessage.DeviceAdded;
                    var device_handle = ButtplugFFI.SendCreateDevice(_clientHandle, device_added_message.Index);
                    var attribute_dict = new Dictionary<ServerMessage.Types.MessageAttributeType, ButtplugMessageAttributes>();
                    for (var i = 0; i < device_added_message.MessageAttributes.Count; ++i)
                    {
                        var attributes = device_added_message.MessageAttributes[i];
                        var device_message_attributes = new ButtplugMessageAttributes(attributes.FeatureCount, attributes.StepCount.ToArray(),
                            attributes.Endpoints.ToArray(), attributes.MaxDuration.ToArray(), null, null);
                        attribute_dict.Add(attributes.MessageType, device_message_attributes);
                    }
                    var device = new ButtplugClientDevice(_messageSorter, device_handle, device_added_message.Index, device_added_message.Name, attribute_dict);
                    _devices.Add(device_added_message.Index, device);
                    DeviceAdded.Invoke(this, new DeviceAddedEventArgs(device));
                }
                else if (server_message.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.DeviceRemoved)
                {
                    var device_removed_message = server_message.Message.ServerMessage.DeviceRemoved;
                    var device = _devices[device_removed_message.Index];
                    _devices.Remove(device_removed_message.Index);
                    DeviceRemoved.Invoke(this, new DeviceRemovedEventArgs(device));
                }
                else if (server_message.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.Disconnect)
                {
                    ServerDisconnect?.Invoke(this, null);
                }
                else if (server_message.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.Error)
                {
                    var errorMsg = server_message.Message.ServerMessage.Error;
                    var error = ButtplugException.FromError(errorMsg);
                    if (error is ButtplugPingException)
                    {
                        PingTimeout?.Invoke(this, null);
                    }
                    ErrorReceived?.Invoke(this, new ButtplugExceptionEventArgs(error));
                }
                else if (server_message.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.ScanningFinished)
                {
                    ScanningFinished?.Invoke(this, null);
                } 
                else
                {
                    // We should probably do something here with unhandled events, but I'm not particularly sure what. I miss pattern matching. :(
                }
            } 
            else
            {
                // We should probably do something here with unhandled events, but I'm not particularly sure what. I miss pattern matching. :(
            }
        }

        public async Task StartScanningAsync()
        {
            await ButtplugFFI.SendStartScanning(_messageSorter, _clientHandle);
        }

        public async Task StopScanningAsync()
        {
            await ButtplugFFI.SendStopScanning(_messageSorter, _clientHandle);
        }

        public async Task StopAllDevicesAsync()
        {
            await ButtplugFFI.SendStopAllDevices(_messageSorter, _clientHandle);
        }

        public void Dispose()
        {
            _clientHandle.Dispose();
        }
    }
}
