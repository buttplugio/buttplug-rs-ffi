#include "binding.h"
#include <iostream>

// Function pointers to functions dynamically loaded from buttplug_rs_ffi.dll.
#define BUTTPLUG_RS_FFI_FUNCTION_LIST(V)    \
  V(buttplug_create_protobuf_client)        \
  V(buttplug_free_client)                   \
  V(buttplug_client_protobuf_message)       \
  V(buttplug_create_device)                 \
  V(buttplug_device_protobuf_message)       \
  V(buttplug_free_device)                   \
  V(buttplug_activate_env_logger)

#define DLL_FUNC_TYPE(name) _##name##_
#define DLL_FUNC_VAR(name) _##name

#ifndef IN
#define IN
#endif
#ifndef VOID
#define VOID void
#endif

typedef VOID (__stdcall* FFICallback)(void* ctx, const uint8_t* buf, uint32_t buf_length);

using DLL_FUNC_TYPE(buttplug_create_protobuf_client) = void*(__stdcall*)(
    IN PCSTR client_name_ptr,
    IN FFICallback callback,
    IN void* callback_context
);

using DLL_FUNC_TYPE(buttplug_free_client) = VOID(__stdcall*)(
    IN void* client_ptr
);

using DLL_FUNC_TYPE(buttplug_client_protobuf_message) = VOID(__stdcall*)(
    IN void* client_ptr,
    IN uint8_t* buf,
    IN uint32_t buf_len,
    IN FFICallback callback,
    IN void* callback_context
);

using DLL_FUNC_TYPE(buttplug_create_device) = void*(__stdcall*)(
    IN void* client_ptr,
    IN uint32_t device_index
);

using DLL_FUNC_TYPE(buttplug_device_protobuf_message) = VOID(__stdcall*)(
    IN void* device_ptr,
    IN uint8_t* buf,
    IN int32_t buf_len,
    IN FFICallback callback,
    IN void* callback_context
);

using DLL_FUNC_TYPE(buttplug_free_device) = VOID(__stdcall*)(
    IN void* device_ptr
);

using DLL_FUNC_TYPE(buttplug_activate_env_logger) = VOID(__stdcall*)(VOID);

#undef IN
#undef VOID

class Callback {
    public:
        Callback(Env env, Function callback, const std::string resource_name, bool persistent_) :
            tsfn(ThreadSafeFunction::New(env, callback, resource_name, 0, 1)),
            persistent(persistent_) {}
        ThreadSafeFunction tsfn;
        bool persistent;
};

class ClientData {
    public:
        ClientData(void* client_ptr_, Callback* cb_) : client_ptr(client_ptr_), cb(cb_) {}
        void* client_ptr;
        Callback* cb;
};

class ButtplugAddon : public Addon<ButtplugAddon> {
    public:
        ButtplugAddon(Env env_, Object exports);
        ~ButtplugAddon();

    private:
        Value Initialize(const CallbackInfo& args);
        Value ButtplugCreateProtobufClient(const CallbackInfo& args);
        Value ButtplugFreeClient(const CallbackInfo& args);
        Value ButtplugClientProtobufMessage(const CallbackInfo& args);
        Value ButtplugCreateDevice(const CallbackInfo& args);
        Value ButtplugFreeDevice(const CallbackInfo& args);
        Value ButtplugDeviceProtobufMessage(const CallbackInfo& args);
        Value ButtplugActivateEnvLogger(const CallbackInfo& args);

        bool HasClientOrDevice(uint32_t id);

        uint32_t AddClient(void* client_ptr, Callback* cb);
        void DeleteClient(uint32_t client_id);
        void* GetClient(uint32_t client_id);

        uint32_t AddDevice(void* device_ptr);
        void DeleteDevice(uint32_t device_id);
        void* GetDevice(uint32_t device_id);

        #define DEF_DLL_FUNCTION(name) DLL_FUNC_TYPE(name) DLL_FUNC_VAR(name) = nullptr;
        BUTTPLUG_RS_FFI_FUNCTION_LIST(DEF_DLL_FUNCTION)
        #undef DEF_DLL_FUNCTION

        bool initialized = false;
        void* module = nullptr;
        std::unordered_map<uint32_t, ClientData*> id_to_client_data;
        std::unordered_map<uint32_t, void*> id_to_device_ptr;
        std::random_device rd;
        std::mt19937 rnd;
};

ButtplugAddon::ButtplugAddon(Env env, Object exports) :
    id_to_client_data(),
    id_to_device_ptr(),
    Addon<ButtplugAddon>()
{
    rnd = std::mt19937(rd());
    DefineAddon(exports, {
        InstanceMethod("buttplug_initialize", &ButtplugAddon::Initialize),
        InstanceMethod("buttplug_create_protobuf_client", &ButtplugAddon::ButtplugCreateProtobufClient),
        InstanceMethod("buttplug_free_client", &ButtplugAddon::ButtplugFreeClient),
        InstanceMethod("buttplug_client_protobuf_message", &ButtplugAddon::ButtplugClientProtobufMessage),
        InstanceMethod("buttplug_create_device", &ButtplugAddon::ButtplugCreateDevice),
        InstanceMethod("buttplug_free_device", &ButtplugAddon::ButtplugFreeDevice),
        InstanceMethod("buttplug_device_protobuf_message", &ButtplugAddon::ButtplugDeviceProtobufMessage),
        InstanceMethod("buttplug_activate_env_logger", &ButtplugAddon::ButtplugActivateEnvLogger),
    });
}

ButtplugAddon::~ButtplugAddon() {
    if (!initialized) return;
    initialized = false;

    // close all devices
    for (auto it : id_to_device_ptr) {
        _buttplug_free_device(it.second);
    }
    id_to_device_ptr.clear();

    // close all clients
    for (auto it : id_to_client_data) {
        ClientData* client = it.second;
        _buttplug_free_client(client->client_ptr);
        client->cb->tsfn.Release();
        delete client->cb;
        delete client;
    }

    id_to_client_data.clear();

    // release ffi library
    if (module != nullptr) {
        #define CLEAR_DLL_FUNCTION(name) DLL_FUNC_VAR(name) = nullptr;
        BUTTPLUG_RS_FFI_FUNCTION_LIST(CLEAR_DLL_FUNCTION)
        #undef CLEAR_DLL_FUNCTION

        dlclose(module);
        module = nullptr;
    }
}

// Initializes the addon with options that can be used to locate the ffi library
Value ButtplugAddon::Initialize(const CallbackInfo& args) {
    Env env = args.Env();
    if (initialized) return Boolean::New(env, initialized);
    if (!args[0].IsObject()) throw TypeError::New(env, "Invalid argument: options. Object expected.");

    Object options = args[0].As<Object>();

    Value fileValue = options.Get("file");
    if (!fileValue.IsString()) throw TypeError::New(env, "Invalid argument: options. A string-valued property named 'file' is required.");

    std::string file = fileValue.As<String>();

    // Ensure the correct directory separator token
    #ifdef WIN32
    std::replace(file.begin(), file.end(), '/', '\\');
    #else
    std::replace(file.begin(), file.end(), '\\', '/');
    #endif

    // Open the ffi library
    module = dlopen(file.c_str(), 0);
    if (module == nullptr) {
        module = dlopen((file + ".dll").c_str(), 0);
        #ifdef WIN32
        if (module == nullptr && GetLastError() == 126) {
            throw TypeError::New(env, "Invalid attempt to load a 32-bit assembly into a 64-bit process");
        }
        #endif
    }
    if (module == nullptr) {
        module = dlopen((file + ".so").c_str(), 0);
    }
    if (module == nullptr) {
        module = dlopen((file + ".dylib").c_str(), 0);
    }
    if (module == nullptr) {
        throw TypeError::New(env, "Failed to load '" + file + "': " + dlerror());
    }

    // Dynamically load each function
    #define LOAD_DLL_FUNC(name) DLL_FUNC_VAR(name) = reinterpret_cast<DLL_FUNC_TYPE(name)>(dlsym(module, #name));
    BUTTPLUG_RS_FFI_FUNCTION_LIST(LOAD_DLL_FUNC)
    #undef LOAD_DLL_FUNC

    // Check that each function was loaded correctly
    #define DLL_FUNC_LOADED(name) (DLL_FUNC_VAR(name) != nullptr) &&
    bool result = BUTTPLUG_RS_FFI_FUNCTION_LIST(DLL_FUNC_LOADED) true;
    #undef DLL_FUNC_LOADED

    initialized = result;
    return Boolean::New(env, result);
}

// Tests whether a client or device id has already been registered. This
// helps to prevent inadvertently passing a client pointer to a device function
// and vice versa.
bool ButtplugAddon::HasClientOrDevice(uint32_t id) {
    if (id_to_client_data.find(id) != id_to_client_data.end()) return true;
    if (id_to_device_ptr.find(id) != id_to_device_ptr.end()) return true;
    return false;
}

// A 64-bit pointer may fall outside the range of a JS Number. As a result,
// we store the client pointer and callback in an unordered map associated
// with a unique 32-bit client id.
uint32_t ButtplugAddon::AddClient(void* client_ptr, Callback* cb) {
    if (client_ptr == nullptr) return 0;
    uint32_t client_id = static_cast<uint32_t>(rnd());
    while (client_id == 0 || HasClientOrDevice(client_id)) {
        client_id = static_cast<uint32_t>(rnd());
    }
    ClientData* client = new ClientData(client_ptr, cb);
    id_to_client_data.emplace(client_id, client);
    return client_id;
}

// Deletes a registered client pointer and releases the callback function
// associated with the client.
void ButtplugAddon::DeleteClient(uint32_t client_id) {
    if (client_id == 0) return;
    auto it = id_to_client_data.find(client_id);
    if (it != id_to_client_data.end()) {
        ClientData* client = it->second;
        id_to_client_data.erase(it);

        client->cb->tsfn.Release();
        delete client->cb;
        delete client;
    }
}

// Gets the client pointer for the provided client id
void* ButtplugAddon::GetClient(uint32_t client_id) {
    if (client_id == 0) return nullptr;
    auto it = id_to_client_data.find(client_id);
    if (it != id_to_client_data.end()) {
        return it->second->client_ptr;
    }
    return nullptr;
}

// A 64-bit pointer may fall outside the range of a JS Number. As a result,
// we store the device pointer in an unordered map associated with a unique
// 32-bit device id.
uint32_t ButtplugAddon::AddDevice(void* device_ptr) {
    if (device_ptr == nullptr) return 0;
    uint32_t device_id = static_cast<uint32_t>(rnd());
    while (device_id == 0 || HasClientOrDevice(device_id)) {
        device_id = static_cast<uint32_t>(rnd());
    }
    id_to_device_ptr.emplace(device_id, device_ptr);
    return device_id;
}

// Deletes a registered device pointer.
void ButtplugAddon::DeleteDevice(uint32_t device_id) {
    if (device_id == 0) return;
    auto it = id_to_device_ptr.find(device_id);
    if (it != id_to_device_ptr.end()) {
        id_to_device_ptr.erase(it);
    }
}

// Gets the device pointer for the provided device id
void* ButtplugAddon::GetDevice(uint32_t device_id) {
    if (device_id == 0) return nullptr;
    auto it = id_to_device_ptr.find(device_id);
    if (it != id_to_device_ptr.end()) {
        return it->second;
    }
    return nullptr;
}

// Marshals message callbacks from the ffi library back to JS
void MessageCallback(void* ctx, const uint8_t *buf, uint32_t buf_len) {
    Callback* cb = static_cast<Callback*>(ctx);

    // Make a mutable copy of the buffer we can send to V8
    uint8_t* data = (uint8_t*) std::malloc(buf_len * sizeof(uint8_t));
    std::memcpy(data, buf, buf_len * sizeof(uint8_t));

    // Invoke the callback on the JS event loop
    cb->tsfn.BlockingCall(data, [=] (Env env, Function callback, uint8_t* data) {
        Buffer<uint8_t> array = Buffer<uint8_t>::New(env, data, buf_len, [] (auto env, auto data) {
            UNREFERENCED_PARAMETER(env);
            std::free(data);
        });

        callback.Call({ array });

        // If the callback is not persistent, we can delete it here.
        if (!cb->persistent) {
            cb->tsfn.Release();
            delete cb;
        }
    });
}

Value ButtplugAddon::ButtplugCreateProtobufClient(const CallbackInfo& args) {
    Env env = args.Env();
    if (!initialized) throw TypeError::New(env, "Unable to load buttplug_rs_ffi");
    if (!args[0].IsString()) throw TypeError::New(env, "Invalid argument: client_name. String expected.");
    if (!args[1].IsFunction()) throw TypeError::New(env, "Invalid argument: callback. Function expected.");

    PCSTR client_name = args[0].ToString().Utf8Value().c_str();
    Function callback = args[1].As<Function>();

    // The callback passed to `buttplug_create_protobuf_client` is persistent until the client is freed.
    Callback* cb = new Callback(env, callback, "buttplug_create_protobuf_client", /*persistent*/ true);

    void* client_ptr = _buttplug_create_protobuf_client(client_name, MessageCallback, cb);
    uint32_t client_id = AddClient(client_ptr, cb);

    return Number::New(env, client_id);
}

Value ButtplugAddon::ButtplugFreeClient(const CallbackInfo& args) {
    Env env = args.Env();
    if (!initialized) throw TypeError::New(env, "Unable to load buttplug_rs_ffi");
    if (!args[0].IsNumber()) throw TypeError::New(env, "Invalid argument: client_ptr. Number expected.");

    uint32_t client_id = args[0].As<Number>().Uint32Value();
    void* client_ptr = GetClient(client_id);

    if (client_ptr == nullptr) throw TypeError::New(env, "Invalid argument: client_ptr. Argument was not a valid handle.");

    _buttplug_free_client(client_ptr);
    DeleteClient(client_id);

    return env.Undefined();
}

Value ButtplugAddon::ButtplugClientProtobufMessage(const CallbackInfo& args) {
    Env env = args.Env();
    if (!initialized) throw TypeError::New(env, "Unable to load buttplug_rs_ffi");
    if (!args[0].IsNumber()) throw TypeError::New(env, "Invalid argument: client_ptr. Number expected.");
    if (!args[1].IsBuffer()) throw TypeError::New(env, "Invalid argument: buf. Buffer expected.");
    if (!args[2].IsFunction()) throw TypeError::New(env, "Invalid argument: callback. Function expected.");

    uint32_t client_id = args[0].As<Number>().Uint32Value();
    void* client_ptr = GetClient(client_id);

    if (client_ptr == nullptr) throw TypeError::New(env, "Invalid argument: client_ptr. Argument was not a valid handle.");

    Buffer<uint8_t> buf = args[1].As<Buffer<uint8_t>>();
    Function callback = args[2].As<Function>();

    // The callback passed to `buttplug_client_protobuf_message` is single use.
    Callback* cb = new Callback(env, callback, "buttplug_client_protobuf_message", /*persistent*/ false);

    _buttplug_client_protobuf_message(client_ptr, buf.Data(), buf.ByteLength(), MessageCallback, cb);

    return env.Undefined();
}

Value ButtplugAddon::ButtplugCreateDevice(const CallbackInfo& args) {
    Env env = args.Env();
    if (!initialized) throw TypeError::New(env, "Unable to load buttplug_rs_ffi");
    if (!args[0].IsNumber()) throw TypeError::New(env, "Invalid argument: client_ptr. Number expected.");
    if (!args[1].IsNumber()) throw TypeError::New(env, "Invalid argument: device_index. Number expected.");

    uint32_t client_id = args[0].As<Number>().Uint32Value();
    uint32_t device_index = args[1].As<Number>().Uint32Value();
    void* client_ptr = GetClient(client_id);

    if (client_ptr == nullptr) throw TypeError::New(env, "Invalid argument: client_ptr. Argument was not a valid handle.");

    void* device_ptr = _buttplug_create_device(client_ptr, device_index);
    uint32_t device_id = AddDevice(device_ptr);

    return Number::New(env, device_id);
}

Value ButtplugAddon::ButtplugFreeDevice(const CallbackInfo& args) {
    Env env = args.Env();
    if (!initialized) throw TypeError::New(env, "Unable to load buttplug_rs_ffi");
    if (!args[0].IsNumber()) throw TypeError::New(env, "Invalid argument: client_ptr. Number expected.");

    uint32_t device_id = args[0].As<Number>().Uint32Value();
    void* device_ptr = GetDevice(device_id);

    if (device_ptr == nullptr) throw TypeError::New(env, "Invalid argument: device_ptr. Argument was not a valid handle.");

    _buttplug_free_device(device_ptr);
    DeleteDevice(device_id);

    return env.Undefined();
}

Value ButtplugAddon::ButtplugDeviceProtobufMessage(const CallbackInfo& args) {
    Env env = args.Env();
    if (!initialized) throw TypeError::New(env, "Unable to load buttplug_rs_ffi");
    if (!args[0].IsNumber()) throw TypeError::New(env, "Invalid argument: device_ptr. Number expected.");
    if (!args[1].IsBuffer()) throw TypeError::New(env, "Invalid argument: buf. Buffer expected.");
    if (!args[2].IsFunction()) throw TypeError::New(env, "Invalid argument: callback. Function expected.");

    uint32_t device_id = args[0].As<Number>().Uint32Value();
    void* device_ptr = GetDevice(device_id);

    if (device_ptr == nullptr) throw TypeError::New(env, "Invalid argument: device_ptr. Argument was not a valid handle.");

    Buffer<uint8_t> buf = args[1].As<Buffer<uint8_t>>();
    Function callback = args[2].As<Function>();

    // The callback passed to `buttplug_device_protobuf_message` is single use.
    Callback* cb = new Callback(env, callback, "buttplug_device_protobuf_message", /*persistent*/ false);

    _buttplug_device_protobuf_message(device_ptr, buf.Data(), buf.ByteLength(), MessageCallback, cb);

    return env.Undefined();
}

Value ButtplugAddon::ButtplugActivateEnvLogger(const CallbackInfo& args) {
    Env env = args.Env();
    if (!initialized) throw TypeError::New(env, "Unable to load buttplug_rs_ffi");

    _buttplug_activate_env_logger();

    return env.Undefined();
}

NODE_API_ADDON(ButtplugAddon);