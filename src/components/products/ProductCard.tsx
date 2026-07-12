'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useStore } from '@/store';
import { Card, CardContent } from '@/components/ui/Card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useStore((s) => s.addItem);
  const addNotification = useStore((s) => s.addNotification);
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [weight, setWeight] = useState('1');

  const handleAdd = () => {
    if (product.unit_type === 'weight') {
      setWeight('1');
      setShowWeightModal(true);
    } else {
      addItem(product, 1);
      addNotification({ type: 'success', message: `${product.name} added to cart!` });
    }
  };

  const handleWeightConfirm = () => {
    const kg = parseFloat(weight);
    if (isNaN(kg) || kg <= 0) return;
    addItem(product, kg);
    setShowWeightModal(false);
    addNotification({ type: 'success', message: `${kg}kg of ${product.name} added to cart!` });
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="aspect-square bg-purple-50 flex items-center justify-center">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <svg className="w-12 h-12 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>
        <CardContent className="p-3 space-y-2">
          <p className="text-xs text-purple-600 font-medium truncate">{product.brand}</p>
          <h3 className="font-medium text-sm truncate">{product.name}</h3>
          {product.unit_type === 'weight' && (
            <p className="text-xs text-gray-400">per kg</p>
          )}
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-700">{formatCurrency(product.price)}</span>
            <Button size="sm" onClick={handleAdd} disabled={product.stock_quantity <= 0}>
              {product.stock_quantity <= 0 ? 'Out of Stock' : 'Add'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Modal open={showWeightModal} onClose={() => setShowWeightModal(false)} title={`Estimate Weight — ${product.name}`}>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            How many kg would you like? Price: <span className="font-semibold text-purple-700">{formatCurrency(product.price)}/kg</span>
          </p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="flex-1 h-12 text-center text-lg font-bold rounded-xl border border-purple-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm font-medium text-gray-500">kg</span>
          </div>
          <p className="text-center text-sm text-gray-500">
            Estimated total: <span className="font-bold text-purple-700">{formatCurrency(product.price * (parseFloat(weight) || 0))}</span>
          </p>
          <Button size="lg" className="w-full" onClick={handleWeightConfirm} disabled={!weight || parseFloat(weight) <= 0}>
            Add to Cart
          </Button>
        </div>
      </Modal>
    </>
  );
}
