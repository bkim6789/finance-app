import { useState, useEffect } from 'react';

export const BasicOptions = ({filterStr, save, cancel}) => {
  const [optionFilterStr, setOptionFilterStr] = useState(filterStr);

  const handleFilterChange = (event) => {
    setOptionFilterStr(event.target.value);
  };

  const onSave = () => {
    save({
      filterStr: optionFilterStr,
    });
  };

  return (
    <div>
      <h3>options</h3>
      <div>
        <label>filter:</label>
        <input
          type="text"
          value={optionFilterStr}
          onChange={handleFilterChange}
        >
        </input>
      </div>
      <div>
        <button onClick={onSave}>save</button>
        <button onClick={cancel}>cancel</button>
      </div>
    </div>
  );
};