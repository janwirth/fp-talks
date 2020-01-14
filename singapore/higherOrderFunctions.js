// a function that returns another function
// incrementBy : Number -> Number -> Number
const incrementBy = i => n => i + n

// addTwoTo : Number -> Number
const addTwoTo = incrementBy(2)
const three = addTwoTo(1)


const map = fn => arr => arr.map(fn)

console.log(map(x => x * 2)([1,2,3,4]))

const inStock = ({stock}) => stock > 0

const filter = fn => arr => arr.filter(fn)

const getStocked = filter(inStock)

