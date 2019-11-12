const express = require('express');
const isAnImageUrl = require('is-an-image-url');
const Campground = require('../models/campground');
const middleware = require('../middleware'); // ../middleware/index.js
const Comment = require('../models/comment');
const router = express.Router();

// INDEX - show all campgrounds
router.get('/', (req, res) => { // '/campgrounds'
  Campground.find({}, (err, campgrounds) => {
      if (err) {
          console.log(err);
      } else {
          res.render('campgrounds/index', {campgrounds}); // views/campgrounds/index.ejs
      }
  });
});

// NEW (still get because get page) - show form to create campground
router.get('/new', middleware.isLoggedIn, (req, res) => { // '/campgrounds/new'
  res.render('campgrounds/new'); // views/campgrounds/new.ejs
});

// CREATE
router.post('/', middleware.isLoggedIn, (req, res) => { // '/campgrounds'
  // get data from form
  const name = req.body.name;
  const price = req.body.price;
  let image = req.body.image;
  const description = req.body.description;
  const author = {id: req.user._id, username: req.user.username}; // (req.user is available since we used isLoggedIn)
  
  if (!isValidImageURL(image)) image = '';

  const newCampground = {name, price, image, description, author};
  console.log(newCampground);
  
  // add campground to DB
  Campground.create(newCampground, (err, newlyCreated) => {
      if (err) {
          console.log('Error:');
          console.log(err);
      } else {
          console.log('Added campground:');
          // redirect back to campgrounds page
          res.redirect('/campgrounds'); // redirect URL (not .ejs file)
      }
  });
});

// SHOW (make sure this pattern match is listed AFTER /campgrounds/new) - show more info about one campground
router.get('/:id', (req, res) => { // '/campgrounds/:id'
  // req.params.id comes from user
  // use Mongoose to guarantee unique ID instead of req.params.id:
  // need .populate().exec to get the associated comments too
  Campground.findById(req.params.id)
      .populate('comments') // to make campground object will have comments
      .exec((err, campground) => {
          if (err) {
              console.log(err);
          } else {
              console.log(campground);
              res.render('campgrounds/show', {campground}); // views/campgrounds/show.ejs
          }
      }
  );
});

// EDIT (need to show edit form)
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render('campgrounds/edit', {campground: foundCampground}); // /views/campgrounds/edit.ejs
    });
});

// UPDATE (actually edit the data)
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    // find and update correct campground
    // redirect somewhere (show page)
    // (instead of find by id and then update)
    // and (req.body.campground and name="campground[description]" instead of var data = {name: req.params.name, ...})
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            // redirect to the SHOW page
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndDelete(req.params.id, (err, removedCampground) => {
        if (err) {
            res.redirect('/campgrounds');
        } else {
            // also delete comments associated with that campground:
            Comment.deleteMany( {_id: { $in: removedCampground.comments } }, (err) => {
                if (err) {
                    res.redirect('/campgrounds');
                } else {
                    res.redirect('/campgrounds');
                }
            });
        }
    });
});

function isValidImageURL(url) {
    isAnImageUrl(url, function(isAnImageResult) {
        if (isAnImageResult) {
            return true;
        } else {
            return false;
        }
    });
}

module.exports = router;
