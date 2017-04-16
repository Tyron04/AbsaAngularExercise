var express = require('express')
var bodyParser = require('body-parser')
var routeConfig = require('./routes')
var db = require('./config/db')
var mongoose = require('mongoose')
var http = require('http')
var cors = require('cors')
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({
  allowedOrigins: [
    '*.localhost:*'
  ]
}))

routeConfig.configureRoutes(app)
mongoose.connect(db.url)
var port = process.env.PORT || '3001'
app.set('port', port)

var server = http.createServer(app)

server.listen(port, function () {
  console.log('Server is active on port :' + port)
})

server.on('error', onError)

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

module.exports = app
