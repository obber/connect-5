import newPlayer from "./player";
import newBoard from "./board/board";
import { cl } from "./gameEvents";
import { serverEmitters } from "./gameEmitters";
import _ from "lodash";

const newGame = (socket1, socket2) => {

  const game = {
    player1: newPlayer(socket1),
    player2: newPlayer(socket2),
    ctrl: newBoard()
  };

  return Object.assign(
    game,
    _.mapValues(gameMethods, method => method.bind(null, game))
  );

};

const gameMethods = {
  init: (game) => {
    // set up emitters
    game.emit = _.mapValues(serverEmitters, emitter => emitter.bind(null, game));

    // set up event listeners
    game.listen();

    // tell the clients that the game has been initialize
    game.emit.gameInitialized();
  },

  listen: (game) => {
    const socket1 = game.player1.socket;
    const socket2 = game.player2.socket;

    // bring in the event listeners from gameEvents
    _.each(cl, (event) => {
      socket1.on(event.name, event.cb.bind(null, { game, "socket": socket1 }));
      socket2.on(event.name, event.cb.bind(null, { game, "socket": socket2 }));
    });

    // add disconnect listeners
    socket1.on("disconnect", game.disconnect);
    socket2.on("disconnect", game.disconnect);
  },

  disconnect: () => {
    console.log("player disconnected");
  },

  end: () => {
    console.log("game ended");
  }
};

export default newGame;
