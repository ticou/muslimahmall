import { useState, useCallback } from "react";
import { Product } from "../types/product";
import {
  TRENDING_PRODUCTS,
  CHEAP_PRODUCTS,
  TOP_RATED_PRODUCTS,
} from "../data/products";

export const useSearch = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchProducts = useCallback((query: string) => {
    setIsSearching(true);

    // Combiner tous les produits
    const allProducts = [
      ...TRENDING_PRODUCTS,
      ...CHEAP_PRODUCTS,
      ...TOP_RATED_PRODUCTS,
    ];

    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Recherche insensible à la casse
    const normalizedQuery = query.toLowerCase().trim();

    const results = allProducts.filter((product) => {
      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedQuery)
        ) ||
        product.category.toLowerCase().includes(normalizedQuery)
      );
    });

    setSearchResults(results);
    setIsSearching(false);
  }, []);

  return {
    searchResults,
    isSearching,
    searchProducts,
  };
};
