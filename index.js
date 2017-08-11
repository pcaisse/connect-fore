var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3000))

app.use(function(req, res, next) {
  console.log(req.method, req.url)
  next()
})
app.use(express.static(__dirname + '/static'))

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'))
})
