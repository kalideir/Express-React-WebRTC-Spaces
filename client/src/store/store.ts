/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyAction, configureStore, Dispatch, Middleware, MiddlewareArray } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

const middleware: Middleware<any, any, Dispatch<AnyAction>>[] = [];

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware.push(logger);
}

const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().prepend(middleware),
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
