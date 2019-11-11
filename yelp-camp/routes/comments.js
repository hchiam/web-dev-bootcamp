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
  // 3) add username and id to comment
  // 4) save comment to DB
  // 5) add comment to campground
  // 6) save campground to DB
  // 7) redirect to campground SHOW page
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
                comment.author.id = req.user._id; // 3) (req.user is available since we used isLoggedIn)
                comment.author.username = req.user.username; // 3) (req.user is available since we used isLoggedIn)
                comment.save(); // 4)
                campground.comments.push(comment); // 5)
                campground.save(); // 6)
                res.redirect('/campgrounds/' + campground._id); // 7)
              }
          });
      }
  });
});

// EDIT
    // NOTE: app.js uses '/campgrounds/:id/comments' to prefix comment routes
    // AVOID: '/campgrounds/:id/comments/:id/edit' --> 2 :id's (one gets overridden)
    // INSTEAD: rename :id -> :comment_id
router.get('/:comment_id/edit', (req, res) => {
    const campground_id = req.params.id; // this works since we have :id set in app.js
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect('back');
        } else {
            res.render('comments/edit', {campground_id, comment: foundComment});
        }
    });
});

// UPDATE
router.put('/:comment_id', (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect('back');
        } else {
            const campground_id = req.params.id; // this works since we have :id set in app.js
            res.redirect('/campgrounds/' + campground_id);
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
