import React, { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <main className="dark:bg-slate-900 bg-slate-50">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default Wrapper;
