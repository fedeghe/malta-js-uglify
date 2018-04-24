---
[![npm version](https://badge.fury.io/js/malta-js-uglify.svg)](http://badge.fury.io/js/malta-js-uglify)
[![Dependencies](https://david-dm.org/fedeghe/malta-js-uglify.svg)](https://david-dm.org/fedeghe/malta-js-uglify)
[![npm downloads](https://img.shields.io/npm/dt/malta-js-uglify.svg)](https://npmjs.org/package/malta-js-uglify)
[![npm downloads](https://img.shields.io/npm/dm/malta-js-uglify.svg)](https://npmjs.org/package/malta-js-uglify)  
---  

This plugin can be used on: **.js** files and even on **.coffee** and **.ts** files after using the right plugin  

Options : all options of the [uglify-js package](https://www.npmjs.com/package/uglify-js)  

Sample usage:  
```
malta app/source/index.js public/js -plugins=malta-js-uglify
```
or in the .json file :  
```
"app/source/index.js" : "public/js -plugins=malta-js-uglify",
"app/source/main.ts" : "public/js -plugins=malta-typescript...malta-js-uglify"
```
or in a script :  
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.js',
    'public/js',
    '-plugins=malta-js-uglify',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```