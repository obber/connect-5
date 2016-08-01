"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _queue = require("../lobby/queue");

var enqueueListener = function enqueueListener(socket) {
  (0, _queue.enqueue)(socket);
};

var dequeueListener = function dequeueListener(socket) {
  (0, _queue.dequeue)(socket);
};

exports.default = { enqueueListener: enqueueListener, dequeueListener: dequeueListener };