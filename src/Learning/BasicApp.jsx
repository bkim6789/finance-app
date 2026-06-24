import { useState, useEffect } from 'react';
import { BasicOptions } from './BasicOptions';
import { BasicTodos } from './BasicTodos';
import { Interview } from './Interview';
import { subscribeData } from '../../utils/subscribeData';
import CounterLocalState from './CounterLocalState';
import CountDisplay from './CountDisplay';
import { MyGrid, initialColumns, initialRows } from './MyGrid';

export const BasicApp = () => {
  const initialTodos = [
    {id: 'clean', label: 'clean', value: 0},
    {id: 'study', label: 'study', value: 1},
    {id: 'lift', label: 'lift', value: 2},
  ];
  const [todos, setTodos] = useState(initialTodos);
  const handleDeleteTodo = (id) => {
    //@todo do i need callback for set state here?
    setTodos((todos) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      return updatedTodos;
    });
  };

  //filtering
  const [filterStr, setFilterStr] = useState('');
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const filteredTodos = todos.filter(todo => !filterStr || todo.label.includes(filterStr));

  //subscription
  const [idToValue, setIdToValue] = useState({});
  useEffect(() => {
    const ids = todos.map(todo => todo.id);
    const cancel = subscribeData({
      ids,
      onMessage: idToValue => {
        setIdToValue(idToValue);
      },
    });

    return cancel;
  }, [todos]);

  const displayTodos = filteredTodos.map(todo => {
    todo.value = idToValue[todo.id];
    return todo;
  });

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

  const options = (
    isOptionsOpen &&
      <BasicOptions 
        filterStr={filterStr}
        save={saveOptions}
        cancel={cancelOptions}
      />
  );

  //grid 
  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);

  return (
    <div>
      <h3>basic app</h3>
      <MyGrid columns={columns} rows={rows} />
      {/* <CountDisplay />
      <CounterLocalState /> */}
      {/* <Interview />
      <p>
        filter: {filterStr}, isOptionsOpen: {isOptionsOpen}
      </p>
      <div>
        <button onClick={openOptions}>options</button>
      </div>
      <BasicTodos 
        todos={displayTodos}
        deleteTodo={handleDeleteTodo}
      />
      {options} */}
    </div>
  );
};