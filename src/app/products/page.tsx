'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductSearch } from '@/components/products/ProductSearch';
import { testProducts } from '@/lib/testData';

export default function ProductsPage() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      testProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.brand?.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-4">Fresh Groceries</h1>
        <div className="mb-6">
          <ProductSearch value={search} onChange={setSearch} />
        </div>
        <ProductGrid products={filtered} />
      </main>
      <MobileNav />
    </>
  );
}
