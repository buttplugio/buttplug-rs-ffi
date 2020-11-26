# 1.0.0 beta 4 (2020-11-26)

## Features

- Added client ping method
- Added utility method for console logging

## Bugfixes

- StopDeviceCmd should now work on all devices, not just device with index 0
- Disconnect should now actually disconnect

# 1.0.0 Beta 1 (2020-11-23)

## Bugfixes

- Remove all Console log calls

## API Changes

- Suffix all Async methods with "Async"
- Make WebsocketConnector take a URI, not a string

# 1.0.0 Beta 2 (2020-11-22)

## API Changes

- Move back to a connector-object-like mechanism, using C# method overloading for the Connect call.
- Change main namespace to "Buttplug" to match older libraries. 

# 1.0.0 Beta 1 (2020-11-21)

## Features

- Initial nuget release of C# FFI API. Includes most basic functionality to run Buttplug.