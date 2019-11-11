const mongoose = require('mongoose');

// schema
const commentSchema = new mongoose.Schema({
  text: String,
  author: {
    id: { // comment.author.id = req.user._id
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references the other model
    },
    username: String, // comment.author.username = req.user.username
  },
});

// model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
