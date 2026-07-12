import { api } from '@/lib/api';
import { Order } from '@/types';
import { PaginatedResponse } from '@/types/api';

export interface CreateOrderPayload {
  items: { product_id: string; quantity: number }[];
  delivery_fee: number;
}

export const orderService = {
  list: (params?: { status?: string; page?: number }) =>
    api.get<PaginatedResponse<Order>>(
      `/orders?${new URLSearchParams(params as Record<string, string>).toString()}`
    ),

  getById: (id: string) => api.get<Order>(`/orders/${id}`),

  create: (data: CreateOrderPayload) =>
    api.post<Order>('/orders', data),

  updateStatus: (id: string, status: string) =>
    api.patch<Order>(`/orders/${id}/status`, { status }),
};
