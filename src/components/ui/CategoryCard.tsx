import React from 'react';
import { cn } from '../../lib/utils';

interface Shop {
  id: string;
  name: string;
  image: string;
}

interface CategoryCardProps {
  title: string;
  shops: Shop[];
  className?: string;
}

export const CategoryCard = ({ title, shops, className }: CategoryCardProps) => {
  return (
    <div className={cn("bg-white p-4 rounded-lg shadow-md", className)}>
      <h2 className="font-playfair text-xl text-dark-gray mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {shops.map((shop) => (
          <div key={shop.id} className="space-y-2">
            <div className="aspect-square relative overflow-hidden rounded-md">
              <img
                src={shop.image}
                alt={shop.name}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-sm font-medium text-dark-gray">{shop.name}</p>
          </div>
        ))}
      </div>
      <a
        href="#"
        className="block mt-4 text-center text-light-turquoise hover:text-soft-gold transition-colors"
      >
        Voir plus
      </a>
    </div>
  );
};