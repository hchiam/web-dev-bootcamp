# Yelp Camp

* landing page
* campgrounds page (name + image)
* header and footer partials
* bootstrap
* POST route for form to create campground
* navbar

## To run demo as-is from GitHub

If the `data` folder and `mongod` file do not already exist in the `yelp-camp` folder, create them:

```bash
cd yelp-camp
mkdir data
touch mongod
```

Enter this code inside the `mongod` file:

```
mongod --dbpath=data --nojournal
```

Now keep the database running in the background:

```bash
./mongod
```

And now go to a separate CLI tab/window and run the app:

```bash
node app.js
```

(Or have it automatically restart when you edit `app.js`:)

```bash
nodemon app.js
```

## Initial development steps

```bash
npm init
```

(Follow the prompts. I chose to name the main js file as app.js instead of index.js)

```bash
npm install express ejs --save # will install both express and ejs in one command
touch app.js
```

Then start the server:

```bash
node app.js
```

or

```bash
nodemon app.js # to auto-run upon saving app.js
```

Now create and edit files as needed.

Also, to install body-parser:

```bash
npm install body-parser --save
```

## MongoDB notes

MongoDB = NoSQL = more flexible, but not necessarily better than SQL in all situations.

[old](https://gist.github.com/nax3t/9d22f0f627d144da9f21b43f90b3680f)

[new](https://gist.github.com/nax3t/c781791851bac04e399d2275405cead5)

<https://www.youtube.com/watch?v=b089GmAvUyQ&feature=youtu.be>

Finally, to get the database running: (**NOTE:** it's *NOT* just `mongod`!)

```bash
./mongod # this will run the database
```

Then in another tab:

```bash
mongo
```

Then in that same new tab you can do this:

```bash
show dbs
```

(Ctrl+C or Cmd+C to exit)

### Mongo Commands

* `mongod` (run DB, i.e. run DataBase)
* `mongo` (console-style debug DB)
* `help` (list commands)
* `show dbs` (show databases)
* `use` (use/switch to an existing DB, or create a DB if it doesn't exist)
  * Example: `use demo` tells mongo which DB to use, *and* creates a DB called "demo" if it doesn't already exist
  * (Note: the DB won't show up in the `show dbs` output until it gets data)
* `show collections` (show collections/"tables" inside the currently-used DB)

And importantly:

* `insert` (Create)
* `find` (Read)
* `update` (Update)
* `remove` (Destroy)

#### Insert

Example: `db.dogs.insert({name: "Rusty", breed: "Mutt"})`

* `db` = currently-used database
* `dogs` = collection/"table"
* `insert` = insert into the dogs collection this data: `{name: "Rusty", breed: "Mutt"}`

#### Find

Example: `db.dogs.find()` returns all inside `dogs` collection.

Example: `db.dogs.find({name:"Rusty"})` finds all with `name` = `"Rusty"`.

### Update

***Non***-Example: *DO NOT USE!* `db.dogs.update({name:"Lulu"}, {breed:"Labradoodle"})`

* Note: this will completely replace `{..., "name" : "Lulu", "breed" : "Poodle"}` with `{..., "breed" : "Labradoodle"}`.

Example: `db.dogs.update({name:"Lulu"}, { $set: {breed:"Labradoodle"} })`
Example: `db.dogs.update({name:"Rusty"}, { $set: {name:"Tyrone", isCute:true} })`

* `$set:{...}` lets you update **OR** insert properties; "upsert".

### Remove

Example: `db.dogs.remove({name:"Lucy"})`

Example: `db.dogs.remove({breed:"Mutt"}).limit(1)` will only remove 1 match

***Non***-Example: *DO NOT USE IN REAL PRODUCTION!* `db.dogs.drop()` deletes all data in `dogs` collection.

## Mongoose

Makes it easier to use MongoDB inside Node/Express code.

(BTW: To fix Mongoose deprecation warnings: <https://mongoosejs.com/docs/deprecations.html>)

```bash
npm install mongoose --save
```

And then in JS, you can do this:

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yelp_camp'); // find yelp_camp DB (and create it if it doesn't exist)

// schema: adds some structure to the NoSQL flexibility:
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
});

// model:
const Campground = mongoose.model('Campground', campgroundSchema);
// btw 'Campground' parameter auto-magically creates collection with the plural lowercase name "campgrounds"

// // create data to be used in a mongoose command later
// const newCampground = new Campground({
//     name: 'Camp Pining Hearts',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg',
//     price: '1000',
// });
//
// // insert data
// newCampground.save((err, itemAddedToDB)=> { // simply newCampground.save(); may not work or may be slow
//     if (err) {
//         console.log('Something went wrong');
//     } else {
//         console.log('Added campground to DB');
//         console.log(itemAddedToDB);
//     }
// });

// AND FINALLY DO THE MONGOOSE COMMANDS HERE:

// create with model
Campground.create({
    name: 'Camp Pining Hearts',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Car_Camping.jpg',
    price: '1000',
}, (err, newCampground)=> {
    if (err) {
        console.log('Something went wrong');
        console.log(err);
    } else {
        console.log('The campground that got added/created:');
        console.log(newCampground);
    }
});

// find with model
Campground.find({}, (err, results)=> {
    if (err) {
        console.log('Something went wrong');
        console.log(err);
    } else {
        console.log('All the campgrounds:');
        console.log(results);
    }
});

```

## Authentication

```bash
npm install passport passport-local passport-local-mongoose express-session --save
```

```bash
touch models/user.js
touch views/register.ejs
touch views/login.ejs
```

And then in `user.js` you can use passport with something like this:

```js
const passportLocalMongoose = require('passport-local-mongoose');
...
// use authentication! (add methods to user)
userSchema.plugin(passportLocalMongoose);
```

## Refactoring Routes into Separate Files

Move routes from `app.js` into the `routes/...` files.

```bash
touch routes/index.js
touch routes/campgrounds.js
touch routes/comments.js
```

## Use `method-override` to enable UPDATE and DESTROY names

Just like how it's used to enable PUT and DELETE verbs in [`app.js` in the RESTful example](https://github.com/hchiam/web-dev-bootcamp/blob/master/demo/RESTfulBlogApp/app.js).

```bash
npm install method-override --save
```

Then in `app.js` (and not in `campgrounds.js`, since we're already pointing to campgrounds using `const campgroundRoutes = require('./routes/campgrounds');`):

```js
const methodOverride = require('method-override');
...
app.use(methodOverride('_method', ... )); // to enable HTML form to actually use PUT or DELETE by looking for ?_method=...
...
```

## Refactoring Middleware

Move the custom middleware functions to a separate file(s) and make the routes .js files DRY-er:

```bash
mkdir middleware
touch middleware/index.js
```

## Flash Messages (i.e. temporary notifications)

```bash
npm install --save connect-flash
```

And then in the top-level `/yelp-camp/app.js`:

```js
const flash = require('connect-flash');
...
const app = express();
...
app.use(flash());
```

And then enable the flash message:

```js
req.flash('error', 'Please log in first'); // set up before redirect
res.redirect('/login'); // for example
```

And then actually pass the flash message to the HTML:

```js
res.render('login', {message: req.flash('error')})
```

**Note**: Make sure to do `app.use(flash());` *before* your `passport` configuration in `app.js`.

**Note**: It's a good idea to have `express-session` set up if you're not already using it or "cookieParser".

```js
// PASSPORT CONFIGURATION
app.use(expressSession({
    secret: 'some complex secret string to encode and decode the session data',
    resave: false,
    saveUninitialized: false,
}));
```

Bootstrap also has built-in styles for flash messages.
