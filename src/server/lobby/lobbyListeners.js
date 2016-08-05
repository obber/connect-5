import { send } from "../modules/helpers";
import { enqueue, dequeue } from "./queue";
import { sv } from "./lobbyEvents";

const enqueueListener = (socket) => {
  const pos = enqueue(socket);
  if (pos === -1) {
    socket.emit(sv.enqueue.name, send(false, "not added to queue"));
  } else {
    socket.emit(sv.enqueue.name, send(true, "added to queue"));
  }
};

const dequeueListener = (socket) => {
  const pos = dequeue(socket);
  if (pos === -1) {
    socket.emit(sv.dequeue.name, send(false, "not dequeued"));
  } else {
    socket.emit(sv.dequeue.name, send(true, "dequeued"));
  }
};

export default { enqueueListener, dequeueListener };
