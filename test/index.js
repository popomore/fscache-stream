'use strict';

require('should');
var fs = require('fs');
var fscache = require('..');
var through = require('through2');

describe('fscache-stream', function() {

  var outputPath = __dirname + '/fixtures/output';
  beforeEach(function() {
    fs.existsSync(outputPath) && fs.unlinkSync(outputPath);
  });

  it('should cache file', function(done) {
    var result = '', expected = 'test string\n';
    var mock = through();
    mock.write('test ');
    mock.write('string');
    mock.end('\n');

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

  it('should not create file when no data pass', function() {
    fscache(outputPath);
    fs.existsSync(outputPath).should.not.be.true;
  });
});
