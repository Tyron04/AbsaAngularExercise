var express = require('express')
var User = require('../models/user')
var router = express.Router()

router.get('/', function(req, res, next) {
    return User.find(function(err, users) {
        if (err)
            res.send(err)

        res.json(users)
    })
})

router.get('/:id', function(req, res, next) {
    return User.findOne({
        _id: req.params.id
    }, function(err, user) {
        if (err)
            res.send(err)

        res.json(user)
    })
})

router.post('/', function(req, res, next) {
    User.findOne().sort({
        _id: -1
    }).exec(function(err, user) {
        var id = 1
        if (user !== null) {
            id = user._id + 1
        }

        var user = new User({
            _id: id,
            Name: req.body.name,
            Surname: req.body.surname,
            Country: req.body.country
        })

        user.save(function(err) {
            if (err) {
                return err
            }
            return User.findOne({
                _id: id
            }, function(err, user) {
                if (err)
                    res.send(err)

                res.json(user)
            })
        })
    })
})

router.put('/:id', function(req, res, next) {
    var id = req.params.id
    var user = new User({
        _id: id,
        Name: req.body.name,
        Surname: req.body.surname,
        Country: req.body.country
    })
    User.findByIdAndUpdate(id, user, function(err, updatedUser) {
        if (err)
            return err
        res.send(updatedUser)
    })

})

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    User.delete(id);
    res.send(200);
})

module.exports = router