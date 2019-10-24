const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user.js');
const expressSession = require('express-session');

mongoose.connect('mongodb://localhost/auth_demo_app', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret: 'some complex secret string to encode and decode the session data',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// automatically encode and decode session data, and use local strategy:
passport.use(new LocalStrategy(User.authenticate())); // User uses passport-local-mongoose
passport.serializeUser(User.serializeUser()); // User uses passport-local-mongoose
passport.deserializeUser(User.deserializeUser()); // User uses passport-local-mongoose

// ===============================
// ROUTES
// ===============================

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', isLoggedIn, (req, res) => {
  // note the middleware ^ function isLoggedIn(req, res, next)
  res.render('secret');
});

// Auth routes

// show sign up form
app.get('/register', (req, res) => {
  res.render('register');
});
// handle user sign up
app.post('/register', (req, res) => {
  // register user, but...
  // !!!! DO NOT SAVE password in the DATABASE using new User({...}) !!!!
  // INSTEAD, pass the password as a 2nd argument to User.register (from passport-local-mongoose)
  User.register(new User({ username: req.body.username}), req.body.password, (err, user)=> {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    // do THE ACTUAL LOGIN and use the serializeUser method specified above
    // with ('local') strategy (other options would be google/facebook/twitter/etc.)
    passport.authenticate('local')(req, res, () => {
      // once user logged in, can now do something else
      res.redirect('/secret');
    });
  });
});

// Login routes

// render login form
app.get('/login', (req, res) => {
  res.render('login');
});
// actually login, using passport as middleware before final callback
app.post('/login', passport.authenticate('local', { // using passport as middleware
  successRedirect: '/secret', // URL to redirect to upon login success
  failureRedirect: '/login', // URL to redirect to upon login failure
}), (req, res) => { // final callback
  // final callback code
});

// logout:
app.get('/logout', (req, res) => {
  req.logout(); // signal to passport to "forget" user login data from session
  res.redirect('/');
});

// custom middleware to check if user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) { // isAuthenticated comes from passpord
    return next(); // continue with what's NEXT "after" the middleware
  }
  res.redirect('/login'); // otherwise do NOT continue with what's next
}

app.listen(8000, process.env.IP || 'localhost', () => {
  console.log('Server started.');
});
