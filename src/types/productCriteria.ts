import {
  CHEAP_PRODUCTS,
  TOP_RATED_PRODUCTS,
  TRENDING_PRODUCTS,
} from "@/data/products";
import { Product } from "./product";

export type ProductCriteria = "trending" | "cheap" | "top-rated";

export interface ProductCriteriaConfig {
  title: string;
  description: string;
  getProducts: () => Product[];
}

export const PRODUCT_CRITERIA: Record<ProductCriteria, ProductCriteriaConfig> =
  {
    trending: {
      title: "Produits les plus demandés",
      description:
        "Découvrez notre sélection des produits les plus populaires et tendance du moment.",
      getProducts: () => TRENDING_PRODUCTS,
    },
    cheap: {
      title: "Les petits prix",
      description:
        "Notre sélection de produits à prix mini pour faire plaisir à votre porte-monnaie.",
      getProducts: () => CHEAP_PRODUCTS,
    },
    "top-rated": {
      title: "Meilleures notes",
      description: "Les produits les mieux notés par notre communauté.",
      getProducts: () => TOP_RATED_PRODUCTS,
    },
  };
