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
    console.log('cl.enqueue emitted');
    client.on('sv.enqueue', (pkt) => {
      console.log('sv.enqueue was heard');
      console.log('pkt = ', pkt);
      expect(pkt.success).toBe(true);
      done();
    });
  });

  it("allows a client to dequeue", (done) => {
    console.log('cl.dequeue emitted');
    client.emit('cl.dequeue');
    client.on('sv.dequeue', (pkt) => {
      console.log('sv.dequeue was heard');
      expect(pkt.success).toBe(true);
      done();
    });
  });

});
