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
 * 对比两个数组，取出不相同的元素
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