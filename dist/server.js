"use strict";

var _common = require("common");

var _game = require("game/game");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 3456;

_common.io.on('connection', function (socket) {});

_common.server.listen(port);
console.log('listening on port 3456');