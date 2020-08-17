using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using ButtplugFFI;
using FlatBuffers;
using System.Runtime.InteropServices.ComTypes;
using System.Collections.Generic;
using System.Linq;

namespace ButtplugCSharpFFI
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    public delegate void ButtplugCallback(UIntPtr buf, int buf_length);

    internal class ButtplugFFIClientHandle : SafeHandle
    {
        public ButtplugFFIClientHandle() : base(IntPtr.Zero, true) { }

        public override bool IsInvalid
        {
            get { return this.handle == IntPtr.Zero; }
        }

        protected override bool ReleaseHandle()
        {
            if (!this.IsInvalid)
            {
                ButtplugFFICalls.buttplug_free_client(handle);
            }
            return true;
        }

    }

    internal class ButtplugFFIDeviceHandle : SafeHandle
    {
        public ButtplugFFIDeviceHandle() : base(IntPtr.Zero, true) { }

        public override bool IsInvalid
        {
            get { return this.handle == IntPtr.Zero; }
        }

        protected override bool ReleaseHandle()
        {
            if (!this.IsInvalid)
            {
                ButtplugFFICalls.buttplug_free_device(handle);
            }
            return true;
        }

    }

    internal class ButtplugFFICalls
   {
        [DllImport("buttplug_ffi")]
        internal static extern ButtplugFFIClientHandle buttplug_create_client(ButtplugCallback callback, byte[] buf, int buf_length);

        [DllImport("buttplug_ffi")]
        internal static extern void buttplug_free_client(IntPtr client_handle);

        [DllImport("buttplug_ffi")]
        internal static extern void buttplug_parse_client_message(ButtplugFFIClientHandle client_handle, byte[] buf, int buf_length);

        [DllImport("buttplug_ffi")]
        internal static extern ButtplugFFIDeviceHandle buttplug_create_device(ButtplugFFIClientHandle client_handle, byte[] buf, int buf_length);

        [DllImport("buttplug_ffi")]
        internal static extern void buttplug_parse_device_message(ButtplugFFIDeviceHandle client_handle, byte[] buf, int buf_length);

        [DllImport("buttplug_ffi")]
        internal static extern void buttplug_free_device(IntPtr device_handle);
    }

    internal class ButtplugFFI
    {
        internal static ButtplugFFIClientHandle SendCreateClient(string aClientName, ButtplugCallback aCallback)
        {
            var builder = new FlatBufferBuilder(1024);
            var client_name = builder.CreateString(aClientName);
            var create_client_msg = CreateClient.CreateCreateClient(builder, client_name);
            builder.Finish(create_client_msg.Value);
            var buf = builder.SizedByteArray();
            return ButtplugFFICalls.buttplug_create_client(aCallback, buf, buf.Length);
        }

        internal static Task<ServerMessage> SendClientMessage(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, FlatBufferBuilder aBuilder, ClientMessageType aType, int aOffset)
        {
            ClientMessage.StartClientMessage(aBuilder);
            ClientMessage.AddMessageType(aBuilder, aType);
            ClientMessage.AddMessage(aBuilder, aOffset);
            var task = aSorter.PrepareClientMessage(aBuilder);
            var create_client_msg = CreateClient.EndCreateClient(aBuilder);
            aBuilder.Finish(create_client_msg.Value);
            var buf = aBuilder.SizedByteArray();
            ButtplugFFICalls.buttplug_parse_client_message(aHandle, buf, buf.Length);
            return task;
        }

        internal static Task<ServerMessage> SendConnectLocal(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, string aServerName, uint aMaxPingTime)
        {
            var builder = new FlatBufferBuilder(1024);
            var msg = ConnectLocal.CreateConnectLocal(builder, builder.CreateString(aServerName), aMaxPingTime, 0);
            return SendClientMessage(aSorter, aHandle, builder, ClientMessageType.ConnectLocal, msg.Value);
        }

        internal static Task<ServerMessage> SendConnectWebsocket(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, string aAddress, bool aIgnoreCert)
        {
            var builder = new FlatBufferBuilder(1024);
            var msg = ConnectWebsocket.CreateConnectWebsocket(builder, builder.CreateString(aAddress), aIgnoreCert);
            return SendClientMessage(aSorter, aHandle, builder, ClientMessageType.ConnectWebsocket, msg.Value);
        }

        internal static Task<ServerMessage> SendStartScanning(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle)
        {
            var builder = new FlatBufferBuilder(1024);
            StartScanning.StartStartScanning(builder);
            var msg = StartScanning.EndStartScanning(builder);
            return SendClientMessage(aSorter, aHandle, builder, ClientMessageType.StartScanning, msg.Value);
        }

        internal static Task<ServerMessage> SendStopScanning(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle)
        {
            var builder = new FlatBufferBuilder(1024);
            StopScanning.StartStopScanning(builder);
            var msg = StopScanning.EndStopScanning(builder);
            return SendClientMessage(aSorter, aHandle, builder, ClientMessageType.StopScanning, msg.Value);
        }

        internal static ButtplugFFIDeviceHandle SendCreateDevice(ButtplugFFIClientHandle aHandle, uint aDeviceIndex)
        {
            var builder = new FlatBufferBuilder(128);
            CreateDevice.StartCreateDevice(builder);
            CreateDevice.AddIndex(builder, aDeviceIndex);
            var get_device_msg = CreateDevice.EndCreateDevice(builder);
            builder.Finish(get_device_msg.Value);
            var buf = builder.SizedByteArray();
            return ButtplugFFICalls.buttplug_create_device(aHandle, buf, buf.Length);
        }

        internal static Task<ServerMessage> SendDeviceMessage(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, FlatBufferBuilder aBuilder, DeviceMessageType aType, int aOffset)
        {
            DeviceMessage.StartDeviceMessage(aBuilder);
            DeviceMessage.AddMessageType(aBuilder, aType);
            DeviceMessage.AddMessage(aBuilder, aOffset);
            DeviceMessage.AddDeviceIndex(aBuilder, aDeviceIndex);
            var task = aSorter.PrepareClientMessage(aBuilder);
            var device_msg = DeviceMessage.EndDeviceMessage(aBuilder);
            aBuilder.Finish(device_msg.Value);
            var buf = aBuilder.SizedByteArray();
            ButtplugFFICalls.buttplug_parse_device_message(aHandle, buf, buf.Length);
            return task;
        }

        internal static Task<ServerMessage> SendVibrateCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceindex, Dictionary<uint, double> aSpeeds) {
            var builder = new FlatBufferBuilder(1024);
            var command_list = new List<Offset<VibrateComponent>>();
            foreach (var pair in aSpeeds)
            {
                VibrateComponent.StartVibrateComponent(builder);
                VibrateComponent.AddIndex(builder, pair.Key);
                VibrateComponent.AddSpeed(builder, pair.Value);
                var component = VibrateComponent.EndVibrateComponent(builder);
                command_list.Add(component);
            }
            var param_array = VibrateCmd.CreateSpeedsVector(builder, command_list.ToArray());
            VibrateCmd.StartVibrateCmd(builder);
            VibrateCmd.AddSpeeds(builder, param_array);
            var cmd = VibrateCmd.EndVibrateCmd(builder);
            return SendDeviceMessage(aSorter, aHandle, aDeviceindex, builder, DeviceMessageType.VibrateCmd, cmd.Value);
        }

        internal static Task<ServerMessage> SendRotateCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceindex, Dictionary<uint, (double, bool)> aRotations)
        {
            var builder = new FlatBufferBuilder(1024);
            var command_list = new List<Offset<RotateComponent>>();
            foreach (var pair in aRotations)
            {
                RotateComponent.StartRotateComponent(builder);
                RotateComponent.AddIndex(builder, pair.Key);
                RotateComponent.AddSpeed(builder, pair.Value.Item1);
                RotateComponent.AddClockwise(builder, pair.Value.Item2);
                var component = RotateComponent.EndRotateComponent(builder);
                command_list.Add(component);
            }
            var param_array = RotateCmd.CreateRotationsVector(builder, command_list.ToArray());
            RotateCmd.StartRotateCmd(builder);
            RotateCmd.AddRotations(builder, param_array);
            var cmd = RotateCmd.EndRotateCmd(builder);
            return SendDeviceMessage(aSorter, aHandle, aDeviceindex, builder, DeviceMessageType.RotateCmd, cmd.Value);
        }

        internal static Task<ServerMessage> SendLinearCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceindex, Dictionary<uint, (uint, double)> aLinears)
        {
            var builder = new FlatBufferBuilder(1024);
            var command_list = new List<Offset<LinearComponent>>();
            foreach (var pair in aLinears)
            {
                LinearComponent.StartLinearComponent(builder);
                LinearComponent.AddIndex(builder, pair.Key);
                LinearComponent.AddDuration(builder, pair.Value.Item1);
                LinearComponent.AddPosition(builder, pair.Value.Item2);
                var component = LinearComponent.EndLinearComponent(builder);
                command_list.Add(component);
            }
            var param_array = LinearCmd.CreateMovementsVector(builder, command_list.ToArray());
            LinearCmd.StartLinearCmd(builder);
            LinearCmd.AddMovements(builder, param_array);
            var cmd = LinearCmd.EndLinearCmd(builder);
            return SendDeviceMessage(aSorter, aHandle, aDeviceindex, builder, DeviceMessageType.LinearCmd, cmd.Value);
        }

        internal static Task<ServerMessage> SendStopDeviceCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceindex)
        {
            var builder = new FlatBufferBuilder(1024);
            StopDeviceCmd.StartStopDeviceCmd(builder);
            var cmd = StopDeviceCmd.EndStopDeviceCmd(builder);
            return SendDeviceMessage(aSorter, aHandle, aDeviceindex, builder, DeviceMessageType.StopDeviceCmd, cmd.Value);
        }
    }
}
