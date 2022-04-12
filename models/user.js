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

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profile_url: String,
  favorites: String,
  posts: [PostSchema],
});

module.exports = mongoose.model("User", UserSchema);
