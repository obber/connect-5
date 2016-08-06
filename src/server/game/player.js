const newPlayer = ({ socket, id }) => ({
  id: id,
  socket: socket,
  ready: false
});

export default newPlayer;
