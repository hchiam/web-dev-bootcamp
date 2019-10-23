const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2', {useNewUrlParser: true, useUnifiedTopology: true});

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
  posts: [ // <-- array of ObjectIds: THIS IS THE EMBED ASSOCIATION format
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
});
const User = mongoose.model('User', userSchema);

// TO CREATE USER, uncomment next few lines and run node references.js (hit Ctrl+C to stop):

// User.create({
//   email: 'bob@gmail.com',
//   name: 'Bob Belcher',
// });

// TO CREATE POST, uncomment next few lines and run node references.js (hit Ctrl+C to stop):

// Post.create({
//   title: 'How to cook the best burger',
//   content: 'blah blah blah blah blah',
// }, (err, post) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(post);
//   }
// });

// TO CREATE AN ASSOCIATED POST, uncomment next few lines and run node references.js (hit Ctrl+C to stop):

// Post.create({
//   title: 'How to cook the best burger - part 2',
//   content: 'blah to blah to blah to blah to blah',
// }, (err, post) => {
//   User.findOne({email:'bob@gmail.com'}, (err, user) => {
//     if (err) {
//       console.log(err);
//     } else {
//       user.posts.push(post); // NOTE: this push doesn't actually save to DB
//       user.save((err, user) => { // actually save to DB
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(user);
//         }
//       });
//     }
//   });
// });

// TO CREATE ANOTHER ASSOCIATED POST, uncomment next few lines and run node references.js (hit Ctrl+C to stop):

// Post.create({
//   title: 'How to cook the best burger - part 3',
//   content: 'three steps, three steps, three steps',
// }, (err, post) => {
//   User.findOne({email:'bob@gmail.com'}, (err, user) => {
//     if (err) {
//       console.log(err);
//     } else {
//       user.posts.push(post); // NOTE: this push doesn't actually save to DB
//       user.save((err, user) => { // actually save to DB
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(user);
//         }
//       });
//     }
//   });
// });

// TO FIND ALL POSTS FOR A USER, uncomment next few lines and run node references.js (hit Ctrl+C to stop):

// User.findOne({email: 'bob@gmail.com'})
//   .populate('posts') // indicate will populate the posts prop in the Schema
//   .exec((err, user) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(user);
//     }
//   });
