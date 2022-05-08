import { AnyAction, configureStore, Dispatch, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import authReducer from './authSlice';
import profileReducer from './profileSlice';
import spaceReducer from './spaceSlice';
import uploadReducer from './uploadslice';
import uiReducer from './uiSlice';

const middleware: Middleware<any, any, Dispatch<AnyAction>>[] = [];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    spaces: spaceReducer,
    upload: uploadReducer,
    ui: uiReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(), //.concat(logger),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
