import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-light-beige">
      {/* Top bar */}
      <div className="bg-soft-gold text-off-white text-sm py-1 text-center">
        <p>Livraison gratuite à partir de 50 000 FCFA d'achat</p>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}

          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-6 w-6 mr-4 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="text-2xl font-playfair font-bold text-soft-gold">
              MuslimahMall
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl hidden lg:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-soft-gold"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-dark-gray" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button className="hidden lg:flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-dark-gray">Compte</span>
            </button>
            <button className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-dark-gray hidden lg:inline">Panier</span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="mt-4 lg:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-soft-gold"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              <Search className="h-5 w-5 text-dark-gray" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`bg-off-white border-t border-gray-200 lg:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 py-4 lg:py-2">
            <li>
              <Link to="/" className="text-dark-gray hover:text-soft-gold">Nouveautés</Link>
            </li>
            <li>
              <Link to="/" className="text-dark-gray hover:text-soft-gold">Vêtements</Link>
            </li>
            <li>
              <Link to="/" className="text-dark-gray hover:text-soft-gold">Accessoires</Link>
            </li>
            <li>
              <Link to="/" className="text-dark-gray hover:text-soft-gold">Beauté</Link>
            </li>
            <li>
              <Link to="/" className="text-dark-gray hover:text-soft-gold">Maison</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};