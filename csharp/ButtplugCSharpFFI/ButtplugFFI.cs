using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using ButtplugFFI;
using FlatBuffers;
using System.Runtime.InteropServices.ComTypes;

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

    internal class ButtplugFFICalls
   {
        [DllImport("buttplug_ffi")]
        internal static extern ButtplugFFIClientHandle buttplug_create_client(ButtplugCallback callback, byte[] buf, int buf_length);

        [DllImport("buttplug_ffi")]
        internal static extern void buttplug_free_client(IntPtr client_handle);

        [DllImport("buttplug_ffi")]
        internal static extern void buttplug_parse_client_message(ButtplugFFIClientHandle client_handle, byte[] buf, int buf_length);
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
            var task = aSorter.PrepareMessage(aBuilder);
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
            return ButtplugFFI.SendClientMessage(aSorter, aHandle, builder, ClientMessageType.ConnectLocal, msg.Value);
        }

        internal static Task<ServerMessage> SendStartScanning(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle)
        {
            var builder = new FlatBufferBuilder(1024);
            StartScanning.StartStartScanning(builder);
            var msg = StartScanning.EndStartScanning(builder);
            return ButtplugFFI.SendClientMessage(aSorter, aHandle, builder, ClientMessageType.StartScanning, msg.Value);
        }

        internal static Task<ServerMessage> SendStopScanning(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle)
        {
            var builder = new FlatBufferBuilder(1024);
            StopScanning.StartStopScanning(builder);
            var msg = StopScanning.EndStopScanning(builder);
            return ButtplugFFI.SendClientMessage(aSorter, aHandle, builder, ClientMessageType.StopScanning, msg.Value);
        }
    }
}
