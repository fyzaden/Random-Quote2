'use client';
import { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useAuth } from '../../context/AuthContext';
import { addQuote } from '../../lib/quotes';

export default function AdminPage() {
  const { user } = useAuth();
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return alert('You must be logged in!');

    await addQuote(quote, author, user.uid);

    setQuote('');
    setAuthor('');
    alert('Quote added successfully!');
  }
  return (
    <main className='min-h-dvh flex items-center justify-center bg-gradient-to-r from-amber-400 to-red-800'>
      <Card>
        <form onSubmit={handleSubmit} className='flex flex-col'>
          <label className='font-bold text-amber-950'>Quote</label>
          <input
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            className='bg-amber-900 text-white p-2 rounded-lg'
          />

          <label className='font-bold text-amber-950 mt-2'>Author</label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='bg-amber-900 text-white p-2 rounded-lg'
          />

          <Button type='submit' label='Add Quote' />
        </form>
      </Card>
    </main>
  );
}
