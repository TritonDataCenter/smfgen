var assert = require('assert-plus');
var cp = require('child_process');
var fs = require('fs');
var path = require('path');

var EXPECTED_XML = fs.readFileSync(
    path.join(__dirname, 'assets/nginx-cli-manifest.xml'), 'utf-8');

var PROG = path.join(__dirname, '../smfgen');
var args = [
	'-i', 'nginx',
	'-l', 'NGINX Web Server',
	'-c', 'my-category',

	'-s', 'nginx -d',
	'-r', ':kill -HUP',
	'-d', '/var/www',

	'-u', 'nobody',
	'-g', 'other',

	'-p', 'basic',
	'-p', 'net_privaddr',

	'-D', 'dep1',
	'-D', 'dep2',

	'-eHOME=/var/tmp',
	'-ePATH=/bin:/usr/bin'
];

var child = cp.spawnSync(PROG, args, {encoding: 'utf8'});

assert.ok(!child.error, 'child error');
assert.equal(child.status, 0, 'child status');
assert.ok(!child.stderr, 'child stderr');

assert.equal(child.stdout.trim(), EXPECTED_XML.trim(), 'correct output');
