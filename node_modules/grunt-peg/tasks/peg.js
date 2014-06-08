/*
 * grunt-peg
 * https://github.com/dvberkel/grunt-peg
 *
 * Copyright (c) 2013 Daan van Berkel
 * Licensed under the MIT license.
 */

'use strict';

var PEG  = require('pegjs');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('peg', 'Generates parsers from PEG grammars.', function() {
    // Standard Grunt "src(s) -> dest" support.
    var files = this.files;

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      exportVar: 'module.exports',
      output: 'source',
      plugins: []
    });

    // Iterate over all src-dest file pairs.
    files.forEach(function(f) {
      // Warn on and remove invalid source files (if nonull was set).
      var src = f.src.filter(function(filepath) {
        if(!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      grunt.log.writeln('Generating parser from "' + src.join('", "') + '"...');

      // Read in all source files and concatenate with newlines.
      var grammar = src.map(function(filepath) {
        return grunt.file.read(filepath);
      }).join(grunt.util.linefeed);

      // Require all plugins just like the pegjs CLI
      options.plugins = options.plugins.map(function(plugin){
        var id = /^(\.\/|\.\.\/)/.test(plugin) ? path.resolve(plugin) : plugin;
        var mod;
        try {
          mod = require(id);
        } catch (e) {
          if (e.code !== "MODULE_NOT_FOUND") { grunt.fail.fatal(e); }

          grunt.fail.fatal('Can\'t load module \'' + id + '\'.');
        }

        return mod;
      });

      // Generate the parser.
      var time = Date.now();
      var parser = PEG.buildParser(grammar, options);
      time = Date.now() - time;

      // Save the parser.
      if (f.angular != null){
        var angularModule = "angular.module('"+ f.angular.module+"', []).factory('"+ f.angular.factory+"',function(){ return ";
        grunt.file.write(f.dest, angularModule + parser + '});');
      }else {
        grunt.file.write(f.dest, options.exportVar + ' = ' + parser + ';');
      }


      grunt.log.writeln('Parser "' + f.dest + '" generated in ' + time + 'ms.');
    });
  });
};
