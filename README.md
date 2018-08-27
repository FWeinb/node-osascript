# node-osascript [![NPM version](https://badge.fury.io/js/node-osascript.svg)](http://badge.fury.io/js/node-osascript) [![Build Status](https://travis-ci.org/FWeinb/node-osascript.svg?branch=master)](https://travis-ci.org/FWeinb/node-osascript)

> Use AppleScript from node.js

Execute AppleScript from node.js and process the results.

<details>
  <summary><b>Table of Contents</b></summary>

- [Install](#install)
- [Overview](#overview)
- [Examples](#examples)
  - [Simple](#simple)
  - [Injecting Variables](#injecting-variables)
  - [Timeout](#timeout)
- [API](#api)
- [Tests](#tests)
- [License](#license)
- [Changelog](#changelog)

</details>

## Install

```sh
$ npm install node-osascript
```

## Overview

Execute AppleScript and use the results of the javascript in node.
The result is transformed into a javascript object using PEG.js
So AppleScript lists are transformed into an `Array`, Records into a plain `object` and
Dates to the `Date` type as well as `Numbers`, `Booleans` and `Strings`.

## Examples

### Simple

```js
var osascript = require('node-osascript');

osascript.execute('display dialog "What should I do?" buttons {"Go home", "Work", "Nothing"}\nset DlogResult to result\n return result', function(err, result, raw){
  if (err) return console.error(err)
  console.log(result, raw)
});
```

### Injecting Variables

You can inject a javascript object into the script to have acces to these variables.

```js
var osascript = require('node-osascript');

osascript.execute('display dialog message', { message : "Hello from Node.JS" },function(err, result, raw){
  if (err) return console.error(err)
  console.log(result, raw)
});
```

### Timeout

You can force an AppleScript to stop running

```js
  var osascript = require('node-osascript');

  var childProcess = osascript.execute('display dialog "What should I do?" buttons {"Go home", "Work", "Nothing"}\nset DlogResult to result\n return result', function(err, result, raw){
    if (err) return console.error(err)
    console.log(result, raw)
  });

  //after 20 seconds, the AppleScript will be killed
  setTimeout(function(){
    console.log('kill');
    childProcess.stdin.pause();
    childProcess.kill();
  },20000)

```


## API

### Methods

#### `execute(script, [variables], callback)`

Execute the `script`, if specified injecting the `variables` into the AppleScript.

```js
osascript.execute('script', { varName : 'value'}, function(err, result, raw){
  if (err) return console.error(err)
    console.log(result, raw)
});
```

#### `executeFile(path, [variables], callback)`

Execute file in `path`, if specified injecting the `variables` into the AppleScript.

```js
osascript.executeFile('path/to/script.scpt', { varName : 'value'}, function(err, result, raw){
  if (err) return console.error(err)
    console.log(result, raw)
});
```

## Tests

To run platform independent tests use:
```
npm test
```

If you are on macOS you can run all tests using:
```
npm testall
```

## License

MIT