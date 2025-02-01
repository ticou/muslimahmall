import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Shop } from '../../types/shop';

interface ShopCardProps {
  shop: Shop;
  compact?: boolean;
}

const ShopBadge = ({ type }: { type: Shop['shopType'] }) => {
  const colors = {
    PREMIUM: 'bg-soft-gold text-white',
    VERIFIED: 'bg-light-turquoise text-dark-gray',
    STANDARD: 'bg-gray-200 text-gray-700'
  };

  return (
    <span className={`${colors[type]} text-xs px-2 py-1 rounded-full`}>
      {type.charAt(0) + type.slice(1).toLowerCase()}
    </span>
  );
};

export const ShopCard = ({ shop, compact = false }: ShopCardProps) => {
  if (compact) {
    return (
      <Link to={`/boutique/${shop.id}`} className="group">
        <div className="aspect-square relative overflow-hidden rounded-md">
          <img
            src={shop.image}
            alt={shop.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2">
            <ShopBadge type={shop.shopType} />
          </div>
        </div>
        <div className="mt-2 space-y-1">
          <p className="text-sm font-medium text-dark-gray">{shop.name}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-soft-gold text-soft-gold" />
            <span className="text-sm text-gray-600">{shop.shopRating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/boutique/${shop.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="aspect-video relative overflow-hidden">
        <img
          src={shop.image}
          alt={shop.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-3 right-3">
          <ShopBadge type={shop.shopType} />
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-playfair text-xl text-dark-gray">{shop.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-soft-gold text-soft-gold" />
            <span className="font-medium">{shop.shopRating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({shop.totalReviews})</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">{shop.description}</p>
        <div className="flex flex-wrap gap-2">
          {shop.tags.map((tag, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="pt-2 flex items-center justify-between text-sm text-gray-500">
          <span>{shop.totalSales} ventes</span>
          <span>Membre depuis {new Date(shop.joinedDate).getFullYear()}</span>
        </div>
      </div>
    </Link>
  );
};