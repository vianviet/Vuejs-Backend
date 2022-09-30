const express = require("express");
const { User, Profile } = require("../Model/userModel");
const userRouter = express.Router();
const md5 = require("md5");

userRouter.post("/login", async (req, res) => {
  try {
    const query = await User.findOne({
      where: { email: req.body.email, password: md5(req.body.password) },
      include: Profile,
    });
    console.log(query);
    if (query) {
      return res.status(200).json(query).end();
    } else {
      return res
        .status(401)
        .json({ message: "email or password invalid" })
        .end();
    }
  } catch (error) {
    return res.status(500).json({ message: error }).end();
  }
});

userRouter.post("/register", async (req, res) => {
  if (req.body.email && req.body.password) {
    try {
      await User.create({
        email: req.body.email,
        password: md5(req.body.password),
        profiles: {
          name: "kakaka",
        },
      }).then((res) => console.log(res));
      return res.status(200).json({ message: "success" }).end();
    } catch (error) {
      return res.status(500).json({ message: "Da co loi xay ra" }).end();
    }
  } else {
    return res.status(400).json({ message: "email password khong co" }).end();
  }
});

module.exports = userRouter;
