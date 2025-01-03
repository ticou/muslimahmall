import React from 'react';
import { useFavorites } from '../../contexts/FavoritesContext';
import { ProductCard } from '../../components/products/ProductCard';

export const FavoritesPage = () => {
  const { state } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Mes favoris
      </h1>

      {state.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Vous n'avez pas encore de favoris</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {state.items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};