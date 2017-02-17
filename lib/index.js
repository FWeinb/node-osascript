var spawn = require('child_process').spawn;
var dirname = require('path').dirname;
var readFileSync = require('fs').readFileSync;

var Buffers = require('buffers');

var parse = require('./osa-parser').parse;
var varGenerator = require('./osa-vargen').generate;

var bufferStream = function (stream) {
	var buffer = new Buffers();
	stream.on('data', function (chunk) {
		buffer.push(new Buffer(chunk));
	});
	return buffer;
};

var execute = function (path, script, vars, cb) {
	if (cb === undefined) {
		cb = vars;
	}
	var opts;
	if (typeof path === 'undefined') {
		opts = {};
	} else {
		opts = {cwd: dirname(path)};
	}

	var cp = spawn('osascript', ['-ss', '-'], opts);

	var outBuffer = bufferStream(cp.stdout);
	var errBuffer = bufferStream(cp.stderr);

	cp.on('close', function (code) {
		var error;
		var result;

		if (code) {
			error = new Error(errBuffer.toString());
		} else {
			try {
				result = parse(outBuffer.toString());
			} catch (err) {
				error = err;
			}
		}

		if (cb) {
			cb(error, result, outBuffer);
		}
	});

	if (!script) {
		script = readFileSync(path);
	}

	if (vars) {
		script = varGenerator(vars) + '\n' + script;
	}

	cp.stdin.write(script);
	cp.stdin.end();
};

module.exports = {
	execute: function (script, vars, cb) {
		execute(undefined, script, vars, cb);
	},
	executeFile: function (path, vars, cb) {
		execute(path, undefined, vars, cb);
	}
};
