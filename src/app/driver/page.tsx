'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { DriverRoute } from '@/components/map/DriverRoute';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { Order } from '@/types';

const STORE_LOCATION: [number, number] = [40.7128, -74.006];
const CUSTOMER_LOCATION: [number, number] = [40.7282, -73.7949];

export default function DriverPage() {
  const [deliveries, setDeliveries] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDelivery, setActiveDelivery] = useState<Order | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_INSFORGE_URL}/orders?status=out_for_delivery`)
      .then((res) => res.json())
      .then((data) => setDeliveries(data.items || data || []))
      .catch(() => setDeliveries([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6 space-y-6">
        <h1 className="text-2xl font-bold text-purple-800">Driver Dashboard</h1>

        {activeDelivery ? (
          <>
            <DriverRoute origin={STORE_LOCATION} destination={CUSTOMER_LOCATION} />
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Order #{activeDelivery.id.slice(0, 8)}</span>
                  <Badge variant="info">Out for Delivery</Badge>
                </div>
                <Button variant="secondary" className="w-full" onClick={() => setActiveDelivery(null)}>
                  Mark as Delivered
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {loading ? (
              <div className="flex justify-center py-8"><Spinner size="lg" /></div>
            ) : deliveries.length === 0 ? (
              <Card>
                <CardContent className="p-4 text-center text-gray-500 text-sm">
                  No deliveries assigned. Awaiting orders...
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {deliveries.map((order) => (
                  <Card key={order.id} onClick={() => setActiveDelivery(order)}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-xs text-gray-500">{order.items?.length || 0} items</p>
                      </div>
                      <Button size="sm">Start Delivery</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <MobileNav />
    </>
  );
}
