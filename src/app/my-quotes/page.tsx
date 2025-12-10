'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getUserQuotes, deleteQuote, updateQuote } from '../../lib/quotes';

export default function MyQuotesPage() {
  const { user } = useAuth();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuote, setEditQuote] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  useEffect(() => {
    if (!user) return;

    async function load() {
      const data = await getUserQuotes(user.uid);
      setQuotes(data);
    }
    load();
  }, [user]);

  if (!user) return <p className='p-10'>Please login</p>;

  return (
    <main className='p-10 text-white'>
      <h1 className='text-3xl font-bold mb-6'>My Quotes</h1>

      {quotes.map((q) => (
        <div key={q.id} className='mb-6 p-4 bg-amber-900 rounded-lg'>
          {editingId === q.id ? (
            // EDIT FORM
            <div>
              <input
                className='w-full p-2 mb-2 rounded'
                value={editQuote}
                onChange={(e) => setEditQuote(e.target.value)}
              />
              <input
                className='w-full p-2 mb-2 rounded'
                value={editAuthor}
                onChange={(e) => setEditAuthor(e.target.value)}
              />

              <button
                onClick={async () => {
                  await updateQuote(q.id, editQuote, editAuthor);
                  setEditingId(null);
                  window.location.reload();
                }}
                className='bg-green-600 px-3 py-1 rounded mr-2'
              >
                Save
              </button>

              <button
                onClick={() => setEditingId(null)}
                className='bg-gray-600 px-3 py-1 rounded'
              >
                Cancel
              </button>
            </div>
          ) : (
            // NORMAL VIEW
            <div>
              <p className='text-xl mb-2'>“{q.quote}”</p>
              <p className='italic mb-2'>— {q.author}</p>

              <button
                onClick={() => {
                  setEditingId(q.id);
                  setEditQuote(q.quote);
                  setEditAuthor(q.author);
                }}
                className='bg-blue-600 px-3 py-1 rounded mr-2'
              >
                Edit
              </button>

              <button
                onClick={async () => {
                  await deleteQuote(q.id);
                  window.location.reload();
                }}
                className='bg-red-600 px-3 py-1 rounded'
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
