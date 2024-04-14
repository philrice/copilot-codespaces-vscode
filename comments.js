// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

// Read comments from comments.json
app.get('/listComments', function (req, res) {
    fs.readFile(__dirname + '/' + 'comments.json', 'utf8', function (err, data) {
        res.end(data);
    });
});

// Add a comment
app.post('/addComment', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    var comment = {
        "name": req.body.name,
        "comment": req.body.comment
    };
    fs.readFile(__dirname + '/' + 'comments.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(comment);
        fs.writeFile(__dirname + '/' + 'comments.json', JSON.stringify(data), function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.end(JSON.stringify(data));
    });
});

// Delete a comment
app.post('/deleteComment', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    var index = req.body.index;
    fs.readFile(__dirname + '/' + 'comments.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.splice(index, 1);
        fs.writeFile(__dirname + '/' + 'comments.json', JSON.stringify(data), function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.end(JSON.stringify(data));
    });
});

// Start web server
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Web server started at http://%s:%s", host, port);
});