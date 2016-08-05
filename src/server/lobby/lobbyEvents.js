import lobbyListeners from "./lobbyListeners";

const cl = {};
const sv = {};

const lobbyEvents = [
  "enqueue",
  "dequeue"
];

lobbyEvents.forEach((event) => {
  cl[event] = {
    name: `cl.${event}`,
    cb: lobbyListeners[`${event}Listener`]
  };
  sv[event] = {
    name: `sv.${event}`
  };
});

export { cl, sv };
