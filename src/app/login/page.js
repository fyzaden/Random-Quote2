'use client';

import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className='min-h-dvh flex items-center justify-center bg-gradient-to-r from-amber-400 to-red-800'>
      <div className='bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-[90%] max-w-md mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-6 pt-3'>Login</h1>
        <form className='flex flex-col gap-4'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm  text-amber-950 dark:text-slate-300 font-bold'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='you@example.com'
              className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2 border border-slate-300 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600'
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
              placeholder='Enter your password'
              className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2 border border-slate-300 w-full mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600'
            />
          </div>
          <button
            type='submit'
            className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2 mt-4 '
          >
            Login
          </button>
        </form>
        <p className='text-center text-sm mt-6 text-slate-700 dark:text-slate-400'>
          Don't have an account? {''}
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
