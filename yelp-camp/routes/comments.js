const express = require('express');
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const router = express.Router({mergeParams: true}); // NEED THIS to get :id when using URL shortener in main app.js

// NEW comment
router.get('/new', isLoggedIn, (req, res) => { // '/campgrounds/:id/comments/new'
  /** 
   * NOTE: the middleware function isLoggedIn(req, res, next) 
   * gets processed first before the code decides whether to enter this callback:
   */

  // 1) find campground by ID
  Campground.findById(req.params.id, (err, campground) => {
      if (err) {
          console.log(err);
      } else {
          // 2) show new comment page
          res.render('comments/new', {campground}); // views/comments/new.ejs
      }
  });
});

// CREATE comment
router.post('/', isLoggedIn, (req, res) => { // '/campgrounds/:id/comments/'
  /** 
   * NOTE: the middleware function isLoggedIn(req, res, next) 
   * gets processed first before the code decides whether to enter this callback:
   */

  // 1) find campground by id
  // 2) create new comment
  // 3) connect new comment to campground
  // 4) redirect to campground SHOW page
  Campground.findById(req.params.id, (err, campground) => { // 1)
      if (err) {
          console.log(err);
          res.redirect('/campgrounds');
          // TODO: better handling than redirect
      } else {
          Comment.create(req.body.comment, (err, comment) => { // 2)
              if (err) {
                  console.log(err);
              } else {
                  campground.comments.push(comment); // 3), part 1
                  campground.save(); // 3), part 2
                  res.redirect('/campgrounds/' + campground._id); // 4)
              }
          });
      }
  });
});

// custom middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { // isAuthenticated comes from passport
      return next(); // continue with what's NEXT "after" the middleware
  }
  res.redirect('/login'); // otherwise do NOT continue with what's next
}

module.exports = router;
