/*
 * grunt-peg
 * https://github.com/dvberkel/grunt-peg
 *
 * Copyright (c) 2013 Daan van Berkel
 * Licensed under the MIT license.
 */

'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.peg = {
  default_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/default_options_standard');
    var expected = grunt.file.read('test/expected/default_options');
    test.equal(actual, expected, 'Unexpected parser generated for default_options_standard.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/custom_options_standard');
    var expected = grunt.file.read('test/expected/custom_options');
    test.equal(actual, expected, 'Unexpected parser generated for custom_options_standard.');

    test.done();
  },
  passing_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/passing_options_standard');
    var expected = grunt.file.read('test/expected/passing_options');
    test.equal(actual, expected, 'Unexpected parser generated for passing_options_standard');

    test.done();
  },
  plugin_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/plugin_options_standard');
    var expected = grunt.file.read('test/expected/plugin_options');
    test.equal(actual, expected, 'Unexpected parser generated for plugin_options_standard');

    test.done();
  },
  angular_options: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/angular_options_standard');
    var expected = grunt.file.read('test/expected/angular_options');
    test.equal(actual, expected, 'Unexpected parser generated for angular_options_standard');

    test.done();
  }
};
