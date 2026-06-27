import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '../../../store';
import { fetchTodosApi, saveTodosApi, type TodoDto } from '../api/todosApi';
import { createDefaultTodos, createTodoValue, refreshTodoValue } from '../model/todoValue';

const todosAdapter = createEntityAdapter<TodoDto>();

interface TodosState {
  filter: string;
  loadStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  saveStatus: 'idle' | 'saving' | 'succeeded' | 'failed';
  loadError: string;
  saveError: string;
  lastSavedAt: string;
}

const initialState = todosAdapter.getInitialState<TodosState>({
  filter: '',
  loadStatus: 'idle',
  saveStatus: 'idle',
  loadError: '',
  saveError: '',
  lastSavedAt: '',
});

const selectTodosState = (state: RootState) => state.todos;
const todoSelectors = todosAdapter.getSelectors(selectTodosState);

export const loadTodos = createAsyncThunk<TodoDto[], { username: string }, { rejectValue: string }>(
  'todos/loadTodos',
  async ({ username }, { rejectWithValue, signal }) => {
    try {
      const todos = await fetchTodosApi(username, signal);
      if (todos.length === 0) {
        return createDefaultTodos();
      }
      return todos;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to load todos.';
      return rejectWithValue(message);
    }
  },
);

export const saveTodos = createAsyncThunk<void, { username: string }, { state: RootState; rejectValue: string }>(
  'todos/saveTodos',
  async ({ username }, { getState, rejectWithValue, signal }) => {
    try {
      const todos = todoSelectors.selectAll(getState());
      await saveTodosApi(username, todos, signal);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to save todos.';
      return rejectWithValue(message);
    }
  },
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    addTodo: (state, action: PayloadAction<{ label: string }>) => {
      const label = action.payload.label.trim();
      if (!label) {
        return;
      }

      const normalizedId = label.toLowerCase();
      if (state.entities[normalizedId]) {
        return;
      }

      todosAdapter.addOne(state, {
        id: normalizedId,
        label,
        value: createTodoValue(label),
      });
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      todosAdapter.removeOne(state, action.payload);
    },
    tickTodoValues: (state) => {
      const todos = todosAdapter.getSelectors().selectAll(state);
      for (const todo of todos) {
        todosAdapter.updateOne(state, {
          id: todo.id,
          changes: {
            value: refreshTodoValue(todo),
          },
        });
      }
    },
    resetTodosState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.loadStatus = 'loading';
        state.loadError = '';
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.loadStatus = 'succeeded';
        todosAdapter.setAll(state, action.payload);
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loadStatus = 'failed';
        state.loadError = action.payload ?? 'Unable to load todos.';
      })
      .addCase(saveTodos.pending, (state) => {
        state.saveStatus = 'saving';
        state.saveError = '';
      })
      .addCase(saveTodos.fulfilled, (state) => {
        state.saveStatus = 'succeeded';
        state.lastSavedAt = new Date().toISOString();
      })
      .addCase(saveTodos.rejected, (state, action) => {
        state.saveStatus = 'failed';
        state.saveError = action.payload ?? 'Unable to save todos.';
      });
  },
});

export const { addTodo, setFilter, deleteTodo, tickTodoValues, resetTodosState } = todosSlice.actions;

export const selectAllTodos = todoSelectors.selectAll;
export const selectTodosFilter = (state: RootState) => state.todos.filter;
export const selectTodosLoadStatus = (state: RootState) => state.todos.loadStatus;
export const selectTodosSaveStatus = (state: RootState) => state.todos.saveStatus;
export const selectTodosLoadError = (state: RootState) => state.todos.loadError;
export const selectTodosSaveError = (state: RootState) => state.todos.saveError;
export const selectTodosLastSavedAt = (state: RootState) => state.todos.lastSavedAt;

export const selectVisibleTodos = createSelector(
  [selectAllTodos, selectTodosFilter],
  (todos, filter) => {
    if (!filter) {
      return todos;
    }

    const normalizedFilter = filter.toLowerCase();
    return todos.filter((todo) => todo.label.toLowerCase().includes(normalizedFilter));
  },
);
