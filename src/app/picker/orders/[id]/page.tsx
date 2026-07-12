'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';

export default function PickerOrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const order = useStore((s) => s.orders.find((o) => o.id === id));
  const toggleItemPicked = useStore((s) => s.toggleItemPicked);
  const markAllItemsPicked = useStore((s) => s.markAllItemsPicked);
  const updateOrderStatus = useStore((s) => s.updateOrderStatus);
  const updateOrderTotal = useStore((s) => s.updateOrderTotal);
  const addNotification = useStore((s) => s.addNotification);
  const [totalInput, setTotalInput] = useState('');

  useEffect(() => {
    const pid = sessionStorage.getItem('picker_id');
    if (!pid) { router.push('/picker'); return; }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  const allPicked = order.items.length > 0 && order.items.every((i) => i.picked);
  const pickedCount = order.items.filter((i) => i.picked).length;

  const handleStartPicking = () => {
    updateOrderStatus(order.id, 'picking');
  };

  const handleReadyForPickup = () => {
    const total = parseFloat(totalInput);
    if (isNaN(total) || total <= 0) return;

    updateOrderTotal(order.id, total);
    updateOrderStatus(order.id, 'ready_for_pickup');
    addNotification({
      type: 'success',
      message: `Your order #${order.id.slice(0, 8)} is ready! Total: ${formatCurrency(total)}. Please pick up as soon as possible!`,
    });
    router.push('/picker/dashboard');
  };

  return (
    <div className="min-h-screen bg-purple-50">
      <header className="bg-purple-700 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <button onClick={() => router.push('/picker/dashboard')} className="text-purple-200 hover:text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-semibold">Pick Items</h1>
          <span className="text-sm text-purple-200">#{order.id.slice(0, 8)}</span>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-4">
        <div className="bg-white rounded-xl border border-purple-100 p-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold">{order.customer_name || 'Customer'}</h2>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              order.payment_method === 'pay_online' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {order.payment_method === 'pay_online' ? 'Paid Online' : 'Pay on Pickup'}
            </span>
          </div>
          <p className="text-sm text-gray-500">{pickedCount} of {order.items.length} picked</p>

          {order.status === 'pending' && (
            <Button size="sm" className="mt-3" onClick={handleStartPicking}>
              Start Picking
            </Button>
          )}
        </div>

        <div className="space-y-2">
          {order.items.map((item) => {
            const price = item.product?.price || 0;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border p-4 flex items-center gap-3 transition-colors ${
                  item.picked ? 'border-green-300 bg-green-50' : 'border-purple-100'
                }`}
              >
                <button
                  onClick={() => toggleItemPicked(order.id, item.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    item.picked
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {item.picked && (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${item.picked ? 'line-through text-gray-400' : ''}`}>
                    {item.product?.name || 'Product'}
                  </p>
                  <p className="text-xs text-gray-500">{formatCurrency(price)} each</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${item.picked ? 'text-green-600' : 'text-gray-700'}`}>
                    x{item.quantity}
                  </p>
                  <p className="text-xs text-gray-400">{formatCurrency(price * item.quantity)}</p>
                </div>
              </div>
            );
          })}
        </div>

        {allPicked && (
          <div className="bg-white rounded-xl border border-green-200 p-4 space-y-3">
            <h3 className="font-semibold text-sm text-green-800">All items picked!</h3>
            <p className="text-xs text-gray-500">Enter the total amount calculated by the cashier:</p>
            <Input
              type="number"
              step="0.01"
              value={totalInput}
              onChange={(e) => setTotalInput(e.target.value)}
              placeholder="Enter total amount..."
            />
            <Button size="lg" className="w-full" onClick={handleReadyForPickup} disabled={!totalInput || parseFloat(totalInput) <= 0}>
              Confirm & Notify Customer — {totalInput ? formatCurrency(parseFloat(totalInput)) : ''}
            </Button>
          </div>
        )}

        {!allPicked && (
          <Button variant="secondary" className="w-full" onClick={() => markAllItemsPicked(order.id)}>
            Mark All Picked
          </Button>
        )}
      </main>
    </div>
  );
}
