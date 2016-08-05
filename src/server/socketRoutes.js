import { cl } from "./lobby/lobbyEvents";
import _ from "lodash";

const socketRoutes = (socket) => {
  // we bind each events associated listener callback to the socket
  // this allows the listener callback to retain access to the socket reference.
  _.each(cl, (event) => {
    socket.on(event.name, event.cb.bind(null, socket));
  });
};

export default socketRoutes;
