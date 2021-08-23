function must_run_init(): never {
    throw new Error("Must run buttplugInit() async before calling any Buttplug methods!");
}

let buttplug_has_init_run = false;

export let buttplug_create_protobuf_client: (client_name: string, callback: (buf: Uint8Array) => void, callback_context: any) => number = must_run_init;
export let buttplug_free_client: (client_ptr: number) => void = must_run_init;
export let buttplug_client_protobuf_message: (client_ptr: number, buf: Uint8Array, callback: (buf: Uint8Array) => void, callback_context: any) => void = must_run_init;
export let buttplug_create_device: (client_ptr: number, device_index: number) => number = must_run_init;
export let buttplug_free_device: (device_ptr: number) => void = must_run_init;
export let buttplug_device_protobuf_message: (device_ptr: number, buf: Uint8Array, callback: (buf: Uint8Array) => void, callback_context: any) => void = must_run_init;
export let buttplug_activate_env_logger: (log_level?: string) => void = must_run_init;

export async function buttplugInit() {
    if (buttplug_has_init_run) {
        console.log("buttplugInit function has already run successfully. This only needs to be run once, but doesn't affect anything (other than printing this message) if called again.");
        return;
    }
    let index = await import(/* webpackPrefetch: 1 */ "./buttplug-rs-ffi/buttplug_rs_ffi.js").catch((e) => {
        console.log(e);
        return Promise.reject(e);
    });
    buttplug_create_protobuf_client = index.buttplug_create_protobuf_client;
    buttplug_free_client = index.buttplug_free_client;
    buttplug_client_protobuf_message = index.buttplug_client_protobuf_message;
    buttplug_activate_env_logger = index.buttplug_activate_env_logger;
    buttplug_free_device = index.buttplug_free_device;
    buttplug_create_device = index.buttplug_create_device;
    buttplug_device_protobuf_message = index.buttplug_device_protobuf_message;
    buttplug_has_init_run = true;
}
