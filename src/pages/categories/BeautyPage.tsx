import React from 'react';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/products/ProductCard';
import { SEO } from '@/components/seo/SEO';

export const BeautyPage = () => {
  // Filtrer tous les produits de la catégorie beauté
  const beautyProducts = [...TRENDING_PRODUCTS, ...CHEAP_PRODUCTS, ...TOP_RATED_PRODUCTS]
    .filter(product => product.category === 'beaute');

    return (
      
         <>
      <SEO
        title="Beauté Halal"
        description="Explorez notre gamme de produits de beauté halal : soins, parfums et cosmétiques. Des produits naturels et certifiés pour prendre soin de vous."
        keywords={[
          'beauté halal',
          'cosmétiques halal',
          'parfums sans alcool',
          'soins naturels',
          'maquillage halal'
        ]}
      />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Beauté
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {beautyProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
            </div>
            </>
  );
};