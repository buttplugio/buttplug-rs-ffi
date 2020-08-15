using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ButtplugCSharpFFI
{
    public class ButtplugClientDevice : IDisposable
    {
        /// <summary>
        /// The device index, which uniquely identifies the device on the server.
        /// </summary>
        /// <remarks>
        /// If a device is removed, this may be the only populated field. If the same device
        /// reconnects, the index should be reused.
        /// </remarks>
        public readonly uint Index;

        /// <summary>
        /// The device name, which usually contains the device brand and model.
        /// </summary>        [NotNull]
        public readonly string Name;

        /// <summary>
        /// The Buttplug Protocol messages supported by this device, with additional attributes.
        /// </summary>
        //public Dictionary<Type, MessageAttributes> AllowedMessages { get; }

        private ButtplugFFIMessageSorter Sorter;

        private ButtplugFFIDeviceHandle Handle;

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
            string aName)
//            Dictionary<string, MessageAttributes> aMessages)
        {
            Sorter = aSorter;
            Handle = aHandle;
            Index = aIndex;
            Name = aName;
            /*
            AllowedMessages = new Dictionary<Type, MessageAttributes>();
            foreach (var msg in aMessages)
            {
                var msgType = ButtplugUtils.GetMessageType(msg.Key);
                if (msgType == null)
                {
                    throw new ButtplugDeviceException($"Message type {msg.Key} does not exist.");
                }

                AllowedMessages[msgType] = msg.Value;
            }
            */
        }

        public void Dispose()
        {
            Handle.Dispose();
        }

        /*
        public MessageAttributes GetMessageAttributes(Type aMsgType)
        {
            ButtplugUtils.ArgumentNotNull(aMsgType, nameof(aMsgType));
            if (!aMsgType.IsSubclassOf(typeof(ButtplugDeviceMessage)))
            {
                throw new ArgumentException("Argument must be subclass of ButtplugDeviceMessage");
            }

            if (!AllowedMessages.ContainsKey(aMsgType))
            {
                throw new ButtplugDeviceException($"Message type {aMsgType.Name} not allowed for device {Name}.");
            }

            return AllowedMessages[aMsgType];
        }

        public MessageAttributes GetMessageAttributes<T>()
        where T : ButtplugDeviceMessage
        {
            return GetMessageAttributes(typeof(T));
        }
        */


        public bool Equals(ButtplugClientDevice aDevice)
        {
            return Index == aDevice.Index;
        }

        /*
        public void CheckGenericSubcommandList<T>(IEnumerable<T> aCmdList, uint aLimitValue)
            where T : GenericMessageSubcommand
        {
            if (!aCmdList.Any() || aCmdList.Count() > aLimitValue)
            {
                if (aLimitValue == 1)
                {
                    throw new ButtplugDeviceException(_bpLogger, $"{typeof(T).Name} requires 1 subcommand for this device, {aCmdList.Count()} present.");
                }

                throw new ButtplugDeviceException(_bpLogger, $"{typeof(T).Name} requires between 1 and {aLimitValue} subcommands for this device, {aCmdList.Count()} present.");
            }

            foreach (var cmd in aCmdList)
            {
                if (cmd.Index >= aLimitValue)
                {
                    throw new ButtplugDeviceException(_bpLogger, $"Index {cmd.Index} is out of bounds for {typeof(T).Name} for this device.");
                }
            }
        }

        private void CheckAllowedMessageType<T>()
        where T : ButtplugDeviceMessage
        {
            if (!AllowedMessages.ContainsKey(typeof(T)))
            {
                throw new ButtplugDeviceException($"Device {Name} does not support message type {typeof(T).Name}");
            }
        }
        */

        public Task SendVibrateCmd(double aSpeed)
        {
            return ButtplugFFI.SendVibrateCmd(Sorter, Handle, Index, new List<double>() { aSpeed });
            //await SendMessageAsync(VibrateCmd.Create(aSpeed, GetMessageAttributes<VibrateCmd>().FeatureCount.Value)).ConfigureAwait(false);
        }
        /*
        public async Task SendVibrateCmd(IEnumerable<double> aCmds)
        {
            var msg = VibrateCmd.Create(aCmds);
            CheckGenericSubcommandList(msg.Speeds, GetMessageAttributes<VibrateCmd>().FeatureCount.Value);
            await SendMessageAsync(VibrateCmd.Create(aCmds)).ConfigureAwait(false);
        }

        public async Task SendRotateCmd(double aSpeed, bool aClockwise)
        {
            CheckAllowedMessageType<RotateCmd>();
            await SendMessageAsync(RotateCmd.Create(aSpeed, aClockwise, GetMessageAttributes<RotateCmd>().FeatureCount.Value)).ConfigureAwait(false);
        }

        public async Task SendRotateCmd(IEnumerable<(double, bool)> aCmds)
        {
            CheckAllowedMessageType<RotateCmd>();
            var msg = RotateCmd.Create(aCmds);
            CheckGenericSubcommandList(msg.Rotations, GetMessageAttributes<RotateCmd>().FeatureCount.Value);
            await SendMessageAsync(RotateCmd.Create(aCmds)).ConfigureAwait(false);
        }

        public async Task SendLinearCmd(uint aDuration, double aPosition)
        {
            CheckAllowedMessageType<LinearCmd>();
            await SendMessageAsync(LinearCmd.Create(aDuration, aPosition, GetMessageAttributes<LinearCmd>().FeatureCount.Value)).ConfigureAwait(false);
        }

        public async Task SendLinearCmd(IEnumerable<(uint, double)> aCmds)
        {
            CheckAllowedMessageType<LinearCmd>();
            var msg = LinearCmd.Create(aCmds);
            CheckGenericSubcommandList(msg.Vectors, GetMessageAttributes<LinearCmd>().FeatureCount.Value);
            await SendMessageAsync(LinearCmd.Create(aCmds)).ConfigureAwait(false);
        }
        */

        public Task StopDeviceCmd()
        {
            // Every message should support this, but it doesn't hurt to check
            return ButtplugFFI.SendStopDeviceCmd(Sorter, Handle, Index);
        }

    }
}
