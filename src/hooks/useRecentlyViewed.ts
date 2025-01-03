import { useState, useEffect } from "react";
import { Product } from "../types/product";

const STORAGE_KEY = "recently_viewed";
const MAX_ITEMS = 4;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  const addProduct = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    recentlyViewed,
    addProduct,
  };
};
