import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, Heart, History, Settings, LogOut } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { UserMenu } from './UserMenu';
import { SearchBar } from '../search/SearchBar';
import { useAPIRequest } from '@/hooks/use-api-request';
import { ResponseAPI } from '@/types/response';
import { Category } from '@/types/shop';
import { Constant, HttpMethod, MySize } from '@/utils/constants';
import MyLoader from './MyLoader';
import { slugify } from '@/utils/slugify';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state, dispatch } = useCart();
  const { user, signOut } = useAuth();
  const location = useLocation();

  const { data, loading, error, executeRequest } = useAPIRequest<ResponseAPI<Category>>();
  
  const [menuItems, setMenuItems] = useState([
    { path: '/', label: 'Accueil' },
    { path: '/nouveautes', label: 'Nouveautés' }
    // autres items statiques par défaut si nécessaire
  ]);
  // recuperation des tops categories
   useEffect(() => {
      executeRequest(HttpMethod.GET, Constant.endpointCategorieProduit + Constant.paramsAnd + Constant.paramsIsTopCategorie + false);
   }, []);
  
  
  // Mise à jour des menuItems quand data est disponible
  useEffect(() => {
    if (data?.data) {
      // Transformer les données de l'API en format menuItems
      const categoriesMenu = data.data.map(category => ({
        path: `/${slugify(category.title)}`,
        label: category.title
      }));

      // Combiner avec les items statiques si nécessaire
      setMenuItems( [
        { path: '/', label: 'Accueil' },
        { path: '/nouveautes', label: 'Nouveautés' },
        ...categoriesMenu
      ]);
    }
  }, [data]);
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);



  const isActivePath = (path: string) => location.pathname === path;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleMobileMenuClick = () => {
    setIsMobileMenuOpen(false);
  };


  if (loading) {
      return <MyLoader size={MySize.small}  fullScreen={false}/>;
  }

  return (
    // <header className="w-full bg-light-beige">
    <>
      {/* Espace réservé pour éviter le saut de contenu */}
      <div className="h-[136px] lg:h-[120px]" />
    <header className="fixed top-0 left-0 right-0 w-full bg-light-beige z-50">

      {/* Top bar */}
      {/* <div className="bg-soft-gold text-off-white text-sm py-1 text-center">
        <p>Livraison gratuite à partir de 50 000 FCFA d'achat</p>
      </div> */}
      {/* Main header */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="h-6 w-6 mr-4 lg:hidden"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" onClick={handleMobileMenuClick} className="text-2xl font-playfair font-bold text-soft-gold">
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
              <>
                <div className="hidden lg:block">
                  <UserMenu />
                </div>
                <Link 
                  to="/compte"
                  className="lg:hidden"
                  onClick={handleMobileMenuClick}
                >
                  <User className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <Link 
                to="/connexion" 
                onClick={handleMobileMenuClick}
                className="flex items-center gap-2"
              >
                <User className="h-5 w-5" />
                <span className="text-dark-gray hidden lg:inline">Connexion</span>
              </Link>
            )}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="flex items-center gap-2 relative"
              aria-label={`Panier (${totalItems} articles)`}
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
      <nav 
        className={`bg-off-white border-t border-gray-200 lg:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-4">
          <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8 py-1 lg:py-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={handleMobileMenuClick}
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
            
            {/* Menu utilisateur mobile */}
            {user && (
              <>
                <li className="lg:hidden border-t w-full pt-4 mt-2">
                  <Link
                    to="/compte/favoris"
                    onClick={handleMobileMenuClick}
                    className="flex items-center gap-2 text-dark-gray hover:text-soft-gold"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Mes favoris</span>
                  </Link>
                </li>
                <li className="lg:hidden">
                  <Link
                    to="/compte/commandes"
                    onClick={handleMobileMenuClick}
                    className="flex items-center gap-2 text-dark-gray hover:text-soft-gold"
                  >
                    <History className="h-5 w-5" />
                    <span>Mes commandes</span>
                  </Link>
                </li>
                <li className="lg:hidden">
                  <Link
                    to="/compte"
                    onClick={handleMobileMenuClick}
                    className="flex items-center gap-2 text-dark-gray hover:text-soft-gold"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Paramètres</span>
                  </Link>
                </li>
                <li className="lg:hidden">
                  <button
                    onClick={() => {
                      signOut();
                      handleMobileMenuClick();
                    }}
                    className="flex items-center gap-2 text-dark-gray hover:text-soft-gold"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Déconnexion</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>

    </>
  );
};