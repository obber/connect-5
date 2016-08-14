import newGame from "../game/game";

const queue = [];

// enqueue and dequeue both return an integer signifying player"s position in queue.

const enqueue = (socket) => {
  if (queue.indexOf(socket) >= 0) {
    console.error("this socket is already in queue, but tried to enqueue. socket.id = ", socket.id);
    return -1;
  }

  // store socket in queue 
  queue.push(socket);

  // return position in queue
  return queue.length - 1;
};

const dequeue = (socket) => {
  if (queue.indexOf(socket) === -1) {
    console.error("this socket is not in the queue, but tried to dequeue. socket.id = ", socket.id);
    return -1;
  }
  
  return queue.shift();
};

// every 3 seconds, we want to pair ppl from the queue and dequeue them into a game.
setInterval(() => {
  while (queue.length >= 2) {
    const player1 = dequeue(queue[0]);
    const player2 = dequeue(queue[0]);
    var game = newGame(player1, player2);
    game.init();
  }
}, 1000);

export { enqueue, dequeue };
