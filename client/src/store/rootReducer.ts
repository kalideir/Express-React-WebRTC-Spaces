import { CombinedState, combineReducers } from '@reduxjs/toolkit';
import { ApiService } from '../services';
import spaceReducer, { SpaceData } from './spaceSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  [ApiService.reducerPath]: ApiService.reducer,
  space: spaceReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type State = CombinedState<{ [key: string]: unknown }>;

export type StoreState = State & {
  space: SpaceData;
};

export default rootReducer;
