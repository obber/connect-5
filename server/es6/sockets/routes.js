import { enqueueListener, dequeueListener } from "./listeners";

const socketRoutes = (socket) => {
  socket.on('enqueue', enqueueListener.bind(null, socket));
  socket.on('dequeue', dequeueListener.bind(null, socket));
};

export default socketRoutes
