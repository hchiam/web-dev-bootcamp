const express = require('express');
const Campground = require('../models/campground');
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
router.get('/new', (req, res) => { // '/campgrounds/new'
  res.render('campgrounds/new'); // views/campgrounds/new.ejs
});

// CREATE
router.post('/', (req, res) => { // '/campgrounds'
  // get data from form
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  // add campground to DB
  Campground.create({name, image, description}, (err, newlyCreated) => {
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

module.exports = router;
