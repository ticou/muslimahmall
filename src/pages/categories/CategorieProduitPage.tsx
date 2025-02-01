import React, { useEffect } from 'react';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../../data/products';
import { ProductCard } from '../../components/products/ProductCard';
import { SEO } from '@/components/seo/SEO';
import { useAPIRequest } from '@/hooks/use-api-request';
import { Constant, HttpMethod, SizeLoader } from '@/utils/constants';
import MyLoader from '@/components/ui/MyLoader';
import MyError from '@/components/ui/MyError';
import { ResponseAPI } from '@/types/response';
import { Category } from '@/types/shop';


export const CategorieProduitPage = ({ name }: { name: string }) => {
  
  const { data, loading, error, executeRequest } = useAPIRequest<ResponseAPI<Category>>();
  // recuperation des produits de la categorie en question

  useEffect(() => {
    executeRequest(HttpMethod.GET, Constant.endpointCategorieProduit + Constant.paramsQuestions +Constant.paramsName + name);
    }, []);
  // Filtrer tous les produits dPATCH || la catégorie maison
  const homeProducts = [...TRENDING_PRODUCTS, ...CHEAP_PRODUCTS, ...TOP_RATED_PRODUCTS]
    .filter(product => product.category === 'maison');
  

  
  if (loading) {
    return <MyLoader size={SizeLoader.medium}  fullScreen={false}/>;
  }
  if (error) {
    return <MyError message={error} type="info" onClose={() => {}} showIcon={true} />; // Afficher un message d'erreur si une erreur s'est produite>;
  }
    return (
       <>
      <SEO
        title={name}
        description="Embellissez votre intérieur avec notre collection de décoration islamique : calligraphie, tapis de prière, objets d'art et accessoires pour la maison."
        keywords={[
          'décoration islamique',
          'calligraphie arabe',
          'art islamique',
          'tapis de prière',
          'décor musulman',
          'accessoires islamiques',
          'hijab',
          'sous-hijab',
          'broches hijab',
          'accessoires modestes','vêtements islamiques',
          'abaya',
          'jilbab',
          'robe modeste',
          'tenue musulmane',
          'beauté halal',
          'cosmétiques halal',
          'parfums sans alcool',
          'soins naturels',
          'maquillage halal',
          'nouveautés mode islamique',
          'nouvelle collection',
          'tendances mode modeste',
          'dernières abayas',
          'nouveaux hijabs'
        ]}
      />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-bold text-dark-gray mb-8">
        {name }
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.data?.[0]?.products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div></>
  );
};