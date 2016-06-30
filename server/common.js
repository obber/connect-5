const bodyParser = require('body-parser')

const common = module.exports;

common.app = require('express')();
common.server = require('http').Server(common.app);
common.io = require('socket.io')(common.server);

// parse application/x-www-form-urlencoded
common.app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
common.app.use(bodyParser.json())
