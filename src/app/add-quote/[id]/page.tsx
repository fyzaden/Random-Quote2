'use client';

import { useEffect, useState } from 'react';
import { addQuote } from '@/lib/quotes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AddQuotePage() {
  const { user, loading } = useAuth(); // loading varsa bekleyelim (AuthContext'te loading sağlanmalı)
  const router = useRouter();

  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  async function handleAdd(e?: React.FormEvent) {
    e?.preventDefault();
    if (!user) {
      setMessage('You must be logged in to add a quote.');
      return;
    }
    if (!quote.trim() || !author.trim()) {
      setMessage('Please fill both fields.');
      return;
    }

    try {
      setIsSubmitting(true);
      await addQuote(quote.trim(), author.trim(), user.uid);
      setMessage('Quote added successfully!');
      setQuote('');
      setAuthor('');
    } catch (err: any) {
      setMessage(err.message || 'Error adding quote');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <main className='min-h-dvh flex items-center justify-center p-8'>
        <p>Checking authentication...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className='min-h-dvh flex items-center justify-center p-8'>
        <p className='text-center'>You must be logged in to add a quote.</p>
      </main>
    );
  }

  return (
    <main className='min-h-dvh flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-900'>
      <div className='bg-white dark:bg-slate-800 p-8 rounded-xl w-full max-w-md shadow'>
        <h1 className='text-xl font-bold text-center mb-6'>Add New Quote</h1>

        <form onSubmit={handleAdd} className='flex flex-col'>
          <label className='font-semibold'>Quote</label>
          <textarea
            className='w-full p-2 border rounded dark:bg-slate-700 dark:text-white mb-4'
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows={3}
            required
          />

          <label className='font-semibold'>Author</label>
          <input
            className='w-full p-2 border rounded dark:bg-slate-700 dark:text-white mb-4'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <button
            type='submit'
            disabled={isSubmitting}
            className='bg-amber-900 text-white p-2 w-full rounded disabled:opacity-60'
          >
            {isSubmitting ? 'Adding…' : 'Add Quote'}
          </button>
        </form>

        {message && (
          <p className='text-center mt-4 text-slate-700 dark:text-slate-300'>
            {message}
          </p>
        )}
      </div>
    </main>
  );
}
