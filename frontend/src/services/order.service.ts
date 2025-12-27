import api from "./api";

export interface OrderItemPayload {
  productId: number;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItemPayload[];
  shippingLine1: string;
  shippingLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: number;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export const orderService = {
  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const res = await api.post<Order>("/orders", payload);
    return res.data;
  },

  async getMyOrders(): Promise<Order[]> {
    const res = await api.get<Order[]>("/orders/my");
    return res.data;
  },

  async getAllOrders(): Promise<Order[]> {
    const res = await api.get<Order[]>("/orders");
    return res.data;
  },
};
