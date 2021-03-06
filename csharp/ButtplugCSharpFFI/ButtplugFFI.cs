using System;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using System.Collections.Generic;
using Google.Protobuf;
using Microsoft.Win32.SafeHandles;

namespace Buttplug
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    public delegate void ButtplugCallback(IntPtr ctx, IntPtr buf, int buf_length);

    internal class ButtplugFFIClientHandle : SafeHandleZeroOrMinusOneIsInvalid
    {
        public ButtplugFFIClientHandle() : base(true) { }

        protected override bool ReleaseHandle()
        {
            ButtplugFFICalls.ButtplugFreeClient(handle);
            return true;
        }
    }

    internal class ButtplugFFIDeviceHandle : SafeHandleZeroOrMinusOneIsInvalid
    {
        public ButtplugFFIDeviceHandle() : base(true) { }

        protected override bool ReleaseHandle()
        {
            ButtplugFFICalls.ButtplugFreeDevice(handle);
            return true;
        }
    }

    internal static class ButtplugFFICalls
    {
        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_create_protobuf_client")]
        internal static extern ButtplugFFIClientHandle ButtplugCreateProtobufClient(string client_name, ButtplugCallback callback, IntPtr ctx);

        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_free_client")]
        internal static extern void ButtplugFreeClient(IntPtr client_handle);

        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_client_protobuf_message")]
        internal static extern void ButtplugClientProtobufMessage(ButtplugFFIClientHandle client_handle, byte[] buf, int buf_length, ButtplugCallback callback, IntPtr ctx);

        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_create_device")]
        internal static extern ButtplugFFIDeviceHandle ButtplugCreateDevice(ButtplugFFIClientHandle client_handle, uint device_index);

        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_device_protobuf_message")]
        internal static extern void ButtplugDeviceProtobufMessage(ButtplugFFIDeviceHandle client_handle, byte[] buf, int buf_length, ButtplugCallback callback, IntPtr ctx);

        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_free_device")]
        internal static extern void ButtplugFreeDevice(IntPtr device_handle);

        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_activate_env_logger")]
        internal static extern void ButtplugActivateEnvLogger();
    }

    internal static class ButtplugFFI
    {
        internal static ButtplugFFIClientHandle SendCreateClient(string aClientName, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            return ButtplugFFICalls.ButtplugCreateProtobufClient(aClientName, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendClientMessage(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, ClientMessage aMsg, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var task = aSorter.PrepareClientMessage(aMsg);
            var buf = aMsg.ToByteArray();
            ButtplugFFICalls.ButtplugClientProtobufMessage(aHandle, buf, buf.Length, aCallback, aCallbackCtx);
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
            ushort aDeviceCommManagerTypes,
            ButtplugCallback aCallback,
            IntPtr aCallbackCtx)
        {
            var msg = new ClientMessage
            {
                Message = new ClientMessage.Types.FFIMessage
                {
                    ConnectLocal = new ClientMessage.Types.ConnectLocal
                    {
                        ServerName = aServerName,
                        MaxPingTime = aMaxPingTime,
                        AllowRawMessages = aAllowRawMessages,
                        DeviceConfigurationJson = aDeviceConfigJSON ?? "",
                        UserDeviceConfigurationJson = aUserDeviceConfigJSON ?? "",
                        CommManagerTypes = aDeviceCommManagerTypes
                    }
                }
            };

            return SendClientMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendConnectWebsocket(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, string aAddress, bool aIgnoreCert, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new ClientMessage
            {
                Message = new ClientMessage.Types.FFIMessage
                {
                    ConnectWebsocket = new ClientMessage.Types.ConnectWebsocket
                    {
                        Address = aAddress,
                        BypassCertVerification = aIgnoreCert,
                    }
                }
            };

            return SendClientMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendDisconnect(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new ClientMessage
            {
                Message = new ClientMessage.Types.FFIMessage
                {
                    Disconnect = new ClientMessage.Types.Disconnect()
                }
            };

            return SendClientMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendStartScanning(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new ClientMessage
            {
                Message = new ClientMessage.Types.FFIMessage
                {
                    StartScanning = new ClientMessage.Types.StartScanning()
                }
            };

            return SendClientMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendStopScanning(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new ClientMessage
            {
                Message = new ClientMessage.Types.FFIMessage
                {
                    StopScanning = new ClientMessage.Types.StopScanning()
                }
            };

            return SendClientMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendStopAllDevices(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new ClientMessage
            {
                Message = new ClientMessage.Types.FFIMessage
                {
                    StopAllDevices = new ClientMessage.Types.StopAllDevices()
                }
            };

            return SendClientMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }
        internal static Task<ButtplugFFIServerMessage> SendPing(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new ClientMessage
            {
                Message = new ClientMessage.Types.FFIMessage
                {
                    Ping = new ClientMessage.Types.Ping()
                }
            };

            return SendClientMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static ButtplugFFIDeviceHandle SendCreateDevice(ButtplugFFIClientHandle aHandle, uint aDeviceIndex)
        {
            return ButtplugFFICalls.ButtplugCreateDevice(aHandle, aDeviceIndex);
        }

        internal static Task<ButtplugFFIServerMessage> SendDeviceMessage(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, DeviceMessage aMsg, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var task = aSorter.PrepareDeviceMessage(aMsg);
            var buf = aMsg.ToByteArray();
            ButtplugFFICalls.ButtplugDeviceProtobufMessage(aHandle, buf, buf.Length, aCallback, aCallbackCtx);
            return task;
        }

        internal static Task<ButtplugFFIServerMessage> SendVibrateCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Dictionary<uint, double> aSpeeds, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var command_list = new List<DeviceMessage.Types.VibrateComponent>();
            foreach (var pair in aSpeeds)
            {
                command_list.Add(new DeviceMessage.Types.VibrateComponent
                {
                    Index = pair.Key,
                    Speed = pair.Value,
                });
            }

            var cmd = new DeviceMessage.Types.VibrateCmd();
            cmd.Speeds.Add(command_list);

            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    VibrateCmd = cmd
                }
            };

            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendRotateCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Dictionary<uint, (double, bool)> aRotations, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
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

            var cmd = new DeviceMessage.Types.RotateCmd();
            cmd.Rotations.Add(command_list);

            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    RotateCmd = cmd
                }
            };

            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendLinearCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Dictionary<uint, (uint, double)> aLinears, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
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

            var cmd = new DeviceMessage.Types.LinearCmd();
            cmd.Movements.Add(command_list);

            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    LinearCmd = cmd
                }
            };

            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendStopDeviceCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    StopDeviceCmd = new DeviceMessage.Types.StopDeviceCmd()
                }
            };

            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendBatteryLevelCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    BatteryLevelCmd = new DeviceMessage.Types.BatteryLevelCmd()
                }
            };

            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendRSSILevelCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    RssiLevelCmd = new DeviceMessage.Types.RSSILevelCmd()
                }
            };

            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendRawReadCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Endpoint aEndpoint, uint aLength, uint aTimeout, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    RawReadCmd = new DeviceMessage.Types.RawReadCmd
                    {
                        Endpoint = aEndpoint,
                        ExpectedLength = aLength,
                        Timeout = aTimeout
                    }
                }
            };
            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendRawWriteCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Endpoint aEndpoint, byte[] aData, bool aWriteWithResponse, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    RawWriteCmd = new DeviceMessage.Types.RawWriteCmd
                    {
                        Endpoint = aEndpoint,
                        Data = ByteString.CopyFrom(aData),
                        WriteWithResponse = aWriteWithResponse
                    }
                }
            };

            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendRawSubscribeCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Endpoint aEndpoint, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    RawSubscribeCmd = new DeviceMessage.Types.RawSubscribeCmd
                    {
                        Endpoint = aEndpoint,
                    }
                }
            };

            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static Task<ButtplugFFIServerMessage> SendRawUnsubscribeCmd(ButtplugFFIMessageSorter aSorter, ButtplugFFIDeviceHandle aHandle, uint aDeviceIndex, Endpoint aEndpoint, ButtplugCallback aCallback, IntPtr aCallbackCtx)
        {
            var msg = new DeviceMessage
            {
                Index = aDeviceIndex,
                Message = new DeviceMessage.Types.FFIMessage
                {
                    RawUnsubscribeCmd = new DeviceMessage.Types.RawUnsubscribeCmd
                    {
                        Endpoint = aEndpoint,
                    }
                }
            };

            return SendDeviceMessage(aSorter, aHandle, msg, aCallback, aCallbackCtx);
        }

        internal static void ActivateEnvLogger()
        {
            ButtplugFFICalls.ButtplugActivateEnvLogger();
        }
    }
}
