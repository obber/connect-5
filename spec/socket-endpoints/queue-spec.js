"use strict";

var conf = require("./socket.config");
var io = conf.io;
var baseUrl = conf.baseUrl;
var options = conf.options;

describe("queue socket events", () => {
  var client = io.connect(baseUrl, options);

  it("allows a client to enqueue", (done) => {
    client.emit("cl.enqueue");
    client.on("sv.enqueue", (pkt) => {
      expect(pkt.success).toBe(true);
      done();
    });
  });

  it("allows a client to dequeue", (done) => {
    client.emit("cl.dequeue");
    client.on("sv.dequeue", (pkt) => {
      expect(pkt.success).toBe(true);
      done();
    });
  });

});
