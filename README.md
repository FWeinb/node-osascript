# node-osascript [![NPM version](https://badge.fury.io/js/node-osascript.svg)](http://badge.fury.io/js/node-osascript) [![Build Status](https://travis-ci.org/FWeinb/node-osascript.svg?branch=master)](https://travis-ci.org/FWeinb/node-osascript)

> Use AppleScript from node.js

Execute AppleScript from node.js and process the results.

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

### Injecting variables

You can inject a javascript object into the script to have acces to these variables.

```js
var osascript = require('node-osascript');

osascript.execute('display dialog message', { message : "Hello from Node.JS" },function(err, result, raw){
  if (err) return console.error(err)
  console.log(result, raw)
});
```

### API

#### Methods

##### `execute(script, [variables], callback)`

Execute the `script`, if specified injecting the `variables` into the AppleScript.

```js
osascript.execute('script', { varName : 'value'}, function(err, result, raw){
  if (err) return console.error(err)
    console.log(result, raw)
});
```

##### `executeFile(path, [variables], callback)`

Execute file in `path`, if specified injecting the `variables` into the AppleScript.

```js
osascript.executeFile('path/to/script.scpt', { varName : 'value'}, function(err, result, raw){
  if (err) return console.error(err)
    console.log(result, raw)
});
```

### Tests

To run platform independent tests use:
```
npm test
```

If you are on macOS you can run all tests using:
```
npm testall
```

### License

MIT

### Changelog

##### `2.0.0`
 * Remove grunt
 * Upgrade to `pegjs@0.10.0`
 * lint using `xo`

##### `1.0.4`
 * Fix for breaking change in node 6 (See [#7](https://github.com/FWeinb/node-osascript/issues/7) Thanks to [rosszurowski](https://github.com/rosszurowski))
 * Update dependencies

##### `1.0.3`
 * When date cannot be parsed by Javascript, return original string value (See [#5](https://github.com/FWeinb/node-osascript/issues/3))  
 * Added support for multiline strings and for unquoted strings in osascript output (See [#5](https://github.com/FWeinb/node-osascript/issues/3))

##### `1.0.2`
 * Unrecognized result is know always treated as a raw string. (Fix [#3](https://github.com/FWeinb/node-osascript/issues/3))

##### `1.0.1`
 * Fix a bug where empty results where considert an error (Fix [#2](https://github.com/FWeinb/node-osascript/issues/2))

##### `1.0.0`
 * Stable release
 * Fix package.json

##### `0.0.1`
 * Inital release
