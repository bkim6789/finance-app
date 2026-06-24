import { useReducer } from 'react'
import { initialState, countReducer } from '../../utils/countReducer'

function CountDisplay() {
  const [state] = useReducer(countReducer, initialState)

  return (
    <div>
      <p>Count display: {state.count}</p>
    </div>
  )
}

export default CountDisplay
