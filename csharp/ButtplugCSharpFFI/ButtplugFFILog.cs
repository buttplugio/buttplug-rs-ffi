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
    }

    public class ButtplugFFILog
    {
        public static event EventHandler<string> LogMessage;

        private static void OnLogMessage(string aLogMessage)
        {
            LogMessage?.Invoke(null, aLogMessage);
        }

        public static void StartLogHandler(ButtplugLogLevel aMaxLevel, bool aUseJSON)
        {
            Console.WriteLine(aMaxLevel.ToString());
            ButtplugFFILogCalls.buttplug_add_log_handler(OnLogMessage, aMaxLevel.ToString(), aUseJSON);
        }
    }
}
