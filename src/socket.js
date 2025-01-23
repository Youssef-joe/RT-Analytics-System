const { Server } = require('socket.io');
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"],
    },
  });
  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { initializeSocket, getIO };