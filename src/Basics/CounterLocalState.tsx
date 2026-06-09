// local component state 
import { useState } from 'react'
import CounterInput from './CounterInput'

function CounterLocalState() {
  const [count, setCount] = useState(0)

  function handleCountUpdate(nextCount: number) {
    setCount(nextCount)
  }

  function increment() {
    setCount((c) => c + 1)
  }

  function decrement() {
    setCount((c) => c - 1)
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <CounterInput count={count} onUpdate={handleCountUpdate} />
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

export default CounterLocalState