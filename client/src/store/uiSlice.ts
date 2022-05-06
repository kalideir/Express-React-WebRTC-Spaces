import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SpaceUser } from '../@types';
import { RootState } from './store';

export type UiSliceData = {
  newSpaceModalVisible: boolean;
  newParticipantModal: boolean;
  requestsModal: boolean;
};

const initialState: Partial<UiSliceData> = {
  newSpaceModalVisible: false,
  newParticipantModal: false,
  requestsModal: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNewSpaceModal: (state, action: PayloadAction<boolean>) => {
      state.newSpaceModalVisible = action.payload;
    },
    showAddParticipantModal: state => {
      state.newParticipantModal = true;
    },
    hideAddParticipantModal: state => {
      state.newParticipantModal = false;
    },
    showRequestsModal: state => {
      state.requestsModal = true;
    },
    hideRequestsModal: state => {
      state.requestsModal = false;
    },
  },
  extraReducers: {},
});

export default uiSlice.reducer;

export const { toggleNewSpaceModal, showAddParticipantModal, hideAddParticipantModal, showRequestsModal, hideRequestsModal } = uiSlice.actions;

export const selectNewSpaceVisible = (state: RootState) => state.ui.newSpaceModalVisible;

export const selectNewParticipantModal = (state: RootState) => state.ui.newParticipantModal;

export const selectRequestsModal = (state: RootState) => state.ui.requestsModal;
