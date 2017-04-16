var User = require('./models/user')
var userController = require('./controllers/user-controller')
var countryController = require('./controllers/country-controller')
var jwtConfig = require('./config/jwt')
var jwt = require('express-jwt');

;(function (routes) {
  routes.configureRoutes = function (app) {
    var jwtCheck = jwt({
      secret: jwtConfig.secret,
      issuer: jwtConfig.issuer,
      audience: jwtConfig.domain
    })

    // Enable the use of the jwtCheck middleware in all of our routes
    app.use(jwtCheck)
    app.use('/api/users', userController)
    app.use('/api/countries', countryController)

    app.use(function (req, res, next) {
      var err = new Error('Not Found')
      err.status = 404
      next(err)
    })

    // Error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      res.status(err.status || 500).json({
        message: 'Something happened: ' + res.locals.error
      })
    })
  }
})(module.exports)
