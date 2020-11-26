using System;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using Google.Protobuf;

namespace Buttplug
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
        [DllImport("buttplug_rs_ffi")]
        internal static extern ButtplugFFIClientHandle buttplug_create_client(ButtplugCallback callback, string client_name);

        [DllImport("buttplug_rs_ffi")]
        internal static extern void buttplug_free_client(IntPtr client_handle);

        [DllImport("buttplug_rs_ffi")]
        internal static extern void buttplug_parse_client_message(ButtplugFFIClientHandle client_handle, byte[] buf, int buf_length);

        [DllImport("buttplug_rs_ffi")]
        internal static extern ButtplugFFIDeviceHandle buttplug_create_device(ButtplugFFIClientHandle client_handle, uint device_index);

        [DllImport("buttplug_rs_ffi")]
        internal static extern void buttplug_parse_device_message(ButtplugFFIDeviceHandle client_handle, byte[] buf, int buf_length);

        [DllImport("buttplug_rs_ffi")]
        internal static extern void buttplug_free_device(IntPtr device_handle);

        [DllImport("buttplug_rs_ffi")]
        internal static extern void buttplug_activate_env_logger();
    }

    internal class ButtplugFFI
    {
        internal static ButtplugFFIClientHandle SendCreateClient(string aClientName, ButtplugCallback aCallback)
        {
            return ButtplugFFICalls.buttplug_create_client(aCallback, aClientName);
        }

        internal static Task<ButtplugFFIServerMessage> SendClientMessage(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, ClientMessage aMsg)
        {
            var task = aSorter.PrepareClientMessage(aMsg);
            var buf = aMsg.ToByteArray();
            ButtplugFFICalls.buttplug_parse_client_message(aHandle, buf, buf.Length);
            return task;
        }

        internal static Task<ButtplugFFIServerMessage> SendConnectLocal(
            ButtplugFFIMessageSorter aSorter, 
            ButtplugFFIClientHandle aHandle,
            string aServerName,
            uint aMaxPingTime,
            bool aAllowRawMessages,
            string aDeviceConfigJSON,
            string aUserDeviceConfigJSON,
            ushort aDeviceCommManagerTypes)
        {
            var msg = new ClientMessage();
            msg.Message = new ClientMessage.Types.FFIMessage();
            msg.Message.ConnectLocal = new ClientMessage.Types.ConnectLocal
            {
                ServerName = aServerName,
                MaxPingTime = aMaxPingTime,
                AllowRawMessages = aAllowRawMessages,
                DeviceConfigurationJson = aDeviceConfigJSON ?? "",
                UserDeviceConfigurationJson = aUserDeviceConfigJSON ?? "",
                CommManagerTypes = aDeviceCommManagerTypes
            };
            return SendClientMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendConnectWebsocket(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, string aAddress, bool aIgnoreCert)
        {
            var msg = new ClientMessage();
            msg.Message = new ClientMessage.Types.FFIMessage();
            msg.Message.ConnectWebsocket = new ClientMessage.Types.ConnectWebsocket
            {
                Address = aAddress,
                BypassCertVerification = aIgnoreCert,
            };
            return SendClientMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendDisconnect(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle)
        {
            var msg = new ClientMessage();
            msg.Message = new ClientMessage.Types.FFIMessage();
            msg.Message.Disconnect = new ClientMessage.Types.Disconnect();
            return SendClientMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendStartScanning(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle)
        {
            var msg = new ClientMessage();
            msg.Message = new ClientMessage.Types.FFIMessage();
            msg.Message.StartScanning = new ClientMessage.Types.StartScanning
            {
            };
            return SendClientMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendStopScanning(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle)
        {
            var msg = new ClientMessage();
            msg.Message = new ClientMessage.Types.FFIMessage();
            msg.Message.StopScanning = new ClientMessage.Types.StopScanning
            {
            };
            return SendClientMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendStopAllDevices(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle)
        {
            var msg = new ClientMessage();
            msg.Message = new ClientMessage.Types.FFIMessage();
            msg.Message.StopAllDevices = new ClientMessage.Types.StopAllDevices
            {
            };
            return SendClientMessage(aSorter, aHandle, msg);
        }
        internal static Task<ButtplugFFIServerMessage> SendPing(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle)
        {
            var msg = new ClientMessage();
            msg.Message = new ClientMessage.Types.FFIMessage();
            msg.Message.Ping = new ClientMessage.Types.Ping
            {
            };
            return SendClientMessage(aSorter, aHandle, msg);
        }

        internal static ButtplugFFIDeviceHandle SendCreateDevice(ButtplugFFIClientHandle aHandle, uint aDeviceIndex)
        {
            return ButtplugFFICalls.buttplug_create_device(aHandle, aDeviceIndex);
        }

        internal static Task<ButtplugFFIServerMessage> SendDeviceMessage(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, DeviceMessage aMsg)
        {
            var task = aSorter.PrepareDeviceMessage(aMsg);
            var buf = aMsg.ToByteArray();
            ButtplugFFICalls.buttplug_parse_device_message(aHandle, buf, buf.Length);
            return task;
        }

        internal static Task<ButtplugFFIServerMessage> SendVibrateCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Dictionary<uint, double> aSpeeds) 
        {
            var msg = new DeviceMessage();
            msg.Message = new DeviceMessage.Types.FFIMessage();
            var command_list = new List<DeviceMessage.Types.VibrateComponent>();
            foreach (var pair in aSpeeds)
            {
                command_list.Add(new DeviceMessage.Types.VibrateComponent { 
                    Index = pair.Key,
                    Speed = pair.Value,
                });
            }
            msg.Index = aDeviceIndex;
            var vibrate_cmd = new DeviceMessage.Types.VibrateCmd();
            vibrate_cmd.Speeds.Add(command_list);
            msg.Message.VibrateCmd = vibrate_cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendRotateCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Dictionary<uint, (double, bool)> aRotations)
        {
            var msg = new DeviceMessage();
            msg.Message = new DeviceMessage.Types.FFIMessage();
            var command_list = new List<DeviceMessage.Types.RotateComponent>();
            foreach (var pair in aRotations)
            {
                command_list.Add(new DeviceMessage.Types.RotateComponent
                {
                    Index = pair.Key,
                    Speed = pair.Value.Item1,
                    Clockwise = pair.Value.Item2,
                });
            }
            msg.Index = aDeviceIndex;
            var cmd = new DeviceMessage.Types.RotateCmd();
            cmd.Rotations.Add(command_list);
            msg.Message.RotateCmd = cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendLinearCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Dictionary<uint, (uint, double)> aLinears)
        {
            var msg = new DeviceMessage();
            msg.Message = new DeviceMessage.Types.FFIMessage();
            var command_list = new List<DeviceMessage.Types.LinearComponent>();
            foreach (var pair in aLinears)
            {
                command_list.Add(new DeviceMessage.Types.LinearComponent
                {
                    Index = pair.Key,
                    Duration = pair.Value.Item1,
                    Position = pair.Value.Item2,
                });
            }
            msg.Index = aDeviceIndex;
            var cmd = new DeviceMessage.Types.LinearCmd();
            cmd.Movements.Add(command_list);
            msg.Message.LinearCmd = cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendStopDeviceCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex)
        {
            var msg = new DeviceMessage();
            msg.Message = new DeviceMessage.Types.FFIMessage();
            msg.Index = aDeviceIndex;
            var cmd = new DeviceMessage.Types.StopDeviceCmd();
            msg.Message.StopDeviceCmd = cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendBatteryLevelCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex)
        {
            var msg = new DeviceMessage();
            msg.Message = new DeviceMessage.Types.FFIMessage();
            msg.Index = aDeviceIndex;
            var cmd = new DeviceMessage.Types.BatteryLevelCmd();
            msg.Message.BatteryLevelCmd = cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendRSSILevelCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex)
        {
            var msg = new DeviceMessage();
            msg.Message = new DeviceMessage.Types.FFIMessage();
            msg.Index = aDeviceIndex;
            var cmd = new DeviceMessage.Types.RSSILevelCmd();
            msg.Message.RssiLevelCmd = cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendRawReadCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Endpoint aEndpoint, uint aLength, uint aTimeout)
        {
            var msg = new DeviceMessage
            {
                Message = new DeviceMessage.Types.FFIMessage(),
                Index = aDeviceIndex
            };
            var cmd = new DeviceMessage.Types.RawReadCmd {
                Endpoint = aEndpoint,
                ExpectedLength = aLength,
                Timeout = aTimeout
            };
            msg.Message.RawReadCmd = cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendRawWriteCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Endpoint aEndpoint, byte[] aData, bool aWriteWithResponse)
        {
            var msg = new DeviceMessage
            {
                Message = new DeviceMessage.Types.FFIMessage(),
                Index = aDeviceIndex
            };
            var cmd = new DeviceMessage.Types.RawWriteCmd
            {
                Endpoint = aEndpoint,
                Data = ByteString.CopyFrom(aData),
                WriteWithResponse = aWriteWithResponse
            };
            msg.Message.RawWriteCmd = cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendRawSubscribeCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Endpoint aEndpoint)
        {
            var msg = new DeviceMessage
            {
                Message = new DeviceMessage.Types.FFIMessage(),
                Index = aDeviceIndex
            };
            var cmd = new DeviceMessage.Types.RawSubscribeCmd
            {
                Endpoint = aEndpoint,
            };
            msg.Message.RawSubscribeCmd = cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static Task<ButtplugFFIServerMessage> SendRawUnsubscribeCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Endpoint aEndpoint)
        {
            var msg = new DeviceMessage
            {
                Message = new DeviceMessage.Types.FFIMessage(),
                Index = aDeviceIndex
            };
            var cmd = new DeviceMessage.Types.RawUnsubscribeCmd
            {
                Endpoint = aEndpoint,
            };
            msg.Message.RawUnsubscribeCmd = cmd;
            return SendDeviceMessage(aSorter, aHandle, msg);
        }

        internal static void ActivateEnvLogger()
        {
            ButtplugFFICalls.buttplug_activate_env_logger();
        }
    }
}
