const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
 
const seeds = [
  {
    name: "Cloud's Rest",
    price: "9.50",
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    name: "Desert Mesa",
    price: "3.54",
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
  {
    name: "Canyon Floor",
    price: "4.16",
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
  },
];
 
async function seedDB(){
  try {

    // reinitialize DB
    await Campground.remove({});
    console.log('Campgrounds removed');
    await Comment.remove({});
    console.log('Comments removed');

    // "plant" seeds
    for (let seed of seeds) {
      const campground = await Campground.create(seed);
      console.log('Campground created');

      const comment = await Comment.create(
        {
          text: 'This place is great, but I wish there was internet',
          author: 'Homer',
        }
      );
      console.log('Comment created');
      
      campground.comments.push(comment);
      console.log('Comment added to campground');
      campground.save();
      console.log('Campground updated in DB');
    }

  } catch(err) {
    console.log(err);
  }
}

module.exports = seedDB;
