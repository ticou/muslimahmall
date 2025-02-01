import { Product } from "./product";

export interface Shop {
  id: string;
  name: string;
  image: string;
  bannerUrl?: string;
  contactEmail?: string;
  isFeatured?: boolean;
  motifStatus?: string;
  nom: string;
  phone: string;
  rccm?: string;
  status?: string;
  logoUrl?: string;
  totalDesVentes?: number;
  totalProducts?: number;
  // logoUrl?: string;
  // verificationLevel: "UNVERIFIED" | "BASIC" | "ADVANCED" | "PREMIUM";
  verificationLevel?: string;
  description: string;
  category: string;
  shopRating: number;
  businessAddress?: string;
  totalSales: number;
  totalReviews: number;
  shopType: "PREMIUM" | "VERIFIED" | "STANDARD";
  tags: string[];
  joinedDate: string;
}

export interface Category {
  id: string;
  isTopCategory: boolean;
  name: string;
  description: string;
  shops: Shop[];
  products?: Product[];
}
