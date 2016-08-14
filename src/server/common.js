import bodyParser from "body-parser";
import express from "express";
import http from "http";
import socketIo from "socket.io";
import path from "path";
import passport from "passport";
import { sessionSecret } from "./auth/config";
import cookieParser from "cookie-parser";
import session from "express-session";
import knex from "knex";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/db.sqlite",
    useNullAsDefault: true
  }
});

const app = express();
const server = http.Server(app);
const io = socketIo(server);
const hostname = process.env.NODE_ENV === "production" ? "connect5.kanadachi.com" : "localhost:3457";

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// public directory
app.use(express.static(path.resolve("./dist/client")));

// auth related
app.use(cookieParser());
app.use(session({ secret: sessionSecret }));
app.use(passport.initialize());
app.use(passport.session());

export { db, app, server, io, hostname };
