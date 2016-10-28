var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html

router.get('/', function(req, res) {
    res.send(cool());
    //console.log(cool());
});

//create
router.post('/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;

    var email = req.body.email;
    var pwd = req.body.pwd;
    var json = {
        id: 0,
        msg: "",
        err: ""
    };

    models.Account.findOrCreate({
            where: {
                email: email
            },
            defaults: {
                email: email,
                password: pwd
            }
        })
        .spread(function(data, created) {
            console.log(data.get({
                plain: true
            }))

            //console.log(data);
            json.id = data.id; //這是使用者的資料代碼, 可存在用戶端
            json.msg = "ok,資料己建立";

        })

    res.json(json);

});

//update
router.post('/mod', function(req, res) {

    var email = req.body.email;
    var id = req.body.id;

    var json = {
        id: 0,
        msg: "沒有資料可更新",
        err: ""
    }

    models.Account.find({
            where: {
                id: id
            }
        })
        .then(function(data) {

            if (data != null) {
                data.update({
                        email: email
                    })
                    .then(function() {

                    })

                console.log(data);
                json.id = data.id; //這是使用者的資料代碼, 可存在用戶端
                json.err = "";
                json.msg = "ok,資料己更新";
            }

            res.json(json);

        });

});

router.get('/id/:id', function(req, res) {

    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        email: "",
        pwd: ""
    }

    models.Account.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {
            json.msg = "ok";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
        }
        res.json(json);

    });
    //res.send(cool());
    console.log(cool());

});

router.get('/has/:email', function(req, res) {

    var email = req.params.email;
    //var token = req.params.token; //先不檢查

    var json = {
        id: 0,
        email: "",
        msg: "沒有資料",
        pwd: "",
        err: ""
    }


    models.Account.findOne({
        where: {
            email: email
        }
    }).then(function(data) {

        console.log(data);

        if (data != null) {
            json.msg = "ok";
            json.id = data.id;
            json.email = data.email;
            json.pwd = data.password;
            json.err = "";
        }

        res.json(json);

    });
    //res.send(cool());
    console.log(cool());

});

router.get('/all', function(req, res) {
    res.json(cool());
});

//all的通關密語是Q_QtaiwanQvQ
router.get('/all/:keyword', function(req, res) {

    var keyword = req.params.keyword;
    //var token = req.params.token; //先不檢查

    models.Account.findAll({

    }).then(function(data) {

        if (keyword != "Q_QtaiwanQvQ") data = cool();
        //console.log(data);
        res.json(data);

    });
    //res.send(cool());
    //console.log(cool());

});

module.exports = router;
