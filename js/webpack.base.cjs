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
  entry: path.resolve('./src/web_index.ts'),
  output: {
    path: path.resolve('./dist/web'),
    filename: 'buttplug.js',
    libraryTarget: 'umd',
    library: {
      root: "Buttplug",
      amd: "buttplug-amd",
      commonjs: "buttplug-commonjs"
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
            transpileOnly: true,
            configFile: "tsconfig.web.json"
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: 'inline-source-map',
  plugins: [
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
      if (resource.request === "#ffi_wrap") {
        resource.request = path.join(__dirname, "src/web/ffi_wrap.ts");
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
  devtool: '#source-map',
};

module.exports = env => {
  switch(env) {
    case 'development':
      return base;
    case 'production':
      return merge(base, production);
    default:
      throw new Error('No matching configuration was found!');
  }
}