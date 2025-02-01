import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/shop';
import { ShopCard } from './ShopCard';

interface CategorySectionProps {
  category: Category;
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="font-playfair text-xl text-dark-gray mb-4">{category.name}</h2>
      <div className="grid grid-cols-2 gap-4">
        {category.shops.slice(0, 4).map((shop) => (
          <ShopCard key={shop.id} shop={shop} compact />
        ))}
      </div>
      <Link
        to={`/categorie/${category.id}`}
        // className="block mt-4 text-center text-light-turquoise hover:text-soft-gold transition-colors"
        className="block mt-4 text-center px-4 py-0 text-soft-gold bg-white hover:bg-soft-gold hover:text-white border border-soft-gold rounded-full transition-all duration-300"

      >
        Voir plus
      </Link>
    </div>
  );
};