'use client';

import { useStore } from '@/store';
import { OrderTimeline } from './OrderTimeline';
import { Spinner } from '@/components/ui/Spinner';

export function LiveTracker() {
  const activeOrder = useStore((s) => s.activeOrder);
  const socketStatus = useStore((s) => s.socketStatus);

  if (!activeOrder) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No active order to track</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-purple-100 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Order #{activeOrder.id.slice(0, 8)}</h3>
        {socketStatus === 'connected' ? (
          <span className="flex items-center gap-1 text-xs text-green-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
            Live
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Spinner size="sm" />
            Connecting...
          </span>
        )}
      </div>
      <OrderTimeline status={activeOrder.status} />
    </div>
  );
}
