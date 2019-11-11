const mongoose = require('mongoose');

// schema
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: { // campground.author.id = req.user._id
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // references the other model
    },
    username: String, // campground.author.username = req.user.username
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment", // references the other model
    },
  ],
});

// model
const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;
