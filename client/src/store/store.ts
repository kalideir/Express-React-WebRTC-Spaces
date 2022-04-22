/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, configureStore, Dispatch, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { ApiService } from '../services';
import rootReducer from './rootReducer';
import logger from 'redux-logger';

const middleware: Middleware<any, any, Dispatch<AnyAction>>[] = [];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware).concat(ApiService.middleware).concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
