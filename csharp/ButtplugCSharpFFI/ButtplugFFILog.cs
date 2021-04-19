using System;
using System.Runtime.InteropServices;

namespace Buttplug
{
    
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    delegate void ButtplugLogCallback(string aLogMsg);

    public enum ButtplugLogLevel
    {
        Off,
        Error,
        Warn,
        Info,
        Debug,
        Trace,
    }

    internal class ButtplugFFILogCalls
    {
        [DllImport("buttplug_rs_ffi")]
        internal static extern ButtplugFFILogHandle buttplug_create_log_handle(ButtplugLogCallback callback, string level, bool aUseJSON);

        [DllImport("buttplug_rs_ffi")]
        internal static extern void buttplug_free_log_handle(IntPtr log_handle);

        [DllImport("buttplug_rs_ffi")]
        internal static extern void buttplug_activate_env_logger();
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
                ButtplugFFILogCalls.buttplug_free_log_handle(handle);
            }
            return true;
        }

    }

    public static class ButtplugFFILog
    {
        public static event EventHandler<string> LogMessage;
        // If we don't hold a reference to our log callback that lives for the lifetime of the process, we'll
        // get gc'd while in native code and that will be Bad (usually we'll get an exception before that).
        private static ButtplugLogCallback LogCallback = OnLogMessage;
        private static ButtplugFFILogHandle LogHandle = null;
        private static bool LogHandleSet = false;

        private static void ActivateEnvLogger()
        {
            ButtplugFFILogCalls.buttplug_activate_env_logger();
        }

        private static void OnLogMessage(string aLogMessage)
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
                LogHandle = ButtplugFFILogCalls.buttplug_create_log_handle(LogCallback, aMaxLevel.ToString(), aUseJSON);
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
