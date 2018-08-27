# node-osascript - Change Log
All notable changes to this project will be documented here.

## `2.1.0` - 2018-08-07
 * Ability to kill a running AppleScript

## `2.0.0`
 * Remove grunt
 * Upgrade to `pegjs@0.10.0`
 * lint using `xo`

### `1.0.4`
 * Fix for breaking change in node 6 (See [#7](https://github.com/FWeinb/node-osascript/issues/7) Thanks to [rosszurowski](https://github.com/rosszurowski))
 * Update dependencies

## `1.0.3`
 * When date cannot be parsed by Javascript, return original string value (See [#5](https://github.com/FWeinb/node-osascript/issues/3))  
 * Added support for multiline strings and for unquoted strings in osascript output (See [#5](https://github.com/FWeinb/node-osascript/issues/3))

## `1.0.2`
 * Unrecognized result is know always treated as a raw string. (Fix [#3](https://github.com/FWeinb/node-osascript/issues/3))

## `1.0.1`
 * Fix a bug where empty results where considert an error (Fix [#2](https://github.com/FWeinb/node-osascript/issues/2))

## `1.0.0`
 * Stable release
 * Fix package.json

## `0.0.1`
 * Inital release
