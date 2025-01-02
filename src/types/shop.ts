export interface Shop {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  rating: number;
  totalSales: number;
  totalReviews: number;
  shopType: 'PREMIUM' | 'VERIFIED' | 'STANDARD';
  tags: string[];
  joinedDate: string;
}