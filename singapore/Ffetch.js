import fetch from 'isomorphic-fetch'

export class Ffetch {
    constructor(url, options = {}, pipeline = []) {
        if (!url) {
            throw "URL must be defined"
        }
        this["<value>"] = {url, options, pipeline}
    }
    static of (url, options, pipeline) {
        return new Ffetch(url, options, pipeline)
    }
    fetch() {
        const {url, options} = this["<value>"]
        return fetch(url, options).then(response => response.json())
    }
    isInstanceOf(container) {
        if (container && container.constructor.name == "Ffetch") {
            return true
        }
        return false
    }

    map(fn) {
        const {url, options, pipeline} = this["<value>"]
        return Ffetch.of(url, options, [...pipeline, fn])
    }
    andThen(fn) {
        const {url, options, pipeline} = this["<value>"]
        return Ffetch.of(url, options, [...pipeline, fn])
    }

    dispatch() {
        const {url, options, pipeline} = this["<value>"]
        const dispatchedFetch = this.fetch(url, options)
        const reducer = (dispatched, nextPipe) =>
            dispatched.then(applyNext(nextPipe))

        const applyNext = nextPipe => resolved => {
            const result = nextPipe(resolved)
            return Ffetch.prototype.isInstanceOf(result) ? result.dispatch() : result
        }

        const piped = pipeline.reduce(
            reducer
            , dispatchedFetch
            )
        return piped
    }
}

