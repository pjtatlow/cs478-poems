const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const handlers = require('./handlers.js')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('dist'))

app.all('/api/:x', function (req, res, next) {
  if (handlers[req.params.x]) {
    handlers[req.params.x](req, res, next)
  } else {
    res.status(404).end()
  }
})

app.listen(8888, function () {
  console.log('Listening on 127.0.0.1:8888')
})
