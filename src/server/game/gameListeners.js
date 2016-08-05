// import { send } from "../modules/helpers";
// import { sv } from "./gameEvents";

const gameReadyListener = () => {
  console.log("cl.gameReady heard");
  return true;
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
