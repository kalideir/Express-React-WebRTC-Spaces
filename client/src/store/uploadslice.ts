import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import axios from 'axios';
import type { IUser, MediaData } from '../@types';
import { apiService } from '../services';
import { RootState } from './store';

export type UploadSliceData = {
  uploadProgress: number;
  isUploading: boolean;
};

const initialState: Partial<UploadSliceData> = {
  uploadProgress: 0,
  isUploading: false,
};

export const updateUpload = createAsyncThunk(
  'upload/updateUpload',
  async ({ data, id }: { data: Partial<IUser>; id: string }, { rejectWithValue }) => {
    try {
      const res = await apiService.patch(`/user/${id}`, data);
      return res?.data;
    } catch (error: any | AxiosError) {
      const errors = error.response?.data?.errors;
      const extra = error.response?.data?.extra;
      const message = error?.response.data.message || 'Update error';
      return rejectWithValue({ errors, message, extra });
    }
  },
);

export const getUploadUrl = createAsyncThunk('upload/getUploadUrl', async ({ contentType }: { contentType: string }, { rejectWithValue }) => {
  try {
    const res = await apiService.post(`/media/new/s3UploadUrl`, { contentType });
    return res?.data?.url;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Request error';
    return rejectWithValue({ errors, message });
  }
});

const setUploadProgress = createAction<number>('/upload/setUploadProgress');

export const upload = createAsyncThunk(
  'upload/upload',
  async ({ url, file, contentType }: { url: string; file: File; contentType: string }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(url, file, {
        headers: { ContentType: contentType },
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
  },
);

export const createMedia = createAsyncThunk('upload/createMedia', async (data: MediaData, { rejectWithValue }) => {
  try {
    const res = await apiService.post(`/media`, data);
    return res?.data.media;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Create media error';
    return rejectWithValue({ errors, message });
  }
});

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {},
  extraReducers: {
    [setUploadProgress.type]: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.uploadProgress = payload;
    },
    [upload.pending.type]: state => {
      state.isUploading = true;
    },
    [upload.fulfilled.type]: state => {
      state.isUploading = false;
    },
  },
});

export default uploadSlice.reducer;

export const selectUploadProgress = (state: RootState) => state.upload.uploadProgress;

export const selectIsUploading = (state: RootState) => state.upload.isUploading;
