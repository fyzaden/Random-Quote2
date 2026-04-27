'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserQuotes, deleteQuote, updateQuote } from '@/lib/quotes';

export default function MyQuotesPage() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuote, setEditQuote] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  useEffect(() => {
    if (!user) return;
    loadQuotes();
  }, [user]);

  async function loadQuotes() {
    if (!user) return;
    const data = await getUserQuotes(user.uid);
    setQuotes(data);
  }

  async function handleSave() {
    if (!editingId) return;
    await updateQuote(editingId, editQuote, editAuthor);
    setEditingId(null);
    loadQuotes();
  }

  async function handleDelete(id: string) {
    const ok = confirm('Delete this quote?');
    if (!ok) return;

    await deleteQuote(id);
    loadQuotes();
  }

  if (!user) return <p className='p-10'>Please login</p>;

  return (
    <main className='p-10 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-serif font-bold mb-6'>My Quotes</h1>

      {quotes.length === 0 && (
        <p className='text-muted italic'>You haven't added any quotes yet.</p>
      )}

      <div className='space-y-6'>
        {quotes.map((q) => (
          <div key={q.id} className='card-paper p-4 rounded-lg border shadow'>
            {editingId === q.id ? (
              <div className='space-y-2'>
                <label className='font-semibold text-sm'>Quote</label>
                <textarea
                  className='w-full p-2 rounded border bg-transparent'
                  rows={3}
                  value={editQuote}
                  onChange={(e) => setEditQuote(e.target.value)}
                />

                <label className='font-semibold text-sm'>Author</label>
                <input
                  className='w-full p-2 rounded border bg-transparent'
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                />

                <div className='flex gap-3 mt-3'>
                  <button
                    onClick={handleSave}
                    className='btn bg-green-600 text-white hover:bg-green-700'
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className='btn bg-gray-600 text-white hover:bg-gray-700'
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className='text-xl font-serif mb-1'>“{q.quote}”</p>
                <p className='italic text-sm mb-2'>— {q.author}</p>

                <p className='text-sm text-muted'>
                  Validated: {q.validated ? 'Yes' : 'No'}
                </p>

                <div className='flex gap-3 mt-3'>
                  <button
                    onClick={() => {
                      setEditingId(q.id);
                      setEditQuote(q.quote);
                      setEditAuthor(q.author);
                    }}
                    className='btn bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(q.id)}
                    className='btn bg-red-600 text-white hover:bg-red-700'
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
