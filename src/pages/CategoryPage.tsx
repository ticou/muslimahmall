import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { SHOP_CATEGORIES } from '../data/shops';
import { ShopCard } from '../components/shops/ShopCard';
import { SEO } from '@/components/seo/SEO';
import { useSEO } from '@/hooks/useSEO';
import { Category } from '@/types/shop';

export const CategoryPage = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const category : Category= location.state?.category || {};  // Récupération des shops

  // const category = SHOP_CATEGORIES.find(cat => cat.id === categoryId);
  const { generateCategorySchema } = useSEO();

  if (!category) {
    return <div>Catégorie non trouvée</div>;
  }
    // Extraire les mots-clés des tags de toutes les boutiques de la catégorie
  const keywords = Array.from(new Set(
    category.shops.flatMap(shop => shop.tags)
  ));
    const schema = generateCategorySchema(category);


  return (
     <>
      <SEO
        title={category.name}
        description={category.description}
        keywords={[
          ...keywords,
          `boutiques ${category.name.toLowerCase()}`,
          'shopping islamique',
          'mode musulmane',
          'marketplace musulmane'
        ]}
        type="category"
      />
       <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-playfair text-3xl text-dark-gray mb-4">{category.name}</h1>
      <p className="text-gray-600 mb-8">{category.description}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div></>
  );
};