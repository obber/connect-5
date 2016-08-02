import { send } from './helpers';
import queue from '../lobby/queue';
import { cl, sv } from './events';

const enqueueListeners = (socket) => {
  console.log('heard enqueue');
  let pos = queue.enqueue(socket);
  console.log('pos = ', pos);
  if (pos === -1) {
    socket.emit(sv.enqueue.name, send(false, "not added to queue"));
  } else {
    socket.emit(sv.enqueue.name, send(true, "added to queue"));
  }
};

const dequeueListeners = (socket) => {
  console.log('heard dequeue');
  let pos = queue.dequeue(socket);
  if (pos === -1) {
    socket.emit(sv.dequeue.name, send(false, "not dequeued"));
  } else {
    socket.emit(sv.dequeue.name, send(true, "dequeued"));
  }
};

export default { enqueueListeners, dequeueListeners };
