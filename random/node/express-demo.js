let express = require('express');
let app = express();

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