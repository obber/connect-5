import gameListeners from "./gameListeners";

const cl = {};
const sv = {};

const gameEvents = [
  "gameReady",
  "turnOver",
  "gameOver"
];

gameEvents.forEach((event) => {
  cl[event] = {
    name: `cl.${event}`,
    cb: gameListeners[`${event}Listener`]
  }
  sv[event] = {
    name: `sv.${event}`
  }
});

export { cl, sv };
