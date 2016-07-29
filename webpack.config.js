var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "./client/src/app.js"
  ],
  output: {
    path: path.resolve(__dirname, "client/dist"),
    filename: "bundle.js",
    publicPath: './client'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  loader: 'babel-loader',
  exclude: '/node_modules/'
};
