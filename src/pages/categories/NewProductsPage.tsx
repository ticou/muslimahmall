import React from 'react';
import { TRENDING_PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/products/ProductCard';
import { SEO } from '@/components/seo/SEO';

export const NewProductsPage = () => {
    return (
      
        <>
      <SEO
        title="Nouveautés Mode Islamique"
        description="Découvrez nos dernières nouveautés en mode islamique : collections exclusives d'abayas, hijabs et accessoires. Les dernières tendances de la mode modeste."
        keywords={[
          'nouveautés mode islamique',
          'nouvelle collection',
          'tendances mode modeste',
          'dernières abayas',
          'nouveaux hijabs'
        ]}
      />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Nouveautés
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TRENDING_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div></>
  );
};