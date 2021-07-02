declare module "#ffi_wrap" {
    function buttplugInit(): Promise<void>;
    function buttplug_create_protobuf_client(client_name: string, callback: (buf: Uint8Array) => void): number;
    function buttplug_free_client(client_ptr: number): void;
    function buttplug_client_protobuf_message(client_ptr: number, buf: Uint8Array, callback: (buf: Uint8Array) => void): void;
    function buttplug_create_device(client_ptr: number, device_index: number): number;
    function buttplug_free_device(device_ptr: number): void;
    function buttplug_device_protobuf_message(device_ptr: number, buf: Uint8Array, callback: (buf: Uint8Array) => void): void;
    function buttplug_activate_env_logger(log_level?: string): void;
}