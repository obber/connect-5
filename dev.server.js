var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config.client), {
  hot: true,
  noInfo: true,
  proxy: {
    "*": "http://localhost:3456"
  }
}).listen(3457, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3457/');
});
