var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

var db = require('diskdb');

var api_name = "";

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html

//method:PUT 使用時機, 更新資料, 所有參數名都要給, id一定要給值, 不需更新的項目不給值
router.post(api_name + '/mod', function(req, res) {

    var email = req.body.email;
    var id = req.body.id;
    var json = {};

    var d = new Date,
        dformat = [
            d.getFullYear(),
            ("00" + (d.getMonth() + 1)).slice(-2),
            ("00" + d.getDate()).slice(-2)
        ].join('/') + ' ' + [("00" + d.getHours()).slice(-2),
            ("00" + d.getMinutes()).slice(-2),
            ("00" + d.getSeconds()).slice(-2)
        ].join(':');

    db.connect('db', ['accounts']);

    var data = db.accounts.find({
        _id: id
    });

    var query = {
        _id: id
    };
    var dataToBeUpdate = {
        email: email,
        updatedAt: dformat
    };
    var options = {
        multi: false,
        upsert: false
    };
    var updated = db.accounts.update(query, dataToBeUpdate, options);

    json = {
        "id": id, //這是使用者的資料代碼, 可存在用戶端
        "email": email,
        //"msg": "ok,資料己更新",
        "msg": updated,
        "err": ""
    }

    res.json(json);
    console.log(json);

});

//create
router.post(api_name + '/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;

    var d = new Date,
        dformat = [
            d.getFullYear(),
            ("00" + (d.getMonth() + 1)).slice(-2),
            ("00" + d.getDate()).slice(-2)
        ].join('/') + ' ' + [("00" + d.getHours()).slice(-2),
            ("00" + d.getMinutes()).slice(-2),
            ("00" + d.getSeconds()).slice(-2)
        ].join(':');

    console.log(dformat);

    var email = req.body.email;
    var pwd = req.body.pwd;
    var json = {};

    db.connect('db', ['accounts']);

    var account = {
        email: email,
        password: pwd,
        createAt: dformat,
        updatedAt: "",
        _id: ""
    }

    account = db.accounts.save(account);

    json = {
        "id": account._id, //這是使用者的資料代碼, 可存在用戶端
        "msg": "ok,資料己建立",
        "err": ""
    }

    res.json(json);

});

//
router.get(api_name + '/id/:id', function(req, res) {

    var json = {};
    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    db.connect('db', ['accounts']);
    var data = db.accounts.find({
        _id: id
    });
    if (data.length > 0) json = data[0];
    res.json(json);

    //res.send(cool());
    console.log(cool());

});

router.get(api_name + '/has/:email', function(req, res) {

    var json = {};
    var email = req.params.email;
    //var token = req.params.token; //先不檢查
    db.connect('db', ['accounts']);
    var data = db.accounts.find({
        email: email
    });
    if (data.length > 0) {
        json = data[0];
    } else {
        json = {
            "id": "", //這是使用者的資料代碼, 可存在用戶端
            "msg": "這個帳號不存在",
            "err": ""
        }
    }
    res.json(json);

    //res.send(cool());
    console.log(cool());

});

module.exports = router;
