'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

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
    <main className='min-h-dvh flex items-center justify-center bg-gradient-to-r from-amber-400 to-red-800'>
      <div className='bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-[90%] max-w-md mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-6 pt-3 text-slate-800 dark:text-slate-100'>
          Login
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm text-amber-950 dark:text-slate-300 font-bold'
            >
              Email
            </label>
            <input
              type='email'
              value={email}
              placeholder='you@example.com'
              onChange={(e) => setEmail(e.target.value)}
              className='bg-slate-200 dark:bg-[#161b22] dark:text-white 
              border border-slate-300 dark:border-slate-600 rounded-lg p-2 w-full'
            />
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-bold text-amber-950 dark:text-slate-300'
            >
              Password
            </label>
            <input
              type='password'
              value={pw}
              placeholder='Enter your password'
              onChange={(e) => setPw(e.target.value)}
              className='bg-slate-200 dark:bg-[#161b22] dark:text-white 
              border border-slate-300 dark:border-slate-600 rounded-lg p-2 w-full'
            />
          </div>
          {error && <p className='text-red-500'>{error}</p>}

          <button
            type='submit'
            className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2 mt-4'
          >
            Login
          </button>
        </form>

        <p className='text-center text-sm mt-6 text-slate-700 dark:text-slate-400'>
          Don{"'"}t have an account?{' '}
          <Link
            href='/signup'
            className='text-amber-700 dark:text-amber-400 font-semibold hover:underline'
          >
            Join
          </Link>
        </p>
      </div>
    </main>
  );
}
