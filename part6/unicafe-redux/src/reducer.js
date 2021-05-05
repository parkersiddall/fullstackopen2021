const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':

      const adjustedStateGood = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad
      }

      return adjustedStateGood
    case 'OK':
      const adjustedStateOk = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad
      }

      return adjustedStateOk
    case 'BAD':
      const adjustedStateBad = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1
      }

      return adjustedStateBad
    case 'ZERO':

      const adjustedStateReset = {
        good: initialState.good,
        ok: initialState.ok,
        bad: initialState.bad
      }

      return adjustedStateReset
    default: return state
  }
  
}

export default counterReducer