using ButtplugFFI;
using FlatBuffers;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices.ComTypes;
using System.Text;
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

        /// <summary>
        /// Event fired when the client receives a Log message. Should only fire if the client has
        /// requested that log messages be sent.
        /// </summary>
        //[CanBeNull]
        //public event EventHandler<LogEventArgs> Log;

        public ButtplugClient(string aClientName) {
            Name = aClientName;
            _clientHandle = ButtplugFFI.SendCreateClient(aClientName, this.SorterCallback);
        }

        public async Task ConnectLocal()
        {
            Console.WriteLine("Trying to connect");
            await ButtplugFFI.SendConnectLocal(_messageSorter, _clientHandle, "Test Server", 0);
            Console.WriteLine("Connected");
        }

        public async Task ConnectWebsocket()
        {

        }

        public void SorterCallback(UIntPtr buf, int buf_length)
        {
            unsafe {
                Span<byte> byteArray = new Span<byte>(buf.ToPointer(), buf_length);
                ByteBuffer byteBuf = new ByteBuffer(byteArray.ToArray());
                var server_message = ServerMessage.GetRootAsServerMessage(byteBuf);
                if (server_message.Id > 0)
                {
                    _messageSorter.CheckMessage(server_message);
                }
                else
                {
                    if (server_message.MessageType == ServerMessageType.DeviceAdded) {
                        var device_added_message = server_message.Message<DeviceAdded>();
                        DeviceAdded.Invoke(this,
                            new DeviceAddedEventArgs(device_added_message.Value.Name));
                    }
                }
            }
        }

        public async Task StartScanning()
        {
            await ButtplugFFI.SendStartScanning(_messageSorter, _clientHandle);
        }

        public async Task StopScanning()
        {
            await ButtplugFFI.SendStopScanning(_messageSorter, _clientHandle);
        }

        public void Dispose()
        {
            _clientHandle.Dispose();
        }
    }
}
