var tape = require('tape')
var count = require('./index')

tape('counts correct', function (t) {

  count('.', {}, function (err, data) {
    if (err) t.end(err)

    t.is(data.files, 7, 'should count 7 files')
    t.is(data.dirs, 2, 'should count 2 dirs')

    t.end()
  })

})
