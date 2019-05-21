let express = require('express');
let app = express();

app.set('view engine', 'ejs');

app.listen(3000, 'localhost', () => {
    console.log('Server started.');
});

app.get('/', (req, res) => {
    res.send('hi!');
});

app.get('/hi', (req, res) => {
    res.send('Hello!');
});

app.get('/bye', (req, res) => {
    res.send('Goodbye!');
});

app.get('/page', (req, res) => {
    // test.ejs has to be inside views folder
    res.render('test'); // (MUST type 'test', NOT '/views/test.ejs')
});

// '/r/:subredditName' covers only '/r/.../' but NOT just anything like '/r/.../.../.../etc...'
app.get('/r/:subredditName', (req, res) => {
    let subreddit = req.params.subredditName.toUpperCase();
    res.send(`Welcome to the ${subreddit} subreddit!`);
});

app.get('/r/:subredditName/comments/:id/:title', (req, res) => {
    console.log(req.params.subredditName);
    console.log(req.params.id);
    console.log(req.params.title);
    res.send('comments page');
});

// any other URL beside the ones above
app.get('*', (req, res) => {
    res.send('Page could not be found.');
});
