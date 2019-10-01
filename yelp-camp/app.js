const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const campgrounds = [
    {name:'Salmon Creek', image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg'},
    {name:'Granite Hill', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg'},
    {name:`Mountain Goat's Rest`, image:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Campsite-Oludeniz.JPG'},
    {name:'Salmon Creek', image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg'},
    {name:'Granite Hill', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg'},
    {name:`Mountain Goat's Rest`, image:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Campsite-Oludeniz.JPG'},
    {name:'Salmon Creek', image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg'},
    {name:'Granite Hill', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg'},
    {name:`Mountain Goat's Rest`, image:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Campsite-Oludeniz.JPG'},
    {name:'Salmon Creek', image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg'},
    {name:'Granite Hill', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg'},
    {name:`Mountain Goat's Rest`, image:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Campsite-Oludeniz.JPG'},
];

app.use(bodyParser.urlencoded({encoded:true, extended:true}));
app.set('view engine', 'ejs');

// app.listen(process.env.PORT, process.env.IP, ()=>{
app.listen(8000, ()=>{
    console.log('The YelpCamp server has started!');
});

app.get('/', (req, res)=>{
    res.render('landing'); // views/landing.ejs
});

app.get('/campgrounds', (req, res)=>{
    res.render('campgrounds', {campgrounds}); // views/campgrounds.ejs
});

app.get('/campgrounds/new', (req, res)=>{
    res.render('new'); // views/new.ejs
});

app.post('/campgrounds', (req, res)=>{
    // get data from form
    const name = req.body.name;
    const image = req.body.image;
    // add to campgrounds array
    campgrounds.push({name, image});
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});
