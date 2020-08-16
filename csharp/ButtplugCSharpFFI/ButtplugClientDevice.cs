using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using ButtplugFFI;

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
        public Dictionary<MessageAttributeType, ButtplugMessageAttributes> AllowedMessages { get; }

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
            string aName,
            Dictionary<MessageAttributeType, ButtplugMessageAttributes> aAllowedMessages)
        {
            Sorter = aSorter;
            Handle = aHandle;
            Index = aIndex;
            Name = aName;
            AllowedMessages = aAllowedMessages;
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

        public Task SendVibrateCmd(double aSpeed)
        {
            return SendVibrateCmd(new Dictionary<uint, double>() { { 0, aSpeed } });
        }

        public Task SendVibrateCmd(IEnumerable<double> aCmds)
        {
            return SendVibrateCmd(aCmds.Select((cmd, index) => (cmd, index)).ToDictionary(x => (uint)x.index, x => x.cmd));
        }

        public Task SendVibrateCmd(Dictionary<uint, double> aCmds)
        {
            return ButtplugFFI.SendVibrateCmd(Sorter, Handle, Index, aCmds);
        }

        public Task SendRotateCmd(double aSpeed, bool aClockwise)
        {
            return SendRotateCmd(new Dictionary<uint, (double, bool)>() { { 0, (aSpeed, aClockwise) } });
        }

        public Task SendRotateCmd(IEnumerable<(double, bool)> aCmds)
        {
            return SendRotateCmd(aCmds.Select((cmd, index) => (cmd, index)).ToDictionary(x => (uint)x.index, x => x.cmd));
        }

        public Task SendRotateCmd(Dictionary<uint, (double, bool)> aCmds)
        {
            return ButtplugFFI.SendRotateCmd(Sorter, Handle, Index, aCmds);
        }

        public Task SendLinearCmd(uint aDuration, double aPosition)
        {
            return SendLinearCmd(new Dictionary<uint, (uint, double)>() { { 0, (aDuration, aPosition) } });
        }

        public Task SendLinearCmd(IEnumerable<(uint, double)> aCmds)
        {
            return SendLinearCmd(aCmds.Select((cmd, index) => (cmd, index)).ToDictionary(x => (uint)x.index, x => x.cmd));
        }

        public Task SendLinearCmd(Dictionary<uint, (uint, double)> aCmds)
        {
            return ButtplugFFI.SendLinearCmd(Sorter, Handle, Index, aCmds);
        }


        public Task StopDeviceCmd()
        {
            // Every message should support this, but it doesn't hurt to check
            return ButtplugFFI.SendStopDeviceCmd(Sorter, Handle, Index);
        }

    }
}
