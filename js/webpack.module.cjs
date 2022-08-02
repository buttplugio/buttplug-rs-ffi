'use strict';
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
const { merge } = require('webpack-merge');

const base = {
  name: "library",
  mode: "development",
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: path.resolve('./src/index.ts'),
  output: {
    path: path.resolve('./dist/module'),
    filename: 'buttplug.js',
    library: {
      type: "module"
    }
  },
  externals: {
    websocket: 'commonjs websocket'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules|vue\/src|tests|example/,
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }]
      }
    ]
  },
  experiments: {
    syncWebAssembly: true,
    outputModule: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      buffer: require.resolve('buffer/'),
    },
  },
  devServer: {
    historyApiFallback: true,
  },
  performance: {
    hints: false
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),

    // ES Module imports require file extensions, but Webpack 4.x/ts-loader doesn't understand
    // how to handle that. Instead, we rewrite those imports to use a '.ts' extension instead,
    // if one exists.
    new webpack.NormalModuleReplacementPlugin(/\.js$/, resource => {
      if (resource.request.startsWith("./") && resource.request.endsWith(".js")) {
        if (fs.existsSync(path.join(resource.context, resource.request.slice(0, -3) + ".ts"))) {
          resource.request = resource.request.slice(0, -3) + ".ts";
          return;
        }
      }
    }),

    // Webpack 4.x/ts-loader doesn't understand NodeJS import maps, which we use to
    // redirect the wasm->js interop script into different variations based on whether
    // we are running in NodeJS or in the browser. The following rewrites the import
    // mapping for '#buttplug_rs_ffi_bg' to point to the webpack-compatible version.
    new webpack.NormalModuleReplacementPlugin(/^#/, resource => {
      if (resource.request === "#buttplug_rs_ffi_bg") {
        resource.request = path.join(__dirname, "src/buttplug-rs-ffi/buttplug_rs_ffi_bg_web.js");
      }
    }),
  ]
};

const production = {
  mode: "production",
  output: {
    filename: `buttplug.min.js`
  },
  externals: {
    websocket: 'commonjs websocket'
  },
  optimization: {
    minimize: true,
    mangleWasmImports: false
  },
  devtool: 'source-map',
};

module.exports = (env, _argv) => {
  if (env.development) {
    return base;
  } else if (env.production) {
    return merge(base, production);
  } else {
    throw new Error('No matching configuration was found!');
  }
}