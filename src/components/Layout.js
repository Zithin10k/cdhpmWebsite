import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();
  const isOurPeoplePage = location.pathname === '/our-people';

  return (
    <div className="layout">
      <NavBar />
      
      <main className={isOurPeoplePage ? '' : 'fixed-nav-padding'}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout; 