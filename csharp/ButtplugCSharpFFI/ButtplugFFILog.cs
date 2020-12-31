using System;
using System.Runtime.InteropServices;

namespace Buttplug
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    delegate void ButtplugLogCallback(string aLogMsg);

    public enum ButtplugLogLevel
    {
        Error,
        Warn,
        Info,
        Debug,
        Trace,
    }

    internal class ButtplugFFILogCalls
    { 
        [DllImport("buttplug_rs_ffi")]
        internal static extern void buttplug_add_log_handler(ButtplugLogCallback callback, string level, bool aUseJSON);

        [DllImport("buttplug_rs_ffi")]
        internal static extern void buttplug_activate_env_logger();
    }

    public static class ButtplugFFILog
    {
        public static event EventHandler<string> LogMessage;
        // If we don't hold a reference to our log callback that lives for the lifetime of the process, we'll
        // get gc'd while in native code and that will be Bad (usually we'll get an exception before that).
        private static ButtplugLogCallback LogCallback = OnLogMessage;

        private static void ActivateEnvLogger()
        {
            ButtplugFFILogCalls.buttplug_activate_env_logger();
        }

        private static void OnLogMessage(string aLogMessage)
        {
            LogMessage?.Invoke(null, aLogMessage);
        }

        public static void StartLogHandler(ButtplugLogLevel aMaxLevel, bool aUseJSON)
        {
            Console.WriteLine(aMaxLevel.ToString());
            ButtplugFFILogCalls.buttplug_add_log_handler(LogCallback, aMaxLevel.ToString(), aUseJSON);
        }
    }
}
