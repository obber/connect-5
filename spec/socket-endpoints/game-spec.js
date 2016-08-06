"use strict";

const _ = require("lodash");

const conf = require("./socket.config");
const io = conf.io;
const baseUrl = conf.baseUrl;
const options = conf.options;

let c1 = io.connect(baseUrl, options);
let c2 = io.connect(baseUrl, options);

describe("game-related socket endpoints:", () => {

  it("cl.enqueue event should receive back a sv.enqueue event & sv.gameInitialized event", done => {
    let enqueueCount = 0;
    let gameInitCount = 0;
    
    const test = _.after(4, () => {
      expect(enqueueCount).toBe(2);
      expect(gameInitCount).toBe(2);
      done();
    });

    c1.emit("cl.enqueue");
    c2.emit("cl.enqueue");

    c1.on("sv.enqueue", () => {
      enqueueCount++;
      test();
    });
    c1.on("sv.gameInitialized", () => {
      gameInitCount++;
      test();
    });

    c2.on("sv.enqueue", () => {
      enqueueCount++;
      test();
    });
    c2.on("sv.gameInitialized", () => {
      gameInitCount++;
      test();
    });
  });

  it("cl.gameReady event should receive back a sv.gameReady event", done => {
    let gameReadyCount = 0;

    const test = _.after(2, () => {
      expect(gameReadyCount).toBe(2);
      done();
    });

    c1.emit("cl.gameReady");
    c2.emit("cl.gameReady");

    c1.on("sv.gameReady", () => {
      gameReadyCount++;
      test();
    });
    c2.on("sv.gameReady", () => {
      gameReadyCount++;
      test();
    });
  });

  it("sv.gameReady should send a packet with a playerId, initial board, & turn", done => {
    const test = _.after(2, () => {
      done();
    });
    c1 = io.connect(baseUrl, options);
    c2 = io.connect(baseUrl, options);
    c1.emit("cl.enqueue");
    c2.emit("cl.enqueue");
    c1.on("sv.gameInitialized", () => {
      c1.emit("cl.gameReady");
    });
    c2.on("sv.gameInitialized", () => {
      c2.emit("cl.gameReady");
    });
    c1.on("sv.gameReady", (pkt) => {
      expect(pkt).toBeDefined();
      expect(pkt.board).toBeDefined();
      expect(pkt.turn).toBe(true);
      test();
    });
    c2.on("sv.gameReady", (pkt) => {
      expect(pkt).toBeDefined();
      expect(pkt.board).toBeDefined();
      expect(pkt.turn).toBe(false);
      test();
    });
  });

  it("cl.turnOver should receive a sv.turnOver in response and toggle the turn", done => {
    const test = _.after(2, () => {
      done();
    });
    c1.emit("cl.turnOver", {
      tileId: "bb"
    });
    c1.on("sv.turnOver", (pkt) => {
      expect(pkt).toBeDefined();
      expect(pkt.board).toBeDefined();
      expect(pkt.turn).toBe(false);
      test();
    });
    c2.on("sv.turnOver", (pkt) => {
      expect(pkt).toBeDefined();
      expect(pkt.board).toBeDefined();
      expect(pkt.turn).toBe(true);
      test();
    });
  });

});
