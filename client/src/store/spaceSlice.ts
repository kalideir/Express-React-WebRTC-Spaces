import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISpace } from '../@types';

export type SpaceSliceData = {
  permissionFulfilled: boolean;
  permissionModalVisible: boolean;
  spaces: ISpace[];
};

const initialState: SpaceSliceData = {
  permissionFulfilled: false,
  permissionModalVisible: false,
  spaces: [],
};

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
  //   extraReducers: () => {},
});

export const { togglePermissionModal, setPermission } = spaceSlice.actions;

export default spaceSlice.reducer;
