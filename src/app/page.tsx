'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pb-20 md:pb-0">
        <section className="bg-gradient-to-br from-purple-700 to-purple-900 text-white">
          <div className="container mx-auto px-4 py-16 md:py-24 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Fresh Groceries, Ready for Pickup</h1>
            <p className="text-purple-200 text-lg mb-8 max-w-md mx-auto">
              Shop from Family Store and pick up your order at your chosen time.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/products">
                <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-500">
                  Start Shopping
                </Button>
              </Link>
              <Link href="/picker">
                <Button size="lg" className="bg-purple-600 text-white hover:bg-purple-500">
                  Picker Site
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-purple-100 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={f.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500">{f.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <MobileNav />
    </>
  );
}

const features = [
  {
    title: 'Easy Ordering',
    description: 'Browse products, add to cart, and checkout in seconds.',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z',
  },
  {
    title: 'Live Tracking',
    description: 'Track your delivery in real-time from store to door.',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
  },
  {
    title: 'Schedule Pickup',
    description: 'Choose your preferred pickup time for maximum freshness.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
];
