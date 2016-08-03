'use strict';

const request = require('request');
const io = require('socket.io-client');

const baseUrl = "http://localhost:3456/";
let options = {
  'transports': ['websocket'],
  'force new connection': true
};

describe("queue socket events", () => {
  let client = io.connect(baseUrl, options);

  it("allows a client to enqueue", (done) => {
    client.emit('cl.enqueue');
    client.on('sv.enqueue', (pkt) => {
      expect(pkt.success).toBe(true);
      done();
    });
  });

  it("allows a client to dequeue", (done) => {
    client.emit('cl.dequeue');
    client.on('sv.dequeue', (pkt) => {
      expect(pkt.success).toBe(true);
      done();
    });
  });

});
