using System;
using System.Threading.Tasks;
using ButtplugCSharpFFI;

namespace ButtplugCSharpFFITest
{
    class Program
    {
        private static async Task WaitForKey()
        {
            Console.WriteLine("Press any key to continue.");
            while (!Console.KeyAvailable)
            {
                await Task.Delay(10);
            }
            Console.ReadKey(true);
        }

        private static async Task RunExample()
        {
            var client = new ButtplugCSharpFFI.ButtplugClient("Test Client"); 
            client.DeviceAdded += async (obj, args) =>
            {
                var device = args.Device;
                if (device.AllowedMessages.ContainsKey(ButtplugFFI.MessageAttributeType.VibrateCmd))
                {
                    await device.SendRotateCmd(0.5, true);
                }
                device.Dispose();
                device = null;
            };
            await client.ConnectLocal();
            await client.StartScanning();
            await WaitForKey();
            client.Dispose();
            client = null;
            await WaitForKey();
        }

        static void Main(string[] args)
        {
            RunExample().Wait();
        }
    }
}
