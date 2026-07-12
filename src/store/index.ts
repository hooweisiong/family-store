import { create } from 'zustand';
import { createCartSlice, CartSlice } from './slices/cartSlice';
import { createAuthSlice, AuthSlice } from './slices/authSlice';
import { createOrderSlice, OrderSlice } from './slices/orderSlice';
import type { Order } from '@/types';

const ORDERS_KEY = 'familystore_orders';

function loadOrders(): Order[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveOrders(orders: Order[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export type AppStore = CartSlice & AuthSlice & OrderSlice;

export const useStore = create<AppStore>()((...a) => ({
  ...createCartSlice(...a),
  ...createAuthSlice(...a),
  ...createOrderSlice(...a),
  orders: loadOrders(),
}));

useStore.subscribe((state) => {
  saveOrders(state.orders);
});
