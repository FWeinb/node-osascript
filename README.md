node-osascript
--------
> Use AppleScript from node.js

Execute AppleScript from node.js and process the results.

## Install

```sh
$ npm install node-oasascript
```

## Examples

### Simple

```js
var osascript = require('node-osascript');

osascript.execute('display dialog "What should I do?" buttons {"Go home", "Work", "Nothing"}\nset DlogResult to result\n return result', function(err, result, raw){
  if ( err ) {
    return console.log(err);
  }
  console.log("You hit button", '=>', result['button returned']);
});
```


### Injecting variables

You can inject a javascript object into the script to have acces to these variables.

```js
var osascript = require('node-osascript');

osascript.execute('display dialog message', { message : "Hello from Node.JS" },function(err, result, raw){

});
```

### API

#### Methods

##### `execute(script, [variables], callback)`

Execute the `script`, if specificed injecting the `variables` into the AppleScript.

```js
  osascript.execute('script', { varName : 'value'}, function(error, result, raw){

  });
```


##### `executeFile(path, [variables], callback)`

Execute file in `path`, if specificed injecting the `variables` into the AppleScript.

```js
  osascript.executeFile('path/to/script.scpt', { varName : 'value'}, function(error, result, raw){

  });
```





