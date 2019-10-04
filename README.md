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

(In case it's currently not already included in express:)

```bash
npm install body-parser --save # within the folder that has node_modules INSIDE of it
```

then

```js
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
```

## REST-ful Routes Notes

REST-ful conventions:

| name      | url           | verb        | description
| ----------|---------------|-------------|------------------------------
| INDEX     | /dogs         | GET   | Show all.
| SHOW      | /dogs/:id     | GET   | Show one.
| DESTROY   | /dogs/:id     | DELETE| Delete a dog, then redirect.
| NEW       | /dogs/new     | GET!!!| Show form for CREATE.
| CREATE    | /dogs         | POST  | Actually create DB entry.
| EDIT      | /dogs/:id/edit| GET!!!| Show form for UPDATE.
| UPDATE    | /dogs/:id     | PUT   | Actually update, then redirect.
