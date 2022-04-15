const express = require("express");
const router = express.Router();
const requiresToken = require("./requiresToken");

const db = require("../../models");

router.get("/", async (req, res) => {
  try {
    const allUsers = await db.User.find({});
    const posts = allUsers.posts;
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(503).json({ msg: "server error" });
  }
});

router.post("/", requiresToken, async (req, res) => {
  try {
    const foundUser = res.locals.user;
    foundUser.posts.push({
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

router.put("/", requiresToken, async (req, res) => {
  try {
    const foundUser = await db.User.findOne({
      "posts._id": req.body.postId,
    });
    foundUser.posts.push(req.body);
    await foundUser.save();
    res
      .status(201)
      .json({ updatedUser: foundUser, commenter: res.locals.user.name });
  } catch (err) {
    console.log(err);
    res.status(503).json({ msg: "server error" });
  }
});

router.delete("/", requiresToken, async (req, res) => {
  try {
    const foundUser = await db.User.findOne({
      "post._id": req.params.id,
    });
    const foundPost = foundUser.posts.id(req.params.id);
    if (foundUser.id === res.locals.user.id) {
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
