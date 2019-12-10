var assert = require('assert');
var fs = require('fs');
var path = require('path');
var smfgen = require('../');

// test data from the filesystem, pregenerated
var json = require(path.join(__dirname, 'assets/basic-manifest.json'));
var xml = fs.readFileSync(path.join(__dirname, 'assets/basic-manifest.xml'), 'utf-8');

// stream smfgen data into a buffer
var generatedManifest = '';
var fakestream = {
  write: function(a) { generatedManifest += a; }
};

smfgen(fakestream, json);

assert.strictEqual(generatedManifest, xml);
