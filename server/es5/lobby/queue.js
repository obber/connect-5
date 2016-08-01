'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var queue = [];
var inQueue = {};

// enqueue and dequeue both return an integer signifying player's position in queue.

var enqueue = function enqueue(socket) {
  if (inQueue(socket.id)) {
    console.error('this socket is already in queue, but tried to enqueue. socket.id = ', socket.id);
    return -1;
  }

  // store socket in obj for fast lookup
  // store the position in queue as well.
  inQueue[socket.id] = queue.length;
  // store socket in queue 
  queue.push(socket);
  return inQueue[socket.id];
};

var dequeue = function dequeue(socket) {
  if (!inQueue(socket.id)) {
    console.error('this socket is not in the queue, but tried to dequeue. socket.id = ', socket.id);
    return -1;
  }

  // remove socket from obj and queue
  var position = inQueue[socket.id];
  delete inQueue[socket.id];
  // we return the 0th position of splice, since splice returns an array of removed items.
  // it also manipulates the array.
  return queue.splice(position, 1)[0];
};

exports.default = { enqueue: enqueue, dequeue: dequeue };