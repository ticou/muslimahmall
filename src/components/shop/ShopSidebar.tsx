import React from 'react';
import { Star } from 'lucide-react';

interface ShopSidebarProps {
  categories: string[];
  tags: string[];
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  minPrice: number;
  maxPrice: number;
}

export const ShopSidebar = ({
  categories,
  tags,
  priceRange,
  setPriceRange,
  selectedCategories,
  setSelectedCategories,
  selectedTags,
  setSelectedTags,
  sortBy,
  setSortBy,
  minRating,
  setMinRating,
  minPrice,
  maxPrice,
}: ShopSidebarProps) => {
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <aside className="w-64 flex-shrink-0 space-y-6">
      {/* Tri */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-medium text-dark-gray mb-3">Trier par</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="featured">En vedette</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="rating">Meilleures notes</option>
          <option value="newest">Plus récents</option>
        </select>
      </div>

      {/* Prix */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-medium text-dark-gray mb-3">Prix</h3>
        <div className="space-y-2">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="w-24 p-1 border rounded-md"
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-24 p-1 border rounded-md"
            />
            <span>€</span>
          </div>
        </div>
      </div>

      {/* Note minimale */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-medium text-dark-gray mb-3">Note minimale</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="accent-soft-gold"
              />
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < rating
                        ? 'fill-soft-gold text-soft-gold'
                        : 'fill-gray-200 text-gray-200'
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-gray-600">et plus</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Catégories */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-medium text-dark-gray mb-3">Catégories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="accent-soft-gold"
              />
              <span className="text-gray-600 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="font-medium text-dark-gray mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagChange(tag)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedTags.includes(tag)
                  ? 'bg-soft-gold text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};