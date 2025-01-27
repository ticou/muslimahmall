import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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
import { HomeDecorPage } from './pages/categories/HomeDecorPage';
import { BeautyPage } from './pages/categories/BeautyPage';
import { AccessoriesPage } from './pages/categories/AccessoriesPage';
import { ClothingPage } from './pages/categories/ClothingPage';
import { NewProductsPage } from './pages/categories/NewProductsPage';
import { ProductListPage } from './pages/products/ProductListPage';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { FavoritesPage } from './pages/account/FavoritesPage';

import backgroundPattern from './assets/images/Arabesque.png';
import { PaymentsPage } from './pages/account/PaymentsPage';
import { WalletPage } from './pages/account/WalletPage';
import { ProfilePage } from './pages/account/ProfilePage';
import { OTPPage } from './pages/auth/OTPPage';

const styles = {
  background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${backgroundPattern})`,
  backgroundRepeat: 'repeat',
  backgroundSize: '300px',
  opacity: 1,
};


// const styles = {
//   // position: 'fixed', // Fixe le background
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   background: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url(${backgroundPattern})`,
//   backgroundRepeat: 'repeat',
//   backgroundSize: '300px',
//   zIndex: 0,
// };


export default function App() {
  return (

    <HelmetProvider>
    <AuthProvider>
        <CartProvider>
        <FavoritesProvider>
            <Router>
            <div style={styles}>

          {/* <div className="min-h-screen bg-off-white"> */}
          <div className="min-h-screen">
            <Header />
            <CartDrawer />
            <Routes>
                    {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/nouveautes" element={<NewProductsPage />} />
              <Route path="/vetements" element={<ClothingPage />} />
              <Route path="/accessoires" element={<AccessoriesPage />} />
              <Route path="/beaute" element={<BeautyPage />} />
              <Route path="/maison" element={<HomeDecorPage />} />
              <Route path="/categorie/:categoryId" element={<CategoryPage />} />
              <Route path="/boutique/:shopId" element={<ShopPage />} />
              <Route path="/produit/:productId" element={<ProductPage />} />
              <Route path="/evenement/:eventId" element={<EventPage />} />
              <Route path="/connexion" element={<SignInPage />} />
              <Route path="/otp" element={<OTPPage />} />
              <Route path="/inscription" element={<SignUpPage />} />
              <Route path="/mot-de-passe-oublie" element={<ResetPasswordPage />} />
              <Route path="/produits/:criteriaId" element={<ProductListPage/>} />
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
                path="/compte/profil"
                element={
                  <RequireAuth>
                    <ProfilePage />
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
                path="/compte/favoris"
                element={
                  <RequireAuth>
                    <FavoritesPage />
                  </RequireAuth>
                }
                    />
                    
                    <Route
                path="/compte/wallet"
                element={
                  <RequireAuth>
                    <WalletPage />
                  </RequireAuth>
                }
                    />
                    <Route
                path="/compte/paiements"
                element={
                  <RequireAuth>
                    <PaymentsPage />
                  </RequireAuth>
                }
                    />
                {/* <Route
                path="/compte/paiement-methodes"
                element={
                  <RequireAuth>
                    <FavoritesPage />
                  </RequireAuth>
                }
              /> */}

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
            </div>
            </Router>
        </FavoritesProvider>

      </CartProvider>
    </AuthProvider>
  </HelmetProvider>

  );
}