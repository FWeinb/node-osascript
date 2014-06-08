var osascript = require('../../lib/index');
var resolve = require('path').resolve;

osascript.executeFile(resolve(__dirname, 'external.scpt'), {buttonNames : ["Names", "From", "Node" ]}, function(err, result, raw){
  if ( err ) {
    return console.log(err);
  }
  console.log("You hit button", '=>', result['button returned']);
});
