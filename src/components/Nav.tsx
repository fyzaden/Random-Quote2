'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useAuth } from '@/context/AuthContext';
export default function Navbar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { user, logout, updateUserTheme } = useAuth();

  useEffect(() => {
    const saved =
      (typeof window !== 'undefined' &&
        (localStorage.getItem('theme') as 'light' | 'dark')) ||
      'light';

    setTheme(saved);

    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);

    if (user) {
      updateUserTheme(theme);
    }
  }, [theme, user, updateUserTheme]);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <nav
      className='flex gap-6 justify-between items-center p-4 
      bg-[#2b0f05] dark:bg-[#0f0f15] 
      text-slate-200 dark:text-slate-100 shadow-md'
    >
      <div className='flex gap-4'>
        <Link href='/'>Home</Link>
        <Link href='/admin'>Admin</Link>
        {user && <Link href='/add-quote'>Add Quote</Link>}
        {user && <Link href='/my-quotes'>My Quotes</Link>}

        {user ? (
          <>
            <Link href='/settings'>Settings</Link>
            <button onClick={logout}>Log out</button>
          </>
        ) : (
          <Link href='/login'>Login</Link>
        )}
      </div>

      <Switch
        checked={theme === 'dark'}
        onChange={toggleTheme}
        className={`relative inline-flex h-9 w-18 items-center rounded-full transition-colors duration-300
          ${
            theme === 'dark'
              ? 'bg-indigo-700 shadow-[0_0_12px_3px_rgba(80,80,255,0.7)]'
              : 'bg-gray-300 shadow-[0_0_10px_2px_rgba(200,200,200,0.5)]'
          }
        `}
      >
        <span className='absolute left-2 text-yellow-300 text-lg pointer-events-none'>
          ☀︎
        </span>

        <span className='absolute right-2 text-indigo-200 text-lg pointer-events-none'>
          ☽
        </span>

        <span
          className={`absolute h-7 w-7 rounded-full bg-white shadow-lg transition-transform duration-300 
            ${theme === 'dark' ? 'translate-x-9' : 'translate-x-1'}
          `}
        />
      </Switch>
    </nav>
  );
}
