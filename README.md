# fscache-stream [![Build Status](https://travis-ci.org/popomore/fscache-stream.png?branch=master)](https://travis-ci.org/popomore/fscache-stream) [![Coverage Status](https://coveralls.io/repos/popomore/fscache-stream/badge.png?branch=master)](https://coveralls.io/r/popomore/fscache-stream?branch=master) 

A passtrough stream caching buffer to file system

---

## Install

```
$ npm install fscache-stream -g
```

## Usage

```
var http = require('http');
var fscache = require('fscache-stream');
var file = 'http://code.jquery.com/jquery-1.11.0.js';
http.get(file, function(req, res){
  req
  .pipe(fscache('jquery.js'))
  .pipe(process.stdout);
});
```

## LISENCE

Copyright (c) 2014 popomore. Licensed under the MIT license.
