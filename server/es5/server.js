"use strict";

var _common = require("./common");

var _game = require("./game/game");

var _game2 = _interopRequireDefault(_game);

var _socketRoutes = require("./sockets/socketRoutes");

var _socketRoutes2 = _interopRequireDefault(_socketRoutes);

require("./auth/auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3456;

_common.io.on('connection', _socketRoutes2.default);

_common.server.listen(port);
console.log('listening on port 3456');