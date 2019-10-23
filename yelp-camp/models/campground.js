const mongoose = require('mongoose');

// schema
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

// model
const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;
