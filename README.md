# web-dev-bootcamp
Learning alongside https://www.udemy.com/the-web-developer-bootcamp

Just one of the things I'm learning: https://github.com/hchiam/learning

## Node.js and Express.js demos

Some setup I did (you don't have to do this to use this repo):
```bash
npm init
npm install express --save # <- --save makes the install also save to package.json
```

To use the Node.js/Express.js demos:
```bash
cd web-dev-bootcamp/random/node
npm install
node node-demo.js # or node express-demo.js
```

To avoid having to `Ctrl+C` and `node <filename>.js` each time, you can automate restart with `nodemon`:
```bash
npm i -g nodemon # i = install; -g = globally
npm install --save-dev nodemon # <- this saves into dev dependencies
```

So instead of running with `node express-demo.js` and manually restarting, you can have `nodemon` restart the server automatically for you after you execute `nodemon express-demo.js` just once:

```bash
nodemon node-demo.js # or nodemon express-demo.js
```

## body-parser for express

`body-parser` is how we get data out of forms -> request body -> parse with `body-parser`.

(In case it's currently not already included in express:)

```bash
npm install body-parser --save # within the folder that has node_modules INSIDE of it
```

then

```js
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
```

## More Notes from yelp-camp Demo

<https://github.com/hchiam/web-dev-bootcamp/blob/master/yelp-camp/readme.md>

## RESTful Routes Notes

(Especially good demo for this is the [RESTfulBlogApp](https://github.com/hchiam/web-dev-bootcamp/tree/master/demo/RESTfulBlogApp) demo.)

**Key words for me:** GET, POST, PUT, DELETE **=** show, new/create, edit/update, destroy **=** R, C, U, D.

You could technically do everything with `POST` requests, but these extra verbs help make things more meaningful.

**RESTful conventions:**

| name      | url           | verb        | description                             | mongoose method
| ----------|---------------|-------------|-----------------------------------------|-------------------------
| INDEX     | /dogs         | GET         | Show all.                               | Dog.find( {}, (err,obj)=>{} )
| NEW *     | /dogs/new     | GET!!!      | Show form for CREATE.                   | N/A
| CREATE *  | /dogs         | POST        | Actually create DB entry, then redirect.| Dog.create( {}, (err,obj)=>{} )
| SHOW      | /dogs/:id     | GET         | Show one.                               | Dog.findById( id, (err,obj)=>{} )
| EDIT *    | /dogs/:id/edit| GET!!!      | Show form for UPDATE.                   | Dog.findById( id, (err,obj)=>{} )
| UPDATE *  | /dogs/:id     | PUT         | Actually update, then redirect.         | Dog.findByIdAndUpdate( id, {}, (err,obj)=>{} )
| DESTROY * | /dogs/:id     | DELETE      | Delete a dog, then redirect.            | Dog.findByIdAndRemove( id, (err)=>{} )

HTML forms can't use PUT (fallbacks to GET). Need to use `Method-Override` to "let" HTML forms use PUT/DELETE by overriding a POST method as a PUT with `action="...?_method=PUT" method="POST">` (`npm install method-override --save`).

Make sure to sanitize content in CREATE and UPDATE that could be evaluated (potential HTML and JS content).

Make sure that these starred (*) actions/routes verify that used is logged in. Even if people cannot access the webpage, they could use something like Postman to edit the database, unless you check login status. For example, check on both the NEW and CREATE routes, even though normally users can't get to the CREATE route without logging in.

```js
const expressSanitizer = require('express-sanitizer');
...
app.use(expressSanitizer());
...
// user could have maliciously inserted JS into content:
req.body.blog.content = req.sanitize(req.body.blog.content);
```

### Nested Routes

Using [`yelp-camp`](https://github.com/hchiam/web-dev-bootcamp/tree/master/yelp-camp) example:

| name      | url               | verb
| ----------|-------------------|-------------
| INDEX     | /campgrounds      | GET
| NEW       | /campgrounds/new  | GET (prep for the CREATE step)
| CREATE    | /campgrounds      | POST
| SHOW      | /campgrounds/:id  | GET

Here be the ***nested routes:*** (comments are dependent on a campground)

| name      | url                          | verb
| ----------|------------------------------|-------------
| NEW       | /campground/:id/comments/new | GET (prep for the CREATE step) after find campground
| CREATE    | /campground/:id/comments     | POST after find campground

## Associations

I.e. having associated data by relationships: one-to-one, one-to-many, many-to-many.

* Example of one-to-many: Facebook user with many photos.
* Example of many-to-many: students and courses. Each student can have multiple courses, and each course can have multiple students.

We'll use Mongoose to connect/associate data.

Two methods:

1) Embed data (to associate it)
2) Reference data (to associate it)

More notes [here](https://github.com/hchiam/web-dev-bootcamp/blob/master/demo/associations/associations.md).

## Module.Exports

Why: Modularize the JS code into separate files, e.g. separate files for models that you can `require` in.

<https://github.com/hchiam/web-dev-bootcamp/blob/master/demo/module-exports/module-exports.md>

## Authentication and Authorization

`passport.js`, `passport-local`, (`passport-local-mongoose`), and `express-session`.

<https://github.com/hchiam/web-dev-bootcamp/blob/master/demo/auth/auth.md>

**AUTHENTICATION** = checking they're who they say they are. Example: our custom middleware `isLoggedIn`.

**AUTHORIZATION** = checking whether they're allowed to do an action. Example: our custom middleware `checkCampgroundOwnership`.

## Git

### How to Revert (Uncommon but Hard to Find a Good Answer)

```bash
# replace 0766c053 with a commit number
git revert --no-commit 0766c053..HEAD
git commit
```

## Random Notes

When searching for packages on Google for tutorials/snippets, get the most-up-to-date APIs by adding "Express 4" to the search string.

Instead of `<input type="text" name="title">`, you can do `<input type="text" name="blog[title]">`. This makes `title` on `req.body.blog.title` instead of on `req.body.title`, and not you just pass one object `req.body.blog` to Blog.create(). (Note: body-parser syntax specifies `name="blog[title]"` instead of `name="blog['title']"` or `name="blog.title"`).

`/` = root folder / ...

`./` = current folder / ...

`../` = parent folder / ...

```bash
npm install express mongoose body-parser ejs method-override express-sanitizer passport passport-local passport-local-mongoose express-session --save
```

```html
<%- blog.body %>
<!-- <%- actually evaluates potential code/formatting inside blog.body (which you can sanitize with express-sanitizer) -->
```

* To get rid of the CLI errors with mongoose.connect, don't just do `mongoose.connect('mongodb://localhost/yelp_camp');`, but do this:

```js
mongoose.connect('mongodb://localhost/yelp_camp', {useNewUrlParser: true, useUnifiedTopology: true}); // find yelp_camp DB (and create it if it doesn't exist)
```

* To include the `public` folder (e.g. to include CSS files):

```js
app.use(express.static(__dirname + '/public')); // __dirname = directory script lives in
```

-> and now you can include CSS files like this:

```html
<head>
  ...
  <link rel="stylesheet" href="/stylesheets/main.css">
  ...
</head>
```

* Backup of Colt Steele's source code: <https://github.com/nax3t/webdevbootcamp>

`res.redirect` special redirect:

```js
res.redirect('back'); // special meaning: go back to wherever the user was last
```

## Other related [things I've been learning](https://github.com/hchiam/learning) beyond this course

### Tools to build production websites, and build them faster

- [yarn](https://github.com/hchiam/learning-yarn) and npm scripts like those found [in some of my projects](https://github.com/hchiam/eslint-and-jest)
- [Parcel.js](https://github.com/hchiam/learning-parcel) web app bundler
- [Yeoman project generator](https://github.com/hchiam/generator-hchiam-learning)
- [Gatsby.js](https://github.com/hchiam/learning-gatsby) static site generator
- [expo CLI](https://github.com/hchiam/learning-expo-cli)

### Tools to test websites faster for better quality

- [Jest](https://github.com/hchiam/learning-jest) for unit tests
- [mocha and chai](https://github.com/hchiam/boilerplate-mochachai) for both unit tests and functional tests of a website
- Using [Selenium](https://github.com/hchiam/selenium-travis) and [Travis CI](https://github.com/hchiam/travistest) for continuous integration (automated build tests)
- [Lighthouse CI](https://github.com/hchiam/learning-lighthouse-ci)

### Tools for other superpowers

- [service workers](https://github.com/hchiam/learning-service-workers) for things like offline website viewing
- [Electron](https://github.com/hchiam/electron-quick-start) for building desktop apps using web technologies (JS/HTML/CSS)
- [Lodash](https://github.com/hchiam/learning-lodash)
- [React](https://github.com/hchiam/learning-reactjs)
- [Redux](https://github.com/hchiam/learning-redux)
