import { useState } from 'react';
import { BasicOptions } from './BasicOptions';
import { BasicTodos } from './BasicTodos';

export const BasicApp = () => {
  const initialTodos = [
    {id: 'clean', label: 'CLEAN'},
    {id: 'study', label: 'STUDY'},
    {id: 'lift', label: 'LIFT'},
  ];
  const [todos, setTodos] = useState(initialTodos);
  const handleDeleteTodo = (id) => {
    //@todo do i need callback for set state here?
    setTodos((todos) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);
      return updatedTodos;
    });
  };

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

  const options = (
    isOptionsOpen &&
      <BasicOptions 
        filterStr={filterStr}
        save={saveOptions}
        cancel={cancelOptions}
      />
  );

  return (
    <div>
      <h3>basic app</h3>
      <p>
        filter: {filterStr}, isOptionsOpen: {isOptionsOpen}
      </p>
      <div>
        <button onClick={openOptions}>options</button>
      </div>
      <BasicTodos 
        todos={todos}
        deleteTodo={handleDeleteTodo}
      />
      {options}
    </div>
  );
};