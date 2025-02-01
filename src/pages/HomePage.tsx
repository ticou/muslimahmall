import React, { useEffect, useState } from 'react';
import { SEO } from '../components/seo/SEO';
import { Hero } from '../components/ui/Hero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { ScrollableProductList } from '../components/home/ScrollableProductList';
import { EventsSection } from '../components/home/EventsSection';
import { SHOP_CATEGORIES } from '../data/shops';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../data/products';
import { CURRENT_EVENTS } from '../data/events';
import MyLoader from '@/components/ui/MyLoader';
import { Constant, HttpMethod, SizeLoader } from '@/utils/constants';
import { useAPIRequest } from '@/hooks/use-api-request';
import { ResponseAPI } from '@/types/response';
import { Category } from '@/types/shop';
import { API } from '@/config/api.config';
import MyError from '@/components/ui/MyError';

export const HomePage = () => {
  // const categoryGroups = [];
  const { data, loading, error, executeRequest } = useAPIRequest<ResponseAPI<Category>>();


    // recuperation des tops categories
     useEffect(() => {
        executeRequest(HttpMethod.GET, API.CATEGORIES.BASE + Constant.paramsQuestions + Constant.paramsIsTopCategorie + true);
     }, []);
  //
  const [categoryGroups, setCategoryGroups] = useState<Category[][]>([]);
  
  // maj de categoryGroups
   useEffect(() => {
     if (data?.data) {
            const groups: Category[][] = [];

        // Transformer les données de l'API en format menuItems
        for (let i = 0; i < data.data.length; i += 4) {
          groups.push(data.data.slice(i, i + 4));
        }
        setCategoryGroups(groups);

      }
   }, [data]);
  
 
  
  // for (let i = 0; i < SHOP_CATEGORIES.length; i += 4) {
  //   categoryGroups.push(SHOP_CATEGORIES.slice(i, i + 4));
  // }

  if (loading) {
  return <MyLoader size={SizeLoader.large}  fullScreen={false}/>;
  }

  if (error) {
    return <MyError message={error} type="info" onClose={() => {}} showIcon={true} />; // Afficher un message d'erreur si une erreur s'est produite>;
  }

  return (
    <>
      <SEO
        title="Accueil"
        description="Découvrez MuslimahMall, votre marketplace de mode islamique féminine. Large sélection d'abayas, hijabs et accessoires modestes."
        keywords={[
          'marketplace islamique',
          'mode musulmane',
          'vêtements modestes',
          'abaya',
          'hijab',
          'accessoires musulmans'
        ]}
      />
      <Hero />
      <main className="container mx-auto px-4 py-8 space-y-12">
        {categoryGroups.map((group, index) => (
          <CategoryGrid 
            key={index}
            categories={group}
          />
        ))}

        <ScrollableProductList
          title="Produits les plus demandés"
          products={TRENDING_PRODUCTS}
          criteria="trending"
        />

        <EventsSection events={CURRENT_EVENTS} />

        <ScrollableProductList
          title="Les petits prix"
          products={CHEAP_PRODUCTS}
          criteria="cheap"
        />

        <div className="space-y-8">
          <ScrollableProductList
            title="Sélection Modest Fashion"
            products={TOP_RATED_PRODUCTS.filter(p => p.shopName === "modest-fashion")}
          />
          
          <ScrollableProductList
            title="Collection Hijab Élégance"
            products={TOP_RATED_PRODUCTS.filter(p => p.shopName === "hijab-elegance")}
          />

          <ScrollableProductList
            title="Parfums d'Exception"
            products={TOP_RATED_PRODUCTS.filter(p => p.shopName === "attar-collection")}
          />
        </div>
      </main>
    </>
  );
};