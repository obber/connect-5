import bodyParser from "body-parser";
import express from "express";
import http from "http";
import socketIo from "socket.io";

const app = express();
const server = http.Server(app);
const io = socketIo(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// public directory
app.use(express.static('./client/dist'));

export { app, server, io };
