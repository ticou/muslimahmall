import React from 'react';
import { useParams } from 'react-router-dom';
import { SHOP_CATEGORIES } from '../data/shops';

export const ShopPage = () => {
  const { shopId } = useParams();
  const shop = SHOP_CATEGORIES.flatMap(cat => cat.shops).find(s => s.id === shopId);

  if (!shop) {
    return <div>Boutique non trouvée</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 relative">
          <img
            src={shop.image}
            alt={shop.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="font-playfair text-3xl text-dark-gray mb-4">{shop.name}</h1>
          <p className="text-gray-600 mb-6">{shop.description}</p>
          
          {/* Ici viendra la liste des produits de la boutique */}
          <div className="text-center text-gray-500">
            Liste des produits à venir
          </div>
        </div>
      </div>
    </div>
  );
};