'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queue = require('../lobby/queue');

var socketRoutes = function socketRoutes(socket) {
  socket.on('enqueue', function () {
    (0, _queue.enqueue)(socket);
  });

  socket.on('dequeue', function () {
    (0, _queue.dequeue)(socket);
  });
};

exports.default = socketRoutes;