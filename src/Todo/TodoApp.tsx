import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import testItems from './test-items';
import {Computed} from './Computed';
import { setUser, updateUser } from './Store/userSlice';
import { increment, decrement, incrementByAmount, selectDoubleCounter } from './Store/counterSlice';
import { RootState } from './Store/store';

interface ITodoItem {
  id: string;
  label: string;
  value: number;
};

export const TodoApp = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const counter = useSelector((state: RootState) => state.counter.value);
  const doubleCounter = useSelector(selectDoubleCounter);
  const [todoItems, setTodoItems] = useState<ITodoItem[]>(testItems);

  // Initialize user on mount
  useEffect(() => {
    dispatch(setUser({
      id: '1',
      name: 'bgkim',
      email: 'bgkim@example.com',
    }));
  }, [dispatch]);

  const setRandomUser = () => {
    const randomShortString = Math.random().toString(36).substring(2);
    if (currentUser) {
      dispatch(updateUser({ name: randomShortString }));
    }
  };

  const nums = [1,2,3];

  return (
    <div>
      <h2>my todo app</h2>
      <div>
        list of nums
        <ul>
          {
            nums.map((num) => 
              <li>num: {num}</li>
            )
          }
        </ul>
      </div>
      <div>
        user: {currentUser?.name} - email: {currentUser?.email}
      </div>
      <div>
        <button onClick={setRandomUser}>update user</button>
      </div>
      <div>
        <h3>Counter: {counter}</h3>
        <h3>Double Counter: {doubleCounter}</h3>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
      </div>
      <div>
        <Computed />
      </div>
    </div>
  );
};

