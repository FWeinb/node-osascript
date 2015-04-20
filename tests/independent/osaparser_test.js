var parse = require('../../lib/osa-parser').parse;


module.exports = {

  parseNumber : function (test) {
    test.expect(3);
    test.equal(parse('1.234'), 1.234, "Should parse float");
    test.equal(parse('1e3'), 1000, "Should parse scientific syntax");
    test.equal(parse('5'), 5, "Should parse int");
    test.done();
  },

  parseBoolean : function (test) {
    test.expect(2);
    test.equal(parse('true'), true, "true");
    test.equal(parse('false'), false, "false");
    test.done();
  },

  parseString : function(test){
    test.expect(1);
    test.equal(parse('"Hello"'), "Hello", "Should parse Strings");
    test.done();
  },

  parseArray : function(test){
    test.expect(2);
    test.deepEqual(parse('{"this", "is", "an", "array"}'), ["this", "is", "an", "array"], "Arrays should be parsed");
    test.deepEqual(parse('{ "this"  , "is"  ,"an" ,  "array" }'), ["this", "is", "an", "array"], "Should parse array with strange formatting");
    test.done();
  },

  parseObject : function(test){
    test.expect(2);
    test.deepEqual(parse('{key:"value"}'), {"key" : "value"});
    test.deepEqual(parse('{k e y:"value"}'), {"k e y" : "value"}, "Spaces in key");
    test.done();
  },
  parseObjectInArray : function(test){
    test.expect(1);
    test.deepEqual(parse('{"this", "is", "an", {object : "in"}, "an", "array"}'), ["this", "is", "an", {"object" : "in"}, "an", "array"], "Nested Object in Array");
    test.done();
  },

  parseDate : function(test){
    test.expect(1);
    test.equal(parse('date "Sunday 8 June 2014 13:58:49"').getTime(), new Date("Sunday 8 June 2014 13:58:49").getTime(), "Parse date to date object");
    test.done();
  },

  preserveOriginalStringInDate: function(test) {
    test.expect(1);
    test.equal(parse('date "Date in format unrecognized by Javascript"'), 'Date in format unrecognized by Javascript', "Preserve original date string when Javascript cannot parse it");
    test.done();
  },

  parseEmpty : function(test){
    test.expect(1);
    test.equal(parse(''), null, "Should be emtpy");
    test.done();
  },

  parseMultilineString: function(test) {
    test.expect(1);
    test.deepEqual(parse('{foo:"bar\n\tbaz"}'), {"foo": "bar\n\tbaz"}, "String with line-breaks and tab characters");
    test.done();
  },

  parseUnquotedString: function(test) {
    test.expect(2);
    test.deepEqual(parse('{foo:simple string value without quotes}'), {"foo": "simple string value without quotes"}, "Simple string value without quotes");
    test.deepEqual(parse('{foo: project id "111-222-333" of application "Things"}'), {"foo": "project id \"111-222-333\" of application \"Things\""}, "Unquoted string value with quotes inside");
    test.done();
  }
};
