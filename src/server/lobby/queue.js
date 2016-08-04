const queue = [];
const inQueue = {};

// enqueue and dequeue both return an integer signifying player"s position in queue.

const enqueue = (socket) => {
  if (inQueue[socket.id]) {
    console.error("this socket is already in queue, but tried to enqueue. socket.id = ", socket.id);
    return -1;
  }

  // store socket in obj for fast lookup
  // store the position in queue as well.
  inQueue[socket.id] = queue.length;
  // store socket in queue 
  queue.push(socket);
  return inQueue[socket.id];
};

const dequeue = (socket) => {
  if (typeof inQueue[socket.id] !== "number") {
    console.error("this socket is not in the queue, but tried to dequeue. socket.id = ", socket.id);
    return -1;
  }

  // remove socket from obj and queue
  var position = inQueue[socket.id];
  delete inQueue[socket.id];
  // we return the 0th position of splice, since splice returns an array of removed items.
  // it also manipulates the array.
  return queue.splice(position, 1)[0];
};

export default { enqueue, dequeue };
