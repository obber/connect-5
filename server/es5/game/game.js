"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _player = require("./player");

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var newGame = function newGame(socket1, socket2) {
  return Object.assign({
    player1: (0, _player2.default)(socket1),
    player2: (0, _player2.default)(socket2)
  }, gameMethods);
};

var gameMethods = {};

exports.default = newGame;