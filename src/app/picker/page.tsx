'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';

const VALID_ID = 'test67';
const VALID_PW = 'test67';

export default function PickerLoginPage() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (id === VALID_ID && password === VALID_PW) {
      sessionStorage.setItem('picker_id', id);
      sessionStorage.setItem('picker_name', 'Test Picker');
      router.push('/picker/dashboard');
    } else {
      setError('Invalid credentials. Try test67 / test67');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-purple-50">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-purple-700">Picker Verification</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your picker ID and password</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input label="Picker ID" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. test67" required />
            <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" required />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" size="lg" className="w-full">
              Verify & Enter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
