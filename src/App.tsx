import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { Header } from './components/ui/Header';
import { CartDrawer } from './components/cart/CartDrawer';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { EventPage } from './pages/EventPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-off-white">
          <Header />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categorie/:categoryId" element={<CategoryPage />} />
            <Route path="/boutique/:shopId" element={<ShopPage />} />
            <Route path="/produit/:productId" element={<ProductPage />} />
            <Route path="/evenement/:eventId" element={<EventPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;