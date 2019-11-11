// all the middleware goes here (in bigger projects could be separate files)
// aside: index.js is a special name: the default expected "home" module, so you can just require('../middleware');

const Campground = require('../models/campground');
const Comment = require('../models/comment');

const middlewareObject = {};

// custom middleware to check if user is logged in
// "AUTHENTICATION" = checking they're who they say they are
middlewareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) { // isAuthenticated comes from passport
    return next(); // continue with what's NEXT "after" the middleware
  }
  res.redirect('/login'); // otherwise do NOT continue with what's next
};

// custom middleware to check if user is logged in AND owns the campground (i.e. can edit/delete)
// "AUTHORIZATION" = checking whether they're allowed to do an action
middlewareObject.checkCampgroundOwnership = (req, res, next) => {
  // check if user logged in
  if (!req.isAuthenticated()) {
    res.redirect('back'); // special meaning: go back to wherever the user was last
  } else {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        res.redirect('back'); // special meaning: go back to wherever the user was last
      } else {
        // check if user owns the campground
        if (!foundCampground.author.id.equals(req.user._id)) {
          // .equals and CANNOT use foundCampground.author.id === req.user._id because one is ObjectId, one is string
          res.redirect('back'); // special meaning: go back to wherever the user was last
        } else {
          // res.render('campgrounds/edit', {campground: foundCampground}); // /views/campgrounds/edit.ejs
            next(); // continue with what's NEXT "after" the middleware
        }
      }
    }); 
  }
};

// custom middleware to check if user is logged in AND owns the comment (i.e. can edit/delete)
// "AUTHORIZATION" = checking whether they're allowed to do an action
middlewareObject.checkCommentOwnership = (req, res, next) => {
  // check if user logged in
  if (!req.isAuthenticated()) {
    res.redirect('back'); // special meaning: go back to wherever the user was last
  } else {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect('back'); // special meaning: go back to wherever the user was last
      } else {
        // check if user owns the comment
        if (!foundComment.author.id.equals(req.user._id)) {
          // .equals and CANNOT use foundComment.author.id === req.user._id because one is ObjectId, one is string
          res.redirect('back'); // special meaning: go back to wherever the user was last
        } else {
          next(); // continue with what's NEXT "after" the middleware
        }
      }
    }); 
  }
};

module.exports = middlewareObject;
