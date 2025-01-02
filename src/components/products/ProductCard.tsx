import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/produit/${product.id}`} className="block">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {product.discount && (
            <span className="absolute top-2 left-2 bg-soft-gold text-white text-xs px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>
        <div className="p-2 space-y-1">
          <h3 className="font-medium text-dark-gray text-sm line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-soft-gold text-soft-gold" />
            <span className="text-xs">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-500">({product.totalReviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-semibold text-dark-gray text-sm">
              {product.price.toLocaleString()}€
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through">
                {product.originalPrice.toLocaleString()}€
              </span>
            )}
          </div>
        </div>
      </Link>
      <button className="w-full bg-light-turquoise hover:bg-soft-gold text-white py-1.5 text-sm transition-colors flex items-center justify-center gap-1">
        <ShoppingCart className="w-3 h-3" />
        <span>Ajouter au panier</span>
      </button>
    </div>
  );
};