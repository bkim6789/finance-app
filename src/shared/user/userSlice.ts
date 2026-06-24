import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
      username: 'init',
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
