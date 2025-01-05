import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/ui/Header';
import { CartDrawer } from '../components/cart/CartDrawer';

export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <CartDrawer />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};