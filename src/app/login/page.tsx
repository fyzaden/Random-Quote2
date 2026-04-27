'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, pw);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className='min-h-dvh flex items-center justify-center p-6'>
      <div className='card-paper w-full max-w-md p-8 rounded-xl'>
        <h1 className='text-3xl font-serif font-bold text-center mb-6'>
          Login
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-semibold text-muted'>
              Email
            </label>
            <input
              type='email'
              className='w-full p-2 mt-1 rounded border bg-transparent'
              value={email}
              placeholder='you@example.com'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className='block text-sm font-semibold text-muted'>
              Password
            </label>
            <input
              type='password'
              className='w-full p-2 mt-1 rounded border bg-transparent'
              placeholder='••••••••'
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            className='btn bg-[var(--accent)] text-white hover:bg-[var(--accent-light)] w-full mt-4'
          >
            Login
          </button>
        </form>

        <p className='text-center text-sm mt-6 text-muted'>
          Don't have an account?{' '}
          <Link
            href='/signup'
            className='text-[var(--accent)] font-semibold hover:underline'
          >
            Join
          </Link>
        </p>
      </div>
    </main>
  );
}
