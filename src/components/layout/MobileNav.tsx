'use client';

import Link from 'next/link';
import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';

export function MobileNav() {
  const totalItems = useStore((s) => s.totalItems());
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const unreadNotifs = useStore((s) => s.notifications.filter((n) => !n.read).length);

  const links = [
    { href: '/', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { href: '/products', label: 'Shop', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { href: '/cart', label: 'Cart', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z', badge: totalItems },
    { href: '/orders', label: 'Orders', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', badge: unreadNotifs },
    { href: '/picker', label: 'Picker', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 z-40">
      <div className="flex items-center justify-around h-16">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="flex flex-col items-center gap-0.5 text-purple-600 text-xs relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
            </svg>
            {link.label}
            {link.badge && link.badge > 0 && (
              <Badge variant="danger" className="absolute -top-1 -right-2 px-1 py-0.5 text-[10px]">
                {link.badge}
              </Badge>
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
}
