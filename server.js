var express = require('express');
var app = express();
var fs = require("fs");

var server = app.listen(5000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})


app.get('/listUsers', function(req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data) {
        console.log(data);
        res.end(data);
    });
})

//var models = require('./models');
app.get('/users', function(req, res) {


    var json = {
        "me": {
            "qq": 123,
            "ww": "wwwwwwwww"
        }
    }

    res.json(json).end();
    console.log(json);


})
