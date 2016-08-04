"use strict";
 
const boardLogic = require("../../dist/server/game/board/boardLogic");
const isOpen = require("../../dist/server/game/board/boardLogic").isOpen;
const runCount = require("../../dist/server/game/board/boardLogic").runCount;

describe("boardLogic", () => {
  it("exports the expected functions", () => {
    expect(boardLogic.isOpen).toBeDefined();
    expect(boardLogic.runCount).toBeDefined();
  });
});

describe("boardLogic.isOpen", () => {
  var board = new Array(19).fill(new Array(19).fill(0).slice());

  it("detects open slots", () => {
    expect(isOpen(board, "aa")).toBe(true);
    expect(isOpen(board, "ss")).toBe(true);
  });

  it("detects occupied slots", () => {
    board[2][2] = 1; // id = "cc"
    board[5][1] = 2; // id = "fb"
    board[3][15] = 1; // id = "dp"
    expect(isOpen(board, "cc")).toBe(false);
    expect(isOpen(board, "fb")).toBe(false);
    expect(isOpen(board, "dp")).toBe(false);
  });
});

describe("boardLogic.runCount", () => {
  it("detects invalid number of arguments", () => {
    expect(runCount).toThrow();
    expect(() => runCount('a')).toThrow();
    expect(() => runCount('a', 'b')).toThrow();
  });

  it("detects invalid board", () => {
    expect(() => runCount([], "aa", "major")).toThrow(); 
    expect(() => runCount(['asdf', "aa", "major"])).toThrow(); 
    expect(() => {
      runCount(new Array(19).fill( new Array(19).fill('a') ), "aa", "major")
    }).toThrow();
  });

  it("detects invalid tileId", () => {
    var board = new Array(19).fill(new Array(19).fill(0)).map(arr => arr.slice());

    expect(() => runCount(board, "zx", "major")).toThrow();
    expect(() => runCount(board, "ta", "major")).toThrow();
    expect(() => runCount(board, "su", "major")).toThrow();
    expect(() => runCount(board, 15, "major")).toThrow();
    expect(() => runCount(board, undefined, "major")).toThrow();
    expect(() => runCount(board, null, "major")).toThrow();
    // valid id but should throw an error when the tile is open
    expect(() => runCount(board, "pm", "major")).toThrow();
    expect(() => runCount(board, "se", "major")).toThrow();
  });

  it("detects invalid direction", () => {
    var board = new Array(19).fill(new Array(19).fill(0)).map(arr => arr.slice());

    expect(() => runCount(board, "aa", "horizontaal")).toThrow();
    expect(() => runCount(board, "ta", "majer")).toThrow();
    expect(() => runCount(board, "su", "miner")).toThrow();
    expect(() => runCount(board, 15, "vertocal")).toThrow();
  });

  it("returns the correct run count for a single piece", () => {
    var board = new Array(19).fill(new Array(19).fill(0)).map(arr => arr.slice());
    // aa ab ac ad ae   00 01 02 03 04
    // ba bb bc bd be   10 11 12 13 14
    // ca cb cc cd ce   20 21 22 23 24
    // da db dc dd de   30 31 32 33 34
    // ea eb ec ed ee   40 41 42 43 44
    board[2][2] = 1;
    board[3][2] = 2;
    board[0][0] = 1;
    expect(runCount(board, "cc", "major")).toBe(1);
    expect(runCount(board, "dc", "major")).toBe(1);
    expect(runCount(board, "aa", "major")).toBe(1);

    board[2][1] = 1;
    board[3][1] = 1;
    board[4][1] = 1;
    board[4][2] = 1;
    board[4][3] = 1;
    board[3][3] = 1;
    board[2][3] = 1;
    expect(runCount(board, "aa", "major")).toBe(1);
    expect(runCount(board, "dc", "major")).toBe(1);
  });

  xit("returns the correct run count for horizontal runs", () => {
    var board = new Array(19).fill(new Array(19).fill(0)).map(arr => arr.slice());
    // aa ab ac ad ae   00 01 02 03 04
    // ba bb bc bd be   10 11 12 13 14
    // ca cb cc cd ce   20 21 22 23 24
    // da db dc dd de   30 31 32 33 34
    // ea eb ec ed ee   40 41 42 43 44
    board[0][0] = 1;
    board[0][1] = 1;
    expect(runCount(board, "ab", "horizontal")).toBe(2);
    expect(runCount(board, "aa", "horizontal")).toBe(2);

    board[0][2] = 1;
    expect(runCount(board, "aa", "horizontal")).toBe(3);
    expect(runCount(board, "ab", "horizontal")).toBe(3);
    expect(runCount(board, "ac", "horizontal")).toBe(3);

    board[0][3] = 1;
    expect(runCount(board, "aa", "horizontal")).toBe(4);
    expect(runCount(board, "ab", "horizontal")).toBe(4);
    expect(runCount(board, "ac", "horizontal")).toBe(4);
    expect(runCount(board, "ad", "horizontal")).toBe(4);

    board[0][4] = 1;
    expect(runCount(board, "aa", "horizontal")).toBe(5);
    expect(runCount(board, "ab", "horizontal")).toBe(5);
    expect(runCount(board, "ac", "horizontal")).toBe(5);
    expect(runCount(board, "ad", "horizontal")).toBe(5);
    expect(runCount(board, "ae", "horizontal")).toBe(5);
  });

  xit("returns the correct run count for vertical runs", () => {
    var board = new Array(19).fill(new Array(19).fill(0)).map(arr => arr.slice());
    // aa ab ac ad ae   00 01 02 03 04
    // ba bb bc bd be   10 11 12 13 14
    // ca cb cc cd ce   20 21 22 23 24
    // da db dc dd de   30 31 32 33 34
    // ea eb ec ed ee   40 41 42 43 44
    board[0][3] = 2;
    board[1][3] = 2;
    expect(runCount(board, "ad", "vertical")).toBe(2);
    expect(runCount(board, "bd", "vertical")).toBe(2);

    board[2][3] = 2;
    expect(runCount(board, "ad", "vertical")).toBe(3);
    expect(runCount(board, "bd", "vertical")).toBe(3);
    expect(runCount(board, "cd", "vertical")).toBe(3);

    board[3][3] = 2;
    expect(runCount(board, "ad", "vertical")).toBe(4);
    expect(runCount(board, "bd", "vertical")).toBe(4);
    expect(runCount(board, "cd", "vertical")).toBe(4);
    expect(runCount(board, "dd", "vertical")).toBe(4);

    board[4][3] = 2;
    expect(runCount(board, "ad", "vertical")).toBe(5);
    expect(runCount(board, "bd", "vertical")).toBe(5);
    expect(runCount(board, "cd", "vertical")).toBe(5);
    expect(runCount(board, "dd", "vertical")).toBe(5);
    expect(runCount(board, "ed", "vertical")).toBe(5);

    board[5][3] = 2;
    expect(runCount(board, "ad", "vertical")).toBe(5);
    expect(runCount(board, "bd", "vertical")).toBe(5);
    expect(runCount(board, "cd", "vertical")).toBe(5);
    expect(runCount(board, "dd", "vertical")).toBe(5);
    expect(runCount(board, "ed", "vertical")).toBe(5);
  });

  xit("returns the correct run count for major runs", () => {
    var board = new Array(19).fill(new Array(19).fill(0)).map(arr => arr.slice());
    // aa ab ac ad ae   00 01 02 03 04
    // ba bb bc bd be   10 11 12 13 14
    // ca cb cc cd ce   20 21 22 23 24
    // da db dc dd de   30 31 32 33 34
    // ea eb ec ed ee   40 41 42 43 44
    board[0][0] = 1;
    board[1][1] = 1;
    expect(runCount(board, "aa", "major")).toBe(2);
    expect(runCount(board, "bb", "major")).toBe(2);

    board[2][2] = 1;
    expect(runCount(board, "aa", "major")).toBe(3);
    expect(runCount(board, "bb", "major")).toBe(3);
    expect(runCount(board, "cc", "major")).toBe(3);

    board[3][3] = 1;
    expect(runCount(board, "aa", "major")).toBe(4);
    expect(runCount(board, "bb", "major")).toBe(4);
    expect(runCount(board, "cc", "major")).toBe(4);
    expect(runCount(board, "dd", "major")).toBe(4);

    board[4][4] = 1;
    expect(runCount(board, "aa", "major")).toBe(5);
    expect(runCount(board, "bb", "major")).toBe(5);
    expect(runCount(board, "cc", "major")).toBe(5);
    expect(runCount(board, "dd", "major")).toBe(5);
    expect(runCount(board, "ee", "major")).toBe(5);

    board[5][5] = 2;
    expect(runCount(board, "aa", "major")).toBe(5);
    expect(runCount(board, "bb", "major")).toBe(5);
    expect(runCount(board, "cc", "major")).toBe(5);
    expect(runCount(board, "dd", "major")).toBe(5);
    expect(runCount(board, "ee", "major")).toBe(5);
  });

  xit("returns the correct run count for minor runs", () => {
    var board = new Array(19).fill(new Array(19).fill(0)).map(arr => arr.slice());
    // aa ab ac ad ae   00 01 02 03 04
    // ba bb bc bd be   10 11 12 13 14
    // ca cb cc cd ce   20 21 22 23 24
    // da db dc dd de   30 31 32 33 34
    // ea eb ec ed ee   40 41 42 43 44
    board[0][5] = 1;
    board[1][4] = 1;
    expect(runCount(board, "af", "minor")).toBe(2);
    expect(runCount(board, "be", "minor")).toBe(2);

    board[2][3] = 1;
    expect(runCount(board, "af", "minor")).toBe(3);
    expect(runCount(board, "be", "minor")).toBe(3);
    expect(runCount(board, "cd", "minor")).toBe(3);

    board[3][2] = 1;
    expect(runCount(board, "af", "minor")).toBe(4);
    expect(runCount(board, "be", "minor")).toBe(4);
    expect(runCount(board, "cd", "minor")).toBe(4);
    expect(runCount(board, "dc", "minor")).toBe(4);

    board[4][1] = 1;
    expect(runCount(board, "af", "minor")).toBe(5);
    expect(runCount(board, "be", "minor")).toBe(5);
    expect(runCount(board, "cd", "minor")).toBe(5);
    expect(runCount(board, "dc", "minor")).toBe(5);
    expect(runCount(board, "eb", "minor")).toBe(5);

    board[5][0] = 2;
    expect(runCount(board, "af", "minor")).toBe(5);
    expect(runCount(board, "be", "minor")).toBe(5);
    expect(runCount(board, "cd", "minor")).toBe(5);
    expect(runCount(board, "dc", "minor")).toBe(5);
    expect(runCount(board, "eb", "minor")).toBe(5);
  });
});
