import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { fetchTodosApi, saveTodosApi, type TodoDto } from '../features/todos/api/todosApi';
import { createDefaultTodos, createTodoValue, refreshTodoValue } from '../features/todos/model/todoValue';
import { createThrottle } from '../utils/throttle';

export interface TodosContextType {
  todos: TodoDto[];
  filter: string;
  loadStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  saveStatus: 'idle' | 'saving' | 'succeeded' | 'failed';
  loadError: string;
  saveError: string;
  lastSavedAt: string;
  visibleTodos: TodoDto[];
  setFilter: (filter: string) => void;
  addTodo: (label: string) => void;
  deleteTodo: (id: string) => void;
  loadTodos: (username: string) => Promise<void>;
  saveTodos: (username: string) => Promise<void>;
  resetTodos: () => void;
  getCommittedTodos: () => TodoDto[];
}

const TodosContext = createContext<TodosContextType | undefined>(undefined);

interface TodoValueState {
  displayValue: number;
  committedValue: number;
}

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<TodoDto[]>([]);
  const [filter, setFilter] = useState('');
  const [loadStatus, setLoadStatus] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'succeeded' | 'failed'>('idle');
  const [loadError, setLoadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [lastSavedAt, setLastSavedAt] = useState('');

  const todoValuesRef = useRef<Map<string, TodoValueState>>(new Map());
  const throttleCommitRef = useRef(createThrottle(5000));

  const visibleTodos = filter
    ? todos.filter((todo) => todo.label.toLowerCase().includes(filter.toLowerCase()))
    : todos;

  const handleAddTodo = useCallback(
    (label: string) => {
      const trimmedLabel = label.trim();
      if (!trimmedLabel) {
        return;
      }

      const normalizedId = trimmedLabel.toLowerCase();
      if (todos.some((todo) => todo.id === normalizedId)) {
        return;
      }

      const initialValue = createTodoValue(trimmedLabel);
      const newTodo: TodoDto = {
        id: normalizedId,
        label: trimmedLabel,
        value: initialValue,
      };

      todoValuesRef.current.set(normalizedId, {
        displayValue: initialValue,
        committedValue: initialValue,
      });

      setTodos((prev) => [...prev, newTodo]);
    },
    [todos]
  );

  const handleDeleteTodo = useCallback((id: string) => {
    todoValuesRef.current.delete(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const handleLoadTodos = useCallback(async (username: string) => {
    setLoadStatus('loading');
    setLoadError('');

    try {
      const loadedTodos = await fetchTodosApi(username);
      const todosToSet = loadedTodos.length === 0 ? createDefaultTodos() : loadedTodos;

      todoValuesRef.current.clear();
      for (const todo of todosToSet) {
        todoValuesRef.current.set(todo.id, {
          displayValue: todo.value,
          committedValue: todo.value,
        });
      }

      setTodos(todosToSet);
      setLoadStatus('succeeded');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load todos.';
      setLoadError(message);
      setLoadStatus('failed');
      throw error;
    }
  }, []);

  const handleSaveTodos = useCallback(
    async (username: string) => {
      setSaveStatus('saving');
      setSaveError('');

      try {
        const todosToSave = todos.map((todo) => ({
          ...todo,
          value: todoValuesRef.current.get(todo.id)?.committedValue ?? todo.value,
        }));

        await saveTodosApi(username, todosToSave);
        setSaveStatus('succeeded');
        setLastSavedAt(new Date().toISOString());
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to save todos.';
        setSaveError(message);
        setSaveStatus('failed');
        throw error;
      }
    },
    [todos]
  );

  const handleResetTodos = useCallback(() => {
    setTodos([]);
    setFilter('');
    setLoadStatus('idle');
    setSaveStatus('idle');
    setLoadError('');
    setSaveError('');
    setLastSavedAt('');
    todoValuesRef.current.clear();
  }, []);

  const getCommittedTodos = useCallback(() => {
    return todos.map((todo) => ({
      ...todo,
      value: todoValuesRef.current.get(todo.id)?.committedValue ?? todo.value,
    }));
  }, [todos]);

  useEffect(() => {
    const displayIntervalId = window.setInterval(() => {
      setTodos((prev) =>
        prev.map((todo) => {
          const newDisplayValue = refreshTodoValue(todo);
          const valueState = todoValuesRef.current.get(todo.id);

          if (valueState) {
            valueState.displayValue = newDisplayValue;
          } else {
            todoValuesRef.current.set(todo.id, {
              displayValue: newDisplayValue,
              committedValue: todo.value,
            });
          }

          return {
            ...todo,
            value: newDisplayValue,
          };
        })
      );
    }, 2000);

    return () => {
      window.clearInterval(displayIntervalId);
    };
  }, []);

  useEffect(() => {
    const commitInterval = window.setInterval(() => {
      throttleCommitRef.current(() => {
        for (const [, valueState] of todoValuesRef.current.entries()) {
          valueState.committedValue = valueState.displayValue;
        }
      });
    }, 2000);

    return () => {
      window.clearInterval(commitInterval);
    };
  }, []);

  const value: TodosContextType = {
    todos,
    filter,
    loadStatus,
    saveStatus,
    loadError,
    saveError,
    lastSavedAt,
    visibleTodos,
    setFilter,
    addTodo: handleAddTodo,
    deleteTodo: handleDeleteTodo,
    loadTodos: handleLoadTodos,
    saveTodos: handleSaveTodos,
    resetTodos: handleResetTodos,
    getCommittedTodos,
  };

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error('useTodos must be used within TodosProvider');
  }
  return context;
};

