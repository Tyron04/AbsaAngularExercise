var express = require('express')
var User = require('../models/user')
var router = express.Router()


router.get('/', function (req, res, next) {
  return User.find(function (err, users) {
    if (err)
      res.send(err)

    res.json(users)
  })
})

router.get('/:id', function (req, res, next) {
  return User.findOne({_id: req.params.id}, function (err, user) {
    if (err)
      res.send(err)

    res.json(user)
  })
})

router.post('/', function (req, res, next) {
  User.findOne().sort({_id: -1}).exec(function (err, user) {
    var id
    if (err) {
      id = 1
    } else {
      id = user._id + 1
    }
    var user = new User({
      _id: id,
      Name: req.body.name,
      Surname: req.body.surname,
      Country: req.body.country
    })

    User.create(user)
    return User.findOne({_id: req.params.id}, function (err, user) {
      if (err)
        res.send(err)

      res.json(user)
    })
  })
})

router.put('/:id', function (req, res, next) {
  var user = new User({
    _id: req.params.id,
    Name: req.body.name,
    Surname: req.body.surname,
    Country: req.body.country
  })
  User.findOneAndUpdate({_id: req.params.id}, user, function (err, user) {
    if (err) {
      return err
    }
    return User.findOne({_id: req.params.id}, function (err, user) {
      if (err)
        res.send(err)

      res.json(user)
    })
  })
})


module.exports = router
