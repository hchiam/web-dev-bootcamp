const mongoose = require('mongoose');

// schema
const commentSchema = new mongoose.Schema({
  text: String,
  author: String,
});

// model
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
