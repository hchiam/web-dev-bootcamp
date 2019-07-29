const express = require('express');
let app = express();

app.set('view engine', 'ejs');

app.listen('8000', 'localhost', function() {
    console.log(`Server started!!!`);
})

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/friends', function(req, res) {
    let friends = ['Tony', 'Elon', 'Bill', 'Steve', 'Sundar'];
    res.render('friends', {friends: friends});
});

app.post('/add-friend', function(req, res) {
    res.send('yay');
});
