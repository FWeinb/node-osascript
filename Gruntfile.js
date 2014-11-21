module.exports = function(grunt){
  grunt.initConfig({
    nodeunit: {
      all: ['./tests/**/*_test.js'],
      platformIndipendent : ['./tests/independent/*_test.js']
    },
    peg: {
      parser: {
        src: "lib/osa-parser.peg",
        dest: "lib/osa-parser.js"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-peg');

  grunt.registerTask('test', ['nodeunit:platformIndipendent']);
  grunt.registerTask('test-all', ['nodeunit:all']);
};