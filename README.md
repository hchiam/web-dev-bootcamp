# web-dev-bootcamp
Learning alongside https://www.udemy.com/the-web-developer-bootcamp

Just one of the things I'm learning: https://github.com/hchiam/learning

## Node.js and Express.js demos:

Some setup I did (you don't have to do this to use this repo):
```js
npm init
npm install express --save # <- --save makes the install also save to package.json
```

To use the Node.js/Express.js demos:
```js
cd web-dev-bootcamp/random/node
npm install
node node-demo.js # or node express-demo.js
```

To avoid having to `Ctrl+C` and `node <filename>.js` each time, you can automate restart with `nodemon`:
```js
npm i -g nodemon # i = install; -g = globally
```

So instead of running with `node express-demo.js` and manually restarting, you can have `nodemon` restart the server automatically for you after you execute `nodemon express-demo.js` just once.
