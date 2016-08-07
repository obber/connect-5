const gameEmitters = {
  gameInitialized: (game) => {
    game.player1.socket.emit("sv.gameInitialized");
    game.player2.socket.emit("sv.gameInitialized");
  },

  gameReady: (game) => {
    if (game.player1.ready && game.player2.ready) {
      game.player1.socket.emit("sv.gameReady", { 
        id: 1,
        board: game.ctrl.getBoard(),
        turn: true
      });
      game.player2.socket.emit("sv.gameReady", { 
        id: 2, 
        board: game.ctrl.getBoard(),
        turn: false
      });
    }
  },

  turnOver: (game) => {
    const nextTurn = game.ctrl.turn();
    const currentBoard = game.ctrl.getBoard();

    game.player1.socket.emit("sv.turnOver", {
      board: currentBoard,
      turn: nextTurn === 1
    });
    game.player2.socket.emit("sv.turnOver", {
      board: currentBoard,
      turn: nextTurn === 2
    });
  },

  gameOver: (game) => {
    const currentBoard = game.ctrl.getBoard();
    const winner = game.ctrl.check();

    game.player1.socket.emit("sv.gameOver", {
      board: currentBoard,
      win: winner === 1
    });    
    game.player2.socket.emit("sv.gameOver", {
      board: currentBoard,
      win: winner === 2
    });
  }

};

export { gameEmitters };
