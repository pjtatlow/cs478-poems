const path = require('path')

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
    res.json([
      {
        '_id': 1,
        'title': 'Dumb Poem 1',
        'author': 'Dumo Author 1',
        'year': 2017,
        'text': 'THIS IS THE POEM. I LIKE VUEJS.',
        'genre': 'Happy'
      },
      {
        '_id': 2,
        'title': 'Dumb Poem 2',
        'author': 'Dumo Author 2',
        'year': 2000,
        'text': 'THIS IS THE POEM. I LIKE VUEJS2.',
        'subject': ['Birds', 'Winter']
      }
    ])
    next()
  },
  addpoem (req, res, next) {
    console.log('Add:', req.body)
    res.json(true)
    next()
  },
  savepoem (req, res, next) {
    console.log('Save:', req.body)
    res.json(true)
    next()
  }
}

module.exports = handlers
