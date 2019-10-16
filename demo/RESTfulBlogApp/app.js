// npm install express mongoose body-parser ejs --save

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

app = express();

// app config

mongoose.connect('mongodb://localhost/restful_blog_app', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs'); // so filename instead of filename.ejs
app.use(express.static('public')); // get stylesheet
app.use(bodyParser.urlencoded({ encoded:true, extended:true })); // body-parser

// mongoose/model config

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});
const Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: 'Test Blog',
//   image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Collage_of_Nine_Dogs.jpg',
//   body: 'Hello this is a blog post!',
//   // leave created blank
// });

// restful routes

app.get('/', function(req, res) {
  res.redirect('/blogs');
});

app.get('/blogs', function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {blogs}); // gets file in views folder: views/index.ejs
      // NOTE: NOT 'views/index' but just 'index.ejs' or 'index'
    }
  });
});

app.listen(8000, process.env.IP, function () {
  console.log('Server is running');
});
