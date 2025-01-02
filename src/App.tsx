import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { EventPage } from './pages/EventPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-off-white">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categorie/:categoryId" element={<CategoryPage />} />
          <Route path="/boutique/:shopId" element={<ShopPage />} />
          <Route path="/produit/:productId" element={<ProductPage />} />
          <Route path="/evenement/:eventId" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;