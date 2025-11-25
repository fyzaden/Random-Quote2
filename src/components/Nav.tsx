'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [enabled, setEnabled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  function toggleTheme() {
    const html = document.documentElement;

    if (enabled) {
      html.classList.remove('dark');
      setEnabled(false);
    } else {
      html.classList.add('dark');
      setEnabled(true);
    }
  }

  return (
    <nav className='flex gap-6 justify-between items-center p-4 bg-amber-950 text-slate-200 shadow-md'>
      <div className=' flex gap-4'>
        <Link href='/'>Home</Link>
        <Link href='/admin'>Admin</Link>

        <Link href='/login'>Login</Link>
        <button onClick={() => logout()}>Log out</button>
      </div>
      <Switch
        checked={enabled}
        onChange={toggleTheme}
        className={`relative inline-flex h-9 w-18 items-center rounded-full transition-colors duration-300
          ${
            enabled
              ? 'bg-amber-600/80 shadow-[0_0_15px_4px_rgba(255,200,0,0.5)]'
              : 'bg-gray-300 shadow-[0_0_12px_3px_rgba(200,200,255,0.3)]'
          }
          hover:shadow-[0_0_20px_6px_rgba(255,255,255,0.4)]
        `}
      >
        <span className='absolute left-2 text-yellow-300 text-lg pointer-events-none'>
          ☀︎
        </span>

        <span className='absolute right-2 text-slate-200 dark:text-white text-lg pointer-events-none'>
          ☽
        </span>

        <span
          className={`absolute h-7 w-7 rounded-full bg-white shadow-lg transition-transform duration-300 
            ${
              enabled
                ? 'translate-x-9 shadow-[0_0_12px_rgba(255,200,0,0.6)]'
                : 'translate-x-1 shadow-[0_0_12px_rgba(150,150,255,0.5)]'
            }
          `}
        />
      </Switch>
    </nav>
  );
}
