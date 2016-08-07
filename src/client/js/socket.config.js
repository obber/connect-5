import io from "socket.io-client";

const baseUrl = process.env.NODE_ENV === "production" ? "http://URLTOEDIT.com": "http://localhost:3456/";

let socket;

const connectSocket = () => {
  socket = io.connect(baseUrl, {
    transports: ["websocket"],
    "force new connection": true
  });
};

export { connectSocket, socket };
