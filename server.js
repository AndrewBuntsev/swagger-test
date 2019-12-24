const express = require('express');
const app = express();

const uuidv4 = require('uuid/v4');

//swagger.json example    https://gist.github.com/lenage/08964335de9064540c8c335fb849c5da
const swaggerJson = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerJson));

//stores the books collection
let _books = [];

app.get('/api/test', function (req, res) {
    res.json({ test: 'test message' });
});


app.route('/api/book')
    .get(function (req, res) {
        res.json(_books.filter(b => b.id == req.query.id));
    })
    .put(function (req, res) {
        let book = JSON.parse(JSON.stringify(req.query));
        book.id = uuidv4();
        _books.push(book);
        res.json(book);
    })
    .delete(function (req, res) {
        _books = _books.filter(b => b.id != req.query.id);
        res.json(_books);
    })



app.get('/api/books', function (req, res) {
    res.json(_books);
});



// start the server in the port 3000
app.listen(3000, function () {
    console.log('Start app listening on port 3000.');
});