import { h, app } from "hyperapp"
import S from "sanctuary"
import $ from "sanctuary-def"

// we count from 0

const StateType = $.FiniteNumber
// initState :: FiniteNumber
const initState = 0

// pipeable "identity" log reader
// log :: a -> a
const log = d => {console.log(d); return d}

// parseState :: Nullable String -> Maybe StateType
const parseState = str =>
    {
        try {return S.Just(JSON.parse(str))}
        catch (e) {return S.Nothing}
    }

// loadState :: Nullable String -> StateType
const loadState =
    S.pipe([
        log
      , parseState
      , S.mapMaybe(parsed => S.is (StateType) ? S.Just (parsed) : S.Nothing)
      , S.fromMaybe(initState)
    ])

const init =
    loadState(localStorage.state)


// persist :: StateType -> StateType
const persist = state => {
    localStorage.state = JSON.stringify(state)
    return state
}

const eventToPair = (state, event) => S.Pair(state)(event)

// update :: StateType -> StateType
const update = transformation =>
    S.unchecked.pipe([
        eventToPair
      , S.fst
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
