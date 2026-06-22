// local component state 
import { useReducer } from 'react'
import CounterInput from './CounterInput'
import { initialState, countReducer } from '../utils/countReducer'

function CounterLocalState() {
  const [state, dispatch] = useReducer(countReducer, initialState)
  const count = state.count

  function handleCountUpdate(nextCount: number) {
    dispatch({ type: 'set', payload: nextCount })
  }

  return (
    <div>
      <CounterInput count={count} onUpdate={handleCountUpdate} />
    </div>
  )
}

export default CounterLocalState