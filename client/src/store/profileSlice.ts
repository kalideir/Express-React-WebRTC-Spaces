import { createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { ISpace, IUser } from '../@types';
import { apiService } from '../services';
import { RootState } from './store';

export type ProfileSliceData = {
  spaces: ISpace[];
};

const initialState: Partial<ProfileSliceData> = {
  spaces: [],
};

export const updateProfile = createAsyncThunk('profile/updateProfile', async (data: Partial<IUser>, { rejectWithValue }) => {
  try {
    const res = await apiService.patch('/user/', data);
    return res?.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const extra = error.response?.data?.extra;
    const message = error?.response.data.message || 'Login error';
    return rejectWithValue({ errors, message, extra });
  }
});

export const upload = createAsyncThunk('profile/upload', async (formData: FormData, { rejectWithValue }) => {
  try {
    const res = await apiService({
      url: '/media/',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    });
    return res.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Upload error';
    return rejectWithValue({ errors, message });
  }
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: {
    // [upload.fulfilled.type]: (state, action: PayloadAction) => {
    // }
  },
});

export default profileSlice.reducer;

export const selectMySpaces = (state: RootState) => state.profile.spaces;
