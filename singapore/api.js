import {Ffetch} from './Ffetch.js'
import {pipe} from './util.js'
import {map, andThen} from './containers.js'

export const post = id => `https://jsonplaceholder.typicode.com/posts/${id}`
export const posts = 'https://jsonplaceholder.typicode.com/posts'
export const user = id => `https://jsonplaceholder.typicode.com/users/${id}`

// EXAMPLES
// console.log(await getUserOfPostNo(1).dispatch())
// console.log(await getUser(5).dispatch())
// console.log(await getPosts.dispatch().then(x => console.log(x)))
// console.log(await getPost(1).dispatch())
// console.log(await getPostBody(1).dispatch())

// BASE API Calls
export const getPost = id => Ffetch.of(post(id))
export const getPosts = Ffetch.of(posts)
export const getUser = pipe([user, Ffetch.of])

// getters
const getBody = ({body}) => body
const readUserOfPostNo = postNo => posts => posts[postNo].userId

// compositions
export const getUserOfPostNo = postNo => pipe([map(readUserOfPostNo(postNo)), andThen(getUser)])(getPosts)

const getPostBody =
    pipe([post,Ffetch.of, map(getBody)])
