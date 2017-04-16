var User = require('../models/user')
var _ = require('underscore')

module.exports = function (repo) {
  repo.getUsers = function (user, next) {
    User.find(function (err, users) {
      if (err) {
        return next(err, null)
      }
      next(null, users)
    })
  }

  repo.getUserById = function (id, next) {
    User.findOne({_id: id}, function (err, user) {
      if (err) {
        return next(err, null)
      }
      next(null, user)
    })
  }

  repo.createUser = function (user, next) {
    repo.getUsers(function (users) {
      
    })
  }
}
