/* eslint-disable @typescript-eslint/no-unused-vars */
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { NewSpace } from './components/Spaces';
import { useAppDispatch } from './hooks';
import Wrapper from './layout/Wrapper';
import { Routes } from './routes';
import { autoLogin } from './store/authSlice';

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
        <Wrapper>
          <Routes />
          <NewSpace />
        </Wrapper>
      </div>
    </SnackbarProvider>
  );
}

export default App;
