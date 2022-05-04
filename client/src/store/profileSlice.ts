import { createAction, createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { ISpace, IUser, SpaceItem } from '../@types';
import { apiService } from '../services';
import { RootState } from './store';

export type ProfileSliceData = {
  spaces: SpaceItem[];
};

const initialState: Partial<ProfileSliceData> = {
  spaces: [],
};

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async ({ data, id }: { data: Partial<IUser>; id: string }, { rejectWithValue }) => {
    try {
      const res = await apiService.patch(`/user/${id}`, data);
      return res?.data;
    } catch (error: any | AxiosError) {
      const errors = error.response?.data?.errors;
      const extra = error.response?.data?.extra;
      const message = error?.response.data.message || 'Login error';
      return rejectWithValue({ errors, message, extra });
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default profileSlice.reducer;
