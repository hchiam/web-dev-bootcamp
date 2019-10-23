# Associations

I.e. having associated data by relationships: one-to-one, one-to-many, many-to-many.

* Example of one-to-many: Facebook user with many photos.
* Example of many-to-many: students and courses. Each student can have multiple courses, and each course can have multiple students.

We'll use Mongoose to connect/associate data.

Two methods:

1) Embed data (to associate it)
2) Reference data (to associate it)

## Embed data (to associate it)

```bash
cd demo/associations
touch embed.js
# (fill code in embed.js)
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
node embed.js # should get no messages if it works
# hit Ctrl+C to stop
```

## Reference data (to associate it)
