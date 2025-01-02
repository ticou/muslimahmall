import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../../types/product';
import { ProductCard } from '../products/ProductCard';

interface ScrollableProductListProps {
  title: string;
  products: Product[];
  viewAll?: string;
}

export const ScrollableProductList = ({ title, products, viewAll }: ScrollableProductListProps) => {
  const scrollContainer = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-playfair text-2xl text-dark-gray">{title}</h2>
        {viewAll && (
          <a href={viewAll} className="text-light-turquoise hover:text-soft-gold transition-colors">
            Voir tout
          </a>
        )}
      </div>
      
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6 text-dark-gray" />
        </button>
        
        <div
          ref={scrollContainer}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        >
          {products.map((product) => (
            <div key={product.id} className="flex-none w-[250px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6 text-dark-gray" />
        </button>
      </div>
    </div>
  );
};