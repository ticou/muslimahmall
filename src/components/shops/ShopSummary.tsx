import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Package, Award } from 'lucide-react';
import { Shop } from '../../types/shop';

interface ShopSummaryProps {
  shop: Shop;
}

export const ShopSummary = ({ shop }: ShopSummaryProps) => {
  return (
    <Link
      to={`/boutique/${shop.id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={shop.image}
            alt={shop.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h3 className="font-medium text-dark-gray">{shop.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 fill-soft-gold text-soft-gold" />
              <span className="text-sm">{shop.shopRating.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({shop.totalReviews} avis)</span>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs ${
            shop.shopType === 'PREMIUM' ? 'bg-soft-gold text-white' :
            shop.shopType === 'VERIFIED' ? 'bg-light-turquoise text-dark-gray' :
            'bg-gray-200 text-gray-700'
          }`}>
            {shop.shopType.charAt(0) + shop.shopType.slice(1).toLowerCase()}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Package className="w-4 h-4" />
            <span>{shop.totalSales} ventes</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4" />
            <span>Depuis {new Date(shop.joinedDate).getFullYear()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};