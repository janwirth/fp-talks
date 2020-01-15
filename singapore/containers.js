// Lists
// Promises
// Maybe
const post = id => `https://jsonplaceholder.typicode.com/posts/${id}`
const posts = 'https://jsonplaceholder.typicode.com/posts'
const user = id => `https://jsonplaceholder.typicode.com/users/${id}`
const fetch = require('isomorphic-fetch')

class Ffetch {
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

// functor
const map = fn => container => {
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
const andThen = fn => container => {
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

async function main() {
    console.log(await getUserOfPostNo(1).dispatch())
    console.log(await getUser(5).dispatch())
    // console.log(await getPosts.dispatch().then(x => console.log(x)))
    // console.log(await getPost(1).dispatch())
    // console.log(await getPostBody(1).dispatch())
}
const inspect = label => val => {console.log(label, val); return val}

// helpers
const pipe = fns => val => fns.reduce((result, nextFn) => (nextFn(result)), val)

// BASE API Calls
const getPost = id => Ffetch.of(post(id))
const getPosts = Ffetch.of(posts)
const getUser = pipe([user, Ffetch.of])

// getters
const getBody = ({body}) => body
const readUserOfPostNo = postNo => posts => posts[postNo].userId

// compositions
const getUserOfPostNo = postNo => pipe([map(readUserOfPostNo(postNo)), andThen(getUser)])(getPosts)

const getPostBody =
    pipe([post,Ffetch.of, map(getBody)])

main()
