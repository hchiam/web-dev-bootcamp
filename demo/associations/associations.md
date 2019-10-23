# Associations

I.e. having DB data associated with each other by relationships: one-to-one, one-to-many, many-to-many.

* Example of one-to-many: Facebook user with many photos.
* Example of many-to-many: students and courses. Each student can have multiple courses, and each course can have multiple students.

We'll use Mongoose to connect/associate data.

## Two methods:

1) **Embed** data (to associate it)
2) **Reference** data (to associate it)

## Setup steps

```bash
cd demo/associations
touch embed.js
# (fill code in embed.js)
touch references.js
# (fill code in references.js)
npm install mongoose
```

In another CLI tab/window:

```bash
mkdir data
touch mongod
# (fill code in mongod)
# keep this running and now go back to the other CLI tab/window
```

To test that it works:

```bash
node embed.js
# (should get no messages if it works out of the box)
# hit Ctrl+C to stop
```

Or:

```bash
node references.js
# (should get no messages if it works out of the box)
# hit Ctrl+C to stop
```

You can then confirm  database updates (hit `Ctrl+C` to exit):

```bash
mongo
show dbs
use blog_demo_2
db.users.find()
```

## Embed data (to associate it)

```js
...

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

...
```

## Reference data (to associate it)

```js
...

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

...
```
