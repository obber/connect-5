"use strict";

var conf = require("./socket.config");
var io = conf.io;
var baseUrl = conf.baseUrl;
var options = conf.options;

describe("queue socket events", () => {
  var c1 = io.connect(baseUrl, options);
  var c2 = io.connect(baseUrl, options);

  it("testing", () => {
    c1.emit("cl.enqueue");
    c2.emit("cl.enqueue");
  });

});
