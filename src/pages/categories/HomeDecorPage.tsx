import React from 'react';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/products/ProductCard';
import { SEO } from '@/components/seo/SEO';

export const HomeDecorPage = () => {
  // Filtrer tous les produits de la catégorie maison
  const homeProducts = [...TRENDING_PRODUCTS, ...CHEAP_PRODUCTS, ...TOP_RATED_PRODUCTS]
    .filter(product => product.category === 'maison');

    return (
       <>
      <SEO
        title="Décoration Islamique"
        description="Embellissez votre intérieur avec notre collection de décoration islamique : calligraphie, tapis de prière, objets d'art et accessoires pour la maison."
        keywords={[
          'décoration islamique',
          'calligraphie arabe',
          'art islamique',
          'tapis de prière',
          'décor musulman'
        ]}
      />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Maison
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {homeProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div></>
  );
};