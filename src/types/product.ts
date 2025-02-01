export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  shopId?: number;
  shopName: string;
  category: string;
  rating: number;
  totalReviews: number;
  inStock: boolean;
  tags: string[];
  discount?: number;
  categorieProduitId?: number;
  categorieProduitName?: string;

  dimensions?: string;
  isActive?: boolean;
  manufacturer?: string;
  quantiteReserver?: number;
  quantiteDisponible?: number;
  totalStock?: number;
  weight?: number;
  sku?: string;
  barcode?: string;
  productCode?: string;
  prixActuel?: number;
  prixDeBase?: number;
  version?: number;
}
