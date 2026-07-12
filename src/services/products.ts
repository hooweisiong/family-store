import { api } from '@/lib/api';
import { Product } from '@/types';
import { PaginatedResponse } from '@/types/api';

export const productService = {
  list: (params?: { search?: string; page?: number; limit?: number }) =>
    api.get<PaginatedResponse<Product>>(
      `/products?${new URLSearchParams(params as Record<string, string>).toString()}`
    ),

  getById: (id: string) => api.get<Product>(`/products/${id}`),

  getByBarcode: (barcode: string) =>
    api.get<Product>(`/products/barcode/${barcode}`),

  create: (data: Partial<Product>) =>
    api.post<Product>('/products', data),

  update: (id: string, data: Partial<Product>) =>
    api.put<Product>(`/products/${id}`, data),

  delete: (id: string) => api.delete<void>(`/products/${id}`),
};
