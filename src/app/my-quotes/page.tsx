'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserQuotes } from '@/lib/quotes';
import Link from 'next/link';

export default function MyQuotesPage() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<any[]>([]);

  if (!user) return <p className='p-10'>Login required.</p>;

  useEffect(() => {
    async function load() {
      const data = await getUserQuotes(user.uid);
      setQuotes(data);
    }
    load();
  }, [user]);

  return (
    <main className='p-8'>
      <h1 className='text-2xl font-bold mb-6'>My Quotes</h1>

      {quotes.length === 0 && <p>You have no quotes yet.</p>}

      <div className='flex flex-col gap-4'>
        {quotes.map((q) => (
          <div
            key={q.id}
            className='p-4 bg-white dark:bg-slate-800 rounded shadow flex justify-between items-center'
          >
            <div>
              <p className='font-bold'>{q.quote}</p>
              <p className='text-sm italic'>{q.author}</p>
            </div>

            <div className='flex gap-3'>
              <Link href={`/edit-quote/${q.id}`} className='text-blue-600'>
                Edit
              </Link>
              <Link href={`/delete-quote/${q.id}`} className='text-red-600'>
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
