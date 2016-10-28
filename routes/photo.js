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

  // create新相簿
  models.Photo.create({
    title: req.body.photo.title,
    body: req.body.photo.body,
    photoday: req.body.photo.photoday,
    ProfileId: req.body.id
  }).then(function(data) {
    // console.log(data.get({ plain: true }));

    // 存入相片
    var photo_images = req.body.photo_images || [];
    photo_images.forEach(function(item) {
      models.Photo_image.create({
        title: item.title,
        image: item.image,
        PhotoId: data.id
      })
    });

    json = {
      "id": data.id, //這是使用者的資料代碼, 可存在用戶端
      "msg": "ok,資料己建立",
      "err": ""
    };

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

      console.log(data.get({ plain: true }));

      data.update({
          title: req.body.photo.title,
          body: req.body.photo.body,
        })
        .then(function(data) {
          // update photo_image
          var photo_images = req.body.photo_images || [];

          photo_images.forEach(function(item) {
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
router.get('/limit/:id/:top', function(req, res) {
  var id = req.params.id;
  var top = req.params.top;
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

    var profileId = data.id;
    json.id = data.id;
    json.msg = "ok";

    // 撈photo的資料
    models.Photo.findAll({
      where: {
        ProfileId: profileId
      },
      limit: top,
      include: [{
        model: models.Photo_image,
      }],
    }).then(function(photos) {

      res.json(photos);
    });

  });
  //res.send(cool());
  console.log(cool());

});

// delete by photo id
router.delete('/del/:id', function(req, res) {
  models.Photo.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(data) {
      console.log(data);
      res.json({
        "id": req.params.id,
        "msg": "ok",
        "err": ""
      })
    });
});

// delete by photo_image id
router.delete('/delimage/:id', function(req, res) {
  models.Photo_image.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(data) {
      console.log(data);
      res.json({
        "id": req.params.id,
        "msg": "ok",
        "err": ""
      })
    });
})


module.exports = router;
