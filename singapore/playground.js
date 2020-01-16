import {filter, isEven} from './counters.js'
import {pipe} from './util.js'
import {map, andThen} from './containers.js'
import {getUserOfPostNo} from './api.js'

import fetch from 'isomorphic-fetch'


const inspect = label => val => {console.log(label, val); return val}


class Maybe {
    constructor(val) {
        if (val === undefined) {
            this.type = 'Nothing'
        } else {
            this.type = 'Just'
            this.val = val
        }
    }
    static of(val) {
        return new Maybe(val)
    }
    map(fn) {
        if (this.type == 'Nothing') {
            return this
        } else {
            return Maybe.of(fn(this.val))
        }
    }
    andThen(fn) {
        if (this.type == 'Nothing') {
            return this
        } else {
            return fn(this.val)
        }
    }
}

const maybeTwo = Maybe.of(2)

async function main() {
    const Nothing = Maybe.of(undefined)
    // console.log(Nothing.andThen(x => Maybe.of(undefined)))
    // console.log(firstElementInFirstArray([]))
    console.log(firstElementInFirstArray([[1]]))

}

const head = arr => Maybe.of(arr[0])
const getUserId = ({userId}) => userId

const firstElementInFirstArray = pipe([head, inspect('firstHead'), andThen(head), inspect('secondHead')])



const data = [1,2,3,4,5,6,7]



const double = x => x * 2 

const not = val => !val

const myPipeline =
    pipe([
        filter(pipe([isEven, not])),
        map(double)
    ])

main()