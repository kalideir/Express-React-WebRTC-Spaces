import { CombinedState, combineReducers, Reducer } from '@reduxjs/toolkit';
import spaceSlice, { SpaceData } from './spaceSlice';

const rootReducer = combineReducers({
  space: spaceSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export type State = CombinedState<{ [key: string]: unknown }>;

export type StoreState = State & {
  space: SpaceData;
};

export default rootReducer;
