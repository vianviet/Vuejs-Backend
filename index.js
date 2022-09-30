const express = require("express");
const io = require("socket.io");
var cors = require("cors");
require("dotenv").config();
const userRouter = require("./Router/userRouter");

const { connectDB } = require("./db");
const port = process.env.PORT;

const app = express();
const listener = app.listen(port, () => console.log("Listening..." + port));
socketsManager = io(listener, { cors: { origin: "*" } });

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
app.set("socketio", socketsManager);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);
connectDB();
