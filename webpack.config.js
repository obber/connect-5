var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "./public/app/app.js"
  ],
  output: {
    path: path.resolve(__dirname, "public/dist"),
    filename: "bundle.js",
    publicPath: './public'
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
