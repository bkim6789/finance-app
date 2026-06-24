import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  id: string
  name: string
  email: string
  age?: number
}

export interface UserState {
  currentUser: UserData | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.currentUser = action.payload
      state.error = null
    },
    updateUser: (state, action: PayloadAction<Partial<UserData>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload }
      }
    },
    clearUser: (state) => {
      state.currentUser = null
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const { setUser, updateUser, clearUser, setLoading, setError } = userSlice.actions
export default userSlice.reducer
