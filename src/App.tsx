import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { RequireAuth } from './components/auth/RequireAuth';
import { Header } from './components/ui/Header';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { EventPage } from './pages/EventPage';
import { SignInPage } from './pages/auth/SignInPage';
import { SignUpPage } from './pages/auth/SignUpPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { AccountPage } from './pages/account/AccountPage';
import { OrdersPage } from './pages/account/OrdersPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-off-white">
            <Header />
            <CartDrawer />
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/categorie/:categoryId" element={<CategoryPage />} />
              <Route path="/boutique/:shopId" element={<ShopPage />} />
              <Route path="/produit/:productId" element={<ProductPage />} />
              <Route path="/evenement/:eventId" element={<EventPage />} />
              <Route path="/connexion" element={<SignInPage />} />
              <Route path="/inscription" element={<SignUpPage />} />
              <Route path="/mot-de-passe-oublie" element={<ResetPasswordPage />} />

              {/* Routes protégées */}
              <Route
                path="/compte"
                element={
                  <RequireAuth>
                    <AccountPage />
                  </RequireAuth>
                }
              />

              <Route
                path="/compte/commandes"
                element={
                  <RequireAuth>
                    <OrdersPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/commander"
                element={
                  <RequireAuth>
                    <CheckoutPage />
                  </RequireAuth>
                }
              />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}