import React from 'react';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/products/ProductCard';
import { SEO } from '@/components/seo/SEO';

export const AccessoriesPage = () => {
  // Filtrer tous les produits de la catégorie accessoires
  const accessoryProducts = [...TRENDING_PRODUCTS, ...CHEAP_PRODUCTS, ...TOP_RATED_PRODUCTS]
    .filter(product => product.category === 'accessoires');

    return (
       <>
      <SEO
        title="Accessoires Islamiques"
        description="Découvrez notre collection d'accessoires islamiques : hijabs, sous-hijabs, broches et plus encore. Des accessoires modestes et élégants pour compléter votre tenue."
        keywords={[
          'accessoires islamiques',
          'hijab',
          'sous-hijab',
          'broches hijab',
          'accessoires modestes'
        ]}
      />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Accessoires
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {accessoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div></>
  );
};