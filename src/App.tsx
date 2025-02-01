import React, { useEffect, useState } from 'react';
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
import { CategorieProduitPage } from './pages/categories/CategorieProduitPage';
import { Constant, HttpMethod } from './utils/constants';
import { useAPIRequest } from './hooks/use-api-request';
import { ResponseAPI } from './types/response';
import { Category } from './types/shop';
import { slugify } from './utils/slugify';
import { ROUTES } from './config/routes.config';

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


    const { data, loading, error, executeRequest } = useAPIRequest<ResponseAPI<Category>>();
  

  const [dynamiquePath, setDynamiquePath] = useState<{slug?: string, name?: string}[]>([
    {}
  ]);

  useEffect(() => {
        executeRequest(HttpMethod.GET, Constant.endpointCategorieProduit + Constant.paramsQuestions + Constant.paramsIsTopCategorie + true);
  }, []);
  

   // Mise à jour des menuItems quand data est disponible
    useEffect(() => {
      if (data?.data) {
        // Transformer les données de l'API en format menuItems
        const categoriePath = data.data.map(category => ({
          slug: `/${slugify(category.name)}`,
          name: category.name
        }));
  
        // Combiner avec les items statiques si nécessaire
        setDynamiquePath( [
          ...categoriePath
        ]);
      }
    }, [data]);
  

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
              <Route key={ROUTES.KEY_HOME} path={ROUTES.PATH_HOME} element={<HomePage />} />
              <Route key={ROUTES.KEY_NOUVEAUTES} path={ROUTES.PATH_NOUVEAUTES} element={<NewProductsPage />} />

              {dynamiquePath && dynamiquePath.map((item) => (
                <Route 
                  key={item.slug} 
                  path={item.slug} 
                  element={<CategorieProduitPage name={item.name ?? ""} />} 
                />
              ))}

              <Route key={ROUTES.KEY_CATEGORIE} path={ROUTES.PATH_CATEGORIE} element={<CategoryPage />} />
              <Route key={ROUTES.KEY_BOUTIQUE} path={ROUTES.PATH_BOUTIQUE} element={<ShopPage />} />
              <Route key={ROUTES.KEY_PRODUIT} path={ROUTES.PATH_PRODUIT} element={<ProductPage />} />
              <Route key={ROUTES.KEY_EVENEMENT} path={ROUTES.PATH_EVENEMENT} element={<EventPage />} />
              <Route key={ROUTES.KEY_CONNEXION} path={ROUTES.PATH_CONNEXION} element={<SignInPage />} />
              <Route key={ROUTES.KEY_NOUS_REJOINDRE} path={ROUTES.PATH_NOUS_REJOINDRE} element={<SignUpPage typeUser={Constant.typeMarchand} />} />
              <Route key={ROUTES.KEY_OTP} path={ROUTES.PATH_OTP} element={<OTPPage />} />
              <Route key={ROUTES.KEY_INSCRIPTION} path={ROUTES.PATH_INSCRIPTION} element={<SignUpPage typeUser={Constant.typeClient} />} />
              <Route key={ROUTES.KEY_MOT_DE_PASSE_OUBLIE} path={ROUTES.PATH_MOT_DE_PASSE_OUBLIE} element={<ResetPasswordPage />} />
              <Route key={ROUTES.KEY_PRODUITS} path={ROUTES.PATH_PRODUITS} element={<ProductListPage/>} />

              {/* Routes protégées */}
              <Route
                key={ROUTES.KEY_COMPTE}
                path={ROUTES.PATH_COMPTE}
                element={
                  <RequireAuth>
                    <AccountPage />
                  </RequireAuth>
                }
              />
              
              <Route
                key={ROUTES.KEY_PROFIL}
                path={ROUTES.PATH_PROFIL}
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />

              <Route
                key={ROUTES.KEY_COMMANDES}
                path={ROUTES.PATH_COMMANDES}
                element={
                  <RequireAuth>
                    <OrdersPage />
                  </RequireAuth>
                }
              />

              <Route
                key={ROUTES.KEY_FAVORIS}
                path={ROUTES.PATH_FAVORIS}
                element={
                  <RequireAuth>
                    <FavoritesPage />
                  </RequireAuth>
                }
              />

              <Route
                key={ROUTES.KEY_WALLET}
                path={ROUTES.PATH_WALLET}
                element={
                  <RequireAuth>
                    <WalletPage />
                  </RequireAuth>
                }
              />

              <Route
                key={ROUTES.KEY_PAIEMENTS}
                path={ROUTES.PATH_PAIEMENTS}
                element={
                  <RequireAuth>
                    <PaymentsPage />
                  </RequireAuth>
                }
              />

              <Route
                key={ROUTES.KEY_COMMANDER}
                path={ROUTES.PATH_COMMANDER}
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