import React from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '../../components/seo/SEO';
import { ProductCard } from '../../components/products/ProductCard';
import { PRODUCT_CRITERIA, ProductCriteria } from '../../types/productCriteria';

export const ProductListPage = () => {
  const { criteriaId } = useParams<{ criteriaId: ProductCriteria }>();
  const criteria = PRODUCT_CRITERIA[criteriaId as ProductCriteria];

  if (!criteria) {
    return <div>Critère non trouvé</div>;
  }

  const products = criteria.getProducts();

  return (
    <>
      <SEO
        title={criteria.title}
        description={criteria.description}
        keywords={[
          'mode islamique',
          'vêtements musulmans',
          'accessoires musulmans',
          criteriaId,
          'shopping musulman'
        ]}
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-4">
          {criteria.title}
        </h1>
        <p className="text-gray-600 mb-8">{criteria.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};