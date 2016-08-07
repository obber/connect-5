import _ from "lodash";
import { idToCoordinates, isOpen, runCount } from "./boardLogic";

/**
 *  board.js
 *
 *  instantiations of board.js will appear inside of game.js
 *  
 *  each board is pure - it maintains state within itself and does not
 *  affect any game instantiation.
 *
 *  use the board's .check() method to see if a board is in a completed state.
 *
 */

const newBoard = () => {

  const board = new Array(19)
    .fill(new Array(19).fill(0))
    .map(row => row.slice());

  const state = {
    turn: 1,
    winner: null,
    board: board
  };

  // we bind our state object to every boardMethod so that the
  // methods maintain lexical access to it.
  return Object.assign({}, 
    _.mapValues(boardMethods, method => method.bind(null, state))
  );
};

const boardMethods = {
  turn: (state) => state.turn,

  check: (state) => state.winner,

  getBoard: (state) => _.cloneDeep(state.board),

  add: (state, tileId) => {
    // edge cases:
    if (!tileId) {
      throw new Error(`tileId is not defined. tileId = ${tileId}`);
    } else if (!isOpen(state.board, tileId)) {
      throw new Error(`board.add called, but ${tileId} is occupied.`);
    } else if (state.winner) {
      throw new Error(`board.add called, but ${state.turn} has already won.`);
    }

    // mutate the board state here.
    const { x, y } = idToCoordinates(tileId);
    state.board[y][x] = state.turn;

    // check for winning tile
    const runs = ["horizontal", "vertical", "major", "minor"]
      .map((direction) => runCount(state.board, tileId, direction));
    const maxRun = Math.max(...runs);

    // if winner
    if (maxRun >= 5) {
      state.winner = state.turn;
    } else {
      // 1 becomes 2, 2 becomes 1
      state.turn = (state.turn % 2) + 1;
    }

    return true;
  }
};

export default newBoard;
