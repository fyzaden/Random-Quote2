'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getAllQuotes, validateQuote } from '@/lib/quotes';
import { getAllUsers, setAdmin } from '@/lib/users';

export default function AdminPage() {
  const { user, userData, loading } = useAuth();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (userData?.admin) loadUsers();
  }, [userData]);

  async function loadUsers() {
    const data = await getAllUsers();
    setUsers(data);
  }

  useEffect(() => {
    if (!userData?.admin) return;
    loadQuotes();
  }, []);

  async function loadQuotes() {
    const data = await getAllQuotes();
    setQuotes(data);
  }

  async function handleValidate(id: string) {
    await validateQuote(id);
    loadQuotes();
  }

  if (loading) return <p className='p-10'>Loading...</p>;
  if (!user) return <p className='p-10'>Login required.</p>;

  if (!userData?.admin) {
    return (
      <main className='p-10'>
        <h2 className='text-xl font-bold'>Admin Only Page</h2>
        <p>You are not allowed to access this page.</p>
      </main>
    );
  }

  return (
    <main className='p-10 space-y-10 max-w-3xl mx-auto'>
      <h1 className='text-3xl font-serif font-bold'>Admin Panel</h1>

      <section>
        <h2 className='text-2xl font-bold mb-4'>User Management</h2>

        {users.length === 0 && <p>No users found.</p>}

        <div className='space-y-4'>
          {users.map((u) => (
            <div key={u.id} className='card-paper p-4 rounded border'>
              <p className='font-semibold'>{u.email}</p>
              <p className='text-sm text-muted'>
                Admin: {u.admin ? 'Yes' : 'No'}
              </p>

              <button
                onClick={() => setAdmin(u.id, !u.admin).then(loadUsers)}
                className='btn mt-3 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]'
              >
                {u.admin ? 'Remove Admin' : 'Make Admin'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <hr className='opacity-40' />

      <section>
        <h2 className='text-2xl font-bold mb-4'>All Quotes</h2>

        {quotes.length === 0 && <p>No quotes found.</p>}

        <div className='space-y-4'>
          {quotes.map((q) => (
            <div key={q.id} className='card-paper p-4 rounded border'>
              <p className='font-serif text-lg'>“{q.quote}”</p>
              <p className='italic text-sm mt-1'>{q.author}</p>

              <p className='text-sm mt-2 text-muted'>
                Validated: {q.validated ? 'Yes' : 'No'}
              </p>

              {!q.validated && (
                <button
                  onClick={() => handleValidate(q.id)}
                  className='btn mt-3 bg-green-600 text-white hover:bg-green-700'
                >
                  Validate
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
