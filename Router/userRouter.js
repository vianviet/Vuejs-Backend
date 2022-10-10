const express = require("express");
const userRouter = express.Router();
const md5 = require("md5");
const jwt = require("jsonwebtoken");
const { db } = require("../db");
const socketServer = require("../Socket/socket");
const socket = socketServer().getInstance();

userRouter.get("/", async (req, res) => {
  return res.status(401).json({ message: "Logout" }).end();
});

userRouter.post("/login", async (req, res) => {
  try {
    const query = await db.user.findOne({
      where: { email: req.body.email, password: md5(req.body.password) },
      include: db.role,
    });
    if (query) {
      const token = jwt.sign(
        {
          email: query.dataValues.email,
          role: query.dataValues.Role.dataValues.name,
          avatar: query.dataValues.avatar,
        },
        process.env.JWT_SECRET_STRING,
        {
          expiresIn: process.env.EXPIRED_TOKEN,
        }
      );
      socket.io.sockets.to("0002").emit("receiveMessage", {
        email: "Server",
        message: `${query.dataValues.email} has join channel`,
        avatar: "https://technext.github.io/elaadmin/images/avatar/64-1.jpg",
      });
      return res
        .status(200)
        .json({
          token: token,
        })
        .end();
    } else {
      return res
        .status(401)
        .json({ message: "email or password invalid" })
        .end();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Loi server" }).end();
  }
});

userRouter.post("/register", async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      const result = await db.user.create({
        email: req.body.email,
        password: md5(req.body.password),
        avatar: req.body.avatar ? req.body.avatar : "",
        role_id: req.body.role_id,
      });
      console.log("eeeeee", result);
      return res.status(200).json({ message: "success" }).end();
    } catch (error) {
      console.log("errrr", error);
      return res.status(500).json({ message: "Da co loi xay ra" }).end();
    }
  } else {
    return res.status(400).json({ message: "email da ton tai" }).end();
  }
});

module.exports = userRouter;
