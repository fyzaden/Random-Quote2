'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className='min-h-dvh flex items-center justify-center'>
        <p>Loading...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className='min-h-dvh flex items-center justify-center'>
        <p className='text-center'>
          You must be logged in to access the admin panel.
        </p>
      </main>
    );
  }

  return (
    <main className='min-h-dvh flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-900'>
      <div className='bg-white dark:bg-slate-800 p-8 rounded-xl shadow w-full max-w-md text-center'>
        <h1 className='text-2xl font-bold mb-4'>Welcome, {user.email}</h1>

        <p className='text-slate-700 dark:text-slate-300 mb-6'>
          This is your admin dashboard.
        </p>

        <div className='flex flex-col gap-4'>
          <Link
            href='/add-quote'
            className='bg-amber-900 text-white py-2 rounded-lg hover:bg-amber-700'
          >
            ➕ Add New Quote
          </Link>

          <Link
            href='/my-quotes'
            className='bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-600'
          >
            📜 My Quotes
          </Link>
        </div>
      </div>
    </main>
  );
}
