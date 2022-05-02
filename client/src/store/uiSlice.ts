import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type UiSliceData = {
  newSpaceModalVisible: boolean;
};

const initialState: Partial<UiSliceData> = {
  newSpaceModalVisible: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNewSpaceModal: (state, action: PayloadAction<boolean>) => {
      state.newSpaceModalVisible = action.payload;
    },
  },
  extraReducers: {},
});

export default uiSlice.reducer;

export const { toggleNewSpaceModal } = uiSlice.actions;

export const selectNewSpaceVisible = (state: RootState) => state.ui.newSpaceModalVisible;
