var osascript = require('../../lib/index');

osascript.execute('display dialog "What should I do?" buttons {"Go home", "Work", "Nothing"}\nset DlogResult to result\n return result', function(err, result, raw){
  if ( err ) {
    return console.log(err);
  }
  console.log("You hit button", '=>', result['button returned']);
});
