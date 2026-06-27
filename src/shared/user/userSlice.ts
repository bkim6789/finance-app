import {
  createAsyncThunk,
  createSelector,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { loginApi, type LoginRequest } from '../../features/auth/api/authApi'

export interface UserData {
  username: string;
  isLoggedIn: boolean;
  authStatus: 'idle' | 'pending' | 'authenticated' | 'failed';
  loginError: string;
}

export const loginUser = createAsyncThunk<
  { username: string },
  LoginRequest,
  { rejectValue: string }
>('user/loginUser', async (credentials, { rejectWithValue, signal }) => {
  try {
    const response = await loginApi(credentials, signal);
    return { username: response.username };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Login failed.';
    return rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState: (): UserData => ({
    username: '',
    isLoggedIn: false,
    authStatus: 'idle',
    loginError: '',
  }),
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    clearLoginError: (state) => {
      state.loginError = '';
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.authStatus = 'idle';
      state.loginError = '';
      state.username = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.authStatus = 'pending';
        state.loginError = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.authStatus = 'authenticated';
        state.isLoggedIn = true;
        state.username = action.payload.username;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authStatus = 'failed';
        state.isLoggedIn = false;
        state.loginError = action.payload ?? 'Login failed.';
      });
  },
})

export const { setUsername, clearLoginError, logoutUser } = userSlice.actions;

export const selectUsername = (state: RootState) =>
  state.user.username;

const selectShouldCapitalize = (_state: RootState, shouldCapitalize: boolean) =>
  shouldCapitalize;

export const selectFormattedUsername = createSelector(
  [selectUsername, selectShouldCapitalize],
  (username, shouldCapitalize) =>
    shouldCapitalize ? username.toUpperCase() : username.toLowerCase(),
);

export const selectUserIsLoggedIn = (state: RootState) =>
  state.user.isLoggedIn;

export const selectUserIsAttemptingToLogIn = (state: RootState) =>
  state.user.authStatus === 'pending';

export const selectUserLoginError = (state: RootState) =>
  state.user.loginError;
