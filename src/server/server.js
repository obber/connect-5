import { server, io } from "./common";
import socketRoutes from "./sockets/routes";

import "./auth/auth";

const port = process.env.PORT || 3456;

io.on("connection", socketRoutes);

server.listen(port);
console.log("listening on port 3456");
