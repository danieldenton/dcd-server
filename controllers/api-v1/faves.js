const express = require("express");
const router = express.Router();
const requiresToken = require("./requiresToken");

const db = require("../../models");

// POST adds faves to user
router.post("/", requiresToken, async (req, res) => {
  try {
    const foundUser = res.locals.user;
    foundUser.faves.push({
      image: req.body.image,
      title: req.body.title,
    });
    await foundUser.save();
    res.status(201).json({ msg: "favorite posted to db" });
  } catch (err) {
    console.log(err);
    res.status(503).json({ msg: "database or server error" });
  }
});

// DELETE removes fave from user
router.delete("/:id", requiresToken, async (req, res) => {
  try {
    const foundUser = await db.User.findOne({
      "faves._id": req.params.id,
    });
    const foundFave = foundUser.faves.id(req.params.id);
    if (foundUser.id === res.locals.user.id) {
      foundFave.remove();
      await foundUser.save();
      res.status(200).json({ msg: "fave successfully deleted" });
    } else res.json({ msg: "invalid action" });
  } catch (err) {
    console.log(err);
    res.status(503).json({ msg: "database or server error" });
  }
});

module.exports = router;
