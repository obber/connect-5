const common = require('./common');
const server = common.server;
const app = common.app;
const io = common.io;
const port = process.env.PORT || 3456;

io.on('connection', (socket) => {

})

server.listen(port);
console.log('listening on port 3456');
