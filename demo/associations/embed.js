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
  posts: [postSchema], // <-- array of posts: THIS IS THE EMBED ASSOCIATION format
});
const User = mongoose.model('User', userSchema);

// TO MAKE A NEW USER, uncomment next few lines and run node embed.js (hit Ctrl+C to stop):

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

// TO MAKE A NEW POST, uncomment next few lines and run node embed.js (hit Ctrl+C to stop):

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

// TO MAKE A NEW USER WITH ASSOCIATED POST, uncomment next few lines and run node embed.js (hit Ctrl+C to stop):

// const newUser = new User({
//   email: 'hermione@hogwards.edu',
//   name: 'Hermione Granger',
//   // posts will be filled below
// });
// newUser.posts.push({ // this is the new part
//   title: 'How to brew polyjuice potion',
//   content: 'Just kidding. Go to potions class to learn it!',
// });
// newUser.save((err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// TO RETRIEVE AN EXISTING USER, uncomment next few lines and run node embed.js (hit Ctrl+C to stop):

// User.findOne({name: 'Hermione Granger'}, (err, user) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(user);
//   }
// });

// TO EDIT AN EXISTING USER, uncomment next few lines and run node embed.js (hit Ctrl+C to stop):

// User.findOne({name: 'Hermione Granger'}, (err, user) => { // find
//   if (err) {
//     console.log(err);
//   } else {
//     user.posts.push({ // NOTE: this push doesn't actually save to DB
//       title: '3 Things I Really Hate',
//       content: 'Voldemort, Voldemort, and Voldemort.',
//     });
//     user.save((err, user) => { // actually save to DB
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(user);
//       }
//     });
//   }
// });
