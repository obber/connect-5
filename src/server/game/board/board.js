import _ from "lodash";

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

  const innerArr = new Array(19).fill(0);
  const outerArr = new Array(19).fill(innerArr);

  const state = {
    turn: null,
    winner: null,
    board: outerArr.map(row => row.slice())
  };

  // we bind our state object to every boardMethod so that the
  // methods maintain lexical access to it.
  return Object.assign({}, 
    _.cloneWith(boardMethods, method => method.bind(null, state))
  );
}

const boardMethods = {
  turn: (state) => state.turn,
  check: (state) => state.winner,
  getState: (state) => _.cloneDeep(state)
};

export { newBoard };
