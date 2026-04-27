'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SignUpPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, pw);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className='min-h-dvh flex items-center justify-center p-6'>
      <div className='card-paper w-full max-w-md p-8 rounded-xl'>
        <h1 className='text-3xl font-serif font-bold text-center mb-6'>
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='text-sm font-semibold text-muted'>Email</label>
            <input
              type='email'
              value={email}
              placeholder='you@example.com'
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 mt-1 rounded border bg-transparent'
            />
          </div>

          <div>
            <label className='text-sm font-semibold text-muted'>Password</label>
            <input
              type='password'
              value={pw}
              placeholder='••••••••'
              onChange={(e) => setPw(e.target.value)}
              className='w-full p-2 mt-1 rounded border bg-transparent'
            />
          </div>

          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            className='btn bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white w-full mt-3'
          >
            Create Account
          </button>
        </form>

        <p className='text-center text-sm mt-6 text-muted'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-[var(--accent)] hover:underline font-semibold'
          >
            Log in.
          </Link>
        </p>
      </div>
    </main>
  );
}
