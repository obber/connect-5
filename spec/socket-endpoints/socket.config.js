"use strict";

var io = require("socket.io-client");
var baseUrl = "http://localhost:3456/";
var options = {
  "transports": ["websocket"],
  "force new connection": true
};

module.exports = {
  io: io,
  baseUrl: baseUrl,
  options: options
};
