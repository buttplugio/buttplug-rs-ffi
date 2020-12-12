using System;
using System.Threading.Tasks;
using Buttplug;
using System.ComponentModel;

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
                    //await device.SendRawWriteCmd(Endpoint.Tx, Encoding.ASCII.GetBytes("Vibrate:10;"), false);
                    await device.SendVibrateCmd(0.5);
                    await Task.Delay(500);
                    await device.SendStopDeviceCmd();
                }
            };
            client.DeviceRemoved += (obj, args) =>
            {
                Console.WriteLine($"Device removed: {args.Device.Name}");
            };
            client.ScanningFinished += (obj, args) =>
            {
                Console.WriteLine("Scanning finished.");
            };
            client.ServerDisconnect += (obj, args) =>
            {
                Console.WriteLine("Server disconnected.");
            };
            await client.ConnectAsync(new Buttplug.ButtplugEmbeddedConnectorOptions());
            //await client.ConnectAsync(new Buttplug.ButtplugWebsocketConnectorOptions(new Uri("ws://localhost:12345")));
            await client.StartScanningAsync();
            await WaitForKey();
            Console.WriteLine("Disconnecting");
            await client.DisconnectAsync();
            await WaitForKey();
            client.Dispose();
            client = null;
            await WaitForKey();
        }

        static void Main(string[] args)
        {
            // ButtplugUtils.ActivateEnvLogger();
            RunExample().Wait();
        }
    }
}
