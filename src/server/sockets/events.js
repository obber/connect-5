import listeners from "./listeners";

const cl = {};
const sv = {};

const events = [
  "enqueue",
  "dequeue"
];

events.forEach((event) => {
  cl[event] = {
    name: `cl.${event}`,
    cb: listeners[`${event}Listeners`]
  }
  sv[event] = {
    name: `sv.${event}`,
    cb: listeners[`${event}Listeners`]
  }
});

export { cl, sv };
