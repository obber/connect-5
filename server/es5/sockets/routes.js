'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _listeners = require('./listeners');

var socketRoutes = function socketRoutes(socket) {
  socket.on('enqueue', _listeners.enqueueListener.bind(null, socket));
  socket.on('dequeue', _listeners.dequeueListener.bind(null, socket));
};

exports.default = socketRoutes;