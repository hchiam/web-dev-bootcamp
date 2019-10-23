const mongoose = require('mongoose');

// schema
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});

// model
const Campground = mongoose.model('Campground', campgroundSchema);

module.exports = Campground;
