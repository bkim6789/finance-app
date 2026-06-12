import { useState } from 'react';
import { BasicOptions } from './BasicOptions';

export const BasicApp = () => {
  const [filterStr, setFilterStr] = useState('');
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const openOptions = () => {
    setIsOptionsOpen(true);
  };

  const saveOptions = (options) => {
    console.warn('@bgk save:', options);
    setFilterStr(options.filterStr);
    setIsOptionsOpen(false);
  };

  const cancelOptions = () => {
    console.warn('@bgk cancel');
    setIsOptionsOpen(false);
  };

  return (
    <div>
      <h3>basic app</h3>
      <p>
        filter: {filterStr}, isOptionsOpen: {isOptionsOpen}
      </p>
      <div>
        <button onClick={openOptions}>options</button>
      </div>
      {isOptionsOpen &&
        <BasicOptions 
          filterStr={filterStr}
          save={saveOptions}
          cancel={cancelOptions}
        />
      }
    </div>
  );
};