import { useState } from 'react';

interface ICounterInputProps {
  count: number;
  onUpdate: (count: number) => void;
};

export const InputTest = ({
  count,
  onUpdate
}: ICounterInputProps) => {

const increment = () => {
  onUpdate(count + 1);
}

const decrement = () => {
  onUpdate(count -1);
}

return (
  <div>
    <h2>counter: {count}</h2>
    <button onClick={increment}>z++</button>
    <button onClick={decrement}>-</button>
  </div>
)
}