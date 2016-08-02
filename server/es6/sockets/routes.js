import { cl } from './events';
import _ from 'lodash';

const socketRoutes = (socket) => {
  // we bind each event's associated listener callback to the socket
  // this allows the listener callback to retain access to the socket reference.
  _.each(cl, (event) => {
    socket.on(event.name, event.cb.bind(null, socket));
  });
};

export default socketRoutes;
