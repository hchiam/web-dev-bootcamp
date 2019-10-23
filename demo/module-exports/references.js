const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2', {useNewUrlParser: true, useUnifiedTopology: true});

const Post = require('./models/post'); // NOTE THE DOT! models/post.js
const User = require('./models/user'); // NOTE THE DOT! models/user.js

// TO CREATE ANOTHER ASSOCIATED POST, uncomment next few lines and run node references.js (hit Ctrl+C to stop):

// Post.create({
//   title: 'How to cook the best burger - part 4',
//   content: 'Use 4 (four) patties!!!!',
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
