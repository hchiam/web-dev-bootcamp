# web-dev-bootcamp
Learning alongside https://www.udemy.com/the-web-developer-bootcamp

Just one of the things I'm learning: https://github.com/hchiam/learning

## Node.js and Express.js demos:

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
| NEW       | /dogs/new     | GET!!!      | Show form for CREATE.                   | N/A
| CREATE    | /dogs         | POST        | Actually create DB entry, then redirect.| Dog.create( {}, (err,obj)=>{} )
| SHOW      | /dogs/:id     | GET         | Show one.                               | Dog.findById( id, (err,obj)=>{} )
| EDIT      | /dogs/:id/edit| GET!!!      | Show form for UPDATE.                   | Dog.findById( id, (err,obj)=>{} )
| UPDATE    | /dogs/:id     | PUT         | Actually update, then redirect.         | Dog.findByIdAndUpdate( id, {}, (err,obj)=>{} )
| DESTROY   | /dogs/:id     | DELETE      | Delete a dog, then redirect.            | Dog.findByIdAndRemove( id, (err)=>{} )

HTML forms can't use PUT (fallbacks to GET). Need to use `Method-Override` to "let" HTML forms use PUT/DELETE by overriding a POST method as a PUT with `action="...?_method=PUT" method="POST">` (`npm install method-override --save`).

Make sure to sanitize content in CREATE and UPDATE that could be evaluated (potential HTML and JS content).

```js
const expressSanitizer = require('express-sanitizer');
...
app.use(expressSanitizer());
...
// user could have maliciously inserted JS into content:
req.body.blog.content = req.sanitize(req.body.blog.content);
```

## Associations

I.e. having associated data by relationships: one-to-one, one-to-many, many-to-many. We'll use Mongoose to connect/associate data.

* Example of one-to-many: Facebook user with many photos.
* Example of many-to-many: students and courses. Each student can have multiple courses, and each course can have multiple students.

## Random Notes

Instead of `<input type="text" name="title">`, you can do `<input type="text" name="blog[title]">`. This makes `title` on `req.body.blog.title` instead of on `req.body.title`, and not you just pass one object `req.body.blog` to Blog.create(). (Note: body-parser syntax specifies `name="blog[title]"` instead of `name="blog['title']"` or `name="blog.title"`).

`/` = root folder / ...

`./` = current folder / ...

`../` = parent folder / ...

```bash
npm install express mongoose body-parser ejs method-override express-sanitizer --save
```

```html
<%- blog.body %>
<!-- <%- actually evaluates potential code/formatting inside blog.body (which you can sanitize with express-sanitizer) -->
```
