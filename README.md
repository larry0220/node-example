# node-example

heroku sqlite
https://git.heroku.com/cn47499.git

heroku diskdb
https://git.heroku.com/cn92404.git


git add .
git commit -am "heroku"
git push heroku master
heroku logs --tail


[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)




models.Profile.findOrCreate({
        where: {
            id: req.body.profile.id
        },
        defaults: {
            name: req.body.profile.name,
            birthday: req.profile.body.birthday,
            sex: req.body.profile.sex,
            role: req.body.profile.role,
            image: req.body.profile.image,
            flag: req.body.profile.flag,
            AccountId: req.id
        }
    })
    .spread(function(data, created) {
        console.log(data.get({
            plain: true
        }))

        console.log(data);
        json = {
            "id": data.id, //這是使用者的資料代碼, 可存在用戶端
            "msg": "ok,資料己建立",
            "err": ""
        }
        res.json(json);
    })
