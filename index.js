'use strict';

var fs = require('fs');
var dirname = require('path').dirname;
var mkdirp = require('mkdirp');
var through = require('through2');

module.exports = cacheStream;

function cacheStream(path) {
  var stream;
  return through.obj(function transform(chunk, enc, callback){
    if (!stream) {
      mkdirp(dirname(path));
      stream = fs.createWriteStream(path);
    }

    stream.write(chunk);
    this.push(chunk);
    callback();
  }, function(callback) {
    stream ? stream.end(callback) : callback();
  });
}
