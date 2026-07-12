'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/store';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Spinner } from '@/components/ui/Spinner';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatCurrency } from '@/lib/utils';
import { OrderStatus } from '@/types';

const TIME_SLOTS = [
  '9:45 AM - 10:45 AM',
  '10:45 AM - 11:45 AM',
  '11:45 AM - 12:45 PM',
  '12:45 PM - 1:45 PM',
  '1:45 PM - 2:45 PM',
  '2:45 PM - 3:45 PM',
  '3:45 PM - 4:45 PM',
  '4:45 PM - 5:45 PM',
  '5:45 PM - 6:45 PM',
  '6:45 PM - 7:45 PM',
  '7:45 PM - 8:45 PM',
  '8:45 PM - 9:45 PM',
];

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  picking: 'Picking Items',
  picked: 'Items Picked',
  ready_for_pickup: 'Ready for Pickup',
  paid: 'Paid',
  completed: 'Completed',
};

const statusVariants: Record<OrderStatus, 'warning' | 'info' | 'success'> = {
  pending: 'warning',
  picking: 'info',
  picked: 'info',
  ready_for_pickup: 'success',
  paid: 'success',
  completed: 'success',
};

export default function OrderDetailPage() {
  const { id } = useParams();
  const order = useStore((s) => s.orders.find((o) => o.id === id));
  const setActiveOrder = useStore((s) => s.setActiveOrder);
  const updatePickupSlot = useStore((s) => s.updatePickupSlot);
  const addNotification = useStore((s) => s.addNotification);
  const [showSlots, setShowSlots] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (order) setActiveOrder(order);
    return () => setActiveOrder(null);
  }, [order]);

  if (!mounted || !order) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center py-16"><Spinner size="lg" /></div>
        <MobileNav />
      </>
    );
  }

  const subtotal = order.items.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
  const isReady = order.status === 'ready_for_pickup' || order.status === 'paid';
  const isActive = order.status !== 'completed' && order.status !== 'paid';

  const handlePayOnline = () => {
    useStore.getState().updateOrderStatus(order.id, 'paid');
    addNotification({
      type: 'success',
      message: `Payment of ${formatCurrency(order.total_price)} confirmed for order #${order.id.slice(0, 8)}. See you soon!`,
    });
  };

  const handleSchedulePickup = (slot: string) => {
    updatePickupSlot(order.id, slot);
    setShowSlots(false);
    addNotification({
      type: 'info',
      message: `Pickup scheduled for ${slot}. We'll have your order ready!`,
    });
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-800">Order #{order.id.slice(0, 8)}</h1>
          <Badge variant={statusVariants[order.status]}>{statusLabels[order.status]}</Badge>
        </div>

        {isReady && order.total_price > 0 && (
          <Card className="border-green-300 bg-green-50">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="font-semibold text-green-800">Your Order is Ready!</h3>
              </div>
              <p className="text-sm text-green-700">
                Total amount: <span className="font-bold text-lg">{formatCurrency(order.total_price)}</span>
              </p>
              <p className="text-xs text-green-600">Please pick up as soon as possible to ensure freshness.</p>

              {order.payment_method === 'pay_when_pick' && (
                <Button size="sm" onClick={handlePayOnline}>
                  Pay Online Now
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-sm text-purple-800">
                {order.pickup_slot ? 'Pickup Scheduled' : 'Schedule Pickup'}
              </h3>
            </div>

            {order.pickup_slot ? (
              <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
                <p className="text-xs text-gray-500">Your pickup time</p>
                <p className="font-semibold text-purple-700">{order.pickup_slot}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {!showSlots ? (
                  <Button size="sm" variant="secondary" className="w-full" onClick={() => setShowSlots(true)}>
                    Choose Pickup Time
                  </Button>
                ) : (
                  <div>
                    <p className="text-xs font-medium text-purple-700 mb-2">Available slots:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => handleSchedulePickup(slot)}
                          className="text-xs bg-white border border-purple-200 rounded-lg px-3 py-2 hover:bg-purple-100 transition-colors text-left"
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Items</h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                order.payment_method === 'pay_online' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {order.payment_method === 'pay_online' ? 'Pay Online' : 'Pay on Pickup'}
              </span>
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.product?.name || 'Product'} x{item.quantity}</span>
                  <span className="text-gray-800">{formatCurrency((item.product?.price || 0) * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-purple-100 mt-3 pt-3 space-y-1">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {order.total_price > 0 && (
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-purple-700">{formatCurrency(order.total_price)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <MobileNav />
    </>
  );
}
