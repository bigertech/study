/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14/11/19
 * @description
 *
 */

var _ = require("lodash");


//### 集合处理 ###//
/**
 * _.map(collection, [callback=identity], [thisArg])
 * 对集合的每个成员依次进行某种操作，将返回的值依次存入一个新的数组
 */
(function () {
    _.map([1, 2, 3], function (num) {
        return num*3;
    });
    // → [3, 6, 9]

    var characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred',   'age': 40 }
    ];

    _.map(characters, function (obj) {
        return obj.age;
    });
    //  → [ 36, 40 ]
})();

/**
 * _.forEach(collection, [callback=identity], [thisArg])
 * 依次对集合所有元素进行某种操作，并返回本来的对象
 */
(function () {
    //_([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
    // → logs each number and returns '1,2,3'

    //_.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
    // → logs each number and returns the object (property order is not guaranteed across environments)
})();

/**
 * _.reduce(collection, [callback=identity], [accumulator], [thisArg])
 * 对集合中的元素依次进行某种操作，然后将操作结果累计在某一个初始值之上，全部操作
 * 结束之后，返回累计的值
 */
(function () {
    var sum = _.reduce([1, 2, 3], function (sum,num) {
         return sum + num;
    });
    // → 6

    var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
        result[key] = num * 3;
        return result;
    }, {});
})();

/**
 * _.reduceRight(collection, [callback=identity], [accumulator], [thisArg])
 * 是逆向的reduce，表示从集合的最后一个元素向前进行处理
 */
(function () {
    var list = [[0, 1], [2, 3], [4, 5]];
    var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
    // → [4, 5, 2, 3, 0, 1]
})();

/**
 * _.shuffle(collection)
 * 返回一个打乱次序的集合
 */
(function () {
    _.shuffle([1, 2, 3, 4, 5, 6]);
    // [4, 1, 6, 3, 5, 2]
})();

/**
 * _.invoke(collection, methodName, [arg])
 * 对集合的每个成员执行指定的操作
 */
(function () {
    _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
// → [[1, 5, 7], [1, 2, 3]]

    _.invoke([123, 456], String.prototype.split, '');
// → [['1', '2', '3'], ['4', '5', '6']]
})();

/**
 * _.sortBy(collection, [callback=identity], [thisArg])
 * 根据处理函数的返回值，返回一个排序后的集合，以升序排列
 */
(function () {
    _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
// → [3, 1, 2]

    _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
// → [3, 1, 2]

    var characters = [
        { 'name': 'barney',  'age': 36 },
        { 'name': 'fred',    'age': 40 },
        { 'name': 'barney',  'age': 26 },
        { 'name': 'fred',    'age': 30 }
    ];

// using "_.pluck" callback shorthand
    _.map(_.sortBy(characters, 'age'), _.values);
// → [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]

// sorting by multiple properties
    _.map(_.sortBy(characters, ['name', 'age']), _.values);
// = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
})();

/**
 * _.indexBy(collection, [callback=identity], [thisArg])
 * 返回一个对象，根据指定键名，对集合生成一个索引
 */
(function () {
    var keys = [
        { 'dir': 'left', 'code': 97 },
        { 'dir': 'right', 'code': 100 }
    ];

    _.indexBy(keys, 'dir');
// → { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }

    _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
// → { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }

    _.indexBy(keys, function(key) { return this.fromCharCode(key.code); }, String);
// → { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
})();



//### 集合特征检测 ###//
/**
 * _.every(collection, [callback=identity], [thisArg])
 * 判断数组的所有元素是否都满足某个条件。如果都满足则返回true，否则返回false
 * @callback    : 接受三个参数:(value, index|key, collection)
 */
(function () {
    _.every([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// false

    _.every([true, 1, null, 'yes']);
// → false

    var characters = [
        { 'name': 'barney', 'age': 36 },
        { 'name': 'fred',   'age': 40 }
    ];

// using "_.pluck" callback shorthand
    _.every(characters, 'age');
// → true

// using "_.where" callback shorthand
    _.every(characters, { 'age': 36 });
// → false
})();

/**
 * _.some(collection, [callback=identity], [thisArg])
 * 只要一个元素满足，就返回true，否则返回false
 */
(function () {
    _.some([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// true

    _.some([null, 0, 'yes', false], Boolean);
// → true

    var characters = [
        { 'name': 'barney', 'age': 36, 'blocked': false },
        { 'name': 'fred',   'age': 40, 'blocked': true }
    ];

// using "_.pluck" callback shorthand
    _.some(characters, 'blocked');
// → true

// using "_.where" callback shorthand
    _.some(characters, { 'age': 1 });
// → false
})();

/**
 * _.size(collection)
 * 返回集合的成员数量
 */
(function () {
    _.size([1, 2]);
// → 2

    _.size({ 'one': 1, 'two': 2, 'three': 3 });
// → 3

    _.size('pebbles');
// → 7
})();

/**
 * _.sample(collection, [n])
 * 用于从集合中随机取样
 */
(function () {
    _.sample([1, 2, 3, 4]);
// → 2

    _.sample([1, 2, 3, 4], 2);
// → [3, 1]
})();


//### 集合过滤 ###//
/**
 * _.filter()
 * 依次对集合的每个成员进行某种操作，只返回操作结果为true的成员
 */
(function () {
    _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
    // [2, 4, 6]
})();