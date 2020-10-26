using System.Runtime.InteropServices;

namespace ButtplugCSharpFFI
{
    [UnmanagedFunctionPointer(CallingConvention.Cdecl)]
    public delegate void ButtplugLogCallback(string log_msg);

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
        [DllImport("buttplug_ffi")]
        internal static extern void buttplug_set_log_callback(ButtplugLogCallback callback, string level);

        [DllImport("buttplug_ffi")]
        internal static extern void buttplug_set_log_level(string level);
    }

    public class ButtplugFFILog
    {
        public static void SetLogCallback(ButtplugLogCallback aCallback, ButtplugLogLevel aLevel)
        {
            ButtplugFFILogCalls.buttplug_set_log_callback(aCallback, aLevel.ToString("f").ToLower());
        }

        public static void SetLogLevel(ButtplugLogLevel aLevel)
        {
            ButtplugFFILogCalls.buttplug_set_log_level(aLevel.ToString("f").ToLower());
        }
    }
}
