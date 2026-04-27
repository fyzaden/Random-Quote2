'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, userData, logout, updateUserTheme } = useAuth();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved =
      (typeof window !== 'undefined'
        ? (localStorage.getItem('theme') as 'light' | 'dark')
        : null) || 'light';

    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);

    if (user) updateUserTheme(theme);
  }, [theme, user, updateUserTheme]);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <nav
      className='
        w-full
        sticky top-0 z-50
        backdrop-blur-xl
        bg-[var(--card-bg)]/80
        border-b border-[var(--border)]
        text-[var(--text)]
        shadow-sm
      '
    >
      <div className='max-w-5xl mx-auto px-4 py-3 flex items-center justify-between'>
        <div className='flex gap-5 font-medium'>
          <Link href='/' className='hover:text-[var(--accent)] transition'>
            Home
          </Link>

          {userData?.admin && (
            <Link
              href='/admin'
              className='hover:text-[var(--accent)] transition'
            >
              Admin
            </Link>
          )}

          {user && (
            <>
              <Link
                href='/add-quote'
                className='hover:text-[var(--accent)] transition'
              >
                Add Quote
              </Link>
              <Link
                href='/my-quotes'
                className='hover:text-[var(--accent)] transition'
              >
                My Quotes
              </Link>
              <Link
                href='/settings'
                className='hover:text-[var(--accent)] transition'
              >
                Settings
              </Link>
            </>
          )}

          {!user && (
            <Link
              href='/login'
              className='hover:text-[var(--accent)] transition'
            >
              Login
            </Link>
          )}
        </div>

        <div className='flex items-center gap-4'>
          <button
            onClick={toggleTheme}
            className='
              relative w-14 h-7 rounded-full
              bg-[var(--card-bg)] border border-[var(--border)]
              shadow-sm flex items-center
              transition-all duration-300
            '
          >
            <span
              className='absolute left-1 text-lg text-yellow-400'
              style={{ opacity: theme === 'light' ? 1 : 0 }}
            >
              ☀
            </span>

            <span
              className='absolute right-1 text-lg text-blue-300'
              style={{ opacity: theme === 'dark' ? 1 : 0 }}
            >
              ☾
            </span>

            <span
              className={`
                absolute w-6 h-6 rounded-full bg-[var(--accent)]
                shadow-md transition-transform duration-300
                ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}
              `}
            />
          </button>

          {user && (
            <button
              onClick={logout}
              className='px-3 py-1 rounded bg-[var(--accent)] text-white text-sm'
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
