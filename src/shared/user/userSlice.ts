import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  username: string;
  isLoggedIn: boolean;
  isAttemptingToLogIn: boolean;
  loginError: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: () => {
    return {
      username: 'iNiT',
      isLoggedIn: false,
      isAttemptingToLogIn: false,
      loginError: 'test error!',
    }
  },
  reducers: {
    setUsername: (state: any, action: PayloadAction<UserData>) => {
      return {
        ...state,
        username: action.payload,
      };
    },
  },
})

export const selectUsername = (state: { user: UserData }) =>
  state.user.username;

// @bgk the selectors for selectUsername need to all have shouldCapitalize arg
const selectShouldCapitalize = (_state: { user: UserData }, shouldCapitalize: boolean) =>
  shouldCapitalize;

export const selectFormattedUsername = createSelector(
  [selectUsername, selectShouldCapitalize],
  (username, shouldCapitalize) =>
    shouldCapitalize ? username.toUpperCase() : username.toLowerCase(),
);

export const selectUserIsLoggedIn = (state: { user: UserData }) =>
  state.user.isLoggedIn;

export const selectUserIsAttemptingToLogIn = (state: { user: UserData }) =>
  state.user.isAttemptingToLogIn;

export const selectUserLoginError = (state: { user: UserData }) =>
  state.user.loginError;
