'use client';

import { useEffect } from 'react';
import { useStore } from '@/store';
import { cn } from '@/lib/utils';

export function NotificationToast() {
  const notifications = useStore((s) => s.notifications);
  const markNotificationRead = useStore((s) => s.markNotificationRead);
  const unread = notifications.filter((n) => !n.read);

  useEffect(() => {
    if (unread.length === 0) return;
    const timer = setTimeout(() => {
      markNotificationRead(unread[0].id);
    }, 6000);
    return () => clearTimeout(timer);
  }, [unread.length]);

  if (unread.length === 0) return null;

  const latest = unread[0];
  const icons: Record<string, string> = {
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-amber-500',
  };

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm animate-in slide-in-from-right">
      <div className="bg-white rounded-xl shadow-lg border border-purple-100 p-4 flex items-start gap-3">
        <div className={cn('shrink-0', icons[latest.type] || 'text-purple-500')}>
          {latest.type === 'success' ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{latest.message}</p>
        </div>
        <button onClick={() => markNotificationRead(latest.id)} className="text-gray-400 hover:text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
