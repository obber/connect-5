import newPlayer from "./player";
import newBoard from "./board/board";
import { cl } from "./gameEvents";
import _ from "lodash";

const newGame = (socket1, socket2) => {

  const game = {
    player1: newPlayer(socket1),
    player2: newPlayer(socket2),
    ctrl: newBoard()
  }

  return Object.assign(
    game, 
    _.mapValues(gameMethods, method => method.bind(game, game))
  );

}

const gameMethods = {
  init: (game) => {
    game.listen();
    game.player1.socket.emit("gameInitialized");
    game.player2.socket.emit("gameInitialized");
  },

  listen: (game) => {
    // bring in the event listeners from gameEvents
    _.each(cl, (event) => {
      game.player1.socket.on(event.name, event.cb.bind(null, game.player1.socket));
      game.player2.socket.on(event.name, event.cb.bind(null, game.player2.socket));
    });

    // add disconnect listeners
    game.player1.socket.on("disconnect", game.disconnect);
    game.player2.socket.on("disconnect", game.disconnect);
  },

  disconnect: () => {
    console.log("player disconnected");
  },

  end: () => {
    console.log("game ended");
  }
}

export default newGame;
