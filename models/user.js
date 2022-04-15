const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    public_id: String,
    image: String,
    text: String,
    link: String,
  },

  {
    timestamps: true,
  }
);

const FaveSchema = new mongoose.Schema({
  favorite: String,
  title: String,
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profile_url: String,
  faves: [FaveSchema],
  posts: [PostSchema],
});

module.exports = mongoose.model("User", UserSchema);
