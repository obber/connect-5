const gameReadyListener = ({ game, player }) => {
  player.ready = true;
  game.emit.gameReady();
};

const turnOverListener = ({ game, player }, pkt) => {
  if (game.ctrl.turn() !== player.id) {
    player.socket.emit("sv.error", {
      message: "it's not your turn."
    });
    throw new Error("cl.turnOver heard from the wrong player. pkt = ", pkt);
  } else if (!pkt) {
    throw new Error("No packet was received from the cl.turnOver event. pkt = ", pkt);
  }

  // add returns us true if adding is successful
  if (game.ctrl.add(pkt.tileId)) {
    // check for winner
    if (game.ctrl.check()) {
      game.emit.gameOver();
    } else {
      game.emit.turnOver();
    }
  }
};

const gameOverListener = () => {
  console.log("cl.gameOver heard");
  return true;
};

export default { gameReadyListener, turnOverListener, gameOverListener };
