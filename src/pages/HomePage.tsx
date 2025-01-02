import React from 'react';
import { Hero } from '../components/ui/Hero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { ScrollableProductList } from '../components/home/ScrollableProductList';
import { EventsSection } from '../components/home/EventsSection';
import { SHOP_CATEGORIES } from '../data/shops';
import { TRENDING_PRODUCTS, CHEAP_PRODUCTS, TOP_RATED_PRODUCTS } from '../data/products';
import { CURRENT_EVENTS } from '../data/events';

export const HomePage = () => {
  // Diviser les catégories en groupes de 4 pour l'affichage
  const categoryGroups = [];
  for (let i = 0; i < SHOP_CATEGORIES.length; i += 4) {
    categoryGroups.push(SHOP_CATEGORIES.slice(i, i + 4));
  }

  return (
    <div>
      <Hero />
      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Affichage des catégories par groupes de 4 */}
        {categoryGroups.map((group, index) => (
          <CategoryGrid 
            key={index}
            categories={group}
          />
        ))}

        {/* Produits tendance */}
        <ScrollableProductList
          title="Produits les plus demandés"
          products={TRENDING_PRODUCTS}
          viewAll="/produits/tendance"
        />

        {/* Événements en cours */}
        <EventsSection events={CURRENT_EVENTS} />

        {/* Produits pas chers */}
        <ScrollableProductList
          title="Les petits prix"
          products={CHEAP_PRODUCTS}
          viewAll="/produits/petits-prix"
        />

        {/* Sélections des meilleures boutiques */}
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
    </div>
  );
};