'use client';

import Link from 'next/link';
import { useStore } from '@/store';
import { Badge } from '@/components/ui/Badge';

export function Navbar() {
  const totalItems = useStore((s) => s.totalItems());
  const isAuthenticated = useStore((s) => s.isAuthenticated);
  const notifications = useStore((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-purple-700 text-white sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-14 px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Family Store" className="h-8 w-auto" />
          <span className="text-xl font-bold tracking-tight">Family Store</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/products" className="hover:text-purple-200 transition-colors">Shop</Link>
          <Link href="/picker" className="hover:text-purple-200 transition-colors">Picker</Link>
          {isAuthenticated ? (
            <Link href="/orders" className="hover:text-purple-200 transition-colors relative">
              Orders
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-3 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>
          ) : (
            <Link href="/auth" className="hover:text-purple-200 transition-colors">Sign In</Link>
          )}
        </nav>

        <Link href="/cart" className="relative p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {totalItems > 0 && (
            <Badge variant="danger" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
              {totalItems}
            </Badge>
          )}
        </Link>
      </div>
    </header>
  );
}
