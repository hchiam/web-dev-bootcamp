// NOTE: this is NOT the main entry point file!!!

const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// root route:
router.get('/', (req, res) => {
  res.render('landing'); // views/landing.ejs
  // NOTE: NOT 'views/landing' but just 'landing.ejs' or 'landing'
});

// ===============================
// AUTH ROUTES:
// ===============================

// show register form
router.get('/register', (req, res) => {
  res.render('register');
});

// handle signup logic
router.post('/register', (req, res) => {
  // register user, but...
  // !!!! DO NOT SAVE password in the DATABASE using new User({...}) !!!!
  const newUser = new User({ username: req.body.username});
  // INSTEAD, pass the password as a 2nd argument to User.register (from passport-local-mongoose)
  User.register(newUser, req.body.password, (err, user) => {
      if (err) {
          console.log(err);
          return res.render('register');
      }
      // do THE ACTUAL LOGIN and use the serializeUser method specified above
      // with ('local') strategy (other options would be google/facebook/twitter/etc.)
      passport.authenticate('local')(req, res, () => {
          // once user logged in, can now do something else
          res.redirect('/campgrounds');
      });
  });
});

// show login form
router.get('/login', (req, res) => {
  res.render('login', {message: req.flash('error')})
});

// handle login logic, using passport as middleware before final callback
router.post('/login', passport.authenticate('local', { // using passport as middleware
  successRedirect: '/campgrounds', // URL to redirect to upon login success
  failureRedirect: '/login', // URL to redirect to upon login failure
}), (req, res) => { // final callback
  // final callback code
});

// logout:
router.get('/logout', (req, res) => {
  req.logout(); // signal to passport to "forget" user login data from session
  res.redirect('/campgrounds');
});

// custom middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { // isAuthenticated comes from passport
      return next(); // continue with what's NEXT "after" the middleware
  }
  res.redirect('/login'); // otherwise do NOT continue with what's next
}

module.exports = router;
