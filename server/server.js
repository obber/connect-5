const common = require('./common');
const server = common.server;
const app = common.app;
const port = 3456;

server.listen(port);
console.log('listening on port 3456');
