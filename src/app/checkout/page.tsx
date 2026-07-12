'use client';

import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartSummary } from '@/components/cart/CartSummary';
import { CartItem } from '@/components/cart/CartItem';
import { useStore } from '@/store';
import Link from 'next/link';

export default function CheckoutPage() {
  const items = useStore((s) => s.items);

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">Checkout</h1>

        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="mb-4">Your cart is empty</p>
            <Link href="/products" className="text-purple-600 hover:underline font-medium">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-xl border border-purple-100 p-4">
              <h2 className="font-semibold text-sm mb-3 text-gray-600">Items</h2>
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </main>
      <MobileNav />
    </>
  );
}
