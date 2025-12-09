'use client';

import { useState } from 'react';
import { addQuote } from '@/lib/quotes';
import { useAuth } from '@/context/AuthContext';

export default function AddQuotePage() {
  const { user } = useAuth();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');

  if (!user) return <p className='p-10'>Login required.</p>;

  async function handleAdd() {
    if (!quote || !author) {
      setMessage('All fields required.');
      return;
    }

    await addQuote(quote, author, user.uid);

    setMessage('Quote added successfully!');
    setQuote('');
    setAuthor('');
  }

  return (
    <main className='min-h-dvh flex items-center justify-center p-8 bg-slate-100 dark:bg-slate-900'>
      <div className='bg-white dark:bg-slate-800 p-8 rounded-xl w-full max-w-md shadow'>
        <h1 className='text-xl font-bold text-center mb-6'>Add New Quote</h1>

        <label className='font-semibold'>Quote</label>
        <input
          className='w-full p-2 border rounded dark:bg-slate-700 dark:text-white mb-4'
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
        />

        <label className='font-semibold'>Author</label>
        <input
          className='w-full p-2 border rounded dark:bg-slate-700 dark:text-white mb-4'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className='bg-amber-900 text-white p-2 w-full rounded'
        >
          Add Quote
        </button>

        {message && (
          <p className='text-center mt-4 text-green-600'>{message}</p>
        )}
      </div>
    </main>
  );
}
