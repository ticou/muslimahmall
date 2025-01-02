import { User } from "../../types/auth";
import { Order, Address, OrderStatus } from "../../types/order";
import {
  TRENDING_PRODUCTS,
  CHEAP_PRODUCTS,
  TOP_RATED_PRODUCTS,
} from "../../data/products";

// Fonction utilitaire pour obtenir un produit aléatoire
const getRandomProduct = () => {
  const allProducts = [
    ...TRENDING_PRODUCTS,
    ...CHEAP_PRODUCTS,
    ...TOP_RATED_PRODUCTS,
  ];
  return allProducts[Math.floor(Math.random() * allProducts.length)];
};

// Fonction utilitaire pour générer une date dans les 3 derniers mois
const getRandomDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3));
  return new Date(
    threeMonthsAgo.getTime() +
      Math.random() * (Date.now() - threeMonthsAgo.getTime())
  );
};

// Données utilisateurs
export const users: Record<string, User> = {
  user1: {
    id: "user1",
    email: "sarah@example.com",
    fullName: "Sarah M.",
    phone: "+33612345678",
    address: "123 Rue de Paris",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  user2: {
    id: "user2",
    email: "fatima@example.com",
    fullName: "Fatima R.",
    phone: "+33623456789",
    address: "45 Avenue des Champs-Élysées",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  user3: {
    id: "user3",
    email: "amina@example.com",
    fullName: "Amina K.",
    phone: "+33634567890",
    address: "78 Boulevard Haussmann",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
};

// Données des adresses
export const addresses: Record<string, Address[]> = {
  user1: [
    {
      id: "addr1",
      userId: "user1",
      fullName: "Sarah M.",
      phone: "+33612345678",
      street: "123 Rue de Paris",
      city: "Paris",
      postalCode: "75001",
      country: "France",
      isDefault: true,
    },
    {
      id: "addr2",
      userId: "user1",
      fullName: "Sarah M.",
      phone: "+33612345678",
      street: "45 Rue du Commerce",
      city: "Lyon",
      postalCode: "69001",
      country: "France",
      isDefault: false,
    },
  ],
  user2: [
    {
      id: "addr3",
      userId: "user2",
      fullName: "Fatima R.",
      phone: "+33623456789",
      street: "45 Avenue des Champs-Élysées",
      city: "Paris",
      postalCode: "75008",
      country: "France",
      isDefault: true,
    },
  ],
  user3: [
    {
      id: "addr4",
      userId: "user3",
      fullName: "Amina K.",
      phone: "+33634567890",
      street: "78 Boulevard Haussmann",
      city: "Paris",
      postalCode: "75009",
      country: "France",
      isDefault: true,
    },
    {
      id: "addr5",
      userId: "user3",
      fullName: "Amina K.",
      phone: "+33634567890",
      street: "12 Rue de la République",
      city: "Marseille",
      postalCode: "13001",
      country: "France",
      isDefault: false,
    },
  ],
};

// Fonction pour générer des commandes aléatoires
const generateOrders = (userId: string, count: number): Order[] => {
  return Array.from({ length: count }).map((_, index) => {
    const itemCount = Math.floor(Math.random() * 2) + 2; // 2-3 produits par commande
    const items = Array.from({ length: itemCount }).map(() => {
      const product = getRandomProduct();
      const quantity = Math.floor(Math.random() * 2) + 1;
      return {
        product,
        quantity,
        price: product.price * quantity,
      };
    });

    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const shippingCost = 10;
    const total = subtotal + shippingCost;

    const statuses: OrderStatus[] = [
      "PENDING",
      "PAID",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      id: `order${userId}${index + 1}`,
      userId,
      items,
      subtotal,
      shippingCost,
      total,
      status: randomStatus,
      paymentMethod: Math.random() > 0.5 ? "CARD" : "MOBILE_MONEY",
      shippingAddress: addresses[userId][0],
      createdAt: getRandomDate(),
      updatedAt: getRandomDate(),
    };
  });
};

// Données des commandes
export const orders: Record<string, Order[]> = {
  user1: generateOrders("user1", 5), // 5 commandes pour Sarah
  user2: generateOrders("user2", 3), // 3 commandes pour Fatima
  user3: generateOrders("user3", 4), // 4 commandes pour Amina
};
