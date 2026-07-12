'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { OrderCard } from '@/components/orders/OrderCard';
import { Spinner } from '@/components/ui/Spinner';
import { Order } from '@/types';
import { useStore } from '@/store';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useStore((s) => s.token);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/auth');
      return;
    }
    const storeOrders = useStore.getState().orders;
    setOrders(storeOrders);
    setLoading(false);
  }, [token, router]);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">My Orders</h1>
        {loading ? (
          <div className="flex justify-center py-16"><Spinner size="lg" /></div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p>No orders yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} onClick={() => router.push(`/orders/${order.id}`)} />
            ))}
          </div>
        )}
      </main>
      <MobileNav />
    </>
  );
}
