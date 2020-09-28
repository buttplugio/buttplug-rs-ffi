using System;
using System.Threading.Tasks;
using ButtplugCSharpFFI;
using ButtplugFFI;

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
            var client = new ButtplugClient("Test Client"); 
            client.DeviceAdded += async (obj, args) =>
            {
                var device = args.Device;
                if (device.AllowedMessages.ContainsKey(ServerMessage.Types.MessageAttributeType.VibrateCmd))
                {
                    await device.SendVibrateCmd(0.5);
                }
                device.Dispose();
                device = null;
            };
            await client.ConnectLocal();
            //await client.ConnectWebsocket();
            await client.StartScanningAsync();
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
