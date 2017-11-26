var tape = require('tape')
var count = require('./index')

tape('counts correct', function (t) {

  count('.', {}, function (err, data) {
    if (err) t.end(err)

    t.is(data.files, 8, 'should count 8 files')
    t.is(data.dirs, 1, 'should count 1 dir') // node_modules

    t.end()
  })

})
