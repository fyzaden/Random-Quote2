'use client';

import { useEffect, useState } from 'react';
import { addQuote } from '@/lib/quotes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AddQuotePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className='min-h-dvh flex items-center justify-center'>
        <p className='text-muted'>Checking authentication...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className='min-h-dvh flex items-center justify-center'>
        <p className='text-muted'>Please login to add quotes.</p>
      </main>
    );
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    if (!quote.trim() || !author.trim()) {
      setMessage('Both fields are required.');
      return;
    }

    try {
      setIsSubmitting(true);
      await addQuote(quote.trim(), author.trim(), user.uid);

      setMessage('Quote added successfully!');
      setQuote('');
      setAuthor('');
    } catch (err: any) {
      setMessage(err.message || 'Error adding quote.');
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main className='min-h-dvh flex items-center justify-center p-8'>
      <div
        className='card-paper p-8 rounded-xl w-full max-w-lg'
        style={{ background: 'var(--card-bg)' }}
      >
        <h1 className='text-2xl font-serif font-bold text-center mb-6'>
          Add New Quote
        </h1>

        <form onSubmit={handleAdd} className='flex flex-col gap-4'>
          <div>
            <label className='font-semibold text-sm'>Quote</label>
            <textarea
              className='w-full p-2 rounded border bg-transparent'
              rows={3}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
          </div>

          <div>
            <label className='font-semibold text-sm'>Author</label>
            <input
              className='w-full p-2 rounded border bg-transparent'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <button
            type='submit'
            disabled={isSubmitting}
            className='btn bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] disabled:opacity-50'
          >
            {isSubmitting ? 'Adding…' : 'Add Quote'}
          </button>
        </form>

        {message && <p className='text-center mt-4 text-muted'>{message}</p>}
      </div>
    </main>
  );
}
