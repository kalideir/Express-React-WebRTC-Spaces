import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IUser } from '../@types';
import { RootState } from './store';

export type AuthSliceData = {
  email: string;
  isAuthenticated: boolean;
  user: null | Partial<IUser>;
};

const initialState: Partial<AuthSliceData> = {
  user: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, { payload: { user } }: PayloadAction<{ user: null | IUser }>) => {
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

export const selectCurrentUser = (state: RootState) => state.auth?.user;
