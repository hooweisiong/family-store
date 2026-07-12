'use client';

import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { CartItem } from '@/components/cart/CartItem';
import { useStore } from '@/store';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function CartPage() {
  const items = useStore((s) => s.items);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const delivery = subtotal >= 30 ? 0 : 2.99;
  const total = subtotal + delivery;

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-4 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link href="/products" className="text-purple-600 hover:underline font-medium">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl border border-purple-100 p-4 mb-4">
              {items.map((item) => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>

            <div className="bg-purple-50 rounded-xl p-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="border-t border-purple-200 pt-2 flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
              </div>
              <Link href="/checkout">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </main>
      <MobileNav />
    </>
  );
}
