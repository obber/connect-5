const serverEmitters = {
  gameInitialized: (game) => {
    game.player1.socket.emit("sv.gameInitialized");
    game.player2.socket.emit("sv.gameInitialized");
  },

  gameReady: (game) => {
    if (game.player1.ready && game.player2.ready) {
      game.player1.socket.emit("sv.gameReady", { id: 1 });
      game.player2.socket.emit("sv.gameReady", { id: 2 });
    }
  }
};

export { serverEmitters };
