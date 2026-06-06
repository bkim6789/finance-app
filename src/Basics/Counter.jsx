// local component state 
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(c => c + 1);
  }

  function decrement() {
    setCount(c => c - 1);   
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

export default Counter;