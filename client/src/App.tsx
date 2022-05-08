/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import Wrapper from './layout/Wrapper';
import { Routes } from './routes';
import { autoLogin } from './store/authSlice';
import io from 'socket.io-client';
import SocketProvider from './spaces';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div className="h-screen bg-slate-900">
        <SocketProvider>
          <Wrapper>
            <Routes />
          </Wrapper>
        </SocketProvider>
      </div>
    </SnackbarProvider>
  );
}

export default App;
