'use strict';

const io = require('socket.io-client');

const baseUrl = "http://localhost:3456/";
let options = {
  'transports': ['websocket'],
  'force new connection': true
};

module.exports = {
  io: io,
  baseUrl: baseUrl,
  options: options
}
