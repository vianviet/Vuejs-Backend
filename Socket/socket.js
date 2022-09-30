const { socketsManager } = require("../index.js");

module.exports.runSocket = () => {
  socketsManager.sockets.on("connect", (socket) => {
    socket.on("room", (data) => {
      socket.join(data);
    });
    socket.on("sendMessage", (data) => {
      socket.to(data.room).emit("receiveMessage", data.message);
    });
    socket.on("typing", (data) => {
      socket.to(data.room).emit("receiveTyping", data.typing);
    });
  });
};
