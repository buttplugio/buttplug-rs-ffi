use super::{
  client::ButtplugFFIClient,
  device::ButtplugFFIDevice,
  logging::{ButtplugFFILogHandle, LogFFICallback},
  FFICallback, FFICallbackContext, FFICallbackContextWrapper,
};
#[cfg(feature = "android-backend")]
use jni::{objects::GlobalRef, sys::jint, JNIEnv, JavaVM};
use libc::c_char;
#[cfg(feature = "android-backend")]
use once_cell::sync::OnceCell;
use std::{
  ffi::{c_void, CStr},
  slice,
  sync::{Arc, Mutex, Weak},
};
use tokio::runtime::Runtime;

lazy_static! {
  static ref RUNTIME: Mutex<Weak<tokio::runtime::Runtime>> = Mutex::new(Weak::new());
}

#[cfg(feature = "android-backend")]
lazy_static! {
  static ref JAVAVM: OnceCell<JavaVM> = OnceCell::new();
  static ref CLASS_LOADER: OnceCell<GlobalRef> = OnceCell::new();
}

#[cfg(feature = "android-backend")]
#[no_mangle]
pub extern "C" fn JNI_OnLoad(vm: JavaVM, _res: *const c_void) -> jint {
  buttplug_activate_env_logger();
  let env = vm.get_env().unwrap();
  jni_utils::init(&env).unwrap();
  btleplug::platform::init(&env).unwrap();
  jni::JNIVersion::V6.into()
}

#[cfg(feature = "tokio-backend")]
fn get_or_create_runtime() -> Arc<Runtime> {
  // See if we have a runtime. If so, copy and pass to the client. Otherwise,
  // spin one up, sending it to the client while also storing it in our static
  // Weak<> just in case someone tries to create multiple clients.
  let mut static_runtime = RUNTIME.lock().unwrap();
  match static_runtime.upgrade() {
    Some(rt) => rt,
    None => {
      let new_runtime = Arc::new(tokio::runtime::Runtime::new().unwrap());
      *static_runtime = Arc::downgrade(&new_runtime);
      new_runtime
    }
  }
}

#[cfg(feature = "android-backend")]
fn get_or_create_runtime(env: JNIEnv) -> Arc<Runtime> {
  // See if we have a runtime. If so, copy and pass to the client. Otherwise,
  // spin one up, sending it to the client while also storing it in our static
  // Weak<> just in case someone tries to create multiple clients.
  let mut static_runtime = RUNTIME.lock().unwrap();
  match static_runtime.upgrade() {
    Some(rt) => rt,
    None => {
      let new_runtime = {
        let class = env
          .find_class("com/nonpolynomial/btleplug/android/impl/Peripheral")
          .unwrap();
        JAVAVM.set(env.get_java_vm().unwrap());
        let thread = env
          .call_static_method(
            "java/lang/Thread",
            "currentThread",
            "()Ljava/lang/Thread;",
            &[],
          )
          .unwrap()
          .l()
          .unwrap();
        let class_loader = env
          .call_method(
            thread,
            "getContextClassLoader",
            "()Ljava/lang/ClassLoader;",
            &[],
          )
          .unwrap()
          .l()
          .unwrap();

        CLASS_LOADER.set(env.new_global_ref(class_loader).unwrap());
        Arc::new(
          tokio::runtime::Builder::new_multi_thread()
            .enable_time()
            .enable_io()
            .on_thread_start(|| {
              info!("WRAPPING NEW THREAD IN VM");
              let vm = JAVAVM.get().unwrap();

              // We now need to call the following code block via JNI calls. God help us.
              //
              //  java.lang.Thread.currentThread().setContextClassLoader(
              //    java.lang.ClassLoader.getSystemClassLoader()
              //  );
              info!("Adding classloader to thread");

              let new_env = vm.attach_current_thread_permanently().unwrap();

              let thread = new_env
                .call_static_method(
                  "java/lang/Thread",
                  "currentThread",
                  "()Ljava/lang/Thread;",
                  &[],
                )
                .unwrap()
                .l()
                .unwrap();
              new_env
                .call_method(
                  thread,
                  "setContextClassLoader",
                  "(Ljava/lang/ClassLoader;)V",
                  &[CLASS_LOADER.get().unwrap().as_obj().into()],
                )
                .unwrap();
              info!("Classloader added to thread");
            })
            .build()
            .unwrap(),
        )
      };
      *static_runtime = Arc::downgrade(&new_runtime);
      new_runtime
    }
  }
}

#[no_mangle]
pub unsafe extern "C" fn buttplug_create_protobuf_client(
  #[cfg(feature = "android-backend")] env: jni::JNIEnv,
  client_name_ptr: *const c_char,
  callback: FFICallback,
  callback_context: FFICallbackContext,
) -> *mut ButtplugFFIClient {
  assert!(!client_name_ptr.is_null());
  let c_str = CStr::from_ptr(client_name_ptr);
  // If we were handed a wrong client name, just panic.
  let client_name = c_str.to_str().unwrap();

  Box::into_raw(Box::new(ButtplugFFIClient::new(
    #[cfg(feature = "tokio-backend")]
    get_or_create_runtime(),
    #[cfg(feature = "android-backend")]
    get_or_create_runtime(env),
    client_name,
    callback,
    callback_context,
  )))
}

#[no_mangle]
pub unsafe extern "C" fn buttplug_free_client(ptr: *mut ButtplugFFIClient) {
  if !ptr.is_null() {
    Box::from_raw(ptr);
  }
}

#[no_mangle]
pub unsafe extern "C" fn buttplug_client_protobuf_message(
  client_ptr: *mut ButtplugFFIClient,
  buf: *const u8,
  buf_len: i32,
  callback: FFICallback,
  callback_context: FFICallbackContext,
) {
  assert!(!client_ptr.is_null());
  let client = &mut *client_ptr;
  let msg_ptr = slice::from_raw_parts(buf, buf_len as usize);
  client.parse_message(
    msg_ptr,
    callback,
    FFICallbackContextWrapper(callback_context),
  );
}

#[no_mangle]
pub unsafe extern "C" fn buttplug_create_device(
  client_ptr: *mut ButtplugFFIClient,
  device_index: u32,
) -> *mut ButtplugFFIDevice {
  assert!(!client_ptr.is_null());
  let client = &mut *client_ptr;
  if let Some(device) = client.get_device(device_index) {
    Box::into_raw(Box::new(device))
  } else {
    std::ptr::null::<*mut ButtplugFFIDevice>() as *mut ButtplugFFIDevice
  }
}

#[no_mangle]
pub unsafe extern "C" fn buttplug_device_protobuf_message(
  device_ptr: *mut ButtplugFFIDevice,
  buf: *const u8,
  buf_len: i32,
  callback: FFICallback,
  callback_context: FFICallbackContext,
) {
  assert!(!device_ptr.is_null());
  let device = &mut *device_ptr;
  let msg_ptr = slice::from_raw_parts(buf, buf_len as usize);
  device.parse_message(
    msg_ptr,
    callback,
    FFICallbackContextWrapper(callback_context),
  );
}

#[no_mangle]
pub unsafe extern "C" fn buttplug_free_device(ptr: *mut ButtplugFFIDevice) {
  if !ptr.is_null() {
    Box::from_raw(ptr);
  }
}

#[no_mangle]
pub extern "C" fn buttplug_activate_env_logger() {
  #[cfg(feature = "tokio-backend")]
  {
    if tracing_subscriber::fmt::try_init().is_err() {
      error!("Cannot re-init env logger, this should only be called once");
    }
  }
  #[cfg(feature = "android-backend")]
  {
    log_panics::init();
    use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
    let fmt_layer = tracing_subscriber::fmt::Layer::default();
    let android_layer = tracing_android::layer("buttplug").unwrap();

    tracing_subscriber::registry()
      .with(tracing_subscriber::filter::LevelFilter::DEBUG)
      .with(fmt_layer)
      .with(android_layer)
      .init();
    info!("Logging enabled");
  }
}

#[no_mangle]
pub unsafe extern "C" fn buttplug_create_log_handle(
  #[cfg(feature = "android-backend")] env: jni::JNIEnv,
  callback: LogFFICallback,
  ctx: FFICallbackContext,
  max_level: *const c_char,
  use_json: bool,
) -> *mut ButtplugFFILogHandle {
  assert!(!max_level.is_null());
  let max_level_cstr = CStr::from_ptr(max_level);

  // If we were handed a wrong client name, just panic.
  let max_level_str = max_level_cstr.to_str().unwrap();
  Box::into_raw(Box::new(ButtplugFFILogHandle::new(
    #[cfg(feature = "tokio-backend")]
    get_or_create_runtime(),
    #[cfg(feature = "android-backend")]
    get_or_create_runtime(env),
    callback,
    ctx,
    max_level_str,
    use_json,
  )))
}

#[no_mangle]
pub unsafe extern "C" fn buttplug_free_log_handle(log_ptr: *mut ButtplugFFILogHandle) {
  if !log_ptr.is_null() {
    Box::from_raw(log_ptr);
  }
}
