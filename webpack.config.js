var webpack = require("webpack");
var path = require("path");

module.exports = {
  client: {
    entry: [
      "./src/client/js/app.js"
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
    exclude: "/node_modules/"
  }
}
