var express = require('express')

function start(port) {
  var app = express()

  app.use(express.static('static'))

  var server = app.listen(port, function() {
    console.log('App listening on port %s', port);
  })

  return server
}

module.exports = start
