'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var bodyParser = require('body-parser');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

exports.app = app;
exports.server = server;
exports.io = io;