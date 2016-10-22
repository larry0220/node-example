var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var api_name = "";

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html

//method:PUT 使用時機, 更新資料, 所有參數名都要給, id一定要給值, 不需更新的項目不給值
router.post(api_name + '/mod', function(req, res) {

    var email = req.body.email;
    var id = req.body.id;

    models.Account.find({
        where: {
            id: id
        }
    })
    .then(function(data) {

        data.update({ email: email})
        .then(function(){

        })

        console.log(data);
        json = {
            "id": data.id, //這是使用者的資料代碼, 可存在用戶端
            "email" : data.email,
            "msg": "ok,資料己更新",
            "err": ""
        }
        res.json(json);
        console.log(json);

    });

});

//create
router.post(api_name + '/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;

    var email = req.body.email;
    var pwd = req.body.pwd;
    var json = {};

    models.Account.create({
        email: email,
        password: pwd
    }).then(function(data) {
        console.log(data);
        json = {
            "id": data.id, //這是使用者的資料代碼, 可存在用戶端
            "msg": "ok,資料己建立",
            "err": ""
        }
        res.json(json);
    });

});

router.get(api_name + '/:id', function(req, res) {

    var id = req.params.id;
    //var token = req.params.token; //先不檢查

    models.Account.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        console.log(data);

        json = {
            "id": data.id, //這是使用者的資料代碼, 可存在用戶端
            "email": data.email,
            "msg": "ok,資料己存在",
            "err": ""
        }
        res.json(json);

    });
    //res.send(cool());
    console.log(cool());

});

module.exports = router;
