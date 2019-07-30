const express = require('express');
const bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

let friends = ['Tony', 'Elon', 'Bill', 'Steve', 'Sundar'];

app.listen('8000', 'localhost', function() {
    console.log(`Server started!!!`);
})

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/friends', function(req, res) {
    res.render('friends', {friends: friends});
});

app.post('/add-friend', function(req, res) {
    let newFriend = req.body.newFriend;
    friends.push(newFriend);
    res.redirect('/friends');
});
