'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

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
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <main className='min-h-dvh flex items-center justify-center bg-gradient-to-r from-amber-400 to-red-800'>
      <div className='bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-[90%] max-w-xl'>
        <h1 className='text-3xl font-bold text-center mb-6 pt-3 text-amber-950 dark:text-amber-400'>
          Sign Up
        </h1>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-bold text-amber-950 dark:text-slate-300'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
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
              id='password'
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder='••••••••'
              className='bg-slate-200 dark:bg-[#161b22] dark:text-white 
              border border-slate-300 dark:border-slate-600 rounded-lg p-2 w-full'
            />
          </div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}

          <button
            type='submit'
            className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2 mt-4'
          >
            Create Account
          </button>
        </form>

        <p className='text-center text-sm mt-6 text-slate-700 dark:text-slate-400'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='text-amber-700 dark:text-amber-400 font-semibold hover:underline'
          >
            Log in.
          </Link>
        </p>
      </div>
    </main>
  );
}
