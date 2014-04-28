'use strict';

require('should');
var fs = require('fs');
var fscache = require('..');
var through = require('through2');

describe('fscache-stream', function() {

  it('Normal use', function(done) {
    var result = '', expected = 'test string\n';
    var mock = through();
    mock.write('test ');
    mock.write('string');
    mock.end('\n');

    var outputPath = __dirname + '/fixtures/output';
    fs.existsSync(outputPath) && fs.unlinkSync(outputPath);
    mock
      .pipe(fscache(outputPath))
      .on('data', function(data) {
        result += data;
      })
      .on('end', function() {
        result.should.eql(expected);
        fs.readFileSync(outputPath).toString()
          .should.eql(expected);
        done();
      });
  });

});