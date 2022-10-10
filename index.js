const express = require("express");
var cors = require("cors");
const userRouter = require("./Router/userRouter");
const socketServer = require("./Socket/socket");
const messageRouter = require("./Router/messageRouter");
const { db } = require("./db");

const socket = socketServer();
require("dotenv").config();
const port = process.env.PORT;

const app = express();
const listener = app.listen(port, () => console.log("Listening..." + port));
socket.init(listener);
socket.onConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRouter);
app.use("/message", messageRouter);
db.sequelize.sync();
