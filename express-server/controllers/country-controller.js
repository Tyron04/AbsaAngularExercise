var express = require('express');
var Country = require('../models/country');
var router = express.Router();

router.get('/', function (req, res, next) {
  return Country.find(function (err, countries) {
    if (err)
      res.send(err);

    res.json(countries);
  })
})

module.exports = router;
