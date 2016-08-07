import gameListeners from "./gameListeners";

const cl = {};

const gameEvents = [
  "gameReady",
  "turnOver",
  "gameOver"
];

gameEvents.forEach((event) => {
  cl[event] = {
    name: `cl.${event}`,
    cb: gameListeners[`${event}Listener`]
  };
});

export { cl };
