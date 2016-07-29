import newPlayer from "./player";

const newGame = (socket1, socket2) => Object.assign({
  player1: newPlayer(socket1),
  player2: newPlayer(socket2)
}, gameMethods);

const gameMethods = {
  
}
