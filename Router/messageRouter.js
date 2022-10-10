const express = require("express");
const { db } = require("../db");
const { convertMessage } = require("../utils/convert/messageConvert");
const messageRouter = express.Router();

messageRouter.get("/:name", async (req, res) => {
  if (req.params.name) {
    const offset = req.query.offset;
    const limit = req.query.limit;
    const count = await db.message.count();
    if (await count) {
      const result = await db.message.findAll({
        where: {
          room_id: req.params.name,
        },
        limit:
          count - offset < 0
            ? offset - count > limit
              ? 0
              : count - (offset - limit)
            : Number(limit),
        offset: count - offset < 0 ? 0 : count - offset,
        include: db.user,
      });
      return (await result)
        ? res
            .status(200)
            .json({ message: convertMessage(result) })
            .end()
        : res.status(200).json({ message: [] }).end();
    }
    return res.status(400).end();
  } else {
    return res.status(400).end();
  }
});

module.exports = messageRouter;
