var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');


app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index')
// });
app.get('/', function(req, res) {
    res.send('Hello World!');
});

app.get('/cool', function(req, res) {
    res.send(cool());
});

app.get('/listUsers', function(req, res) {
    var json = {
        "me": {
            "qq": 123,
            "ww": "listUsers"
        }
    }
    res.json(json).end();
    //console.log(json);
})

//var models = require('./models');
app.get('/users/:id/:email', function(req, res) {
    var json = {
        "me": {
            "id": req.params.id,
            "email": req.params.email,
            "haha": "haha"
        }
    }
    res.json(json).end();
    //console.log(json);
})

//var models = require('./models');
app.post('/users/', function(req, res) {
    var json = {
        "me": {
            "email": req.body.email,
            "haha": "haha"
        }
    }
    res.json(json).end();
    console.log(json);
})


//var models = require('./models');
app.put('/users/:id/', function(req, res) {
    var json = {
        "me": {
            "id": req.params.id,
            "email": req.body.email,
            "haha": "response"
        }
    }
    res.json(json).end();
    console.log(json);
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
