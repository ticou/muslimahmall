import { useState, useEffect } from "react";
import { Product } from "../types/product";

interface InstallmentPayment {
  dueDate: string;
  amount: number;
  paid: boolean;
}

interface Installment {
  id: string;
  orderId: string;
  startDate: string;
  totalAmount: number;
  remainingAmount: number;
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  schedule: InstallmentPayment[];
}

export const usePayments = () => {
  const [installments, setInstallments] = useState<Installment[]>([]);

  useEffect(() => {
    // Simuler le chargement des données
    setInstallments([
      {
        id: "1",
        orderId: "123",
        startDate: "2024-03-01T10:00:00Z",
        totalAmount: 300,
        remainingAmount: 200,
        items: [
          {
            product: {
              id: "abaya-premium-1",
              name: "Abaya Premium Collection",
              description: "Abaya en soie avec broderies artisanales",
              price: 249.99,
              image:
                "https://images.unsplash.com/photo-1631233859262-0d7b12ea7d4c?auto=format&fit=crop&q=80&w=400",
              // shopId: "modest-fashion",
              shopName: "modest-fashion",
              category: "vetements",
              rating: 4.8,
              totalReviews: 245,
              inStock: true,
              tags: ["Premium", "Abaya", "Soie"],
            },
            quantity: 1,
            price: 249.99,
          },
        ],
        schedule: [
          {
            dueDate: "2024-03-01T10:00:00Z",
            amount: 100,
            paid: true,
          },
          {
            dueDate: "2024-04-01T10:00:00Z",
            amount: 100,
            paid: false,
          },
          {
            dueDate: "2024-05-01T10:00:00Z",
            amount: 100,
            paid: false,
          },
        ],
      },
    ]);
  }, []);

  return {
    installments,
  };
};
