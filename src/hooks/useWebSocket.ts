'use client';

import { useEffect } from 'react';
import { useStore } from '@/store';
import { wsService } from '@/services/websocket';
import { Order } from '@/types';

export function useWebSocket() {
  const token = useStore((s) => s.token);
  const setSocketStatus = useStore((s) => s.setSocketStatus);
  const updateOrderStatus = useStore((s) => s.updateOrderStatus);

  useEffect(() => {
    if (!token) return;

    const onStatus = (data: unknown) => setSocketStatus(data as 'disconnected' | 'connecting' | 'connected');
    const onOrderUpdate = (data: unknown) => {
      const { order_id, status } = data as { order_id: string; status: Order['status'] };
      updateOrderStatus(order_id, status);
    };

    wsService.on('status', onStatus);
    wsService.on('order_update', onOrderUpdate);

    wsService.connect(token);

    return () => {
      wsService.disconnect();
      wsService.off('status', onStatus);
      wsService.off('order_update', onOrderUpdate);
    };
  }, [token, setSocketStatus, updateOrderStatus]);
}
