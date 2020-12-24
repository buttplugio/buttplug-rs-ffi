/*
'use strict';
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
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
        exclude: /tests|example/,
        use: [{
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true
          }
        }]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]?[hash]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
      },
      {
        test: /\.(html)$/,
        use: [{
          loader: 'html-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: '.'
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
    }),
  ],
  node: {
    fs: 'empty'
  },
};
*/
'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = [{
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
    publicPath: "/",
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
}];

