import { useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import { useTodos } from '../../context/TodosContext';
import { MainContentView } from './main-content-view';

export const MainContent = () => {
  const { userData } = useUser();
  const {
    visibleTodos,
    todos: allTodos,
    filter,
    loadStatus,
    saveStatus,
    loadError,
    saveError,
    lastSavedAt,
    setFilter,
    addTodo,
    deleteTodo,
    loadTodos,
    saveTodos,
  } = useTodos();

  const isLoggedIn = userData.isLoggedIn;
  const username = userData.username;

  useEffect(() => {
    if (!isLoggedIn || !username) {
      return;
    }

    void loadTodos(username);
  }, [isLoggedIn, username, loadTodos]);

  const handleSave = () => {
    if (!username) {
      return;
    }

    void saveTodos(username);
  };

  return (
    <MainContentView
      isLoggedIn={isLoggedIn}
      username={username}
      todos={visibleTodos}
      existingTodoIds={allTodos.map((todo) => todo.id)}
      filter={filter}
      loadStatus={loadStatus}
      saveStatus={saveStatus}
      loadError={loadError}
      saveError={saveError}
      lastSavedAt={lastSavedAt}
      onFilterChange={setFilter}
      onAddTodo={addTodo}
      onSave={handleSave}
      onDeleteTodo={deleteTodo}
    />
  );
};
