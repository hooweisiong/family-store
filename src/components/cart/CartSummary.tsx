'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function CartSummary() {
  const items = useStore((s) => s.items);
  const token = useStore((s) => s.token);
  const clearCart = useStore((s) => s.clearCart);
  const addNotification = useStore((s) => s.addNotification);
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'pay_when_pick' | 'pay_online'>('pay_when_pick');
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const handlePlaceOrder = async () => {
    if (!token) { router.push('/auth'); return; }
    setSubmitting(true);

    const newOrder = {
      id: `ord-${Date.now()}`,
      customer_id: 'cust-new',
      customer_name: 'You',
      total_price: 0,
      status: 'pending' as const,
      delivery_fee: 0,
      payment_method: paymentMethod,
      created_at: new Date().toISOString(),
      items: items.map((i, idx) => ({
        id: `oi-${Date.now()}-${idx}`,
        order_id: '',
        product_id: i.product.id,
        quantity: i.quantity,
        picked: false,
        product: i.product,
      })),
    };

    useStore.setState((s) => ({
      orders: [...s.orders, newOrder],
    }));

    addNotification({
      type: 'success',
      message: `Order placed! Your order #${newOrder.id.slice(0, 8)} is now being processed.`,
    });

    clearCart();
    setSubmitting(false);
    router.push('/orders');
  };

  return (
    <div className="bg-purple-50 rounded-xl p-4 space-y-3">
      <h3 className="font-semibold text-sm text-purple-900">Order Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        <div className="border-t border-purple-200 pt-3">
          <p className="text-xs font-medium text-purple-900 mb-2">Payment Method</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="pay_when_pick"
                checked={paymentMethod === 'pay_when_pick'}
                onChange={() => setPaymentMethod('pay_when_pick')}
                className="accent-purple-600"
              />
              <span className="text-sm">Pay when pick up</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="pay_online"
                checked={paymentMethod === 'pay_online'}
                onChange={() => setPaymentMethod('pay_online')}
                className="accent-purple-600"
              />
              <span className="text-sm">Pay online now — ready for pickup</span>
            </label>
          </div>
        </div>

        <div className="border-t border-purple-200 pt-2 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
      </div>

      <Button size="lg" className="w-full" onClick={handlePlaceOrder} disabled={submitting || items.length === 0}>
        {submitting ? 'Placing Order...' : paymentMethod === 'pay_online' ? `Pay ${formatCurrency(subtotal)}` : 'Place Order'}
      </Button>
    </div>
  );
}
