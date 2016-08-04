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
    board: _.map(outerArr, innerArr => innerArr.slice())
  };

  // we bind our state object to every boardMethod so that the
  // methods maintain lexical access to it.
  return Object.assign({}, 
    _.cloneWith(boardMethods, method => method.bind(null, state))
  );
}

const boardMethods = {
  turn: (state) => {
    return state.turn;
  },

  check: (state) => {
    // todo: check board condition
    return !!state.winner;
  },

  getState: (state) => {
    // this function can become memory intensive since it deepclones.
    // it is designed to retrieve board info for databse entries later

    // we return a copy of state.board to maintain purity:
    // mutations of the board outside of this file is to be avoided.
    return _.cloneDeep(state);
  },

  add: (state, options) => {

  }
};

export { newBoard };
