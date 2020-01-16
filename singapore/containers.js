
// functor
// map : (a -> b) -> Array a -> Array b
Array.prototype.map

// map : (a -> b) -> Functor a -> Functor b
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
    if (container.constructor.name == "Maybe") {
        return container.map(fn)
    }
    throw new Error(`map not possible on ${container}`)
}

// monad
// map : (a -> b) -> Array a -> Array b
Array.prototype.concatMap

// map : (a -> b) -> Functor a -> Functor b
export const andThen = fn => container => {
    if (typeof container.then === "function") {
        return container.then(fn)
    }
    // andThen for array is flatMap
    if (Array.isArray(container)) {
        return Array.prototype.concat(...container.map(fn))
    }
    if (container.constructor.name == "Ffetch") {
        return container.andThen(fn)
    }
    if (container.constructor.name == "Maybe") {
        return container.andThen(fn)
    }
    throw new Error("andThen not possible on", container)
}
