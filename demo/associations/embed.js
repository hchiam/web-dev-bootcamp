const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo', {useNewUrlParser: true, useUnifiedTopology: true});

// POST - title, content
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
});
const Post = mongoose.model('Post', postSchema);

// USER - email, name
const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema], // <-- array of posts
});
const User = mongoose.model('User', userSchema);

// // to make sure model works, make a new user/post:
// const newUser = new User({
//   email: 'charlie@brown.edu',
//   name: 'Charlie Brown',
// });
// newUser.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });
// const newPost = new Post({
//   title: 'Reflections on Apples',
//   content: 'They are delicious!',
// });
// newPost.save((err, post) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });
