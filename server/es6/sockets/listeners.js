import { enqueue, dequeue } from "../lobby/queue";

const enqueueListener = (socket) => {
  enqueue(socket);
};

const dequeueListener = (socket) => {
  dequeue(socket);
};

export default { enqueueListener, dequeueListener };
