# count-top-entries

[![build status](http://img.shields.io/travis/chiefbiiko/count-top-entries.svg?style=flat)](http://travis-ci.org/chiefbiiko/count-top-entries) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/count-top-entries?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/count-top-entries)

***

Count the number of top-level entries (dirs and files) within a directory.

***

## Get it

```
npm install --save count-top-entries
```

***

## Usage

``` js
var count = require('count-top-entries')

count('.', {/*...*/}, function (err, data) {
  if (err) return console.error(err)
  console.log(data) // -> { dirs: x, files: y }
})
```

Only accepts a single option:

``` js
{
  dereference: false // default
}
```

To follow symlinks set `opts.dereference` to `true`.

***

## License

[MIT](./license.md)
