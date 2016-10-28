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
var account = require('./routes/account');
var profile = require('./routes/profile');
var note = require('./routes/note');
var photo = require('./routes/photo');

var cool = require('cool-ascii-faces');

//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
//app.use('/users', users);
app.use('/account', account);
app.use('/profile', profile);
app.use('/note', note);
app.use('/photo', photo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.err = 404;
    err.msg = 'Not Found';
    //next(err);
    //console.log(next(err));
    res.json(err);
});

// error handler
// no stacktraces leaked to user unless in development environment
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: (app.get('env') === 'development') ? err : {}
    });
});

//console.log('hihi');

module.exports = app;
