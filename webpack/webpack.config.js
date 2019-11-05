require('dotenv').config({ silent: true });

const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: [path.resolve('src/index.tsx')],
  },

  output: {
    path: path.resolve('build'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: process.env.NODE_ENV === 'development',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                localIdentName: '[name]--[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
};
