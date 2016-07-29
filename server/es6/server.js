import { server, app, io } from "./common";
import Game from "./game/game";
import socketRoutes from "./sockets/socketRoutes";

import "./auth/auth";

const port = process.env.PORT || 3456;

io.on('connection', socketRoutes);

server.listen(port);
console.log('listening on port 3456');
