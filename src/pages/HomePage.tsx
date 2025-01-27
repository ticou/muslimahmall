import React from 'react';
import { SEO } from '../components/seo/SEO';
import { Hero } from '../components/ui/Hero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { ScrollableProductList } from '../components/home/ScrollableProductList';
import { EventsSection } from '../components/home/EventsSection';
import { SHOP_CATEGORIES } from '../data/shops';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../data/products';
import { CURRENT_EVENTS } from '../data/events';

export const HomePage = () => {
  const categoryGroups = [];
  for (let i = 0; i < SHOP_CATEGORIES.length; i += 4) {
    categoryGroups.push(SHOP_CATEGORIES.slice(i, i + 4));
  }

  // if (loading) {
  // return <MyLoader size={"small"}  fullScreen={false}/>;
  // }

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
            products={TOP_RATED_PRODUCTS.filter(p => p.shopId === "modest-fashion")}
          />
          
          <ScrollableProductList
            title="Collection Hijab Élégance"
            products={TOP_RATED_PRODUCTS.filter(p => p.shopId === "hijab-elegance")}
          />

          <ScrollableProductList
            title="Parfums d'Exception"
            products={TOP_RATED_PRODUCTS.filter(p => p.shopId === "attar-collection")}
          />
        </div>
      </main>
    </>
  );
};