import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  addTodo,
  deleteTodo,
  loadTodos,
  saveTodos,
  selectAllTodos,
  selectTodosFilter,
  selectTodosLastSavedAt,
  selectTodosLoadError,
  selectTodosLoadStatus,
  selectTodosSaveError,
  selectTodosSaveStatus,
  selectVisibleTodos,
  setFilter,
  tickTodoValues,
} from '../../features/todos/state/todosSlice';
import { selectUserIsLoggedIn, selectUsername } from '../../shared/user/userSlice';
import { MainContentView } from './main-content-view';

export const MainContent = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectUserIsLoggedIn);
  const username = useAppSelector(selectUsername);
  const todos = useAppSelector(selectVisibleTodos);
  const allTodos = useAppSelector(selectAllTodos);
  const filter = useAppSelector(selectTodosFilter);
  const loadStatus = useAppSelector(selectTodosLoadStatus);
  const saveStatus = useAppSelector(selectTodosSaveStatus);
  const loadError = useAppSelector(selectTodosLoadError);
  const saveError = useAppSelector(selectTodosSaveError);
  const lastSavedAt = useAppSelector(selectTodosLastSavedAt);

  useEffect(() => {
    if (!isLoggedIn || !username) {
      return;
    }

    dispatch(loadTodos({ username }));
  }, [dispatch, isLoggedIn, username]);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const intervalId = window.setInterval(() => {
      dispatch(tickTodoValues());
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [dispatch, isLoggedIn]);

  const handleSave = () => {
    if (!username) {
      return;
    }

    dispatch(saveTodos({ username }));
  };

  return (
    <MainContentView
      isLoggedIn={isLoggedIn}
      username={username}
      todos={todos}
      existingTodoIds={allTodos.map((todo) => todo.id)}
      filter={filter}
      loadStatus={loadStatus}
      saveStatus={saveStatus}
      loadError={loadError}
      saveError={saveError}
      lastSavedAt={lastSavedAt}
      onFilterChange={(value) => dispatch(setFilter(value))}
      onAddTodo={(label) => dispatch(addTodo({ label }))}
      onSave={handleSave}
      onDeleteTodo={(id) => dispatch(deleteTodo(id))}
    />
  );
};
