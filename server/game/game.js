import newPlayer from "game/player";

const newGame = (socket1, socket2) => ({
  player1: newPlayer(socket1),
  player2: newPlayer(socket2)
});
