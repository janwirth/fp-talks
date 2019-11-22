// same output for same input
// side-effect free, then environment is not touched, nor are my arguments mutated
// pure functios are good because
// - they do not change externals
// - they are easy to test and debug
// - they do not require you to keep external state in your mind
// - CAVEAT: you can not directly interact with them, because every interaction is a side-effect

const add = (x,y) => {
    return x + y 
};
const addStillPure = (x,y) => {
    x = x + y
    return x
    // const sum = x + y
    // return sum
}

const incrementPure = x => add(x, 1)
console.log(incrementPure(1))

var i = 0
const incrementImpure = () => {
    i = i + 1 // mutatiting the environment
    console.log('increment', i) // performing IO
}
const decrementImpure = () => {
    i = i - 1
    console.log('decrement', i)
}
const myObj = {name: 'jfcodes'}
const impureFunctionProcessingAnObject = (obj) => {
    obj.name = 'claudio'  // actually mutating the arguments
    return obj
}

const isThisImpureFunctionProcessingAnObject = (name) => {
    name = 'claudio'
    
    return myObj
}
// same as
// always(myObj)

console.log(myObj)
console.log(isThisImpureFunctionProcessingAnObject(myObj.name))
console.log(myObj)

incrementImpure()
incrementImpure()
decrementImpure()
incrementImpure()


// Math.random is impure, so random is also impure
// The pure 'random' function was polluted
const random = (x) => add(x , Math.random() * 10)
const square = (x) => Math.pow(2, x)

const jfCodesFactory = () => ({name: 'jfcodes'});
const always = sth => () => sth 
const alwaysJfCodes = always({name: 'jfcodes'})