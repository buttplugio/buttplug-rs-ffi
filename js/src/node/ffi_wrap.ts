import node_gyp_build from "node-gyp-build";
import { URL, fileURLToPath } from "url";
import path from "path";

// NOTE: path is relative to ~/dist/node not ~/src
const packageDir = fileURLToPath(new URL("../../..", import.meta.url));
const bindings = node_gyp_build(packageDir) as Bindings;

interface Bindings {
    buttplug_initialize: (options: { file: string }) => void;
    buttplug_create_protobuf_client: (client_name: string, callback: (buf: Uint8Array) => void, callback_context: any) => number;
    buttplug_free_client: (client_ptr: number) => void;
    buttplug_client_protobuf_message: (client_ptr: number, buf: Uint8Array, callback: (buf: Uint8Array) => void, callback_context: any) => void;
    buttplug_create_device: (client_ptr: number, device_index: number) => number;
    buttplug_free_device: (device_ptr: number) => void;
    buttplug_device_protobuf_message: (device_ptr: number, buf: Uint8Array, callback: (buf: Uint8Array) => void, callback_context: any) => void;
    buttplug_activate_env_logger: (log_level?: string) => void;
}

const file = path.join(packageDir, "bin", `${process.platform}-${process.arch}`, "buttplug_rs_ffi");
export const initialized = bindings.buttplug_initialize({ file });
export const buttplug_create_protobuf_client: (client_name: string, callback: (buf: Uint8Array) => void, callback_context: any) => number = bindings.buttplug_create_protobuf_client.bind(bindings);
export const buttplug_free_client: (client_ptr: number) => void = bindings.buttplug_free_client.bind(bindings);
export const buttplug_client_protobuf_message: (client_ptr: number, buf: Uint8Array, callback: (buf: Uint8Array) => void, callback_context: any) => void = bindings.buttplug_client_protobuf_message.bind(bindings);
export const buttplug_create_device: (client_ptr: number, device_index: number) => number = bindings.buttplug_create_device.bind(bindings);
export const buttplug_free_device: (device_ptr: number) => void = bindings.buttplug_free_device.bind(bindings);
export const buttplug_device_protobuf_message: (device_ptr: number, buf: Uint8Array, callback: (buf: Uint8Array) => void, callback_context: any) => void = bindings.buttplug_device_protobuf_message.bind(bindings);
export const buttplug_activate_env_logger: (log_level?: string) => void = bindings.buttplug_activate_env_logger.bind(bindings);

export async function buttplugInit() {
    // does nothing
}