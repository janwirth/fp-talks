// a pure function is a function that has no side-effects
// no side-effects means that it always returns the same output for the same input
// and it does not mutate state in its environment

// a higher-orde function is a function that
// takes a function as parameter or eturns another function or both
const count = 0

const add = amount => number => number + amount

const increment = add(1)
const addTwo = add(2)

const stateAFewSecondsAgo = increment(count)

const counterA = increment(increment(increment(count)))
const counterB = increment(count)

const applyOneTo = fn => fn(1)



export const map = fn => arr => arr.map(fn)
export const filter = fn => arr => arr.filter(fn)
export const isEven = number => (number % 2) === 0
export const nums = [1,2,3]

export const doubleAll = map(n => n * 2)

export const allEven = nums =>
    doubleAll(filter(isEven)(nums))
