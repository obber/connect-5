const gameReadyListener = ({ game, player }) => {
  player.ready = true;
  game.emit.gameReady();
};

const turnOverListener = ({ game, player }, pkt) => {
  if (game.ctrl.turn() !== player.id) {
    throw new Error("turnOver was heard from the wrong client!");
  } else if (!pkt) {
    throw new Error("no packet was received from the cl.turnOver event. pkt = ", pkt);
  }

  // add returns us true if adding is successful
  if (game.ctrl.add(pkt.tileId)) {
    game.emit.turnOver();
  }
};

const gameOverListener = () => {
  console.log("cl.gameOver heard");
  return true;
};

export default { gameReadyListener, turnOverListener, gameOverListener };
