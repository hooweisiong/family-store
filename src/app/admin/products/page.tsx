'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Modal } from '@/components/ui/Modal';
import { Card, CardContent } from '@/components/ui/Card';

export default function AdminProductsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', brand: '', price: '', stock_quantity: '', image_url: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Create product:', form);
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-purple-800">Products</h1>
          <Button onClick={() => setModalOpen(true)}>Add Product</Button>
        </div>

        <Card>
          <CardContent className="p-4 text-center text-gray-500 text-sm">
            Product management — connect to InsForge backend for full CRUD.
          </CardContent>
        </Card>
      </main>
      <MobileNav />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Product">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Brand" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
          <Input label="Price" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <Input label="Stock" type="number" value={form.stock_quantity} onChange={(e) => setForm({ ...form, stock_quantity: e.target.value })} />
          <Input label="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <Button type="submit" className="w-full">Create Product</Button>
        </form>
      </Modal>
    </>
  );
}
