const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const expressSession = require('express-session');
const methodOverride = require('method-override');

// import a custom function that has a private seeds array
const seedDB = require('./seed');

// routes
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

// models
const User = require('./models/user');
const Comment = require('./models/comment');
const Campground = require('./models/campground'); // ./models/campground.js replaces the next few lines:
// // schema
// const campgroundSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String,
// });
// 
// // model
// const Campground = mongoose.model('Campground', campgroundSchema);

mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true}); // find yelp_camp DB (and create it if it doesn't exist)
app.use(bodyParser.urlencoded({encoded:true, extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); // __dirname = directory script lives in
app.use(methodOverride('_method')); // to enable HTML form to actually use PUT or DELETE by looking for ?_method=...
seedDB(); // (function imported from seed.js)

// PASSPORT CONFIGURATION
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

// set up currentUser on every route: (which all HTML templates can then use: e.g. currentUser._id)
app.use((req, res, next) => {
    // set a custom variable currentUser (to be used by all our HTML templates)
    // i.e. automatically add currentUser parameter to the object when do res.render,
    // i.e. no need to explicity code "currentUser: req.user" in res.render('campgrounds/index', {campgrounds, currentUser: req.user});
    res.locals.currentUser = req.user; // req.user comes from passport.js
    next(); // use whatever's NEXT after this "middleware"
});

// app.use(indexRoutes);
// app.use(campgroundRoutes);
// app.use(commentRoutes);
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes); // prefix all routes
app.use('/campgrounds/:id/comments', commentRoutes); // prefix all routes

const port = process.env.PORT || 8000;
const ip = process.env.IP;
app.listen(port, ip, () => {
    console.log(`The YelpCamp server has started${port ? ' on port ' + port : ''}!`);
});
