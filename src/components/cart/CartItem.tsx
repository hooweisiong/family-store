'use client';

import { CartItem as CartItemType } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useStore } from '@/store';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const updateQuantity = useStore((s) => s.updateQuantity);
  const removeItem = useStore((s) => s.removeItem);

  return (
    <div className="flex items-center gap-4 py-3 border-b border-purple-50 last:border-0">
      <div className="w-16 h-16 rounded-lg bg-purple-50 flex items-center justify-center overflow-hidden shrink-0">
        {item.product.image_url ? (
          <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
        ) : (
          <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{item.product.name}</p>
        <p className="text-xs text-gray-500">{formatCurrency(item.product.price)} each</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-medium hover:bg-purple-200"
        >
          -
        </button>
        <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium hover:bg-purple-700"
        >
          +
        </button>
      </div>

      <div className="text-right min-w-[60px]">
        <p className="font-medium text-sm">{formatCurrency(item.product.price * item.quantity)}</p>
      </div>

      <button onClick={() => removeItem(item.product.id)} className="text-gray-400 hover:text-red-500 p-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
