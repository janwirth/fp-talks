/*
 * FP Course for JS developers
 * - Intro: Working hours: Imperative, functional, declarative
 * - not wanna go into esoterics, no philosophy, break it down simple but still benefit from abstraction
 * - functional STYLE, tried to keep it idiomatic
 * - why is it useful
 *   - we are already using it - declarative / reactive / functional views
 *   - less effort because you have to keep less memory in the dev's mind
 * - is it available?
 *   - it's the big stuff
 * - not saying either or the other is inferior - they complement each other
 * - pure functions & immutable data going hand in hand
 *      - pure function is just a function - only a function. nothing else. The mathematical definition
 *      - only direct inputs vary the value. There may be constants
 * - first-class and higher-order functions
 * - apply some curry
 * - composition with and without points
 * - beauty of containers
 * - observable containers
 * - state of Typescript
 *   - composition operators
 *   - pattern matching for recursion and union typeszxvasfasf
 * - monoids, monads, should not scare you
 * key learnings
 *  - pure functions
 *  - higher-order functions
 *  - composition and point-free style
 *  - immutable data
 *  - functors & monads
 *  - recursion and destructuring
 */


 /* notes from Anjana Talk
 *   - what is a paradigm: a worldview
 *   - state and time
 *   - OOP - keep state, communicate through messages
 *      - each house can call a line
 *   - FP = one simple idea = PURE functions
 */

/*
 * Further Reading
 * https://www.youtube.com/watch?v=JZSoPZUoR58&t=812s
 * 
 */

// A refresher
function pureVsImpure () {
    // impure
    var i = 0;
    console.log(i)
    const incrementImpure = () => {
        i++ // side effect
    }
    incrementImpure()
    console.log(i)

    const incrementPure = n => n + 1
    console.log(incrementPure(i))
    console.log(i)
}
pureVsImpure()

const _ = require('ramda')
const promiseTry = require("es6-promise-try");
async function main() {
    
    // arrays
    // iterator code and worker code
    // TODO: list iteration example here
    // TODO: same example

    // CONTAINERS

    // mappable
    [1,2,3].map(num => num * 2)

    // thenable
    Promise.resolve(1).then(num => num * 2)

    // nested
    Promise.resolve([1,2,3]).then(list => list.map(num => num * 2))

    // auto-flatten
    Promise.resolve(1).then(num => Promise.resolve(num * 2));

    // explicit flattening
    flatMap(x => [x * 2, x + 1], [1,2,3])

    // idiomatic async
    await Promise.resolve(1)

    // PARTIAL CURRY
    const pow = _.curry(Math.pow)
    const squareAll = map(pow(2))

    // point-free style
    // notice the unobtrusive inspect-statement
    _.pipe(squareAll, /*_.map(inspect), inspect */)([1,2,3])
}


// use a functor ;)
function map (fn) {
    return mappable => mappable.map(fn)
}
const flatten = arr => arr.reduce((a, b) => [...a, ...b])
const flatMap = fn => arr => arr.map(fn)


function inspect (arg) {
    console.dir(...arguments)
    return arg
}

// main()
