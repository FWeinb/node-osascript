var osascript = require('../../');

osascript.execute('display dialog message', { message : "Hello from Node.JS"},function(err, result, raw){
  if ( err ) {  }
});