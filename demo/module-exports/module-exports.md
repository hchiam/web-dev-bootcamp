# Module.Exports

Example of making `references.js` in the [associations folder](https://github.com/hchiam/web-dev-bootcamp/blob/master/demo/associations) more modular (separate files for schemas, models, etc. that can be reused).

## Setup

(See initial steps used for the `associated` folder [here](https://github.com/hchiam/web-dev-bootcamp/blob/master/demo/associations/associations.md#setup-steps).)

```bash
mkdir models
touch models/post.js
touch models/user.js
```

In the model module `post.js`:

```js
const mongoose = require('mongoose');
...
module.exports = Post;
```

***Then*** in the main app (`references.js` in this case):

```js
...
// import models/post.js:
const Post = require('./models/post'); // NOTE THE DOT!
...
```
