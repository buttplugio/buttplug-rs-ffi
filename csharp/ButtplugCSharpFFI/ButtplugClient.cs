using ButtplugFFI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ButtplugCSharpFFI
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
        //public event EventHandler<ButtplugExceptionEventArgs> ErrorReceived;

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

        private ButtplugCallback SorterCallbackDelegate;

        public ButtplugClient(string aClientName)
        {
            Name = aClientName;
            SorterCallbackDelegate = SorterCallback;
            _clientHandle = ButtplugFFI.SendCreateClient(aClientName, SorterCallbackDelegate);
        }

        public async Task ConnectLocal(
            ButtplugServerOptions aOptions = null,
            ushort aDeviceCommManagerTypes = (ushort)ClientMessage.Types.DeviceCommunicationManagerTypes.All)
        {
            if (aOptions == null)
            {
                aOptions = new ButtplugServerOptions();
            }
            Console.WriteLine("Trying to connect");
            await ButtplugFFI.SendConnectLocal(
                _messageSorter,
                _clientHandle,
                aOptions.ServerName,
                aOptions.MaxPingTime,
                aOptions.AllowRawMessages,
                aOptions.DeviceConfigurationJson,
                aOptions.UserDeviceConfigurationJson,
                aDeviceCommManagerTypes);
            Console.WriteLine("Connected");
        }

        public async Task ConnectWebsocket()
        {
            await ButtplugFFI.SendConnectWebsocket(_messageSorter, _clientHandle, "ws://127.0.0.1:12345", false);
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
            else
            {
                if (server_message.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.ServerMessage &&
                    server_message.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.DeviceAdded)
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
                    DeviceAdded.Invoke(this, new DeviceAddedEventArgs(device));
                }
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

        public void Dispose()
        {
            _clientHandle.Dispose();
        }
    }
}
