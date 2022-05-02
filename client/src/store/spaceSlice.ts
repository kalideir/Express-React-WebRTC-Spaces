import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { Error, ErrorPayload, ISpace, SpaceData, SpaceItem } from '../@types';
import { apiService } from '../services';
import { RootState } from './store';

export type SpaceSliceData = {
  permissionFulfilled: boolean;
  permissionModalVisible: boolean;
  spaces: SpaceItem[];
  createSpaceErrors: unknown;
  mySpaces: SpaceItem[];
};

const initialState: SpaceSliceData = {
  permissionFulfilled: false,
  permissionModalVisible: false,
  spaces: [],
  createSpaceErrors: [],
  mySpaces: [],
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

export const getMySpaces = createAsyncThunk('space/getMySpaces', async (_, { rejectWithValue }) => {
  try {
    const res = await apiService.get('/space/list/mySpaces');
    return res?.data;
  } catch (error: any | AxiosError) {
    const message = error?.response.data.message || 'Error';
    return rejectWithValue({ message });
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
    [getMySpaces.fulfilled.type]: (state, action: PayloadAction<SpaceItem[]>) => {
      const { payload } = action;
      state.mySpaces = payload;
    },
  },
});

export const { togglePermissionModal, setPermission } = spaceSlice.actions;

export default spaceSlice.reducer;

export const selectMySpaces = (state: RootState) => state.spaces.mySpaces;
