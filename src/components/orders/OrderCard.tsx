'use client';

import { Order } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';

interface OrderCardProps {
  order: Order;
  onClick?: () => void;
}

const statusVariants: Record<string, 'warning' | 'info' | 'success' | 'danger'> = {
  pending: 'warning',
  confirmed: 'info',
  preparing: 'info',
  out_for_delivery: 'info',
  delivered: 'success',
  cancelled: 'danger',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export function OrderCard({ order, onClick }: OrderCardProps) {
  return (
    <Card onClick={onClick}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 font-mono">#{order.id.slice(0, 8)}</span>
          <Badge variant={statusVariants[order.status] || 'default'}>
            {statusLabels[order.status] || order.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{order.items?.length || 0} items</span>
          <span className="font-semibold">{formatCurrency(order.total_price)}</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(order.created_at).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
