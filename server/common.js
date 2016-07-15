const bodyParser = require('body-parser')

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

export { app, server, io };
