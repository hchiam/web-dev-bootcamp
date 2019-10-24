const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// use authentication! (add methods to user)
userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
