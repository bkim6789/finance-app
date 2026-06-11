import { useState } from 'react';

export const Computed = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  const total = a + b;

  const incrementA = () => {
    setA(a => a + 1);
  };

  const incrementB = () => {
    setB(b => b + 1);
  };

  return (
    <div>
      <div>
        a - {a}, b - {b}, total - {total}
      </div>
      <div>
        <button onClick={incrementA}>a++</button>
        <button onClick={incrementB}>b++</button>
      </div>
    </div>
  );
};