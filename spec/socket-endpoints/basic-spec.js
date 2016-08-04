"use strict";

var conf = require("./socket.config");
var io = conf.io;
var baseUrl = conf.baseUrl;
var options = conf.options;

var client1, client2, client3;

describe("socket.io connection", () => {
  var clients = 0;

  it("allows a client to connect", (done) => {
    client1 = io.connect(baseUrl, options);
    client1.on("connect", () => {
      clients++;
      expect(1).toEqual(1);
      done();
    });
  });

  it("allows multiple clients to connect", (done) => {
    client2 = io.connect(baseUrl, options);
    client3 = io.connect(baseUrl, options);
    client2.on("connect", () => {
      clients++;
    });
    client3.on("connect", () => {
      clients++;
      expect(clients).toBe(3);
      done();
    });
  });
});

