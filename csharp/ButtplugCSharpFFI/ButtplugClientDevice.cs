using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Buttplug
{
    public class ButtplugClientDevice : IDisposable
    {
        private readonly ButtplugFFIMessageSorter Sorter;

        private readonly ButtplugFFIDeviceHandle Handle;

        private readonly ButtplugCallback SorterCallback;
        private readonly IntPtr SorterCallbackCtx;

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
        /// <param name="aMessages">The device allowed message list, with corresponding attributes.</param>
        internal ButtplugClientDevice(ButtplugFFIMessageSorter aSorter,
            ButtplugFFIDeviceHandle aHandle,
            uint aIndex,
            string aName,
            Dictionary<ServerMessage.Types.MessageAttributeType, ButtplugMessageAttributes> aAllowedMessages,
            ButtplugCallback aCallback,
            IntPtr aCallbackCtx)
        {
            Sorter = aSorter;
            Handle = aHandle;
            Index = aIndex;
            Name = aName;
            AllowedMessages = aAllowedMessages;
            SorterCallback = aCallback;
            SorterCallbackCtx = aCallbackCtx;
        }

        public void Dispose()
        {
            Handle.Dispose();
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
            return ButtplugFFI.SendVibrateCmd(Sorter, Handle, Index, aCmds, SorterCallback, SorterCallbackCtx);
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
            return ButtplugFFI.SendRotateCmd(Sorter, Handle, Index, aCmds, SorterCallback, SorterCallbackCtx);
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
            return ButtplugFFI.SendLinearCmd(Sorter, Handle, Index, aCmds, SorterCallback, SorterCallbackCtx);
        }

        public async Task<double> SendBatteryLevelCmd()
        {
            var reading = await ButtplugFFI.SendBatteryLevelCmd(Sorter, Handle, Index, SorterCallback, SorterCallbackCtx)
                                           .ConfigureAwait(false);
            if (reading.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.DeviceEvent && reading.Message.DeviceEvent.MsgCase == DeviceEvent.MsgOneofCase.BatteryLevelReading)
            {
                return reading.Message.DeviceEvent.BatteryLevelReading.Reading;
            }
            throw new ButtplugDeviceException($"Expected message type of BatteryLevelReading not received, got {reading.Message.MsgCase} instead.");
        }

        public async Task<int> SendRSSIBatteryLevelCmd()
        {
            var reading = await ButtplugFFI.SendRSSILevelCmd(Sorter, Handle, Index, SorterCallback, SorterCallbackCtx)
                                           .ConfigureAwait(false);
            if (reading.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.DeviceEvent && reading.Message.DeviceEvent.MsgCase == DeviceEvent.MsgOneofCase.RssiLevelReading)
            {
                return reading.Message.DeviceEvent.RssiLevelReading.Reading;
            }
            throw new ButtplugDeviceException($"Expected message type of RssiLevelReading not received, got {reading.Message.MsgCase} instead.");
        }

        public async Task<byte[]> SendRawReadCmd(Endpoint aEndpoint, uint aExpectedLength, uint aTimeout)
        {
            var reading = await ButtplugFFI.SendRawReadCmd(Sorter, Handle, Index, aEndpoint, aExpectedLength, aTimeout, SorterCallback, SorterCallbackCtx)
                                           .ConfigureAwait(false);
            if (reading.Message.MsgCase == ButtplugFFIServerMessage.Types.FFIMessage.MsgOneofCase.DeviceEvent && reading.Message.DeviceEvent.MsgCase == DeviceEvent.MsgOneofCase.RawReading)
            {
                return reading.Message.DeviceEvent.RawReading.Data.ToArray();
            }
            throw new ButtplugDeviceException($"Expected message type of RssiLevelReading not received, got {reading.Message.MsgCase} instead.");
        }

        public Task SendRawWriteCmd(Endpoint aEndpoint, byte[] aData, bool aWriteWithResponse)
        {
            return ButtplugFFI.SendRawWriteCmd(Sorter, Handle, Index, aEndpoint, aData, aWriteWithResponse, SorterCallback, SorterCallbackCtx);
        }

        public Task SendRawSubscribeCmd(Endpoint aEndpoint)
        {
            return ButtplugFFI.SendRawSubscribeCmd(Sorter, Handle, Index, aEndpoint, SorterCallback, SorterCallbackCtx);
        }

        public Task SendRawUnsubscribeCmd(Endpoint aEndpoint)
        {
            return ButtplugFFI.SendRawUnsubscribeCmd(Sorter, Handle, Index, aEndpoint, SorterCallback, SorterCallbackCtx);
        }

        public Task SendStopDeviceCmd()
        {
            // Every message should support this, but it doesn't hurt to check
            return ButtplugFFI.SendStopDeviceCmd(Sorter, Handle, Index, SorterCallback, SorterCallbackCtx);
        }
    }
}
