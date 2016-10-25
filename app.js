var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

//URL位置
var index = require('./routes/index');
//var users  = require('./routes/users');
var account  = require('./routes/account');
var profile  = require('./routes/profile');
var photo = require('./routes/photo')

//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/users', users);
app.use('/account', account);
app.use('/profile', profile);
app.use('/photo', photo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    // error: (app.get('env') === 'development') ? err : {}
  });
});


module.exports = app;
