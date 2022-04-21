import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IUser, RegisterData } from '../@types';

type InitialStateType = {
  email: string;
  isAuthenticated: boolean;
  user: Partial<IUser>;
};

const initialState: Partial<InitialStateType> = {};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, { payload: { user } }: PayloadAction<{ user: IUser }>) => {
      state.user = user;
      state.isAuthenticated = true;
    },
  },
  extraReducers: {
    // [registerUser.fulfilled]: () => {},
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
