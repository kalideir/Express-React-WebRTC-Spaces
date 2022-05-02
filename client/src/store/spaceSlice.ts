import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { Error, ErrorPayload, ISpace, SpaceData } from '../@types';
import { apiService } from '../services';

export type SpaceSliceData = {
  permissionFulfilled: boolean;
  permissionModalVisible: boolean;
  spaces: ISpace[];
  createSpaceErrors: unknown;
};

const initialState: SpaceSliceData = {
  permissionFulfilled: false,
  permissionModalVisible: false,
  spaces: [],
  createSpaceErrors: [],
};

export const createSpace = createAsyncThunk('space/createSpace', async (data: SpaceData, { rejectWithValue }) => {
  try {
    const res = await apiService.post('/space/', data);
    return res?.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const extra = error.response?.data?.extra;
    const message = error?.response.data.message || 'Create error';
    return rejectWithValue({ errors, message, extra });
  }
});

const spaceSlice = createSlice({
  name: 'space',
  initialState,
  reducers: {
    togglePermissionModal: state => {
      state.permissionModalVisible = !state.permissionModalVisible;
    },
    setPermission: (state, { payload }: { payload: boolean }) => {
      state.permissionFulfilled = payload;
    },
  },
  extraReducers: {
    [createSpace.rejected.type]: (state, action: PayloadAction<ErrorPayload>) => {
      const { payload } = action;
      if (payload.errors) state.createSpaceErrors = payload;
    },
  },
});

export const { togglePermissionModal, setPermission } = spaceSlice.actions;

export default spaceSlice.reducer;
