type CounterInputProps = {
  count: number
  onUpdate: (nextCount: number) => void
}

function CounterInput({ count, onUpdate }: CounterInputProps) {
  function increment() {
    onUpdate(count + 1)
  }

  function decrement() {
    onUpdate(count - 1)
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  )
}

export default CounterInput