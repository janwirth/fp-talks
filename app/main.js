import { h, app } from "hyperapp"
import S from "sanctuary"
import $ from "sanctuary-def"

// we count from 0

// initState :: FiniteNumber
const initState = 0

// pipeable "identity" log reader
// log :: a -> a
const log = d => {console.log(d); return d}


// parseState :: Nullable String -> Maybe FiniteNumber
const parseState = str =>
    {
        try {return S.Just(JSON.parse(str))}
        catch (e) {return S.Nothing}
    }

// loadState :: Nullable String -> FiniteNumber
const loadState =
    S.pipe([
        log
      , parseState
      , S.fromMaybe(initState)
    ])

const init =
    loadState(localStorage.state)


// persist :: FiniteNumber -> FiniteNumber
const persist = state => {
    localStorage.state = JSON.stringify(state)
    return state
}

const eventToPair = (state, event) => S.Pair(state)(event)

// update :: FiniteNumber -> FiniteNumber
const update = transformation =>
    S.unchecked.pipe([
        eventToPair
      , S.mapFst(S.pipe([transformation, persist]))
      , transformation
      , persist
    ])

const Decrement =
      update(S.sub(1))

const Increment =
      update(S.add(1))


const node = document.body

const view = state =>
    h("div", {}, [
      h("h1", {}, state),
      h("button", { onClick: Decrement }, "-"),
      h("button", { onClick: Increment }, "+")
    ])

app({
  init,
  view ,
  node: document.body
})
