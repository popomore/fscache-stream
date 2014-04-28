'use strict';

var fs = require('fs');
var dirname = require('path').dirname;
var mkdirp = require('mkdirp');
var through = require('through2');

module.exports = cacheStream;

function cacheStream(path) {
  mkdirp(dirname(path));
  var stream = fs.createWriteStream(path);
  var end = stream.end.bind(stream);
  return through.obj(function transform(chunk, enc, callback){
    stream.write(chunk);
    this.push(chunk);
    callback();
  }, end);
}
