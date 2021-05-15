using System;
using System.Runtime.InteropServices;

namespace Buttplug
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    public delegate void ButtplugLogCallback(IntPtr ctx, string aLogMsg);

    public enum ButtplugLogLevel
    {
        Off,
        Error,
        Warn,
        Info,
        Debug,
        Trace,
    }

    internal static class ButtplugFFILogCalls
    {
        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_create_log_handle")]
        internal static extern ButtplugFFILogHandle ButtplugCreateLogHandle(ButtplugLogCallback callback, IntPtr ctx, string level, bool aUseJSON);

        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_free_log_handle")]
        internal static extern void ButtplugFreeLogHandle(IntPtr log_handle);

        [DllImport("buttplug_rs_ffi", EntryPoint = "buttplug_activate_env_logger")]
        internal static extern void ButtplugActivateEnvLogger();
    }

    internal class ButtplugFFILogHandle : SafeHandle
    {
        public ButtplugFFILogHandle() : base(IntPtr.Zero, true) { }

        public override bool IsInvalid
        {
            get { return this.handle == IntPtr.Zero; }
        }

        protected override bool ReleaseHandle()
        {
            Console.WriteLine("Releasing handle?!");
            if (!this.IsInvalid)
            {
                ButtplugFFILogCalls.ButtplugFreeLogHandle(handle);
            }
            return true;
        }
    }

    public static class ButtplugFFILog
    {
        // If we don't hold a reference to our log callback that lives for the lifetime of the process, we'll
        // get gc'd while in native code and that will be Bad (usually we'll get an exception before that).
        private readonly static ButtplugLogCallback LogCallback = OnLogMessage;
        private static ButtplugFFILogHandle LogHandle = null;
        private static bool LogHandleSet = false;

        public static event EventHandler<string> LogMessage;

        private static void ActivateEnvLogger()
        {
            ButtplugFFILogCalls.ButtplugActivateEnvLogger();
        }

        private static void OnLogMessage(IntPtr ctx, string aLogMessage)
        {
            LogMessage?.Invoke(null, aLogMessage);
        }

        public static void SetLogOptions(ButtplugLogLevel aMaxLevel, bool aUseJSON)
        {
            if (aMaxLevel != ButtplugLogLevel.Off)
            {
                if (LogHandleSet)
                {
                    throw new InvalidOperationException("Cannot set logging options twice (this is a bug, will be fixed at some point, see https://github.com/buttplugio/buttplug-rs-ffi/issues/23).");
                }
                LogHandle = ButtplugFFILogCalls.ButtplugCreateLogHandle(LogCallback, IntPtr.Zero, aMaxLevel.ToString(), aUseJSON);
                LogHandleSet = true;
            }
            else
            {
                if (LogHandle != null)
                {
                    LogHandle.Dispose();
                    LogHandle = null;
                }
            }
        }
    }
}
