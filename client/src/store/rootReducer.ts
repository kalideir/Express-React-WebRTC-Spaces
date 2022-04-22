import { CombinedState, combineReducers } from '@reduxjs/toolkit';
import { ApiService } from '../services';
import spaceReducer, { SpaceSliceData } from './spaceSlice';
import authReducer, { AuthSliceData } from './authSlice';

const rootReducer = combineReducers({
  space: spaceReducer,
  auth: authReducer,
  [ApiService.reducerPath]: ApiService.reducer,
});

export type State = CombinedState<{ [key: string]: unknown }>;

export type StoreState = State & {
  space: SpaceSliceData;
  auth: AuthSliceData;
};

export default rootReducer;
