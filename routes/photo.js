var models = require('../models');
var express = require('express');
var router = express.Router();
var cool = require('cool-ascii-faces');

//文件
//https://cn27529.gitbooks.io/mycloudlife-api/content/account.html


//create ok
router.post('/create', function(req, res) {

    //token檢查, 先不檢查
    //var token = req.body.token;

    var json = {};

    models.Photo.create({
        title: req.body.photo.title,
        body: req.body.photo.body,
        ProfileId: req.body.id
    }).then(function(data) {
        console.log(data.get({'plain': true}));
        json = {
            "id": data.id, //這是使用者的資料代碼, 可存在用戶端
            "msg": "ok,資料己建立",
            "err": ""
        }

        req.body.photo_images.forEach(function(item) {
          models.Photo_image.create({
            title: item.title,
            image: item.image,
            PhotoId: data.id
          })
        })



        res.json(json);
    });



});

//update ok
router.post('/mod', function(req, res) {

    var json = {
        id: 0,
        msg: "沒有資料可更新",
        err: "",
    }

    //res.send(cool());

    models.Photo.findOne({
            where: {
                ProfileId: req.body.id,
                id: req.body.photo.id
            }
        })
        .then(function(data) {
            if (data === null) {
              return res.json(json);
            }

            var photoId = data.id;
            json.id = photoId; //這是 photo id資料代碼, 可存在用戶端

            console.log(data.get({'plain': true}));

            data.update({
                    title: req.body.photo.title,
                    body: req.body.photo.body,
                })
                .then(function(data) {
                  // update photo_image
                  var images = req.body.photo_images;

                  if (!Array.isArray(images)) {
                      return res.send('no Array')
                  }

                  images.forEach(function(item) {
                    models.Photo_image.findOne({
                          where: {
                            PhotoId: photoId,
                            id: item.id
                          }
                        })
                        .then(function(image) {
                            if (image === null) {
                              return
                            }

                            image.update({
                              title: item.title,
                              image: item.image
                            });
                        });
                  });

                  json.err = "";
                  json.msg = "ok,資料己更新";

                  res.json(json);

                })
        });

});

router.get('/id/:id/:top', function(req, res) {
    // console.log(req.params, req.query);

    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        photos: []
    }

    models.Photo.findOne({
        where: {
            id: id
        }
    }).then(function(data) {

        console.log(data.get({'plain': true}));

        if (data != null) {
            json.msg = "ok";
            json.id = data.id;

            // 先確認有相簿，再撈photo_image的資料
            models.Photo_image.findAll({
                    where: {
                        PhotoId: data.id
                      }
            }).then(function(images) {
                json.photos = images;

                res.json(json);
            });
        }



    });
    //res.send(cool());
    console.log(cool());

});

router.get('/acc/:id', function(req, res) {

    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        profiles: []
    }
    var id = req.params.id;
    //var token = req.params.token; //先不檢查

    models.Photo.findAll({
        where: {
            AccountId: id
        }
    }).then(function(data) {

        //console.log(data);
        if (data.length > 0) {
            json.profiles = data;
            json.msg = "ok";
        }
        json.id = id;
        res.json(json);

    });
    //res.send(cool());
    console.log(cool());

});

router.get('/all', function(req, res) {

    //var id = req.params.id;
    //var token = req.params.token; //先不檢查

    models.Photo.findAll({

    }).then(function(data) {

        //console.log(data);
        res.json(data);

    });
    //res.send(cool());
    //console.log(cool());

});



module.exports = router;
