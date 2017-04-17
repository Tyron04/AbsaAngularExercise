var express = require('express')
var Country = require('../models/country')
var router = express.Router()

router.get('/', function (req, res, next) {
  return Country.find(function (err, countries) {

    if (err)
      res.send(err)

    res.json(countries)
  })
})

router.post('/', function (req, res, next) {
  console.log("create called")
  return Country.find(function (err, countries) {
    if (err)
      res.send(err)

    if (countries === null || countries.length === 0) {
      var countries = [{_id: 1, Name: 'South Africa'}, {_id: 2, Name: 'Botswana'}, {_id: 3, Name: 'Namibia'}, {_id: 4, Name: 'Zimbabwe'}, {_id: 5, Name: 'Zambia'}]
      Country.create(countries, function (err, res) {
        if (err) {
          return err
        }
        return res
      })
    }
     return res.json({
          success: true,
          data: ''
        })
  })
})

module.exports = router
