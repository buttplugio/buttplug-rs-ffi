using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Buttplug
{
    public class ButtplugClientDevice : IDisposable
    {
        private readonly ButtplugFFIMessageSorter _sorter;
        private readonly ButtplugFFIDeviceHandle _handle;
        private readonly ButtplugCallback _sorterCallback;
        private readonly IntPtr _sorterCallbackCtx;

        private object _disposeLock;

        private bool _disposed;

        /// <summary>
        /// The device index, which uniquely identifies the device on the server.
        /// </summary>
        /// <remarks>
        /// If a device is removed, this may be the only populated field. If the same device
        /// reconnects, the index should be reused.
        /// </remarks>
        public uint Index { get; }

        /// <summary>
        /// The device name, which usually contains the device brand and model.
        /// </summary>
        public string Name { get; }

        /// <summary>
        /// The Buttplug Protocol messages supported by this device, with additional attributes.
        /// </summary>
        public Dictionary<ServerMessage.Types.MessageAttributeType, ButtplugMessageAttributes> AllowedMessages { get; }

        /// <summary>
        /// Initializes a new instance of the <see cref="ButtplugClientDevice"/> class, using
        /// discrete parameters.
        /// </summary>
        /// <param name="aIndex">The device index.</param>
        /// <param name="aName">The device name.</param>
        /// <param name="aAllowedMessages">The device allowed message list, with corresponding attributes.</param>
        internal ButtplugClientDevice(ButtplugFFIMessageSorter aSorter,
            ButtplugFFIDeviceHandle aHandle,
            uint aIndex,
            string aName,
            Dictionary<ServerMessage.Types.MessageAttributeType, ButtplugMessageAttributes> aAllowedMessages,
            ButtplugCallback aCallback,
            IntPtr aCallbackCtx)
        {
            _disposeLock = new object();
            _disposed = false;
            _sorter = aSorter;
            _handle = aHandle;
            Index = aIndex;
            Name = aName;
            AllowedMessages = aAllowedMessages;
            _sorterCallback = aCallback;
            _sorterCallbackCtx = aCallbackCtx;
        }

        ~ButtplugClientDevice() => Dispose(false);

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
                    _handle?.Dispose();
                }

                _disposed = true;
            }
        }

        public bool Equals(ButtplugClientDevice aDevice)
        {
            return Index == aDevice.Index;
        }

        public Task SendVibrateCmd(double aSpeed)
        {
            // If the message is missing from our dict, we should still send anyways just to let the rust library throw.
            var count = 1u;
            if (AllowedMessages.ContainsKey(ServerMessage.Types.MessageAttributeType.VibrateCmd))
            {
                count = AllowedMessages[ServerMessage.Types.MessageAttributeType.VibrateCmd].FeatureCount;
            }

            // There is probably a cleaner, LINQyer way to do this but ugh don't care.
            var commandDict = new Dictionary<uint, double>();
            for (var i = 0u; i < count; ++i)
            {
                commandDict.Add(i, aSpeed);
            }

            return SendVibrateCmd(commandDict);
        }

        public Task SendVibrateCmd(IEnumerable<double> aCmds)
        {
            return SendVibrateCmd(aCmds.Select((cmd, index) => (cmd, index)).ToDictionary(x => (uint)x.index, x => x.cmd));
        }

        public Task SendVibrateCmd(Dictionary<uint, double> aCmds)
        {
            return ButtplugFFI.SendVibrateCmd(_sorter, _handle, Index, aCmds, _sorterCallback, _sorterCallbackCtx);
        }

        public Task SendRotateCmd(double aSpeed, bool aClockwise)
        {
            // If the message is missing from our dict, we should still send anyways just to let the rust library throw.
            var count = 1u;
            if (AllowedMessages.ContainsKey(ServerMessage.Types.MessageAttributeType.RotateCmd))
            {
                count = AllowedMessages[ServerMessage.Types.MessageAttributeType.RotateCmd].FeatureCount;
            }

            // There is probably a cleaner, LINQyer way to do this but ugh don't care.
            var commandDict = new Dictionary<uint, (double, bool)>();
            for (var i = 0u; i < count; ++i)
            {
                commandDict.Add(i, (aSpeed, aClockwise));
            }

            return SendRotateCmd(commandDict);
        }

        public Task SendRotateCmd(IEnumerable<(double, bool)> aCmds)
        {
            return SendRotateCmd(aCmds.Select((cmd, index) => (cmd, index)).ToDictionary(x => (uint)x.index, x => x.cmd));
        }

        public Task SendRotateCmd(Dictionary<uint, (double, bool)> aCmds)
        {
            return ButtplugFFI.SendRotateCmd(_sorter, _handle, Index, aCmds, _sorterCallback, _sorterCallbackCtx);
        }

        public Task SendLinearCmd(uint aDuration, double aPosition)
        {
            // If the message is missing from our dict, we should still send anyways just to let the rust library throw.
            var count = 1u;
            if (AllowedMessages.ContainsKey(ServerMessage.Types.MessageAttributeType.LinearCmd))
            {
                count = AllowedMessages[ServerMessage.Types.MessageAttributeType.LinearCmd].FeatureCount;
            }

            // There is probably a cleaner, LINQyer way to do this but ugh don't care.
            var commandDict = new Dictionary<uint, (uint, double)>();
            for (var i = 0u; i < count; ++i)
            {
                commandDict.Add(i, (aDuration, aPosition));
            }

            return SendLinearCmd(commandDict);
        }

        public Task SendLinearCmd(IEnumerable<(uint, double)> aCmds)
        {
            return SendLinearCmd(aCmds.Select((cmd, index) => (cmd, index)).ToDictionary(x => (uint)x.index, x => x.cmd));
        }

        public Task SendLinearCmd(Dictionary<uint, (uint, double)> aCmds)
        {
            return ButtplugFFI.SendLinearCmd(_sorter, _handle, Index, aCmds, _sorterCallback, _sorterCallbackCtx);
        }

        public async Task<double> SendBatteryLevelCmd()
        {
            var reading = await ButtplugFFI.SendBatteryLevelCmd(_sorter, _handle, Index, _sorterCallback, _sorterCallbackCtx)
                                           .ConfigureAwait(false);

            if (reading.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.DeviceEvent
             && reading.Message.DeviceEvent.MsgCase == DeviceEvent.MsgOneofCase.BatteryLevelReading)
            {
                return reading.Message.DeviceEvent.BatteryLevelReading.Reading;
            }

            throw new ButtplugDeviceException($"Expected message type of BatteryLevelReading not received, got {reading.Message.MsgCase} instead.");
        }

        public async Task<int> SendRSSIBatteryLevelCmd()
        {
            var reading = await ButtplugFFI.SendRSSILevelCmd(_sorter, _handle, Index, _sorterCallback, _sorterCallbackCtx)
                                           .ConfigureAwait(false);

            if (reading.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.DeviceEvent
             && reading.Message.DeviceEvent.MsgCase == DeviceEvent.MsgOneofCase.RssiLevelReading)
            {
                return reading.Message.DeviceEvent.RssiLevelReading.Reading;
            }

            throw new ButtplugDeviceException($"Expected message type of RssiLevelReading not received, got {reading.Message.MsgCase} instead.");
        }

        public async Task<byte[]> SendRawReadCmd(Endpoint aEndpoint, uint aExpectedLength, uint aTimeout)
        {
            var reading = await ButtplugFFI.SendRawReadCmd(_sorter, _handle, Index, aEndpoint, aExpectedLength, aTimeout, _sorterCallback, _sorterCallbackCtx)
                                           .ConfigureAwait(false);

            if (reading.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.DeviceEvent
             && reading.Message.DeviceEvent.MsgCase == DeviceEvent.MsgOneofCase.RawReading)
            {
                return reading.Message.DeviceEvent.RawReading.Data.ToArray();
            }

            throw new ButtplugDeviceException($"Expected message type of RssiLevelReading not received, got {reading.Message.MsgCase} instead.");
        }

        public Task SendRawWriteCmd(Endpoint aEndpoint, byte[] aData, bool aWriteWithResponse)
        {
            return ButtplugFFI.SendRawWriteCmd(_sorter, _handle, Index, aEndpoint, aData, aWriteWithResponse, _sorterCallback, _sorterCallbackCtx);
        }

        public Task SendRawSubscribeCmd(Endpoint aEndpoint)
        {
            return ButtplugFFI.SendRawSubscribeCmd(_sorter, _handle, Index, aEndpoint, _sorterCallback, _sorterCallbackCtx);
        }

        public Task SendRawUnsubscribeCmd(Endpoint aEndpoint)
        {
            return ButtplugFFI.SendRawUnsubscribeCmd(_sorter, _handle, Index, aEndpoint, _sorterCallback, _sorterCallbackCtx);
        }

        public Task SendStopDeviceCmd()
        {
            // Every message should support this, but it doesn't hurt to check
            return ButtplugFFI.SendStopDeviceCmd(_sorter, _handle, Index, _sorterCallback, _sorterCallbackCtx);
        }
    }
}
