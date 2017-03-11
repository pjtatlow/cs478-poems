const path = require('path')
var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/poems';

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
    MongoClient.connect(url, function(err, db) {
			var collection = db.collection('poems')       
			collection.find().toArray(function(err,poems) {
				console.log(poems);
				res.json(poems);
      	db.close();
				next();
			});
    });
  },
  addpoem (req, res, next) {
    MongoClient.connect(url, function(err, db) {
			console.log(req.body)
			var collection = db.collection('poems')       
			collection.insertOne(req.body, function(err,poems) {
				res.json(err === null)
      	db.close();
				next();
			});
    });
  },
  savepoem (req, res, next) {
    MongoClient.connect(url, function(err, db) {
			console.log(req.body._id)
			var collection = db.collection('poems')       
			collection.updateOne({'_id': req.body._id }, {$set: req.body}, function(err,poems) {
				res.json(err === null)
      	db.close();
				next();
			});
    });
    //console.log('Save:', req.body)
    //res.json(true)
    //next()
  },
  deletepoem (req, res, next) {
    console.log('Delete:', req.body)
    res.json(true)
    next()
  }
}

module.exports = handlers
