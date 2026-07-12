'use client';

import { NotificationToast } from '@/components/ui/NotificationToast';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NotificationToast />
    </>
  );
}
