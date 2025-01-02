import api from "./api";
import { Order, Address, PaymentDetails } from "../types/order";

class OrderService {
  private static instance: OrderService;

  private constructor() {}

  static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService();
    }
    return OrderService.instance;
  }

  async createOrder(
    items: { productId: string; quantity: number }[],
    addressId: string,
    paymentMethod: string,
    paymentDetails: PaymentDetails
  ): Promise<Order> {
    const { data } = await api.post<Order>("/orders", {
      items,
      addressId,
      paymentMethod,
      paymentDetails,
    });
    return data;
  }

  async getOrders(): Promise<Order[]> {
    const { data } = await api.get<Order[]>("/orders");
    return data;
  }

  async getOrder(orderId: string): Promise<Order> {
    const { data } = await api.get<Order>(`/orders/${orderId}`);
    return data;
  }

  async addAddress(address: Omit<Address, "id" | "userId">): Promise<Address> {
    const { data } = await api.post<Address>("/addresses", address);
    return data;
  }

  async getAddresses(): Promise<Address[]> {
    const { data } = await api.get<Address[]>("/addresses");
    return data;
  }

  async updateAddress(
    addressId: string,
    address: Partial<Address>
  ): Promise<Address> {
    const { data } = await api.put<Address>(`/addresses/${addressId}`, address);
    return data;
  }

  async deleteAddress(addressId: string): Promise<void> {
    await api.delete(`/addresses/${addressId}`);
  }

  async setDefaultAddress(addressId: string): Promise<void> {
    await api.put(`/addresses/${addressId}/default`);
  }

  async addReview(
    orderId: string,
    productId: string,
    rating: number,
    comment: string
  ): Promise<void> {
    await api.post(`/orders/${orderId}/reviews`, {
      productId,
      rating,
      comment,
    });
  }
}

export default OrderService.getInstance();
