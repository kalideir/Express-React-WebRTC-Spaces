import { createAction, createAsyncThunk, createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { ISpace, IUser } from '../@types';
import { apiService } from '../services';
import { RootState } from './store';

export type ProfileSliceData = {
  spaces: ISpace[];
  uploadProgress: number;
};

const initialState: Partial<ProfileSliceData> = {
  spaces: [],
  uploadProgress: 0,
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

const setUploadProgress = createAction<number>('/profile/setUploadProgress');

export const upload = createAsyncThunk('profile/upload', async (formData: FormData, { rejectWithValue, dispatch }) => {
  formData.forEach(entries => console.log(entries));
  try {
    const res = await apiService({
      url: '/media/',
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
      onUploadProgress: async (event: any) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        await dispatch(setUploadProgress(percent));
        if (percent === 100) {
          setTimeout(async () => {
            await dispatch(setUploadProgress(0));
          }, 1000);
        }
      },
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
    [setUploadProgress.type]: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.uploadProgress = payload;
    },
  },
});

export default profileSlice.reducer;

export const selectMySpaces = (state: RootState) => state.profile.spaces;

export const selectUploadProgress = (state: RootState) => state.profile.uploadProgress;
