/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/11/19
 * @description
 *
 */

var Promise = require("bluebird");

var fs = Promise.promisifyAll(require("fs"));

fs.readFileAsync("package.json", "utf8").then(function (contents) {
    console.log(contents);
}).catch(function (e) {
    console.log(e.stack);
});