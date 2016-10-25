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
        console.log(data.get({plain: true}));
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

            console.log(data.get({plain: true}));

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


// get by id
router.get('/pro/:id/:top', function(req, res) {
    var id = req.params.id;
    //var token = req.params.token; //先不檢查
    var json = {
        id: 0,
        msg: "沒有資料",
        err: "",
        photos: []
    }

    models.Profile.findOne({
        where: {
            id: id
        }
    }).then(function(data) {
        if (data === null) {
          return res.json(json);
        }

        // console.log(data.get({plain: true}));

        var profileId = data.id;

        json.id = data.id;
        json.msg = "ok";

        // 撈photo的資料
        models.Photo.findAll({
                where: {
                    ProfileId: profileId
                }
        }).then(function(photos) {
            // 把photo_images塞入photo
            var promises = [];

            photos.forEach(function(item, index) {
                var photoId = item.id;
                var photo = Object.assign({}, {
                  id: photoId,
                  title: item.title,
                  body: item.body
                });


                promises[index] = models.Photo_image.findAll({
                    where: {
                      PhotoId: photoId
                    }
                }).then(function(images) {
                    images = images.map(function(item) {
                      var image = Object.assign({}, {
                        id: item.id,
                        title: item.title,
                        image: 'base64字串'
                      });

                      return image;
                    });

                    // console.log(images);

                    photo.photo_images = images;
                    // console.log('^^', photo);
                    json.photos.push(photo);
                });
            });

            Promise.all(promises)
                .then(function() {
                  res.json(json);
                })
        });

    });
    //res.send(cool());
    console.log(cool());

});


router.delete('/del/:id', function(req, res) {
    res.json({});
})


module.exports = router;
