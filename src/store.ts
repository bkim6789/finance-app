import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './shared/user/userSlice'
import { todosSlice } from './features/todos/state/todosSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
