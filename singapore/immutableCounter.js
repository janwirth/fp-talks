// a pure lambda function
const increment = n => n + 1

const initialCount = 0

const stateAfterOneMinute = increment(increment(initialCount))
const stateAfterTwoMinutes = increment(increment(stateAfterOneMinute))

// note how updates are non-destructive
console.log('stateAfterOneMinute', stateAfterOneMinute)
console.log('stateAfterTwoMinutes', stateAfterTwoMinutes)
