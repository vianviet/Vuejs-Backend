const socketIo = require("socket.io");
const { db } = require("../db");
let instance = {};
const socketServer = () => {
  return {
    init: function (server) {
      instance.io = socketIo(server, {
        cors: {
          origin: "*",
          methods: ["PUT", "GET", "POST", "DELETE", "OPTIONS"],
          allowedHeaders: ["secretHeader"],
          credentials: true,
        },
      });
    },
    getInstance: function () {
      if (!instance) {
        instance = {};
      }
      return instance;
    },
    onConnection: () => {
      instance.io.on("connect", (socket) => {
        socket.on("room", (data) => {
          socket.join(data);
        });
        socket.on("sendMessage", async (data, callbackFn) => {
          try {
            const user = await db.user.findOne({
              where: {
                email: data.email,
              },
            });

            const message = await db.message.create({
              message: data.message,
              room_id: data.room,
              user_id: user.id,
            });
            if ((await message) && data.message !== "") {
              socket.to(data.room).emit("receiveMessage", {
                email: user.email,
                message: data.message,
                avatar: user.avatar,
              });
              callbackFn(null, { message: message });
            } else {
              callbackFn({ message: "Fail to create" }, null);
            }
          } catch (error) {
            callbackFn({ message: error }, null);
          }
        });
        socket.on("typing", (data) => {
          socket
            .to(data.room)
            .emit("receiveTyping", { typing: data.typing, email: data.email });
        });
      });
    },
    sendMessage: (room, message) => {
      instance.io.on("connect", (socket) => {
        socket.to(room).emit("receiveMessage", message);
      });
    },
  };
};
module.exports = socketServer;
