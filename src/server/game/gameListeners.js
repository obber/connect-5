const gameReadyListener = ({ game, socket }) => {
  if (game.player1.socket.id === socket.id) {
    game.player1.ready = true;
  } else {
    game.player2.ready = true;
  }

  game.emit.gameReady();
};

const turnOverListener = () => {
  console.log("cl.turnOver heard");
  return true;
};

const gameOverListener = () => {
  console.log("cl.gameOver heard");
  return true;
};

export default { gameReadyListener, turnOverListener, gameOverListener };
