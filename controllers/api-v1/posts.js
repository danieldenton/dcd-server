const express = require("express");
const router = express.Router();
const requiresToken = require("./requiresToken");

const db = require("../../models");

router.post("/", requiresToken, async (req, res) => {
  try {
    const foundUser = res.locals.user;
    foundUser.posts.push({
      creator: req.body.creator,
      creatorId: req.body.creatorId,
      image: req.body.image,
      title: req.body.title,
      text: req.body.text,
      link: req.body.link,
    });
    await foundUser.save();
    res.status(201).json({ msg: "posted to db" });
  } catch (err) {
    console.log(err);
    res.status(503).json({ msg: "server error" });
  }
});

router.put("/:id", requiresToken, async (req, res) => {
  try {
    const foundUser = await db.User.findOne({
      "posts._id": req.params.id,
    });
    const foundPost = foundUser.posts.id(req.params.id);
    if (res.locals.user.id === foundUser.id) {
      foundPost.set(req.body.text);
      await foundUser.save();
      res.status(200).json(foundUser);
    } else res.json({ msg: "invalid action" });
  } catch (err) {
    console.log(err);
    res.status(503).json({ msg: "server error" });
  }
});

router.delete("/:id", requiresToken, async (req, res) => {
  try {
    const foundUser = await db.User.findOne({
      "posts._id": req.params.id,
    });
    console.log(foundUser);
    const foundPost = foundUser.posts.id(req.params.id);
    if (res.locals.user.id === foundUser.id) {
      foundPost.remove();
      await foundUser.save();
      res.status(200).json({ msg: "post successfully deleted" });
    } else res.json({ msg: "invalid action" });
  } catch (err) {
    console.log(err);
    res.status(503).json({ msg: "server error" });
  }
});

module.exports = router;
