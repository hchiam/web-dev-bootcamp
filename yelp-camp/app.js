const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const expressSession = require('express-session');
const seedDB = require('./seed');
const User = require('./models/user');
const Comment = require('./models/comment'); // ./models/comment.js
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

// // manually making a list:
// const campgrounds = [
//     {name:'Salmon Creek', image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg'},
//     {name:'Granite Hill', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg'},
//     {name:`Mountain Goat's Rest`, image:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Campsite-Oludeniz.JPG'},
//     {name:'Salmon Creek', image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg'},
//     {name:'Granite Hill', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg'},
//     {name:`Mountain Goat's Rest`, image:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Campsite-Oludeniz.JPG'},
//     {name:'Salmon Creek', image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg'},
//     {name:'Granite Hill', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg'},
//     {name:`Mountain Goat's Rest`, image:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Campsite-Oludeniz.JPG'},
//     {name:'Salmon Creek', image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg'},
//     {name:'Granite Hill', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg'},
//     {name:`Mountain Goat's Rest`, image:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Campsite-Oludeniz.JPG'},
// ];

mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true}); // find yelp_camp DB (and create it if it doesn't exist)
app.use(bodyParser.urlencoded({encoded:true, extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); // __dirname = directory script lives in
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

const port = process.env.PORT || 8000;
const ip = process.env.IP;
app.listen(port, ip, ()=>{
    console.log(`The YelpCamp server has started${port ? ' on port ' + port : ''}!`);
});

app.get('/', (req, res)=>{
    res.render('landing'); // views/landing.ejs
    // NOTE: NOT 'views/landing' but just 'landing.ejs' or 'landing'
});

// INDEX
app.get('/campgrounds', (req, res)=>{
    Campground.find({}, (err, campgrounds)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {campgrounds}); // views/campgrounds/index.ejs
        }
    });
});

// NEW (still get because get page)
app.get('/campgrounds/new', (req, res)=>{
    res.render('campgrounds/new'); // views/campgrounds/new.ejs
});

// SHOW (make sure this pattern match is listed AFTER /campgrounds/new)
app.get('/campgrounds/:id', (req, res)=>{
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

// CREATE
app.post('/campgrounds', (req, res)=>{
    // get data from form
    const name = req.body.name;
    const image = req.body.image;
    const description = req.body.description;
    // add campground to DB
    Campground.create({name, image, description}, (err, newlyCreated)=> {
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

// =================================================================
// COMMENTS ROUTES:
// =================================================================

app.get('/campgrounds/:id/comments/new', (req, res)=> {
    // 1) find campground by ID
    Campground.findById(req.params.id, (err, campground)=> {
        if (err) {
            console.log(err);
        } else {
            // 2) show new comment page
            res.render('comments/new', {campground}); // views/comments/new.ejs
        }
    });
});

app.post('/campgrounds/:id/comments', (req, res)=> {
    // 1) find campground by id
    // 2) create new comment
    // 3) connect new comment to campground
    // 4) redirect to campground SHOW page
    Campground.findById(req.params.id, (err, campground)=> { // 1)
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
            // TODO: better handling than redirect
        } else {
            Comment.create(req.body.comment, (err, comment)=> { // 2)
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

// ===============================
// AUTH ROUTES:
// ===============================

// show register form
app.get('/register', (req, res) => {
    res.render('register');
});
// handle signup logic
app.post('/register', (req, res) => {
    // register user, but...
    // !!!! DO NOT SAVE password in the DATABASE using new User({...}) !!!!
    const newUser = new User({ username: req.body.username});
    // INSTEAD, pass the password as a 2nd argument to User.register (from passport-local-mongoose)
    User.register(newUser, req.body.password, (err, user)=> {
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
