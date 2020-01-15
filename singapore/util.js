export const inspect = label => val => {console.log(label, val); return val}

// helpers
export const pipe = fns => val => fns.reduce((result, nextFn) => (nextFn(result)), val)
