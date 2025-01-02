export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  shopId: string;
  category: string;
  rating: number;
  totalReviews: number;
  inStock: boolean;
  tags: string[];
  discount?: number;
}