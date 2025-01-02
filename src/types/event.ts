export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  discount: number;
  productIds: string[];
  type: 'SALE' | 'NEW_COLLECTION' | 'FLASH_SALE';
}