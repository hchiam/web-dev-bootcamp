// npm install express mongoose body-parser ejs method-override express-sanitizer --save

/** 
 * in a bigger project worked on by multiple developers,
 * this would be broken up into several files
*/

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');
// need to use Method-Override to let html forms use PUT/DELETE
// with: action="...?_method=PUT" method="POST">

app = express();

// app config

mongoose.connect('mongodb://localhost/restful_blog_app', { useNewUrlParser: true, useUnifiedTopology: true });
app.set('view engine', 'ejs'); // so filename instead of filename.ejs
app.use(express.static('public')); // get stylesheet
app.use(bodyParser.urlencoded({ encoded:true, extended:true })); // body-parser
app.use(methodOverride('_method')); // to enable HTML form to use PUT
app.use(expressSanitizer()); // ORDERING NOTE: this just has to happen after app.use bodyParser

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

// index route
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

// new route
app.get('/blogs/new', function(req, res) {
  res.render('new'); // views/new.ejs
});

// create route
app.post('/blogs', function(req, res) {
  // sanitize blog[body] from new.ejs
  req.body.blog.body = req.sanitize(req.body.blog.body);
  
  // create blog
  Blog.create(req.body.blog, function(err, blog) {
    if (err) {
      res.render('new');
    } else {
      // then, redirect to index
      res.redirect('/blogs');
    }
  });
});

// show route
app.get('/blogs/:id', function (req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('show', {blog: foundBlog});
    }
  });
});

// edit route
app.get('/blogs/:id/edit', function(req, res) {
  Blog.findById(req.params.id, function (err, foundBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      res.render('edit', {blog: foundBlog});
    }
  });
});

// update route
app.put('/blogs/:id', function(req, res) {
  // sanitize blog[body] from new.ejs
  req.body.blog.body = req.sanitize(req.body.blog.body);

  // need to use Method-Override to let html forms use PUT
  // with: action="...?_method=PUT" method="POST">
  const id = req.params.id;
  const newData = req.body.blog;
  Blog.findByIdAndUpdate(id, newData, function (err, updatedBlog) {
    if (err) {
      res.redirect('/blogs');
    } else {
      // id = req.params.id;
      res.redirect('/blogs/' + id);
    }
  });
});

// destroy route
app.delete('/blogs/:id', function(req, res) {
  // need to use Method-Override to let html forms use DELETE
  // with: action="...?_method=DELETE" method="POST">
  
  // destroy blog
  Blog.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      // TODO: redirect to error message page
      res.redirect('/blogs');
    } else {
      // then, redirect to index
      res.redirect('/blogs');
    }
  });
});

app.listen(8000, process.env.IP, function () {
  console.log('Server is running');
});
