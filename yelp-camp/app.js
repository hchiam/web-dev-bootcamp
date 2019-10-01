const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('landing'); // views/landing.ejs
});

app.get('/campgrounds', (req, res)=>{
    const campgrounds = [
        {name:'Salmon Creek', image:'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg'},
        {name:'Granite Hill', image:'https://upload.wikimedia.org/wikipedia/commons/3/39/Tenting_at_Joseph_A._Citta.jpg'},
        {name:`Mountain Goat's Rest`, image:'https://upload.wikimedia.org/wikipedia/commons/b/b5/Campsite-Oludeniz.JPG'},
    ];

    res.render('campgrounds', {campgrounds}); // views/campgrounds.ejs
});

// app.listen(process.env.PORT, process.env.IP, ()=>{
app.listen(8000, ()=>{
    console.log('The YelpCamp server has started!');
});
