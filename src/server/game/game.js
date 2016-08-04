import newPlayer from "./player";

const newGame = (socket1, socket2) => Object.assign({
  currentTurn: null,
  player1: newPlayer(socket1),
  player2: newPlayer(socket2)
}, gameMethods);

const gameMethods = {
  init: () => {
    console.log("hi");
  },
  end: () => {
    console.log("hi");
  }
}

export default newGame;
