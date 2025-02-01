import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types/shop';
import { Star } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
}

const ShopPreview = ({ shop }) => (
  <div className="group">
    <div className="aspect-square relative overflow-hidden rounded-md">
      <img
        src={shop.image}
        alt={shop.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 fill-soft-gold text-soft-gold" />
          <span>{shop.shopRating}</span>
          <span className="text-white/80">({shop.totalReviews})</span>
        </div>
        <p className="text-xs">{shop.totalSales} ventes</p>
      </div>
    </div>
    <p className="mt-1 text-sm font-medium text-dark-gray truncate">{shop.name}</p>
  </div>
);

export const CategoryGrid = ({ categories }: CategoryGridProps) => {
  // Grouper les catégories par lignes de 4
  const rows = [];
  for (let i = 0; i < categories.length; i += 4) {
    rows.push(categories.slice(i, i + 4));
  }

  return (
    <div className="space-y-8">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {row.map((category) => (
            <div key={category.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col">
              <h2 className="font-playfair text-xl text-dark-gray mb-4">{category.name}</h2>
              
              <div className="grid grid-cols-2 gap-3 flex-grow">
                {category.shops.slice(0, 4).map((shop) => (
                  <Link key={shop.id} to={`/boutique/${shop.id}`}>
                    <ShopPreview shop={shop} />
                  </Link>
                ))}
              </div>

              <Link 
                to={`/categorie/${category.id}`}
                state={{ category: category }}  // Passage des shops dans state
                // className="block mt-4 text-center text-light-turquoise hover:text-soft-gold transition-colors text-sm py-2 border-t border-gray-100"
                  // className="block mt-4 mx-auto w-fit px-4 py-0 text-center text-white bg-light-turquoise hover:bg-soft-gold rounded-full transition-all duration-300 hover:text-white"
              // className="block mt-4 mx-auto w-fit px-4 py-0 text-center text-white bg-soft-gold hover:bg-light-turquoise rounded-full transition-all duration-300"
              // className="block mt-4 mx-auto w-fit px-4 py-0 text-center text-light-turquoise bg-white hover:bg-light-turquoise hover:text-white border border-light-turquoise rounded-full transition-all duration-300"
              className="block mt-4 mx-auto w-fit px-4 py-0 text-center text-soft-gold bg-white hover:bg-soft-gold hover:text-white border border-soft-gold rounded-full transition-all duration-300"

              >
                Voir plus
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};