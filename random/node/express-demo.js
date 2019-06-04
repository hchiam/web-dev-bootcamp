let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public')); // so the public folder is used

let fake = require('faker');

app.set('view engine', 'ejs');

app.listen(3000, 'localhost', () => {
    console.log('Server started.');
});

app.get('/', (req, res) => {
    res.render('welcome'); // (MUST type 'welcome', NOT '/views/welcome.ejs')
    // res.send('hi!');
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
    let fakeInfoArray = [];
    for (let i=0; i<10; i++) {
        fakeInfoArray.push(`${i+1}) ${fake.commerce.productName()} - $${fake.commerce.price()}`);
    }
    let posts = [
        {title:'Post 1', author:'apple'},
        {title:'Post Beta', author:'banana'},
        {title:'Post Charlie', author:'coconut'}
    ];
    // res.send(`Welcome to the ${subreddit} subreddit!`);
    res.render('reddit', {subreddit: subreddit, fakeInfoArray: fakeInfoArray, posts: posts}); // (MUST type 'reddit', NOT '/views/reddit.ejs')
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
