function socketHandler(socket, io) {
  console.log('A user connected');
  /*
  socket.on('notification', data => {
    io.emit('notification', {path: 'notification', message: data});
  });
  */
}

module.exports = {
  socketHandler,
}