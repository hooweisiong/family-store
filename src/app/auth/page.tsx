'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { useStore } from '@/store';

export default function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const loginStore = useStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isRegister && (email !== 'hooweisiong@gmail.com' || password !== '12345')) {
      setError('Invalid email or password');
      return;
    }

    const user = {
      id: `user-${Date.now()}`,
      email,
      role: 'customer' as const,
      created_at: new Date().toISOString(),
    };
    const token = `mock-token-${Date.now()}`;
    loginStore(user, token);
    router.push('/products');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-purple-700">{isRegister ? 'Create Account' : 'Sign In'}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {isRegister ? 'Join Family Store today' : 'Welcome back to Family Store'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!isRegister && !error && <p className="text-xs text-gray-400 text-center">Demo: hooweisiong@gmail.com / 12345</p>}
            <Button type="submit" size="lg" className="w-full">
              {isRegister ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsRegister(!isRegister)} className="text-purple-600 hover:underline font-medium">
              {isRegister ? 'Sign In' : 'Register'}
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
