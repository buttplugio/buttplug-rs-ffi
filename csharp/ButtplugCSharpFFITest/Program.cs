using System;
using System.Threading.Tasks;
using Buttplug;
using System.ComponentModel;
using System.Text;

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

        private static void LogCallback(string aMsg)
        {
            Console.WriteLine(aMsg);
        }

        private static async Task RunExample()
        {
            //ButtplugFFILog.SetLogCallback(LogCallback, ButtplugLogLevel.Info);
            //ButtplugFFILog.SetLogLevel(ButtplugLogLevel.Error);
            var client = new ButtplugClient("Test Client");
            client.DeviceAdded += async (obj, args) =>
            {
                var device = args.Device;
                foreach (var msg in args.Device.AllowedMessages) {
                    Console.WriteLine($"{msg.Key} {msg.Value}");
                    foreach (PropertyDescriptor descriptor in TypeDescriptor.GetProperties(msg.Value))
                    {
                        string name = descriptor.Name;
                        object value = descriptor.GetValue(obj);
                        Console.WriteLine("{0}={1}", name, value);
                    }
                }
                if (device.AllowedMessages.ContainsKey(ServerMessage.Types.MessageAttributeType.BatteryLevelCmd))
                {
                    Console.WriteLine("Fetching Battery");
                    Console.WriteLine($"Battery: {await device.SendBatteryLevelCmd()}");
                    await device.SendRawWriteCmd(Endpoint.Tx, Encoding.ASCII.GetBytes("Vibrate:10;"), false);
                    //await device.SendVibrateCmd(0.5);
                }
            };
            client.DeviceRemoved += (obj, args) =>
            {
                Console.WriteLine($"Device removed: {args.Device.Name}");
            };
            await client.Connect(new Buttplug.ButtplugEmbeddedConnectorOptions());
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
