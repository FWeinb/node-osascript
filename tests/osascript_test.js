var osascript = require('../lib/index');

module.exports = {
  resultObjectInArray : function (test) {
    test.expect(1);
    osascript.execute('return {"this", "is", "an", {object : "in"}, "an", "array"}', function(err, result, raw){
      test.deepEqual(result, ["this", "is", "an", {"object" : "in"}, "an", "array"]);
     test.done();
    });
  },

  injectVariables : function(test){
    test.expect(1);
    osascript.execute('return (map of variable)\'s item 2', {variable : { map : [1,5,9] }}, function(err, result, raw){
      test.deepEqual(result, 5);
      test.done();
    });
  },

  emptyResult : function (test) {
    test.expect(1);
    osascript.execute('beep', function(err, result, raw){
      test.equal(result, null, "Should be null");
      test.done();
    });
  },

  error : function (test) {
    test.expect(2);
    osascript.execute('This is not valid applescript', function(err, result, raw){
     test.equal(result, null);
     test.equal(""+err, "Error: 19:30: syntax error: Expected end of line, etc. but found property. (-2741)\n");
     test.done();
    });
  }
};
