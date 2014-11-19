/**
 * Copyright (c) 2014 Meizu bigertech, All rights reserved.
 * http://www.bigertech.com/
 * @author JerryC
 * @date  14-11-18
 * @description
 *
 */

var _ = require("lodash");


/**
 * _.compact(array)
 * 去除一些不是数字的元素
 */
(function () {
    console.log();
    console.log("=============== _.compact ===============");
    _.compact([1,2,3,'',null]);
    // [ 1, 2, 3 ]
})();


/**
 * _.difference(array, [values])
 * 对array排除指定的元素
 * @array   : 需要处理的数组
 * @[values]: 需要排除的元素
 */
(function () {
    console.log();
    console.log("=============== _.difference ===============");
    _.difference([1,2,3,'a','b'],['a',2,10]);
    // [ 1, 3, 'b' ]
})();


/**
 * _.rest(array, [callback=1], [thisArg])
 * 去除给定数组的第一个或者前N个元素，或者指定规则的元素
 * @array       : 需要操作的数组
 * @[callback=1](Function|Object|number|string):为数字时，则去除前N个元素；为String时，未知；为Function时，则按照特定规则处理；为Object时，则去除拥有这些属性的元素
 * @[thisArg]   :
 */
(function () {
    console.log();
    console.log("=============== _.rest ===============");
    _.rest([1,2,3],2);
    // [3]

    _.rest([1,2,3,4], function (num) {
        // 该函数回返回true\false的值，num是目前遍历到的元素，如果返回true则匹配成功，进行处理，如果返回false则匹配失败，不作处理
        return num < 3
    });
    // [3,4]

    var characters = [
        { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
        { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
        { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
    ];
    _.rest(characters, 'blocked');
    // [ { name: 'fred', blocked: false, employer: 'slate' },{ name: 'pebbles', blocked: true, employer: 'na' } ]

    _.rest(characters, { 'employer': 'slate' });
    //[ { name: 'pebbles', blocked: true, employer: 'na' } ]
})();


/**
 * _.findIndex(array, [callback=identity], [thisArg])
 * 返回第一个匹配到的元素的索引值
 */
(function () {
    var characters = [
        { 'name': 'barney',  'age': 36, 'blocked': false },
        { 'name': 'fred',    'age': 40, 'blocked': true },
        { 'name': 'pebbles', 'age': 1,  'blocked': false }
    ];

    _.findIndex(characters, function(chr) {
        return chr.age < 20;
    });
    // → 2

    // using "_.where" callback shorthand
    _.findIndex(characters, { 'age': 36 });
    // → 0

    // using "_.pluck" callback shorthand
    _.findIndex(characters, 'blocked');
    // → 1
})();


/**
 * _.findLastIndex(array, [callback=identity], [thisArg])
 * 返回第一个匹配到的元素的索引值，和findIndex不同的是，它会从右边开始遍历
 */
(function () {
    var characters = [
        { 'name': 'barney',  'age': 36, 'blocked': true },
        { 'name': 'fred',    'age': 40, 'blocked': false },
        { 'name': 'pebbles', 'age': 1,  'blocked': true }
    ];

    _.findLastIndex(characters, function(chr) {
        return chr.age > 30;
    });
    // → 1

    // using "_.where" callback shorthand
    _.findLastIndex(characters, { 'age': 36 });
    // → 0

    // using "_.pluck" callback shorthand
    _.findLastIndex(characters, 'blocked');
    // → 2
})();


/**
 * _.first(array, [callback], [thisArg])
 * 返回第一个或者前N个元素，或者返回前几个符合规则的元素
 */
(function () {
    _.first([1, 2, 3]);
    // → 1

    _.first([1, 2, 3], 2);
    // → [1, 2]

    _.first([1, 2, 3], function(num) {
        return num < 3;
    });
    // → [1, 2]

    var characters = [
        { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
        { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
        { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
    ];

    // using "_.pluck" callback shorthand
    _.first(characters, 'blocked');
    // → [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]

    // using "_.where" callback shorthand
    _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
    // → ['barney', 'fred']
})();


/**
 * _.flatten(array, [isShallow=false], [callback=identity], [thisArg])
 * 把一个多层嵌套的数组平坦化，如果isShallow=true的话，则只去除一层。
 */
(function () {
    _.flatten([1, [2], [3, [[4]]]]);
    // → [1, 2, 3, 4];

    _.flatten([1, [2], [3, [[4]]]], true);
    // → [1, 2, 3, [[4]]];

    var characters = [
        { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
        { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
    ];

    // using "_.pluck" callback shorthand
    _.flatten(characters, 'pets');
    // → ['hoppy', 'baby puss', 'dino']
})();


/**
 * _.indexOf(array, value, [fromIndex=0])
 * 返回匹配元素的索引值，但匹配不到的时候返回-1
 * @array                       : 要处理的数组
 * @value                       : 需要匹配的值
 * @[fromIndex](boolean|number) : 如果是number，则表示开始遍历的索引值；如果是true，则表示用二进制查找被排列的数组
 */
(function () {
    _.indexOf([1, 2, 3, 1, 2, 3], 2);
    // → 1

    _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
    // → 4

    _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
    // → 2
})();

/**
 * _.intersection([array])
 * 返回多个数组中都有的元素
 */
(function () {
    _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
    // → [1, 2]
})();

/**
 * _.last(array, [callback], [thisArg])
 * 跟first相反，返回最后一个或者最后N个元素的数组，或者从后面开始遍历符合条件的元素。
 */
(function () {
    _.last([1, 2, 3]);
    // → 3

    _.last([1, 2, 3], 2);
    // → [2, 3]

    _.last([1, 2, 3], function(num) {
        return num > 1;
    });
    // → [2, 3]

    var characters = [
        { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
        { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
        { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
    ];

    // using "_.pluck" callback shorthand
    _.pluck(_.last(characters, 'blocked'), 'name');
    // → ['fred', 'pebbles']

    // using "_.where" callback shorthand
    _.last(characters, { 'employer': 'na' });
    // → [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
})();


/**
 * _.lastIndexOf(array, value, [fromIndex=array.length-1])
 * 从右边开始遍历，获取指定元素的索引值。如果fromIndex指定，则从指定索引开始向左遍历
 */
(function () {
    _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
    // → 4

    _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
    // → 1
})();

/**
 * _.zipObject(keys, [values=[]])
 * 把指定的keys和指定的values相匹配
 */
(function () {
    _.zipObject(['fred', 'barney'], [30, 40]);
    // → { 'fred': 30, 'barney': 40 }

    _.zipObject(['fred',30],['barney',40]);
    // → { '30': 40, fred: 'barney' }
})();

/**
 * _.pull(array, [value])
 * 从指定array中删除指定value
 */
(function () {
    var array = [1, 2, 3, 1, 2, 3];
    _.pull(array, 2, 3);
    // → [1, 1]
})();

/**
 * _.range([start=0], end, [step=1])
 * 创造一个指定范围的数组
 * @[start=0]   : 范围的开始
 * @end         : 范围的结束
 * @[step=1]    : 每次增加或者减少的量
 */
(function () {
    _.range(4);
// → [0, 1, 2, 3]

    _.range(1, 5);
// → [1, 2, 3, 4]

    _.range(0, 20, 5);
// → [0, 5, 10, 15]

    _.range(0, -4, -1);
// → [0, -1, -2, -3]

    _.range(1, 4, 0);
// → [1, 1, 1]

    _.range(0);
// → []
})();

/**
 * _.remove(array, [callback=identity], [thisArg])
 * 对array操作，删除符合条件的元素，返回被删除的元素。
 */
(function () {
    var array = [1, 2, 3, 4, 5, 6];
    var evens = _.remove(array, function(num) { return num % 2 == 0; });

    console.log(array);
    // → [1, 3, 5]

    console.log(evens);
    // → [2, 4, 6]

    var temp = _.remove(array);
    console.log(array);
    // → []

    console.log(temp);
    // → [1, 3, 5]
})();

/**
 * _.sortedIndex(array, value, [callback=identity], [thisArg])
 * 评估一个值在给定一个排序好的数组，应该插入的索引位置
 */
(function () {
    console.log();
    console.log("=============== _.sortedIndex ===============");

    _.sortedIndex([20, 30, 50], 40);
    // → 2

    var temp = _.sortedIndex([60, 20, 80, 30, 50], 55);
    // → 2

    // using "_.pluck" callback shorthand
    _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
    // → 2

    var dict = {
        'wordToNumber': { 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50 }
    };

    _.sortedIndex(['twenty', 'thirty', 'fifty'], 'forty', function(word) {
        return dict.wordToNumber[word];
    });
    // → 2

    _.sortedIndex(['twenty', 'thirty', 'fifty'], 'forty', function(word) {
        return this.wordToNumber[word];
    }, dict);
    // → 2
})();

/**
 * _.union([array])
 * 返回一个针对多个数组去重后的数组
 */
(function () {
    _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
    // → [1, 2, 3, 5, 4]
})();

/**
 * _.uniq(array, [isSorted=false], [callback=identity], [thisArg])
 * 针对一个数组去重，如果isSorted=true,将会用更加快的算法处理。
 */
(function () {
    _.uniq([1, 2, 1, 3, 1]);
    // → [1, 2, 3]

    _.uniq([1, 1, 2, 2, 3], true);
    // → [1, 2, 3]

    _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
    // → ['A', 'b', 'C']

    _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
    // → [1, 2.5, 3]

    // using "_.pluck" callback shorthand
    _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
    // → [{ 'x': 1 }, { 'x': 2 }]
})();

/**
 * _.without(array, [value])
 * 创造一个排除给定元素的数组
 */
(function () {
    _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
    // → [2, 3, 4]
})();

/**
 * _.xor([array])
 * 创造一个数组，该数组是所有给定数组相互没有重复的元素的集合。
 */
(function () {
    _.xor([1, 2, 3], [5, 2, 1, 4]);
    // → [3, 5, 4]

    _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
    // → [1, 4, 5]
})();

/**
 * _.zip([array])
 * 创一个数组，分组给定的数组。
 */
(function () {
    _.zip(['fred', 'barney'], [30, 40], [true, false]);
    // → [['fred', 30, true], ['barney', 40, false]]
})();