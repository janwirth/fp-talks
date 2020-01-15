// functor
export const map = fn => container => {
    // is the container a promise?
    if (typeof container.then === "function") {
        return container.then(fn)
    }
    if (Array.isArray(container)) {
        return container.map(fn)
    }
    if (container.constructor.name == "Ffetch") {
        return container.map(fn)
    }
    throw new Error(`map not possible on ${container}`)
}

// monad
export const andThen = fn => container => {
    if (typeof container.then === "function") {
        return container.then(fn)
    }
    // andThen for array is flatMap
    if (Array.isArray(container)) {
        Array.prototype.concat(...container.map(fn))
    }
    if (container.constructor.name == "Ffetch") {
        return container.andThen(fn)
    }
    throw new Error("andThen not possible on", container)
}
