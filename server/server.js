import { server, app, io } from "./common";
import Game from "./game/game";

import "./auth/auth";

const port = process.env.PORT || 3456;

io.on('connection', (socket) => {

});

server.listen(port);
console.log('listening on port 3456');
