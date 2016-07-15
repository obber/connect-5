"use strict";

var _player = require("game/player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newGame = function newGame(socket1, socket2) {
  return {
    player1: (0, _player2.default)(socket1),
    player2: (0, _player2.default)(socket2)
  };
};