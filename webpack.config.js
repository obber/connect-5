var path = require('path');
var webpack = require('webpack');

var client = {
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
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }
    ]
  },
  exclude: '/node_modules/'
}

var server = {
  entry: [
    path.resolve(__dirname, "server/es6") + "/server.js"
  ],
  output: {
    path: path.resolve(__dirname, "server/dist"),
    filename: "server.js",
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  exclude: '/node_modules/'
}

module.exports = {
  client: client
};
