'use client';

import Card from '../../components/Card';
import Button from '../../components/Button';
import { useState } from 'react';
import { useQuotesDispatchContext } from '../QuotesContext';

export default function AdminPage() {
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');

  const { handleUpdateQuotes } = useQuotesDispatchContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleUpdateQuotes({ quote, author });
    setQuote('');
    setAuthor('');
  }

  return (
    <main className='min-h-dvh flex items-center justify-center bg-gradient-to-r from-amber-400 to-red-800'>
      <Card>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <label className='font-bold text-amber-950' htmlFor='quote'>
            Quote
          </label>

          <input
            type='text'
            id='quote'
            className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2'
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
          />

          <label className='font-bold text-amber-950 mt-2' htmlFor='author'>
            Author
          </label>

          <input
            type='text'
            id='author'
            className='bg-amber-900 hover:bg-amber-600 text-white rounded-lg p-2'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />

          <Button label='Add a quote' type='submit' />
        </form>
      </Card>
    </main>
  );
}
