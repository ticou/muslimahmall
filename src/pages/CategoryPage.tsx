import React from 'react';
import { useParams } from 'react-router-dom';
import { SHOP_CATEGORIES } from '../data/shops';
import { ShopCard } from '../components/shops/ShopCard';

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = SHOP_CATEGORIES.find(cat => cat.id === categoryId);

  if (!category) {
    return <div>Catégorie non trouvée</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-playfair text-3xl text-dark-gray mb-4">{category.title}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
};