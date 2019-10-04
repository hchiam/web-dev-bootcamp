const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

// schema
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
});

// model
const Campground = mongoose.model('Campground', campgroundSchema);

// app.listen(process.env.PORT, process.env.IP, ()=>{
app.listen(8000, ()=>{
    console.log('The YelpCamp server has started!');
});

app.get('/', (req, res)=>{
    res.render('landing'); // views/landing.ejs
});

app.get('/campgrounds', (req, res)=>{
    Campground.find({}, (err, campgrounds)=>{
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', {campgrounds}); // views/campgrounds.ejs
        }
    });
});

app.get('/campgrounds/new', (req, res)=>{
    res.render('new'); // views/new.ejs
});

app.post('/campgrounds', (req, res)=>{
    // get data from form
    const name = req.body.name;
    const image = req.body.image;
    // add campground to DB
    Campground.create({name, image}, (err, newlyCreated)=> {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            // redirect back to campgrounds page
            res.redirect('/campgrounds');
        }
    });
});
