using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using System.Runtime.InteropServices;

namespace Buttplug
{
    public class ButtplugClient : IDisposable
    {
        private static readonly Dictionary<uint, WeakReference> _clientStorage = new Dictionary<uint, WeakReference>();
        private static uint _clientCounter = 1;

        private readonly ButtplugFFIMessageSorter _messageSorter;
        private readonly ButtplugFFIClientHandle _clientHandle;

        /// <summary>
        /// Stores information about devices currently connected to the server.
        /// </summary>
        private readonly ConcurrentDictionary<uint, ButtplugClientDevice> _devices;
        private readonly ButtplugCallback _sorterCallbackDelegate;

        // To detect redundant calls
        private bool _disposed;
        private GCHandle _indexHandle;

        public ButtplugClientDevice[] Devices => _devices.Values.ToArray();

        /// <summary>
        /// Name of the client, used for server UI/permissions.
        /// </summary>
        public string Name { get; }
        public bool Connected { get; private set; }

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

        public bool IsScanning { get; private set; }

        private object _disposeLock;

        public ButtplugClient(string aClientName): this(aClientName, StaticSorterCallback)
        {
        }

        protected ButtplugClient(string aClientName, ButtplugCallback aCallback)
        {
            Name = aClientName;
            _sorterCallbackDelegate = aCallback;
            _disposeLock = new object();

            _messageSorter = new ButtplugFFIMessageSorter();
            _devices = new ConcurrentDictionary<uint, ButtplugClientDevice>();

            var context = new WeakReference(this);
            var clientIndex = _clientCounter;
            _clientCounter += 1;

            // Since we can pass the handle, I don't *think* this needs to be pinned?
            _indexHandle = GCHandle.Alloc(clientIndex);
            _clientStorage.Add(clientIndex, context);
            _clientHandle = ButtplugFFI.SendCreateClient(aClientName, _sorterCallbackDelegate, GCHandle.ToIntPtr(_indexHandle));
        }

        ~ButtplugClient() => Dispose(false);

        public async Task ConnectAsync(ButtplugEmbeddedConnectorOptions aConnector)
        {
            if (aConnector == null)
            {
                aConnector = new ButtplugEmbeddedConnectorOptions();
            }

            await ButtplugFFI.SendConnectLocal(
                _messageSorter,
                _clientHandle,
                aConnector.ServerName,
                aConnector.MaxPingTime,
                aConnector.AllowRawMessages,
                aConnector.DeviceConfigJSON,
                aConnector.UserDeviceConfigJSON,
                aConnector.DeviceCommunicationManagerTypes,
                _sorterCallbackDelegate, GCHandle.ToIntPtr(_indexHandle))
                .ConfigureAwait(false);

            Connected = true;
        }

        public async Task ConnectAsync(ButtplugWebsocketConnectorOptions aConnector)
        {
            await ButtplugFFI.SendConnectWebsocket(_messageSorter, _clientHandle, aConnector.NetworkAddress.ToString(), false, _sorterCallbackDelegate, GCHandle.ToIntPtr(_indexHandle))
                             .ConfigureAwait(false);

            Connected = true;
        }

        public async Task DisconnectAsync()
        {
            await ButtplugFFI.SendDisconnect(_messageSorter, _clientHandle, _sorterCallbackDelegate, GCHandle.ToIntPtr(_indexHandle))
                             .ConfigureAwait(false);

            _devices.Clear();
            Connected = false;
        }

        protected static void StaticSorterCallback(IntPtr ctx, IntPtr buf, int buf_length)
        {
            GCHandle indexHandle = GCHandle.FromIntPtr(ctx);
            uint index = (uint)indexHandle.Target;

            var client = _clientStorage[index];
            if (client.IsAlive)
            {
                ((ButtplugClient)client.Target).SorterCallbackHandler(buf, buf_length);
            }
        }

        protected void SorterCallbackHandler(IntPtr buf, int buf_length)
        {
            // Process the data BEFORE we throw to the C# executor, otherwise
            // Rust will clean up the memory and we'll have nothing to read
            // from, meaning a null message at best and a crash at worst.
            Span<byte> byteArray;
            unsafe
            {
                byteArray = new Span<byte>(buf.ToPointer(), buf_length);
            }

            var server_message = ButtplugFFIServerMessage.Parser.ParseFrom(byteArray.ToArray());
            // Run the response in the context of the C# executor, not the Rust
            // thread. This means that if something goes wrong we at least
            // aren't blocking a rust executor thread.
            Task.Run(() =>
            {
                if (server_message.Id > 0)
                {
                    _messageSorter.CheckMessage(server_message);
                }
                else if (server_message.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.ServerMessage)
                {
                    if (server_message.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.DeviceAdded)
                    {
                        var device_added_message = server_message.Message.ServerMessage.DeviceAdded;
                        if (_devices.ContainsKey(device_added_message.Index))
                        {
                            ErrorReceived?.Invoke(this, new ButtplugExceptionEventArgs(new ButtplugDeviceException("A duplicate device index was received. This is most likely a bug, please file at https://github.com/buttplugio/buttplug-rs-ffi")));
                            return;
                        }

                        var device_handle = ButtplugFFI.SendCreateDevice(_clientHandle, device_added_message.Index);
                        var attribute_dict = new Dictionary<ServerMessage.Types.MessageAttributeType, ButtplugMessageAttributes>();
                        for (var i = 0; i < device_added_message.MessageAttributes.Count; ++i)
                        {
                            var attributes = device_added_message.MessageAttributes[i];
                            var device_message_attributes = new ButtplugMessageAttributes(attributes.FeatureCount, attributes.StepCount.ToArray(),
                                                                                          attributes.Endpoints.ToArray(), attributes.MaxDuration.ToArray(), null, null);
                            attribute_dict.Add(attributes.MessageType, device_message_attributes);
                        }

                        var device = new ButtplugClientDevice(_messageSorter, device_handle, device_added_message.Index, device_added_message.Name, attribute_dict, _sorterCallbackDelegate, GCHandle.ToIntPtr(_indexHandle));
                        _devices.TryAdd(device_added_message.Index, device);
                        DeviceAdded?.Invoke(this, new DeviceAddedEventArgs(device));
                    }
                    else if (server_message.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.DeviceRemoved)
                    {
                        var device_removed_message = server_message.Message.ServerMessage.DeviceRemoved;
                        if (!_devices.ContainsKey(device_removed_message.Index))
                        {
                            // Device was removed from our dict before we could remove it ourselves.
                            return;
                        }

                        try
                        {
                            var device = _devices[device_removed_message.Index];
                            _devices.TryRemove(device_removed_message.Index, out _);
                            DeviceRemoved?.Invoke(this, new DeviceRemovedEventArgs(device));
                        }
                        catch (KeyNotFoundException)
                        {
                            ErrorReceived?.Invoke(this, new ButtplugExceptionEventArgs(new ButtplugDeviceException($"Cannot remove device index {device_removed_message.Index}, device not found.")));
                        }
                    }
                    else if (server_message.Message.ServerMessage.MsgCase == ServerMessage.MsgOneofCase.Disconnect)
                    {
                        Connected = false;
                        _devices.Clear();
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
                        IsScanning = false;
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
            });
        }

        public async Task StartScanningAsync()
        {
            IsScanning = true;
            await ButtplugFFI.SendStartScanning(_messageSorter, _clientHandle, _sorterCallbackDelegate, GCHandle.ToIntPtr(_indexHandle))
                             .ConfigureAwait(false);
        }

        public async Task StopScanningAsync()
        {
            IsScanning = false;
            await ButtplugFFI.SendStopScanning(_messageSorter, _clientHandle, _sorterCallbackDelegate, GCHandle.ToIntPtr(_indexHandle))
                             .ConfigureAwait(false);
        }

        public async Task StopAllDevicesAsync()
        {
            await ButtplugFFI.SendStopAllDevices(_messageSorter, _clientHandle, _sorterCallbackDelegate, GCHandle.ToIntPtr(_indexHandle))
                             .ConfigureAwait(false);
        }
        public async Task PingAsync()
        {
            await ButtplugFFI.SendPing(_messageSorter, _clientHandle, _sorterCallbackDelegate, GCHandle.ToIntPtr(_indexHandle))
                             .ConfigureAwait(false);
        }

        public void Dispose()
        {
            Dispose(true);
            // Suppress finalization.
            GC.SuppressFinalize(this);
        }

        // Protected implementation of Dispose pattern.
        protected virtual void Dispose(bool disposing)
        {
            lock (_disposeLock) 
            {
                if (_disposed)
                {
                    return;
                }

                if (disposing)
                {
                    // Dispose managed state (managed objects).
                    _clientStorage.Remove((uint)_indexHandle.Target);
                    _indexHandle.Free();
                    _clientHandle?.Dispose();
                }

                _disposed = true;
            }
        }
    }
}
