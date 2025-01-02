import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserMenu } from './UserMenu';
import { SearchBar } from '../search/SearchBar';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state, dispatch } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = [
    { path: '/nouveautes', label: 'Nouveautés' },
    { path: '/vetements', label: 'Vêtements' },
    { path: '/accessoires', label: 'Accessoires' },
    { path: '/beaute', label: 'Beauté' },
    { path: '/maison', label: 'Maison' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

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
          <div className="flex-1 max-w-2xl hidden lg:block">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="hidden lg:block">
                <UserMenu />
              </div>
            ) : (
              <Link to="/connexion" className="hidden lg:flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="text-dark-gray">Connexion</span>
              </Link>
            )}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="flex items-center gap-2 relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {/* <span className="text-dark-gray hidden lg:inline">Panier</span> */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-soft-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="mt-4 lg:hidden">
          <SearchBar />
        </div>
      </div>

      {/* Navigation */}
      <nav className={`bg-off-white border-t border-gray-200 lg:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="container mx-auto px-4">
          <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 py-1 lg:py-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`transition-colors ${
                    isActivePath(item.path)
                      ? 'text-soft-gold font-medium'
                      : 'text-dark-gray hover:text-soft-gold'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};