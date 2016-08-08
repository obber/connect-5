var webpack = require("webpack");
var path = require("path");

module.exports = {
  client: {
    entry: [
      "webpack-dev-server/client?http://0.0.0.0:3457",
      "webpack/hot/only-dev-server",
      "./src/client/js/index.js"
    ],
    output: {
      path: path.resolve("./dist/client"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: ["", ".js", ".jsx"]
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ["react-hot-loader", "babel"]
        }
      ]
    },
    exclude: "/node_modules/",
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  },
  production: {
    entry: [
      "./src/client/js/index.js"
    ],
    output: {
      path: path.resolve("./dist/client"),
      filename: "bundle.js",
    },
    resolve: {
      extensions: ["", ".js", ".jsx"]
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: ["babel"]
        }
      ]
    },
    exclude: "/node_modules/",
    plugins: [
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      })
    ]
  }
}
