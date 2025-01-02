import { Event } from "@/types/event";
import { Product } from "../types/product";
import { Category, Shop } from "../types/shop";

export const useSEO = () => {
  const generateProductSchema = (product: Product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "EUR",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.totalReviews,
    },
  });

  const generateShopSchema = (shop: Shop) => ({
    "@context": "https://schema.org",
    "@type": "Store",
    name: shop.name,
    image: shop.image,
    description: shop.description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: shop.rating,
      reviewCount: shop.totalReviews,
    },
  });

  const generateCategorySchema = (category: Category) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: category.title,
    description: category.description,
    numberOfItems: category.shops.length,
    itemListElement: category.shops.map((shop, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Store",
        name: shop.name,
        image: shop.image,
        description: shop.description,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: shop.rating,
          reviewCount: shop.totalReviews,
        },
      },
    })),
  });

  const generateEventSchema = (event: Event) => ({
    "@context": "https://schema.org",
    "@type": "SaleEvent",
    name: event.title,
    description: event.description,
    image: event.image,
    startDate: event.startDate,
    endDate: event.endDate,
    offers: {
      "@type": "Offer",
      ...(event.discount && {
        discount: `${event.discount}% off`,
      }),
    },
    location: {
      "@type": "VirtualLocation",
      url: window.location.href,
    },
    organizer: {
      "@type": "Organization",
      name: "MuslimahMall",
      url: window.location.origin,
    },
  });

  return {
    generateProductSchema,
    generateShopSchema,
    generateCategorySchema,
    generateEventSchema,
  };
};
