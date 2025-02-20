import React from 'react';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/products/ProductCard';
import { SEO } from '@/components/seo/SEO';

export const ClothingPage = () => {
  // Filtrer tous les produits de la catégorie vêtements
  const clothingProducts = [...TRENDING_PRODUCTS, ...CHEAP_PRODUCTS, ...TOP_RATED_PRODUCTS]
    .filter(product => product.category === 'vetements');

    return (
      
         <>
      <SEO
        title="Vêtements Islamiques"
        description="Large collection de vêtements islamiques : abayas, jilbabs, robes et tenues modestes. Des vêtements élégants et confortables pour femmes musulmanes."
        keywords={[
          'vêtements islamiques',
          'abaya',
          'jilbab',
          'robe modeste',
          'tenue musulmane'
        ]}
      />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        Vêtements
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {clothingProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div></>
  );
};