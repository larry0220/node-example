var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

router.get('/', function(req, res) {

    // models.User.findAll({
    //     username: "qqqqqq"
    // }).then(function() {
    //     //res.redirect('/');
    // });

    models.User.findAll({
      //include: [ models.Task ]
    }).then(function(data) {

      console.log(data.length);
      res.send(data.length);

    });

    //res.send(cool());
    console.log(cool());
});

module.exports = router;
