{
    "targets": [{
        "target_name": "binding",
        "sources": ["src/node/binding.cpp"],
        "include_dirs": [
            "<!@(node -p \"require('node-addon-api').include\")",
        ],
        "dependencies": [
            "<!(node -p \"require('node-addon-api').gyp\")"
        ],
        'cflags!': [ '-fno-exceptions' ],
        'cflags_cc!': [ '-fno-exceptions' ],
        'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'CLANG_CXX_LIBRARY': 'libc++',
            'MACOSX_DEPLOYMENT_TARGET': '10.7',
        },
        'msvs_settings': {
            'VCCLCompilerTool': { 'ExceptionHandling': 1 },
        },
        "conditions": [
            ['OS=="linux"', {
                "cflags": [ "-std=c++11", "-Wall" ]
            }, {
                "cflags": [ "-std=c++11", "-stdlib=libc++", "-Wall" ]
            }],
            ['OS=="win"', {
                "sources": [
                    "src/node/win32-dlfcn.cpp"
                ]
            }]
        ]
    }]
}