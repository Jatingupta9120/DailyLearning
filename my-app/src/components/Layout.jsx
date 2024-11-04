import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="layout-container">
    <Header />
    <main>{children}</main>
  </div>
);

export { Layout as default };