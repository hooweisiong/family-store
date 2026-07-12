'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';

export default function PickerDashboardPage() {
  const router = useRouter();
  const storeOrders = useStore((s) => s.orders);
  const [pickerName, setPickerName] = useState('');
  const [newAlert, setNewAlert] = useState(false);
  const prevCount = useRef(0);

  useEffect(() => {
    const pid = sessionStorage.getItem('picker_id');
    if (!pid) { router.push('/picker'); return; }
    setPickerName(sessionStorage.getItem('picker_name') || 'Picker');
  }, []);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'familystore_orders') {
        useStore.getState().setOrders(JSON.parse(e.newValue || '[]'));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    const pending = storeOrders.filter((o) => o.status === 'pending' || o.status === 'picking').length;
    if (prevCount.current > 0 && pending > prevCount.current) {
      setNewAlert(true);
      setTimeout(() => setNewAlert(false), 5000);
    }
    prevCount.current = pending;
  }, [storeOrders]);

  const pendingOrders = storeOrders.filter((o) => o.status === 'pending' || o.status === 'picking');

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/picker');
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-700',
      picking: 'bg-blue-100 text-blue-700',
      ready_for_pickup: 'bg-green-100 text-green-700',
      paid: 'bg-purple-100 text-purple-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-purple-700 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Picker Dashboard</h1>
            <p className="text-sm text-purple-200">Welcome, {pickerName}</p>
          </div>
          <button onClick={handleLogout} className="text-sm text-purple-200 hover:text-white">Sign Out</button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-4">
        {newAlert && (
          <div className="bg-green-100 border border-green-300 text-green-800 rounded-xl p-4 flex items-center gap-2 animate-pulse">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="text-sm font-medium">New order received!</span>
          </div>
        )}

        <h2 className="text-xl font-bold text-purple-800">Orders to Pick ({pendingOrders.length})</h2>

        {pendingOrders.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center text-gray-500 border border-purple-100">
            <svg className="w-12 h-12 mx-auto mb-3 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mb-2">No orders yet</p>
            <p className="text-xs">Waiting for customers to place orders...</p>
          </div>
        ) : (
          pendingOrders.map((order) => (
            <div
              key={order.id}
              onClick={() => router.push(`/picker/orders/${order.id}`)}
              className="bg-white rounded-xl border border-purple-100 p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-mono text-sm text-gray-500">#{order.id.slice(0, 8)}</span>
                  <span className="ml-3 text-sm font-medium text-gray-700">{order.customer_name || 'Customer'}</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusBadge(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{order.items.length} items</span>
                <span className={`text-xs font-medium ${order.payment_method === 'pay_online' ? 'text-green-600' : 'text-amber-600'}`}>
                  {order.payment_method === 'pay_online' ? 'Paid Online' : 'Pay on Pickup'}
                </span>
              </div>
              <div className="mt-2 flex gap-1.5 flex-wrap">
                {order.items.map((item) => (
                  <span key={item.id} className={`text-xs px-2 py-0.5 rounded ${item.picked ? 'bg-green-100 text-green-700 line-through' : 'bg-gray-100 text-gray-500'}`}>
                    {item.product?.name || 'Item'} {item.product?.unit_type === 'weight' ? `${item.quantity}kg` : `x${item.quantity}`}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
