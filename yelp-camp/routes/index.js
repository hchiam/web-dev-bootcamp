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
          req.flash('error', err.message);
          return res.render('register');
      }
      // do THE ACTUAL LOGIN and use the serializeUser method specified above
      // with ('local') strategy (other options would be google/facebook/twitter/etc.)
      passport.authenticate('local')(req, res, () => {
          req.flash('success', 'Welcome to YelpCamp ' + user.username);
          // once user logged in, can now do something else
          res.redirect('/campgrounds');
      });
  });
});

// show login form
router.get('/login', (req, res) => {
  res.render('login');
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
  req.flash('success', 'Logged out');
  res.redirect('/campgrounds');
});

module.exports = router;
