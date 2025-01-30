import { Product } from "./product";

export interface Shop {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  rating: number;
  totalSales: number;
  totalReviews: number;
  shopType: "PREMIUM" | "VERIFIED" | "STANDARD";
  tags: string[];
  joinedDate: string;
}

export interface Category {
  id: string;
  isTopCategory: boolean;
  title: string;
  description: string;
  shops: Shop[];
  products?: Product[];
}
