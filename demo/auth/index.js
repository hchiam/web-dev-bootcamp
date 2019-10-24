const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth_demo_app', {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/secret', (req, res) => {
  res.render('secret');
});

app.listen(8000, process.env.IP || 'localhost', () => {
  console.log('Server started.');
});
