"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var newPlayer = function newPlayer(socket) {
  return {
    socket: socket
  };
};

exports.default = newPlayer;