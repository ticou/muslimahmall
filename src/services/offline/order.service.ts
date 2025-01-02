import {
  Order,
  Address,
  PaymentDetails,
  PaymentMethod,
} from "../../types/order";
import { orders, addresses } from "./data";

import ReviewService from "../../services/review.service";

class OrderOfflineService {
  private static instance: OrderOfflineService;

  private constructor() {}

  static getInstance(): OrderOfflineService {
    if (!OrderOfflineService.instance) {
      OrderOfflineService.instance = new OrderOfflineService();
    }
    return OrderOfflineService.instance;
  }

  async createOrder(
    items: { productId: string; quantity: number }[],
    addressId: string,
    paymentMethod: PaymentMethod,
    paymentDetails: PaymentDetails
  ): Promise<Order> {
    // Simuler la création d'une commande
    const userId = "user1"; // Dans un cas réel, ceci viendrait du contexte d'authentification
    const shippingAddress = addresses[userId].find(
      (addr) => addr.id === addressId
    );
    if (!shippingAddress) throw new Error("Address not found");

    const newOrder: Order = {
      id: `order${Date.now()}`,
      userId,
      items: items.map((item) => ({
        product: {
          id: item.productId,
          name: "Product Name", // Dans un cas réel, ces informations viendraient d'une base de données
          price: 100,
          image: "image-url",
          description: "description",
          shopId: "shop1",
          category: "category",
          rating: 5,
          totalReviews: 0,
          inStock: true,
          tags: [],
        },
        quantity: item.quantity,
        price: 100 * item.quantity,
      })),
      subtotal: 100,
      shippingCost: 10,
      total: 110,
      status: "PENDING",
      paymentMethod: paymentMethod,
      shippingAddress,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (!orders[userId]) {
      orders[userId] = [];
    }
    orders[userId].push(newOrder);

    return newOrder;
  }

  async getOrders(): Promise<Order[]> {
    const userId = "user1"; // Dans un cas réel, ceci viendrait du contexte d'authentification
    return orders[userId] || [];
  }

  async getOrder(orderId: string): Promise<Order> {
    const userId = "user1";
    const order = orders[userId]?.find((o) => o.id === orderId);
    if (!order) throw new Error("Order not found");
    return order;
  }

  async addAddress(address: Omit<Address, "id" | "userId">): Promise<Address> {
    const userId = "user1";
    const newAddress: Address = {
      ...address,
      id: `addr${Date.now()}`,
      userId,
    };

    if (!addresses[userId]) {
      addresses[userId] = [];
    }
    addresses[userId].push(newAddress);

    return newAddress;
  }

  async getAddresses(): Promise<Address[]> {
    const userId = "user1";
    return addresses[userId] || [];
  }

  async updateAddress(
    addressId: string,
    address: Partial<Address>
  ): Promise<Address> {
    const userId = "user1";
    const index = addresses[userId].findIndex((addr) => addr.id === addressId);
    if (index === -1) throw new Error("Address not found");

    addresses[userId][index] = {
      ...addresses[userId][index],
      ...address,
    };

    return addresses[userId][index];
  }

  async deleteAddress(addressId: string): Promise<void> {
    const userId = "user1";
    const index = addresses[userId].findIndex((addr) => addr.id === addressId);
    if (index === -1) throw new Error("Address not found");

    addresses[userId].splice(index, 1);
  }

  async setDefaultAddress(addressId: string): Promise<void> {
    const userId = "user1";
    addresses[userId].forEach((addr) => {
      addr.isDefault = addr.id === addressId;
    });
  }

  async addReview(
    orderId: string,
    productId: string,
    rating: number,
    comment: string
  ): Promise<void> {
    const userId = "user1"; // Dans un cas réel, ceci viendrait du contexte d'authentification
    const order = await this.getOrder(orderId);

    if (order.status !== "DELIVERED") {
      throw new Error("Cannot review undelivered order");
    }

    const orderItem = order.items.find((item) => item.product.id === productId);
    if (!orderItem) {
      throw new Error("Product not found in order");
    }

    // Ajouter l'avis via le service de gestion des avis
    await ReviewService.addReview(
      productId,
      userId,
      order.shippingAddress.fullName,
      rating,
      comment
    );
  }
}

export default OrderOfflineService.getInstance();
