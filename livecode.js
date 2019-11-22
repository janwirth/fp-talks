

// countLength :: HasLength a => a -> Int
const countLength = a => a.length;

// Array String
console.log(['hell', 'world'].map(countLength))

// Promise Number
Promise.resolve(3)
// Promise.then :: (a -> b) -> Promise a -> Promise b
Promise.then
async function main() {
    const hellNo = Promise.resolve('hell').then(x => Promise.resolve(x + ' no'))
    console.log(await hellNo)
}
main()