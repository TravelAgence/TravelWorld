import React from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../Header/header';
import Router from '../../router/Routers';
import Footer from '../Footer/footer';

const Layout = () => {
  const location = useLocation();

  // Vérifiez si l'utilisateur est sur une route admin
  const isAdminPath = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPath && <Header />} {/* Affiche le Header uniquement si ce n'est pas une route admin */}
      <Router />
      {!isAdminPath && <Footer />} {/* Affiche le Footer uniquement si ce n'est pas une route admin */}
    </>
  );
};

export default Layout;
