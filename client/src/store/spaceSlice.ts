import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { Error, ErrorPayload, ISpace, ListUsersQueryType, ParticipantStatus, SpaceData, SpaceItem, SpaceUser, UsersSearch } from '../@types';
import { apiService } from '../services';
import { RootState } from './store';

export type SpaceSliceData = {
  permissionFulfilled: boolean;
  permissionModalVisible: boolean;
  spaces: SpaceItem[];
  createSpaceErrors: unknown;
  mySpaces: SpaceItem[];
  activeSpace: null | SpaceItem;
  usersSearch: UsersSearch;
};

const initialState: SpaceSliceData = {
  permissionFulfilled: false,
  permissionModalVisible: false,
  spaces: [],
  createSpaceErrors: [],
  mySpaces: [],
  activeSpace: null,
  usersSearch: {
    users: [],
    page: 0,
    subTotal: 0,
    total: 0,
  },
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

export const addDeleteParticipant = createAsyncThunk(
  'space/addDeleteParticipant',
  async ({ key, type, userId }: { key: string; type: ParticipantStatus; userId: string }, { rejectWithValue }) => {
    try {
      const res = await apiService.post(`/space/${key}/participants`, { type, userId });
      return res?.data;
    } catch (error: any | AxiosError) {
      const errors = error.response?.data?.errors;
      const extra = error.response?.data?.extra;
      const message = error?.response.data.message || 'Create error';
      return rejectWithValue({ errors, message, extra });
    }
  },
);

export const updateSpace = createAsyncThunk(
  'space/updateSpace',
  async ({ key, data }: { key: string; data: Partial<SpaceData> }, { rejectWithValue }) => {
    try {
      const res = await apiService.patch('/space/' + key, data);
      return res?.data;
    } catch (error: any | AxiosError) {
      const errors = error.response?.data?.errors;
      const extra = error.response?.data?.extra;
      const message = error?.response.data.message || 'Update error';
      return rejectWithValue({ errors, message, extra });
    }
  },
);

export const getMySpaces = createAsyncThunk('space/getMySpaces', async (_, { rejectWithValue }) => {
  try {
    const res = await apiService.get('/space/list/mySpaces');
    return res?.data?.spaces;
  } catch (error: any | AxiosError) {
    const message = error?.response.data.message || 'Error';
    return rejectWithValue({ message });
  }
});

export const getActiveSpace = createAsyncThunk('space/getSpace', async (key: string, { rejectWithValue }) => {
  try {
    const res = await apiService.get('/space/' + key);
    return res?.data;
  } catch (error: any | AxiosError) {
    const message = error?.response.data.message || 'Error';
    return rejectWithValue({ message });
  }
});

export const getUsers = createAsyncThunk('space/getUsers', async (params: ListUsersQueryType, { rejectWithValue }) => {
  try {
    const res = await apiService.get('/user/list/users', { params });
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
    [getActiveSpace.fulfilled.type]: (state, action: PayloadAction<SpaceItem>) => {
      const { payload } = action;
      state.activeSpace = payload;
    },
    [updateSpace.fulfilled.type]: (state, action: PayloadAction<SpaceItem>) => {
      const { payload } = action;
      state.activeSpace = payload;
    },
    [getUsers.fulfilled.type]: (state, action: PayloadAction<UsersSearch>) => {
      const { payload } = action;
      state.usersSearch = payload;
    },
  },
});

export const { togglePermissionModal, setPermission } = spaceSlice.actions;

export default spaceSlice.reducer;

export const selectMySpaces = (state: RootState) => state.spaces.mySpaces;

export const selectActiveSpace = (state: RootState) => state.spaces.activeSpace;

export const selectSpaceUsersSearch = (state: RootState) => state.spaces.usersSearch;
