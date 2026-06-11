import { useState, useEffect } from 'react';
import testItems from './test-items';
import {Computed} from './Computed';

interface IUser {
  username: string;
  password: string;
};

interface ITodoItem {
  id: string;
  label: string;
  value: number;
};

export const TodoApp = () => {
  const initialUser = {username: 'bgkim', password: 'password'};
  const [user, setUser] = useState<IUser>(initialUser);
  const [todoItems, setTodoItems] = useState<ITodoItem[]>(testItems);

  const setRandomUser = () => {
    const randomShortString = Math.random().toString(36).substring(2);
    setUser((user) => {
      return {
        ...user,
        username: randomShortString,
      };
    });
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <h2>my todo app</h2>
      <div>
        user: {user?.username} - password: {user?.password}
      </div>
      <div>
        <button onClick={setRandomUser}>update user</button>
      </div>
      <div>
        <Computed />
      </div>
    </div>
  );
};

