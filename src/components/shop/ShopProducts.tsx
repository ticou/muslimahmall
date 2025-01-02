import React, { useState } from 'react';
import { ProductCard } from '../products/ProductCard';
import { ShopSidebar } from './ShopSidebar';
import { Product } from '../../types/product';
import { Shop } from '../../types/shop';

interface ShopProductsProps {
  shop: Shop;
  products: Product[];
}

export const ShopProducts = ({ shop, products }: ShopProductsProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [minRating, setMinRating] = useState<number>(0);

  // Filtrer les produits
  const filteredProducts = products.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategories = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesTags = selectedTags.length === 0 || product.tags.some(tag => selectedTags.includes(tag));
    const matchesRating = product.rating >= minRating;
    
    return matchesPrice && matchesCategories && matchesTags && matchesRating;
  });

  // Trier les produits
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return -1; // Simulé car nous n'avons pas de date
      default:
        return 0;
    }
  });

  // Extraire toutes les catégories uniques
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  // Extraire tous les tags uniques
  const tags = Array.from(new Set(products.flatMap(p => p.tags)));

  // Trouver le prix minimum et maximum
  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  return (
    <div className="flex gap-6">
      <ShopSidebar
        categories={categories}
        tags={tags}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        sortBy={sortBy}
        setSortBy={setSortBy}
        minRating={minRating}
        setMinRating={setMinRating}
        minPrice={minPrice}
        maxPrice={maxPrice}
      />
      
      <div className="flex-1">
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};