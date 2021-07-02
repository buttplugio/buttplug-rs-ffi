#ifndef BINDING_H
#define BINDING_H

#include <string>
#include <random>
#include <mutex>
#include <uv.h>
#include <node.h>
#include <napi.h>
#include <unordered_map>

#ifdef WIN32
#include "win32-dlfcn.h"
#else
#include <dlfcn.h>
#endif

using namespace Napi;

#endif

