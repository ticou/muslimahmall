import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group">
      <Link to={`/produit/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount && (
            <span className="absolute top-2 left-2 bg-soft-gold text-white text-xs px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
        <div className="p-3 space-y-2">
          <h3 className="font-medium text-dark-gray line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-soft-gold text-soft-gold" />
            <span className="text-sm">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({product.totalReviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-dark-gray">
              {product.price.toLocaleString()}€
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.originalPrice.toLocaleString()}€
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        className="w-full bg-light-turquoise hover:bg-soft-gold text-white p-2 transition-colors flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Ajouter au panier</span>
      </button>
    </div>
  );
};