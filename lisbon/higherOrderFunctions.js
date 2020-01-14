// - replace the dependency injection function with higher-order functions
// - replace many more design patterns in OOP with this pattern
// we use first-class functions here
// - declaring what we are doing in the code

// map :: (Number -> a) -> Array a
[1,2,3].map

// nTimes :: Number -> a -> Array a
const nTimes = howOften => sth =>
    Array(howOften)
        .fill()
        .map(always(sth))

const always = sth => () => sth
console.log(nTimes(4)('hey ho'))


// output :: Array Number
const output = [1,2,3].map(n => n * 2)

// add :: Number -> Number -> Number
const add = addWhat => toWhat => addWhat + toWhat

// increment :: Number -> Number
const increment = add(1)

console.log(increment(1))
console.log(increment(5))// - replace the dependency injection function with higher-order functions
// - replace many more design patterns in OOP with this pattern
// we use first-class functions here
// - declaring what we are doing in the code

// map :: (Number -> a) -> Array a
[1,2,3].map

// nTimes :: Number -> a -> Array a
const nTimes = howOften => sth =>
    Array(howOften)
        .fill()
        .map(always(sth))

const always = sth => () => sth
console.log(nTimes(4)('hey ho'))


// output :: Array Number
const output = [1,2,3].map(n => n * 2)

// add :: Number -> Number -> Number
const add = addWhat => toWhat => addWhat + toWhat

// increment :: Number -> Number
const increment = add(1)

console.log(increment(1))
console.log(increment(5))