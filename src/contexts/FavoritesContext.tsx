import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '../types/product';

interface FavoritesState {
  items: Product[];
}

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: Product }
  | { type: 'REMOVE_FAVORITE'; payload: string };

const initialState: FavoritesState = {
  items: [],
};

const FavoritesContext = createContext<{
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
} | null>(null);

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        items: [...state.items, action.payload],
      };

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Charger les favoris depuis le localStorage au démarrage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const { items } = JSON.parse(savedFavorites);
      items.forEach((item: Product) => {
        dispatch({ type: 'ADD_FAVORITE', payload: item });
      });
    }
  }, []);

  // Sauvegarder les favoris dans le localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify({ items: state.items }));
  }, [state.items]);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};