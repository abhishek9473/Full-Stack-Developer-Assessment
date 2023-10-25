// socket.js

const socketIO = require("socket.io");

let io;

function initializeSocket(server) {
  io = socketIO(server, {
    cors: {
      origin: "http://localhost:5000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

module.exports = {
  initializeSocket,
  getIO,
};
