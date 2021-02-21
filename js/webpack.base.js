'use strict';
var path = require('path');
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
    new webpack.NamedModulesPlugin()
  ],
  node: {
    fs: 'empty'
  }
};

const production =   {
  mode: "production",
  output: {
    filename: `buttplug.min.js`
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