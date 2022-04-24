import { AnyAction, configureStore, Dispatch, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authReducer from './authSlice';
import profileReducer from './profileSlice';
import spaceReducer from './spaceSlice';

const middleware: Middleware<any, any, Dispatch<AnyAction>>[] = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    spaces: spaceReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
