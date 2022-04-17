/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useRoutes } from 'react-router-dom';
import Wrapper from './layout/Wrapper';
import { LoginRoutes, PublicRoutes, UserRoutes } from './routes';

function App() {
  const routes = useRoutes([...PublicRoutes, ...LoginRoutes, ...UserRoutes]);
  return (
    <div className="h-screen bg-slate-900">
      <Wrapper>{routes}</Wrapper>
    </div>
  );
}

export default App;
