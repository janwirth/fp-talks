/*
 * FP Course for JS developers
 * - pure functions & immutable data going hand in hand
 * - first-class and higher-order functions
 * - apply some curry
 * - composition with and without points
 * - beauty of containers
 * - observable containers
 * - state of Typescript
 *   - composition operators
 *   - pattern matching for recursion and union types
 */



const _ = require('ramda')
const promiseTry = require("es6-promise-try");
async function main() {

    // CONTAINERS

    // mappable
    await [1,2,3].map(num => num * 2)

    // thenable
    Promise.resolve(1).then(num => num * 2)

    // nested
    Promise.resolve([1,2,3]).then(list => list.map(num => num * 2))

    // auto-flatten
    Promise.resolve(1).then(num => Promise.resolve(num * 2));

    // explicit flattening
    [1,2,3].flatMap(x => [x * 2, x + 1])

    // idiomatic async
    await Promise.resolve(1)

    // PARTIAL CURRY
    const pow = _.curry(Math.pow)
    const squareAll = map(pow(2))

    // point-free style
    // notice the unobtrusive inspect-statement
    _.pipe(squareAll, _.map(inspect), inspect)([1,2,3])
}


// use a functor ;)
function map (fn) {
    return mappable => mappable.map(fn)
}


function inspect (arg) {
    console.dir(...arguments)
    return arg
}

main()
