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

  it("cl.turnOver should receive a sv.turnOver in response, last tile, and toggle the turn", done => {
    const test = _.after(2, () => {
      done();
    });
    c1.emit("cl.turnOver", {
      tileId: "bb"
    });
    c1.on("sv.turnOver", (pkt) => {
      const result = _.cloneDeep(pkt);
      expect(result).toBeDefined();
      expect(result.board).toBeDefined();
      expect(result.last).toBe("bb");
      expect(result.turn).toBe(false);
      test();
    });
    c2.on("sv.turnOver", (pkt) => {
      const result = _.cloneDeep(pkt);
      expect(result).toBeDefined();
      expect(result.board).toBeDefined();
      expect(result.last).toBe("bb");
      expect(result.turn).toBe(true);
      test();
    });
  });
});

// we delay the next set of test suites to ensure a different game.
setTimeout(() => {

  let c3 = io.connect(baseUrl, options);
  let c4 = io.connect(baseUrl, options);

  describe("A full game, server-side only:", () => {

    it("should be able to detect when a player has won", done => {

      const test = _.after(2, () => {
        done();
      });

      c3.on("sv.gameInitialized", () => {
        c3.emit("cl.gameReady");
        c3.on("sv.gameReady", () => {
          gameStart();
        });
      });
      c4.on("sv.gameInitialized", () => {
        c4.emit("cl.gameReady");
        c4.on("sv.gameReady", () => {
          gameStart();
        });
      });

      c3.emit("cl.enqueue");
      c4.emit("cl.enqueue");

      const gameStart = _.after(2, () => {
        setTimeout(() => {
          c3.emit("cl.turnOver", { tileId: "aa" });
        }, 0);
        setTimeout(() => {
          c4.emit("cl.turnOver", { tileId: "ba" });
        }, 50);
        setTimeout(() => {
          c3.emit("cl.turnOver", { tileId: "ab" });
        }, 100);
        setTimeout(() => {
          c4.emit("cl.turnOver", { tileId: "bb" });
        }, 150);
        setTimeout(() => {
          c3.emit("cl.turnOver", { tileId: "ac" });
        }, 200);
        setTimeout(() => {
          c4.emit("cl.turnOver", { tileId: "bc" });
        }, 250);
        setTimeout(() => {
          c3.emit("cl.turnOver", { tileId: "ad" });
        }, 300);
        setTimeout(() => {
          c4.emit("cl.turnOver", { tileId: "bd" });
        }, 350);
        setTimeout(() => {
          c3.emit("cl.turnOver", { tileId: "ae" });
        }, 400);
      });

      c3.on("sv.gameOver", pkt => {
        expect(pkt.win).toBe(true);
        test();
      });
      c4.on("sv.gameOver", pkt => {
        expect(pkt.win).toBe(false);
        test();
      });
    });
  });

}, 200);

// we delay the next set of test suites to ensure a different game.
setTimeout(() => {

  let c5 = io.connect(baseUrl, options);
  let c6 = io.connect(baseUrl, options);

  describe("A full game, server-side only:", () => {

    it("should be able to detect when a player has won", done => {

      const test = _.after(2, () => {
        done();
      });

      c5.on("sv.gameInitialized", () => {
        c5.emit("cl.gameReady");
        c5.on("sv.gameReady", () => {
          gameStart();
        });
      });
      c6.on("sv.gameInitialized", () => {
        c6.emit("cl.gameReady");
        c6.on("sv.gameReady", () => {
          gameStart();
        });
      });

      c5.emit("cl.enqueue");
      c6.emit("cl.enqueue");

      const gameStart = _.after(2, () => {
        setTimeout(() => {
          c5.emit("cl.turnOver", { tileId: "ba" });
        }, 0);
        setTimeout(() => {
          c6.emit("cl.turnOver", { tileId: "aa" });
        }, 50);
        setTimeout(() => {
          c5.emit("cl.turnOver", { tileId: "bc" });
        }, 100);
        setTimeout(() => {
          c6.emit("cl.turnOver", { tileId: "bb" });
        }, 150);
        setTimeout(() => {
          c5.emit("cl.turnOver", { tileId: "bd" });
        }, 200);
        setTimeout(() => {
          c6.emit("cl.turnOver", { tileId: "dd" });
        }, 250);
        setTimeout(() => {
          c5.emit("cl.turnOver", { tileId: "be" });
        }, 300);
        setTimeout(() => {
          c6.emit("cl.turnOver", { tileId: "ee" });
        }, 350);
        setTimeout(() => {
          c5.emit("cl.turnOver", { tileId: "bf" });
        }, 400);
        setTimeout(() => {
          c6.emit("cl.turnOver", { tileId: "cc" });
        }, 450);
      });

      c5.on("sv.gameOver", pkt => {
        expect(pkt.win).toBe(false);
        test();
      });
      c6.on("sv.gameOver", pkt => {
        expect(pkt.win).toBe(true);
        test();
      });
    });
  });

}, 400);
