const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');

const CSS_LOADER_OPTIONS = 'localIdentName=[name]--[hash:base64:5]';

module.exports = {
  mode: 'development',

  devtool: 'eval', // use eval for faster builds/poor debugging

  // entry: {
  //   'react-router-dom': path.resolve('node_modules/react-router-dom/'),
  //   app: ['webpack-hot-middleware/client?reload=true', ...config.entry.app],
  // },
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?reload=true',
      ...config.entry.app,
    ],
  },

  resolve: config.resolve,

  output: config.output,

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve('src/index.html'),
      minify: { collapseWhitespace: true },
    }),
    ...config.plugins,
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'react-hot-loader/webpack' },
      {
        test: /\.css$/,
        use: ['style-loader', `css-loader?${CSS_LOADER_OPTIONS}`, 'postcss-loader'],
      },
      ...config.module.rules,
    ],
  },
};
