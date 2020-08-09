using System;
using System.Diagnostics;
using System.Threading.Tasks;
using System.Runtime.InteropServices;
using ButtplugFFI;
using FlatBuffers;

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

        internal static ButtplugFFIClientHandle TryCreateClient(string aClientName, ButtplugCallback aCallback)
        {
            var builder = new FlatBufferBuilder(1024);
            var client_name = builder.CreateString(aClientName);
            var create_client_msg = CreateClient.CreateCreateClient(builder, client_name);
            builder.Finish(create_client_msg.Value);
            var buf = builder.SizedByteArray();
            return ButtplugFFICalls.buttplug_create_client(aCallback, buf, buf.Length);
        }

        internal static Task<ServerMessage> TryConnectLocal(ButtplugFFIMessageSorter aSorter, ButtplugFFIClientHandle aHandle, string aServerName, uint aMaxPingTime)
        {
            var builder = new FlatBufferBuilder(1024);
            var connect_local_msg = ConnectLocal.CreateConnectLocal(builder, builder.CreateString(aServerName), aMaxPingTime, 0);
            var offset_msg = new Offset<ConnectLocal>();
            offset_msg = connect_local_msg;
            ClientMessage.StartClientMessage(builder);
            ClientMessage.AddMessageType(builder, ClientMessageType.ConnectLocal);
            ClientMessage.AddMessage(builder, offset_msg.Value);
            var task = aSorter.PrepareMessage(builder);
            var create_client_msg = CreateClient.EndCreateClient(builder);
            builder.Finish(create_client_msg.Value);
            var buf = builder.SizedByteArray();
            ButtplugFFICalls.buttplug_parse_client_message(aHandle, buf, buf.Length);
            return task;
        }
        /*
        internal static void Callback(uint length, UIntPtr msg_array)
        {
            Debug.WriteLine("Got message!");
        }
        */
    }
}
