import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Product } from '../../types/product';

interface FavoriteButtonProps {
  product: Product;
  className?: string;
}

export const FavoriteButton = ({ product, className = '' }: FavoriteButtonProps) => {
  const { state, dispatch } = useFavorites();
  const isFavorite = state.items.some(item => item.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({ type: 'REMOVE_FAVORITE', payload: product.id });
    } else {
      dispatch({ type: 'ADD_FAVORITE', payload: product });
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      className={`p-3 border rounded-lg transition-colors ${
        isFavorite
          ? 'bg-soft-gold border-soft-gold text-white hover:bg-soft-gold/90'
          : 'border-gray-200 hover:bg-gray-50'
      } ${className}`}
      aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <Heart
        className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
      />
    </button>
  );
};