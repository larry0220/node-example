var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// app.get('/', function(request, response) {
//   response.render('pages/index')
// });
app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/cool', function(request, response) {
  response.send(cool());
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
app.get('/users', function(req, res) {
    var json = {
        "me": {
            "qq": 123,
            "ww": "users"
        }
    }
    res.json(json).end();
    //console.log(json);
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
