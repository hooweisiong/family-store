import { StateCreator } from 'zustand';
import { Order, Notification } from '@/types';

export interface OrderSlice {
  orders: Order[];
  activeOrder: Order | null;
  socketStatus: 'disconnected' | 'connecting' | 'connected';
  notifications: Notification[];
  setOrders: (orders: Order[]) => void;
  setActiveOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderTotal: (orderId: string, total: number) => void;
  updatePickupSlot: (orderId: string, slot: string) => void;
  toggleItemPicked: (orderId: string, itemId: string) => void;
  markAllItemsPicked: (orderId: string) => void;
  addNotification: (notif: Omit<Notification, 'id' | 'created_at' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  setSocketStatus: (status: 'disconnected' | 'connecting' | 'connected') => void;
}

export const createOrderSlice: StateCreator<OrderSlice> = (set) => ({
  orders: [],
  activeOrder: null,
  socketStatus: 'disconnected',
  notifications: [],

  setOrders: (orders) => set({ orders }),

  setActiveOrder: (order) => set({ activeOrder: order }),

  updateOrderStatus: (orderId, status) =>
    set((state) => {
      const updateOrder = (order: Order) =>
        order.id === orderId ? { ...order, status } : order;
      return {
        orders: state.orders.map(updateOrder),
        activeOrder:
          state.activeOrder?.id === orderId
            ? { ...state.activeOrder, status }
            : state.activeOrder,
      };
    }),

  updateOrderTotal: (orderId, total) =>
    set((state) => {
      const updateOrder = (order: Order) =>
        order.id === orderId ? { ...order, total_price: total } : order;
      return {
        orders: state.orders.map(updateOrder),
        activeOrder:
          state.activeOrder?.id === orderId
            ? { ...state.activeOrder, total_price: total }
            : state.activeOrder,
      };
    }),

  updatePickupSlot: (orderId, slot) =>
    set((state) => {
      const updateOrder = (order: Order) =>
        order.id === orderId ? { ...order, pickup_slot: slot } : order;
      return {
        orders: state.orders.map(updateOrder),
        activeOrder:
          state.activeOrder?.id === orderId
            ? { ...state.activeOrder, pickup_slot: slot }
            : state.activeOrder,
      };
    }),

  toggleItemPicked: (orderId, itemId) =>
    set((state) => {
      const toggle = (order: Order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          items: order.items.map((item) =>
            item.id === itemId ? { ...item, picked: !item.picked } : item
          ),
        };
      };
      return {
        orders: state.orders.map(toggle),
        activeOrder: state.activeOrder?.id === orderId ? toggle(state.activeOrder) : state.activeOrder,
      };
    }),

  markAllItemsPicked: (orderId) =>
    set((state) => {
      const mark = (order: Order) => {
        if (order.id !== orderId) return order;
        return {
          ...order,
          items: order.items.map((item) => ({ ...item, picked: true })),
        };
      };
      return {
        orders: state.orders.map(mark),
        activeOrder: state.activeOrder?.id === orderId ? mark(state.activeOrder) : state.activeOrder,
      };
    }),

  addNotification: (notif) =>
    set((state) => ({
      notifications: [
        {
          ...notif,
          id: `notif-${Date.now()}`,
          created_at: new Date().toISOString(),
          read: false,
        },
        ...state.notifications,
      ],
    })),

  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  clearNotifications: () => set({ notifications: [] }),

  setSocketStatus: (status) => set({ socketStatus: status }),
});
