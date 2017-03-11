const path = require('path')
var MongoClient = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectId

// Connection URL
var url = 'mongodb://localhost:27017/poems'

// Use connect method to connect to the server

const handlers = {
  getschema (req, res, next) {
    var options = {
      root: path.join(__dirname, '../'),
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }

    res.sendFile('schema.json', options, function (err) {
      if (err) {
        next(err)
      }
    })
  },
  getpoems (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection('poems')
      collection.find().toArray(function (err, poems) {
        res.json(poems)
        db.close()
        next()
      })
    })
  },
  addpoem (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection('poems')
      collection.insertOne(req.body, function (err, poems) {
        res.json(err === null)
        db.close()
        next()
      })
    })
  },
  savepoem (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection('poems')
      var id = ObjectId(req.body._id)
      delete req.body._id
      console.log(id, req.body)
      collection.updateOne({ '_id': id }, {$set: req.body}, function (err, r) {
        console.log(r)
        res.json(err === null)
        db.close()
        next()
      })
    })
    // console.log('Save:', req.body)
    // res.json(true)
    // next()
  },
  deletepoem (req, res, next) {
    MongoClient.connect(url, function (err, db) {
      var collection = db.collection('poems')
      var id = ObjectId(req.body._id)
      delete req.body._id
      collection.deleteOne({ '_id': id }, function (err, r) {
        console.log(r)
        res.json(err === null)
        db.close()
        next()
      })
    })
  }
}

module.exports = handlers
