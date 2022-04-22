/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, configureStore, Dispatch, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authReducer from './authSlice';

const middleware: Middleware<any, any, Dispatch<AnyAction>>[] = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
