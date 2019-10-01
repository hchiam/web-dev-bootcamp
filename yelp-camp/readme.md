# Yelp Camp

* landing page
* campgrounds page (name + image)
* header and footer partials
* bootstrap
* POST route for form to create campground
* navbar

## Steps

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
nodemon index.js # to auto-run upon saving app.js
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

https://www.youtube.com/watch?v=b089GmAvUyQ&feature=youtu.be

Finally, to get the database running:

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
