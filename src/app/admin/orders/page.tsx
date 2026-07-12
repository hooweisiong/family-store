'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function AdminOrdersPage() {
  const [orders] = useState<{ id: string; status: string }[]>([]);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">All Orders</h1>
        {orders.length === 0 ? (
          <Card>
            <CardContent className="p-4 text-center text-gray-500 text-sm">
              No orders yet. Connect to InsForge backend to manage orders.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-4 flex items-center justify-between">
                  <span className="font-mono text-sm">#{order.id.slice(0, 8)}</span>
                  <Badge>{order.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <MobileNav />
    </>
  );
}
