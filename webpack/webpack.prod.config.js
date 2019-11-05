const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  entry: config.entry,

  resolve: config.resolve,

  output: config.output,

  optimization: {
    minimize: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve('src/index.html'),
      minify: { collapseWhitespace: true },
    }),
    ...config.plugins,
  ],

  module: {
    rules: [...config.module.rules],
  },
};
