import { useState } from 'react';
import type { TodoDto } from '../../features/todos/api/todosApi';

interface MainContentViewProps {
  isLoggedIn: boolean;
  username: string;
  todos: TodoDto[];
  existingTodoIds: string[];
  filter: string;
  loadStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  saveStatus: 'idle' | 'saving' | 'succeeded' | 'failed';
  loadError: string;
  saveError: string;
  lastSavedAt: string;
  onAddTodo: (label: string) => void;
  onFilterChange: (value: string) => void;
  onSave: () => void;
  onDeleteTodo: (id: string) => void;
}

const getStatusMessage = (
  loadStatus: MainContentViewProps['loadStatus'],
  saveStatus: MainContentViewProps['saveStatus'],
): string => {
  if (loadStatus === 'loading') {
    return 'Loading todos...';
  }

  if (saveStatus === 'saving') {
    return 'Saving todos...';
  }

  if (saveStatus === 'succeeded') {
    return 'Todos saved.';
  }

  if (loadStatus === 'succeeded') {
    return 'Todos loaded.';
  }

  return 'Ready.';
};

export const MainContentView = ({
  isLoggedIn,
  username,
  todos,
  existingTodoIds,
  filter,
  loadStatus,
  saveStatus,
  loadError,
  saveError,
  lastSavedAt,
  onAddTodo,
  onFilterChange,
  onSave,
  onDeleteTodo,
}: MainContentViewProps) => {
  const [newTodoLabel, setNewTodoLabel] = useState('');
  const normalizedExistingIds = new Set(existingTodoIds.map((id) => id.toLowerCase()));
  const normalizedNewTodoId = newTodoLabel.trim().toLowerCase();
  const addError = !newTodoLabel.trim()
    ? 'Enter a todo label.'
    : normalizedExistingIds.has(normalizedNewTodoId)
      ? 'A todo with that label already exists.'
      : '';
  const canAddTodo = !addError;

  if (!isLoggedIn) {
    return (
      <section aria-labelledby="todos-heading">
        <h2 id="todos-heading">Todos</h2>
        <p role="status" aria-live="polite">
          Please log in to manage your todos.
        </p>
      </section>
    );
  }

  const isBusy = loadStatus === 'loading' || saveStatus === 'saving';
  const saveDisabled = isBusy || !username || todos.length === 0;
  const statusMessage = getStatusMessage(loadStatus, saveStatus);
  const canAddTodoWhenReady = !isBusy && canAddTodo;

  const handleAddTodo = () => {
    if (!canAddTodoWhenReady) {
      return;
    }

    onAddTodo(newTodoLabel);
    setNewTodoLabel('');
  };

  return (
    <section aria-labelledby="todos-heading" aria-busy={isBusy}>
      <h2 id="todos-heading">Todos</h2>

      <p role="status" aria-live="polite">
        {statusMessage}
      </p>

      <div>
        <label htmlFor="todos-add-input">Add todo</label>
        <input
          id="todos-add-input"
          type="text"
          value={newTodoLabel}
          onChange={(event) => setNewTodoLabel(event.target.value)}
          disabled={isBusy}
          placeholder="Enter new todo label"
          aria-describedby="todos-add-help todos-add-error"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleAddTodo();
            }
          }}
        />
        <button type="button" onClick={handleAddTodo} disabled={!canAddTodoWhenReady}>
          Add Todo
        </button>
        <p id="todos-add-help">Use unique labels to avoid duplicate todo ids.</p>
        {addError && (
          <p id="todos-add-error" role="alert">
            {addError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="todos-filter-input">Filter todos</label>
        <input
          id="todos-filter-input"
          type="text"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
          disabled={loadStatus === 'loading'}
          placeholder="Type to filter by label"
        />
        <button type="button" onClick={onSave} disabled={saveDisabled}>
          {saveStatus === 'saving' ? 'Saving...' : 'Save Todos'}
        </button>
      </div>

      {lastSavedAt && (
        <p>
          Last saved at: {new Date(lastSavedAt).toLocaleTimeString()}
        </p>
      )}

      {loadError && (
        <p role="alert">
          Load error: {loadError}
        </p>
      )}
      {saveError && (
        <p role="alert">
          Save error: {saveError}
        </p>
      )}

      {todos.length === 0 ? (
        <p role="status" aria-live="polite">
          No todos to display.
        </p>
      ) : (
        <ul aria-label="Todo items">
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.label}: {todo.value}</span>{' '}
              <button
                type="button"
                onClick={() => onDeleteTodo(todo.id)}
                disabled={isBusy}
                aria-label={`Delete ${todo.label}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
