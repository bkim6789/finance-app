import { useState } from 'react';

export const BasicTodos = ({todos = [] as any, deleteTodo = (id: string) => {}}) => {

  return (
    <div>
      <ul>
        {
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.label}, {todo.value}
              <button onClick={() => deleteTodo(todo.id)}>X</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};