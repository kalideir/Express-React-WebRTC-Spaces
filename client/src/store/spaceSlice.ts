import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AxiosError } from 'axios';
import { ErrorPayload, JoinSpace, ListUsersQueryType, ParticipantItem, ParticipantStatus, SpaceData, SpaceItem, UsersSearch } from '../@types';
import { ParticipantTypes } from '../constants';
import { apiService } from '../services';
import { RootState } from './store';

export type SpaceSliceData = {
  permissionFulfilled: boolean;
  permissionModalVisible: boolean;
  onlineSpaces: SpaceItem[];
  createSpaceErrors: unknown;
  mySpaces: SpaceItem[];
  activeSpace: null | SpaceItem;
  usersSearch: UsersSearch;
  spaceGuestQuery: string;
};

const initialState: SpaceSliceData = {
  permissionFulfilled: false,
  permissionModalVisible: false,
  onlineSpaces: [],
  createSpaceErrors: [],
  mySpaces: [],
  activeSpace: null,
  usersSearch: {
    users: [],
    page: 0,
    subTotal: 0,
    total: 0,
  },
  spaceGuestQuery: '',
};

export const createSpace = createAsyncThunk('space/createSpace', async (data: SpaceData, { rejectWithValue, dispatch }) => {
  try {
    const res = await apiService.post('/space/', data);
    await dispatch(getMySpaces());
    return res?.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const extra = error.response?.data?.extra;
    const message = error?.response.data.message || 'Create error';
    return rejectWithValue({ errors, message, extra });
  }
});

export const deleteSpace = createAsyncThunk('space/deleteSpace', async (key: string, { rejectWithValue, dispatch }) => {
  try {
    const res = await apiService.delete('/space/' + key);
    await dispatch(getMySpaces());
    return res?.data;
  } catch (error: any | AxiosError) {
    const errors = error.response?.data?.errors;
    const message = error?.response.data.message || 'Delete error';
    return rejectWithValue({ errors, message });
  }
});

export const addDeleteParticipant = createAsyncThunk(
  'space/addDeleteParticipant',
  async ({ key, type, userId }: { key: string; type: ParticipantStatus; userId: string }, { rejectWithValue, dispatch }) => {
    try {
      const res = await apiService.post(`/space/${key}/participants`, { type, userId });
      await dispatch(getActiveSpace(key));
      return res?.data;
    } catch (error: any | AxiosError) {
      const errors = error.response?.data?.errors;
      const extra = error.response?.data?.extra;
      const message = error?.response.data.message || 'Create error';
      return rejectWithValue({ errors, message, extra });
    }
  },
);

export const setSpaceGuestQuery = createAction<string>('spaces/setSpaceGuestQuery');

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

export const getOnlineSpaces = createAsyncThunk('space/getOnlineSpaces', async (_, { rejectWithValue }) => {
  try {
    const res = await apiService.get('/space/list/onlineSpaces');
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
    togglePermissionModal: (state, action: PayloadAction<boolean>) => {
      state.permissionModalVisible = action.payload;
    },
    setPermission: (state, { payload }: { payload: boolean }) => {
      state.permissionFulfilled = payload;
    },
    setActiveSpace: (state, { payload }: { payload: SpaceItem }) => {
      state.activeSpace = payload;
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
    [setSpaceGuestQuery.type]: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.spaceGuestQuery = payload;
    },
    [getOnlineSpaces.fulfilled.type]: (state, action: PayloadAction<SpaceItem[]>) => {
      const { payload } = action;
      state.onlineSpaces = payload;
    },
  },
});

export const { togglePermissionModal, setPermission, setActiveSpace } = spaceSlice.actions;

export default spaceSlice.reducer;

export const selectMySpaces = (state: RootState) => state.spaces.mySpaces;

export const selectOnlineSpaces = (state: RootState) => state.spaces.onlineSpaces;

export const selectActiveSpace = (state: RootState) => state.spaces.activeSpace;

export const selectSpaceUsersSearch = (state: RootState) => state.spaces.usersSearch;

export const selectSpaceBoard = (state: RootState) =>
  (state.spaces.activeSpace?.participants || []).filter(
    (participant: ParticipantItem) => !([ParticipantTypes.GUEST, ParticipantTypes.PENDING] as string[]).includes(participant.type as string),
  );

export const selectSpaceGuests = (state: RootState) =>
  (state.spaces.activeSpace?.participants || []).filter((participant: ParticipantItem) => participant.type === ParticipantTypes.GUEST);

export const selectPendingRequests = (state: RootState) =>
  (state.spaces.activeSpace?.participants || []).filter((participant: ParticipantItem) => participant.type === ParticipantTypes.PENDING);

export const spaceGuestQuery = (state: RootState) => state.spaces.spaceGuestQuery;

export const selectPermissionModal = (state: RootState) => state.spaces.permissionModalVisible;
